<template>
  <view class="demo-section" :class="[sectionClass, customClass]" :style="[customStyle]">
    <view v-if="title" class="demo-section__header">
      <text class="demo-section__title">{{ title }}</text>
      <text v-if="desc" class="demo-section__desc">{{ desc }}</text>
    </view>
    <view v-if="hasContent" class="demo-section__content">
      <slot />
    </view>
    <slot v-else />
  </view>
</template>

<script setup lang="ts">
defineOptions({ name: "demo-section" })

const props = withDefaults(
  defineProps<{
    /** Section title */
    title?: string
    /** Section description */
    desc?: string
    /** Card style with background, padding and border-radius */
    card?: boolean
    /** Custom class */
    customClass?: string
    /** Custom style */
    customStyle?: string | Record<string, any>
  }>(),
  {
    card: true,
  },
)

const slots = useSlots()
const hasContent = computed(() => props.card && slots.default)

const sectionClass = computed(() => {
  const list: string[] = []
  if (props.card) list.push("demo-section--card")
  return list
})
</script>

<style lang="scss">
.demo-section {
  margin-bottom: 24rpx;

  &--card {
    padding: 24rpx;
    background: var(--ui-color-background);
    border-radius: 16rpx;
  }

  &__header {
    margin-bottom: 24rpx;
  }

  &__title {
    color: var(--ui-color-text-main);
    display: block;
    font-size: 30rpx;
    font-weight: 600;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    display: block;
    font-size: 24rpx;
    margin-top: 8rpx;
  }

  // When not card mode, add padding to title
  &:not(.demo-section--card) &__header {
    padding: 0 8rpx;
  }
}
</style>
