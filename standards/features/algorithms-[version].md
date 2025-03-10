---
editLink: false
---

<script setup lang="ts">
import { useData  } from "vitepress";
import { data as features } from "../../features.data";

const { params } = useData();
</script>

# Algorithms

**Version**: <Badge type="warning" :text="params.version" />

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Tags</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="feature in features">
      <td><code><a :href="`/standards/features/${params.version}/${feature.id}/`">{{ feature.id }}</a></code></td>
      <td>{{ feature.meta.title }}</td>
      <td><Badge v-for="tag in feature.meta.tags ?? []" :text="tag" /></td>
    </tr>
  </tbody>
</table>
