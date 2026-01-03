<template>
  <image
    v-if="isImage(name)"
    :class="[prefix, `${prefix}-${useProps.name}`, useProps.customClass, isHover ? useProps.hoverClass : '']"
    :style="[imageStyle]"
    :src="useProps.name"
    :mode="imageMode"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  />
  <text
    v-else
    :class="[prefix, `${prefix}-${useProps.name}`, useProps.customClass, isHover ? useProps.hoverClass : '']"
    :style="[iconStyle]"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { merge } from "../utils/utils"
import { isImage } from "../utils/check"
import { useUnit, useColor, useStyle } from "../hooks"
import { iconEmits, iconProps, useIconProps } from "./index"

defineOptions({ name: "ui-icon" })

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)
const useProps = useIconProps(props)
const isHover = ref(false)

const prefix = computed(() => {
  return useProps.customPrefix || "ui-icon"
})

const imageMode: any = computed(() => useProps.imageMode)

const iconStyle = computed(() => {
  let style: any = {}
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.size)
  style.fontWeight = useProps.weight
  style.lineHeight = useProps.lineHeight
  style.borderRadius = useUnit(useProps.radius)
  style.background = useColor(useProps.background)
  if (isHover.value) {
    style = merge(style, useStyle(useProps.hoverStyle))
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const imageStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(useProps.width || useProps.size)
  style.height = useUnit(useProps.height || useProps.size)
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.radius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

function onClick() {
  emits("click")
}

function onTouchStart() {
  isHover.value = true
}

function onTouchEnd() {
  isHover.value = false
}

defineExpose({ name: "ui-icon" })
</script>

<script lang="ts">
export default {
  name: "ui-icon",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
// CDN 字体（默认）
@font-face {
  src:
    url("//at.alicdn.com/t/c/font_5102197_mdw378h3bwg.woff2?t=1767430497879") format("woff2"),
    url("//at.alicdn.com/t/c/font_5102197_mdw378h3bwg.woff?t=1767430497879") format("woff"),
    url("//at.alicdn.com/t/c/font_5102197_mdw378h3bwg.ttf?t=1767430497879") format("truetype");
  font-family: "ui-icon";
}
/*  #ifdef  APP-PLUS  */
// APP 端使用本地字体
@font-face {
  src: url("./ui-icon.ttf") format("truetype");
  font-family: "ui-icon";
}
/*  #endif  */

// 图标基础样式
.ui-icon {
  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  font-style: normal;
  text-align: center;
  align-items: center;
  font-family: "ui-icon" !important;
  line-height: 1;
  font-variant: normal;
  text-rendering: auto;
  text-transform: none;
  vertical-align: middle;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 导入图标样式
@import "./icons.scss";
</style>
