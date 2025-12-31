<template>
  <view class="demo-page" :class="[customClass]" :style="[customStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
defineOptions({ name: "demo-page" })

defineProps<{
  customClass?: string
  customStyle?: string | Record<string, any>
}>()
</script>

<style lang="scss">
.demo-page {
  padding: 24rpx;
  background: var(--ui-color-background-light);
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
