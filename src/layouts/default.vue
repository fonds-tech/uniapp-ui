<template>
  <ui-config-provider :theme="theme">
    <slot />
  </ui-config-provider>
</template>

<script setup lang="ts">
import { useDocTheme } from "@/hooks/useDocTheme"

const { theme } = useDocTheme()
</script>
