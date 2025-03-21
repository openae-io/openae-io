import { defineLoader } from "vitepress";
import { Dataset, fetchDatasets } from "./datasets";

declare const data: Dataset[];
export { data };

export default defineLoader({
  async load() {
    return fetchDatasets();
  },
});
