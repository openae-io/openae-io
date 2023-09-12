---
layout: home

hero:
  name: "OpenAE"
  text: ""
  tagline: "Empower Acoustic Emission with Open Standards"
  actions:
    - theme: brand
      text: Goals
      link: /project/goals
    - theme: alt
      text: Contribute
      link: /project/contribute

features:
  - title: Standardized Features
    details: Feature extraction algorithms with reference implementations
    link: /features/
  - title: Reference Implementations
    details: Implementations of standardized algorithms in different programming languages
    link: /features/implementations
  - title: Models
    details: Trained Machine Learning models for AE applications
    link: /models/
---

<script setup>
import Community from '@theme/components/Community.vue'
import HomeContent from '@theme/components/HomeContent.vue'
</script>

<HomeContent>
  <Community />
</HomeContent>
