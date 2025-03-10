import fs from "node:fs";
import path from "node:path";
import fm from "front-matter";
import { loadEnv } from "vitepress";
import { readFileIfExists } from "./utils";

export const pathFeatures = "./external/features/latest";

export interface Feature {
  id: string;
  meta: Record<string, any>;
  code: string | null;
}

export function getPlaygroundUrl(code: string) {
  const env = loadEnv("", process.cwd());
  const url = new URL(env.VITE_FEATURES_PLAYGROUND_URL);
  url.searchParams.set("code", btoa(code ?? ""));
  return url;
}

export const makeCodeSection = (code: string) => `
## Code

::: info
The following snippet is written in a generic and unoptimized manner.
The code aims to be comprehensible to programmers familiar with various programming languages and may not represent the most efficient or idiomatic Python practices.
Please refer to [implementations](/library/) for optimized implementations in different programming languages.
:::

::: code-group
\`\`\`py [code.py]
${code}
\`\`\`
:::

<VPButton text="Run in playground" href="${getPlaygroundUrl(code)}" />
`;

export function parseFeatures(): Feature[] {
  return fs.readdirSync(pathFeatures).flatMap((feature) => {
    const pathFeature = path.resolve(pathFeatures, feature);
    const pathReadme = path.resolve(pathFeature, "README.md");
    const pathCodePy = path.resolve(pathFeature, "code.py");

    let readme = readFileIfExists(pathReadme);
    if (!readme) return [];

    const code = readFileIfExists(pathCodePy);
    const parsed = fm(readme);

    return [
      {
        id: feature,
        meta: parsed.attributes as Record<string, any>,
        code: code,
      },
    ];
  });
}
