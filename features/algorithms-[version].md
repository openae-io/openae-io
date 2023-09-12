---
editLink: false
---

<script setup lang="ts">
import { data as featureData } from "../features.data";
const features = featureData.data;
</script>

# Algorithms

**Version**: <Badge type="warning" text="latest" />

<table>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Input Domain</th>
    <th>Tags</th>
  </tr>
  <tr v-for="feature in features">
    <td><code><a :href="`/features/latest/${feature.id}/`">{{ feature.id }}</a></code></td>
    <td>{{ feature.meta.title }}</td>
    <td>
      <Badge :text="feature.meta.inputdomain ?? 'unknown'" />
    </td>
    <td>
      <Badge v-for="tag in feature.meta.tags ?? []" :text="tag" />
    </td>
  </tr>
</table>
