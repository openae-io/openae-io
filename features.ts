import fs from "node:fs";
import fm from "front-matter";
import { loadEnv } from "vitepress";

export const pathFeatures = "./external/features/latest";

export interface Feature {
  id: string;
  meta: Record<string, any>;
  readme: string;
  code: string | null;
}

function readFileIfExists(path: string): string | null {
  return fs.existsSync(path) ? fs.readFileSync(path, "utf8") : null;
}

function getPlaygroundUrl(code: string) {
  const env = loadEnv("", process.cwd());
  const url = new URL(env.VITE_FEATURES_PLAYGROUND_URL);
  url.searchParams.set("code", btoa(code ?? ""));
  return url;
}

const makeCodeSection = (code: string) => `
## Code

::: code-group

\`\`\`py [code.py]
${code}
\`\`\`

:::

<VPButton text="Run in playground" href="${getPlaygroundUrl(code)}" />
`;

export const parseFeatures = (): Feature[] =>
  fs.readdirSync(pathFeatures).flatMap((feature) => {
    const pathFeature = `${pathFeatures}/${feature}`;
    const pathReadme = `${pathFeature}/README.md`;
    const pathCodePy = `${pathFeature}/code.py`;

    let readme = readFileIfExists(pathReadme);
    if (!readme) return [];

    const code = readFileIfExists(pathCodePy);
    if (code) {
      readme += makeCodeSection(code);
    }

    const parsed = fm(readme);

    return [
      {
        id: feature,
        meta: parsed.attributes as Record<string, any>,
        readme: parsed.body,
        code: code,
      },
    ];
  });
