<script setup lang="ts">
import { useData } from "vitepress";
import { VPButton } from "vitepress/theme";
const { params } = useData();

const playgroundUrl = new URL(import.meta.env.VITE_FEATURES_PLAYGROUND_URL);
playgroundUrl.searchParams.set("code", btoa(params.value.code ?? ""));
</script>

<a href="../">Algorithms</a> | <a href="../">latest</a> | <a href="./">{{ params.id }}</a>

<!-- @content -->
