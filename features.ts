import fs from "fs";
import fm from "front-matter";

export const pathFeatures = "./external/features/latest";

export interface Feature {
  id: string;
  meta: Record<string, any>;
  readme: string;
  code: string | null;
}

export const parseFeatures = (): Feature[] =>
  fs.readdirSync(pathFeatures).flatMap((feature) => {
    const pathFeature = `${pathFeatures}/${feature}`;
    const pathReadme = `${pathFeature}/README.md`;
    const pathCodePy = `${pathFeature}/code.py`;

    if (!fs.existsSync(pathReadme)) {
      return [];
    }

    const readmeRaw = fs.readFileSync(pathReadme, "utf8");
    const readmeParsed = fm(readmeRaw);

    return [
      {
        id: feature,
        meta: readmeParsed.attributes,
        readme: readmeParsed.body,
        code: fs.existsSync(pathCodePy) ? fs.readFileSync(pathCodePy) : null,
      },
    ];
  });
