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

## Add a new dataset

Upload the dataset to the OpenAE community on Zenodo. An OpenAE curator reviews the submission before it shows up in the table above.

<VPButton text="Add dataset" href="https://zenodo.org/uploads/new?community=openae" target="_blank" />

## Link an existing Zenodo record

A dataset that is already published on Zenodo does not have to be uploaded again. Submit the record to the OpenAE community instead. It keeps its DOI and its files, and it stays in every community it already belongs to. Only the person who uploaded the record can do this.

1. Open the record page and click the cog wheel icon in the *Communities* box.
2. Click **Submit to community** in the dropdown menu.
3. Search for the OpenAE community and click **Select**.
4. Tick the confirmation checkbox about curator access, optionally write a message to the curators, then click **Submit to community**.

An OpenAE curator then accepts or declines the request. The Zenodo documentation shows each step in [Submit to community](https://help.zenodo.org/docs/share/submit-to-community/).
