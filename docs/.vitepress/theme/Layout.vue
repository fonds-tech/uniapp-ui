<template>
  <Layout>
    <template #home-hero-actions-after>
      <HeroInstall />
    </template>
  </Layout>
  <PhonePreview />
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme"
import HeroInstall from "../components/HeroInstall.vue"
import PhonePreview from "../components/PhonePreview.vue"

const { Layout } = DefaultTheme
</script>
