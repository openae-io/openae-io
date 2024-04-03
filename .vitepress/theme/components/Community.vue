<template>
  <h3>Community</h3>

  <div class="member-container">
    <a
      v-for="member in community"
      :key="member.href"
      :href="member.href"
      :title="member.alt"
      target="_blank"
      class="member"
    >
      <img :src="imgUrl(member.img)" :alt="member.alt" />
    </a>
  </div>
</template>

<script setup lang="ts">
import community from "/community.json";

const imgUrl = (filename: string) => `/community/${filename}`;
</script>

<style scoped>
.member-container {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 12px;
}

.member {
  max-width: 300px;
  height: 128px;
  padding: 20px;
  margin: 0 3px;
  justify-content: center;
  align-content: center;

  background-color: #fff;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: border-color 0.25s;
}

.member:hover {
  border: 1px solid var(--vp-c-brand);
}

.member img {
  max-height: 100%;
  max-width: 100%;
}
</style>
