<template>
  <ui-config-provider height="100%" :css-vars="cssVars">
    <root-view />
  </ui-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue"

const cssVars = ref({
  "--ui-main-color": "#212121",
  "--ui-secondary-color": "#6A6A6A",
})

onShow(() => {})
</script>
