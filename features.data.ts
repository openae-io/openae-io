import { pathFeatures, parseFeatures } from "./features";

export default {
  watch: [`./${pathFeatures}/**/*`],
  load() {
    return {
      data: parseFeatures(),
    };
  },
};
