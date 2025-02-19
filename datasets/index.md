---
editLink: true
sidebar: true
aside: false
---

<script setup lang="ts">
import { data as datasets } from "../datasets.data";
</script>

# Datasets

OpenAE offers a platform to share high-quality Acoustic Emission datasets.
These datasets enable researchers, engineers, and developers to test new methods, compare results, and drive innovation in the field.

All datasets are managed in the GitHub repository https://github.com/openae-io/datasets.

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
