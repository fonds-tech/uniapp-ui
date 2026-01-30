<template>
  <image
    v-if="isImage(name)"
    :class="[prefix, `${prefix}-${props.name}`, props.customClass, hoverClass]"
    :style="[imageStyle]"
    :src="props.name"
    :mode="imageMode"
    @click="onClick"
    @touchstart="onHoverStart"
    @touchend="onHoverEnd"
    @touchcancel="onHoverEnd"
    @mousedown="onHoverStart"
    @mouseup="onHoverEnd"
    @mouseleave="onHoverEnd"
  />
  <text
    v-else
    :class="[prefix, `${prefix}-${props.name}`, props.customClass, hoverClass]"
    :style="[iconStyle]"
    @click="onClick"
    @touchstart="onHoverStart"
    @touchend="onHoverEnd"
    @touchcancel="onHoverEnd"
    @mousedown="onHoverStart"
    @mouseup="onHoverEnd"
    @mouseleave="onHoverEnd"
  />
</template>

<script setup lang="ts">
import { isImage } from "../utils/check"
import { ref, computed } from "vue"
import { iconEmits, iconProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-icon" })

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)
const isHover = ref(false)

const prefix = computed(() => {
  return props.customPrefix || "ui-icon"
})

const hoverClass = computed(() => {
  return props.hoverClass && isHover.value ? props.hoverClass : ""
})

const imageMode: any = computed(() => props.imageMode)

const iconStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.size)
  style.fontWeight = props.weight
  style.lineHeight = props.lineHeight
  style.borderRadius = useUnit(props.radius)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const imageStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width || props.size)
  style.height = useUnit(props.height || props.size)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function onClick() {
  emits("click")
}

function onHoverStart() {
  if (!props.hoverClass) return
  isHover.value = true
}

function onHoverEnd() {
  if (!props.hoverClass) return
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
    url("//at.alicdn.com/t/c/font_5102197_4kmrr4c1n2i.woff2?t=1769000769287") format("woff2"),
    url("//at.alicdn.com/t/c/font_5102197_4kmrr4c1n2i.woff?t=1769000769287") format("woff"),
    url("//at.alicdn.com/t/c/font_5102197_4kmrr4c1n2i.ttf?t=1769000769287") format("truetype");
  font-family: "ui-icon";
}
/*  #ifdef  APP-PLUS  */
// APP 端使用本地字体
@font-face {
  src: url("./ui-icon.ttf") format("truetype");
  font-family: "ui-icon";
}
/*  #endif  */

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

@import "./icons.scss";
</style>
