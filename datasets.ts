import fetch from "node-fetch";
import { z } from "zod";

const recordsSchema = z.object({
  hits: z.object({
    hits: z.array(
      z.object({
        created: z.string().datetime({ offset: true }),
        modified: z.string().datetime({ offset: true }),
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
            })
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
          })
        ),
        status: z.string(),
        stats: z.object({
          downloads: z.number(),
          views: z.number(),
        }),
        state: z.string(),
        submitted: z.boolean(),
      })
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
  props: z.record(z.string()),
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

async function fetchLicense(id: string): Promise<License> {
  const res = await fetch(`https://zenodo.org/api/vocabularies/licenses/${id}`);
  const response = licenseSchema.parse(await res.json());
  return {
    id: response.id,
    title: response.title.en,
    description: response.description.en,
    icon: response.icon,
    link: response.props.url,
  };
}

export async function fetchDatasets(): Promise<Dataset[]> {
  try {
    const url = new URL("https://zenodo.org/api/records");
    url.searchParams.set("sort", "mostrecent");
    url.searchParams.set("page", "1");
    url.searchParams.set("size", "100");
    url.searchParams.set("communities", "openae");
    const res = await fetch(url.toString());
    const response = recordsSchema.parse(await res.json());
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
      }))
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
