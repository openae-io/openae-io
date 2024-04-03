import { defineLoader } from "vitepress";
import { pathFeatures, parseFeatures, Feature } from "./features";

declare const data: Feature[];
export { data };

export default defineLoader({
  watch: [`./${pathFeatures}/**/*`],
  load() {
    return parseFeatures();
  },
});
