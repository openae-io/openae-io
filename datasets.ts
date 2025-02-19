import fs from "node:fs";
import fm from "front-matter";
import { readFileIfExists } from "./utils";

export const pathDatasets = "./external/datasets";

export interface Dataset {
  id: string;
  meta: Record<string, any>;
  readme: string;
}

export function parseDatasets(): Dataset[] {
  return fs.readdirSync(pathDatasets).flatMap((dataset) => {
    const pathDataset = `${pathDatasets}/${dataset}`;
    const pathReadme = `${pathDataset}/README.md`;

    let readme = readFileIfExists(pathReadme);
    if (!readme) return [];
    const parsed = fm(readme);

    return [
      {
        id: dataset,
        meta: parsed.attributes as Record<string, any>,
        readme: parsed.body,
      },
    ];
  });
}
