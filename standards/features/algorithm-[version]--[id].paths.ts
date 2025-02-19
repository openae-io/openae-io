import { parseFeatures } from "../../features";
const features = parseFeatures();

export default {
  paths() {
    return features.map((feature) => ({
      params: {
        id: feature.id,
        version: "latest",
        code: feature.code,
      },
      content: feature.readme,
    }));
  },
};
