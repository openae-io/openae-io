import { defineLoader } from "vitepress";
import { pathDatasets, parseDatasets, Dataset } from "./datasets";

declare const data: Dataset[];
export { data };

export default defineLoader({
  watch: [`./${pathDatasets}/**/*`],
  load() {
    return parseDatasets();
  },
});
