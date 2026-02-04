<template>
  <view class="demo-section" :class="[sectionClass, customClass]" :style="[customStyle]">
    <view v-if="title || extra" class="demo-section__header">
      <view class="demo-section__header__main">
        <text class="demo-section__title">{{ title }}</text>
        <text v-if="extra" class="demo-section__extra">{{ extra }}</text>
      </view>
      <text v-if="desc" class="demo-section__desc">{{ desc }}</text>
    </view>
    <view v-if="hasContent" class="demo-section__content">
      <slot />
    </view>
    <slot v-else />
  </view>
</template>

<script lang="ts">
export default {
  name: "demo-section",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Section title */
    title?: string
    /** 标题右侧的额外文案，与 title 垂直居中显示 */
    extra?: string
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

    &__main {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 30rpx;
    font-weight: 600;
  }

  &__extra {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    display: block;
    font-size: 24rpx;
    margin-top: 8rpx;
  }

  &__content {
    gap: 24rpx;
    display: flex;
    flex-direction: column;
  }

  // When not card mode, add padding to title (same as card padding)
  &:not(.demo-section--card) &__header {
    padding: 0 24rpx;
  }
}
</style>
