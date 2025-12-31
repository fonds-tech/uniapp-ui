<template>
  <view class="demo-block" :class="[blockClass, customClass]" :style="[blockStyle, customStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
defineOptions({ name: "demo-block" })

const props = withDefaults(
  defineProps<{
    /** Flex direction: row (horizontal) or column (vertical) */
    direction?: "row" | "column"
    /** Gap between items (rpx) */
    gap?: number | string
    /** Align items */
    align?: "start" | "center" | "end" | "stretch"
    /** Justify content */
    justify?: "start" | "center" | "end" | "between" | "around"
    /** Custom class */
    customClass?: string
    /** Custom style */
    customStyle?: string | Record<string, any>
  }>(),
  {
    direction: "row",
    gap: 16,
    align: "center",
  },
)

const blockClass = computed(() => {
  const list: string[] = []
  list.push(`demo-block--${props.direction}`)
  if (props.align) list.push(`demo-block--align-${props.align}`)
  if (props.justify) list.push(`demo-block--justify-${props.justify}`)
  return list
})

const blockStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.gap) {
    const gap = typeof props.gap === "number" ? `${props.gap}rpx` : props.gap
    style.gap = gap
  }
  return style
})
</script>

<style lang="scss">
.demo-block {
  display: flex;

  &--row {
    flex-wrap: wrap;
    flex-direction: row;
  }

  &--column {
    flex-direction: column;
  }

  // Align
  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-stretch {
    align-items: stretch;
  }

  // Justify
  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-between {
    justify-content: space-between;
  }

  &--justify-around {
    justify-content: space-around;
  }
}
</style>
