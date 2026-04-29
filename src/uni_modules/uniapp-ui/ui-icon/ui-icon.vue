<template>
  <image
    v-if="isImage(name)"
    class="ui-icon"
    :class="[`${prefix}-${props.name}`, props.customClass, hoverClass]"
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
    class="ui-icon"
    :class="[`${prefix}-${props.name}`, props.customClass, hoverClass]"
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
import type { CSSProperties } from "vue"
import { isImage } from "../utils/check"
import { ref, computed } from "vue"
import { iconEmits, iconProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-icon" })

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)

const isHover = ref(false)

const prefix = computed(() => props.customPrefix || "ui-icon")
const imageMode = computed<any>(() => props.imageMode)
const hoverClass = computed(() => (props.hoverClass && isHover.value ? props.hoverClass : ""))

const iconStyle = computed(() => {
  const style: CSSProperties = {
    color: useColor(props.color),
    fontSize: useUnit(props.size),
    fontWeight: props.weight,
    lineHeight: props.lineHeight,
    borderRadius: useUnit(props.radius),
    background: useColor(props.background),
  }
  if (props.fontFamily) style.fontFamily = props.fontFamily
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const imageStyle = computed(() => {
  const style: CSSProperties = {
    width: useUnit(props.width || props.size),
    height: useUnit(props.height || props.size),
    background: useColor(props.background),
    borderRadius: useUnit(props.radius),
  }
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
    url("//at.alicdn.com/t/c/font_5123149_67xboiexucw.woff2?t=1770194339167") format("woff2"),
    url("//at.alicdn.com/t/c/font_5123149_67xboiexucw.woff?t=1770194339167") format("woff"),
    url("//at.alicdn.com/t/c/font_5123149_67xboiexucw.ttf?t=1770194339167") format("truetype");
  font-family: "ui-icon";
}
/*  #ifdef  APP-PLUS  */
// APP 端使用本地字体
@font-face {
  src: url("./iconfont.ttf") format("truetype");
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
  font-family: "ui-icon";
  line-height: 1;
  font-variant: normal;
  text-rendering: auto;
  text-transform: none;
  vertical-align: middle;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@import "./iconfont.scss";
</style>
