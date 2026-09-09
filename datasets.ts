import fetch from "node-fetch";
import { z } from "zod";

const recordsSchema = z.object({
  hits: z.object({
    hits: z.array(
      z.object({
        created: z.iso.datetime({ offset: true }),
        modified: z.iso.datetime({ offset: true }),
        id: z.number(),
        doi: z.string(),
        metadata: z.object({
          title: z.string(),
          doi: z.string(),
          publication_date: z.string(),
          description: z.string(),
          access_right: z.string(),
          creators: z.array(
            z.object({
              name: z.string(),
            }),
          ),
          keywords: z.array(z.string()).optional(),
          resource_type: z.object({
            type: z.string(),
          }),
          license: z.object({
            id: z.string(),
          }),
        }),
        title: z.string(),
        links: z.object({
          self: z.string(),
          self_html: z.string(),
        }),
        revision: z.number(),
        files: z.array(
          z.object({
            id: z.string(),
            key: z.string(),
            size: z.number(),
            checksum: z.string(),
            links: z.object({
              self: z.string(),
            }),
          }),
        ),
        status: z.string(),
        stats: z.object({
          downloads: z.number(),
          views: z.number(),
        }),
        state: z.string(),
        submitted: z.boolean(),
      }),
    ),
    total: z.number(),
  }),
  links: z.object({
    self: z.string(),
    next: z.string().optional(),
  }),
});

const licenseSchema = z.object({
  id: z.string(),
  links: z.object({
    self: z.string(),
  }),
  title: z.object({
    en: z.string(),
  }),
  description: z.object({
    en: z.string(),
  }),
  icon: z.string(),
  props: z.record(z.string(), z.string()),
});

export interface License {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface DatasetFile {
  id: string;
  name: string;
  size: number;
  link: string;
}

export interface Dataset {
  title: string;
  description: string;
  authors: string[];
  license: License;
  doi: string;
  link: string;
  files: DatasetFile[];
}

const MAX_DELAY = 60_000; // rate limits reset within a minute
const MAX_RETRIES = 4;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch JSON with retries.
 * Zenodo answers rate limits (429) and outages (5xx) with an HTML page,
 * which would otherwise fail the build with a confusing JSON parse error.
 * Rate limits: https://developers.zenodo.org/#rate-limiting
 */
async function fetchJson(url: string): Promise<unknown> {
  for (let attempt = 0; ; attempt++) {
    let error: string;
    let retry = true;
    let delay = 2 ** attempt * 1000;
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const contentType = res.headers.get("content-type") ?? "";
      if (res.ok && contentType.includes("json")) {
        return await res.json();
      }
      error = res.ok
        ? `unexpected content type "${contentType}"`
        : `${res.status} ${res.statusText}`;
      if (res.status === 429) {
        // X-RateLimit-Reset is the Unix timestamp (seconds) when the limit resets
        const reset = Number(res.headers.get("X-RateLimit-Reset")) * 1000 - Date.now();
        delay = Math.min(Math.max(delay, reset), MAX_DELAY);
        error += ` (limit ${res.headers.get("X-RateLimit-Limit")} requests per minute)`;
      } else if (res.status >= 400 && res.status < 500) {
        retry = false; // client errors won't go away by asking again
      }
    } catch (e) {
      error = String(e);
    }
    if (!retry || attempt >= MAX_RETRIES) {
      throw new Error(`Request to ${url} failed: ${error}`);
    }
    console.warn(`Request to ${url} failed (${error}), retrying in ${delay} ms`);
    await sleep(delay);
  }
}

// Licenses repeat across records, so cache to avoid hitting the rate limit
const licenseCache = new Map<string, Promise<License>>();

function fetchLicense(id: string): Promise<License> {
  let license = licenseCache.get(id);
  if (!license) {
    license = fetchJson(`https://zenodo.org/api/vocabularies/licenses/${id}`).then((json) => {
      const response = licenseSchema.parse(json);
      return {
        id: response.id,
        title: response.title.en,
        description: response.description.en,
        icon: response.icon,
        link: response.props.url,
      };
    });
    license.catch(() => licenseCache.delete(id)); // don't cache failures
    licenseCache.set(id, license);
  }
  return license;
}

export async function fetchDatasets(): Promise<Dataset[]> {
  try {
    const url = new URL("https://zenodo.org/api/records");
    url.searchParams.set("sort", "mostrecent");
    url.searchParams.set("page", "1");
    url.searchParams.set("size", "25");
    url.searchParams.set("communities", "openae");
    const response = recordsSchema.parse(await fetchJson(url.toString()));
    return await Promise.all(
      response.hits.hits.map(async (hit) => ({
        title: hit.metadata.title,
        description: hit.metadata.description,
        authors: hit.metadata.creators.map((creator) => creator.name),
        license: await fetchLicense(hit.metadata.license.id),
        doi: hit.metadata.doi,
        link: hit.links.self_html,
        files: hit.files
          .map((file) => ({
            id: file.id,
            name: file.key,
            size: file.size,
            link: file.links.self,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      })),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
