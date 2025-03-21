---
editLink: true
sidebar: false
aside: false
---

<script setup lang="ts">
import { VPButton } from "vitepress/theme";
import { data as datasets } from "../datasets.data";
</script>

<style lang="css" scoped>
th, td {
  vertical-align: top;
}
</style>

# Datasets

OpenAE provides high-quality acoustic emission datasets with detailed experimental descriptions. These datasets support researchers, engineers, and developers in testing methods, comparing results, and advancing data-driven analysis.

Datasets are hosted within the [OpenAE community of Zenodo](https://zenodo.org/communities/openae). Zenodo is an open-access repository that allows researchers to upload, share, and preserve a wide range of digital research outputs, including datasets, papers, and software. It is managed by CERN and provides a DOI (Digital Object Identifier) for each submission, ensuring long-term accessibility and citation.

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Authors</th>
      <th>License</th>
      <th>DOI</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="dataset in datasets">
      <td>
        <a :href="dataset.link" target="_blank">{{ dataset.title }}</a>
      </td>
      <td>
        <span v-for="author in dataset.authors">
          {{ author }}<br/>
        </span>
      </td>
      <td>
        {{ dataset.license.title }}
      </td>
      <td>
        <a :href="`https://doi.org/${dataset.doi}`" target="_blank">
          <code>{{ dataset.doi }}</code>
        </a>
      </td>
    </tr>
  </tbody>
</table>

<VPButton text="Add dataset" href="https://zenodo.org/uploads/new?community=openae" target="_blank" />
