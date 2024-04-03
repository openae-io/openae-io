<script setup lang="ts">
import { useData } from "vitepress";
import { VPButton } from "vitepress/theme";
const { params } = useData();
</script>

<a href="../">Algorithms</a> | <a href="../">latest</a> | <a href="./">{{ params.id }}</a>

<!-- @content -->

## Code

::: code-group

```py-vue [code.py]
{{ params.code }}
```

:::

<!-- <VPButton text="Run in playground" href="https://openae-io.github.io/features-playground/" target="_blank" /> -->
