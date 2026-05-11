<template>
  <view class="ui-space" :class="[classNames, customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { SpaceSize } from "./index"
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useUnit, useStyle } from "../hooks"
import { spaceProps, SPACE_SIZE_MAP } from "./index"

defineOptions({ name: "ui-space" })

const props = defineProps(spaceProps)

const classNames = computed(() => {
  const list: string[] = [`ui-space--${props.direction}`]
  if (props.wrap) list.push("ui-space--wrap")
  if (props.fill) list.push("ui-space--fill")
  if (props.inline) list.push("ui-space--inline")
  if (props.align) list.push(`ui-space--align-${props.align}`)
  if (props.justify) list.push(`ui-space--justify-${props.justify}`)
  return list
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  const base = resolveSize(props.size)
  const rowGap = props.gapRow ? resolveSize(props.gapRow) : base
  const colGap = props.gapCol ? resolveSize(props.gapCol) : base
  if (props.direction === "vertical") {
    style.gap = rowGap
  } else {
    style.gap = props.wrap ? `${rowGap} ${colGap}` : colGap
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 预设档命中走 token 字符串，否则按 useUnit 处理 rpx
function resolveSize(size: SpaceSize): string {
  if (typeof size === "string" && size in SPACE_SIZE_MAP) {
    return SPACE_SIZE_MAP[size as keyof typeof SPACE_SIZE_MAP]
  }
  return useUnit(size) ?? ""
}
</script>

<script lang="ts">
export default {
  name: "ui-space",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-space {
  width: 100%;
  display: flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  // inline 模式不撑满父容器，让 flex item 宽度由内容决定
  &--inline {
    width: auto;
    display: inline-flex;
  }

  // 子元素均分；MP WXSS 不支持 *，列举常见直接子元素
  &--fill {
    > view,
    > text,
    > image,
    > button,
    > navigator,
    > scroll-view,
    > swiper,
    > swiper-item,
    > label,
    > picker,
    > input,
    > textarea {
      flex: 1;
    }
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-center {
    align-items: center;
  }

  &--align-baseline {
    align-items: baseline;
  }

  &--align-stretch {
    align-items: stretch;
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-space-between {
    justify-content: space-between;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--justify-space-evenly {
    justify-content: space-evenly;
  }
}
</style>
