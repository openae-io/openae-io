---
editLink: true
sidebar: true
aside: false
---

<script setup lang="ts">
import { data as datasets } from "../datasets.data";
</script>

# Datasets

OpenAE offers a platform to share high-quality acoustic emission datasets under the CC BY 4.0 license.
Each dataset includes comprehensive descriptions of the experimental setup and measurements, providing a valuable resource for researchers, engineers, and developers to test methods, compare results and advance data-driven acoustic emission analysis. 

Datasets are managed in the GitHub repository https://github.com/openae-io/datasets, with measurement data hosted externally due to its large volume. 
Contributions are welcomed through GitHub pull requests and users can request assistance by opening an [issue](https://github.com/openae-io/datasets/issues) or [discussion](https://github.com/orgs/openae-io/discussions).

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Author</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="dataset in datasets">
      <td><code><a :href="`/datasets/${dataset.id}/`">{{ dataset.id }}</a></code></td>
      <td>{{ dataset.meta.title }}</td>
      <td>{{ dataset.meta.author }}</td>
    </tr>
  </tbody>
</table>
