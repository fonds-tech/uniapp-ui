<template>
  <view class="ui-color-panel" :class="[rootClasses, customClass]" :style="rootStyle">
    <!-- 饱和度/亮度选择区 -->
    <view class="ui-color-panel__saturation" :style="saturationStyle" @touchstart="handleSaturationStart" @touchmove.stop.prevent="handleSaturationMove">
      <view class="ui-color-panel__saturation-white" />
      <view class="ui-color-panel__saturation-black" />
      <view class="ui-color-panel__cursor" :style="saturationCursorStyle" />
    </view>

    <!-- 滑块区域 -->
    <view class="ui-color-panel__sliders">
      <!-- 色相滑块 -->
      <view class="ui-color-panel__slider ui-color-panel__hue" @touchstart="handleHueStart" @touchmove.stop.prevent="handleHueMove">
        <view class="ui-color-panel__slider-cursor" :style="hueCursorStyle" />
      </view>

      <!-- 透明度滑块 -->
      <view v-if="showAlpha" class="ui-color-panel__slider ui-color-panel__alpha" @touchstart="handleAlphaStart" @touchmove.stop.prevent="handleAlphaMove">
        <view class="ui-color-panel__alpha-bg" :style="alphaBgStyle" />
        <view class="ui-color-panel__slider-cursor" :style="alphaCursorStyle" />
      </view>
    </view>

    <!-- 输入区域 -->
    <view v-if="showInput" class="ui-color-panel__inputs">
      <!-- HEX 输入 -->
      <view class="ui-color-panel__input-group ui-color-panel__input-hex">
        <input class="ui-color-panel__input" :value="inputValue" :maxlength="7" @input="handleHexInput" @blur="handleHexBlur" />
        <text class="ui-color-panel__input-label">HEX</text>
      </view>

      <!-- RGB 输入 -->
      <view class="ui-color-panel__input-group">
        <input class="ui-color-panel__input" type="number" :value="String(rgbValues.r)" @input="(e) => handleRgbInput('r', e)" />
        <text class="ui-color-panel__input-label">R</text>
      </view>
      <view class="ui-color-panel__input-group">
        <input class="ui-color-panel__input" type="number" :value="String(rgbValues.g)" @input="(e) => handleRgbInput('g', e)" />
        <text class="ui-color-panel__input-label">G</text>
      </view>
      <view class="ui-color-panel__input-group">
        <input class="ui-color-panel__input" type="number" :value="String(rgbValues.b)" @input="(e) => handleRgbInput('b', e)" />
        <text class="ui-color-panel__input-label">B</text>
      </view>
    </view>

    <!-- 预设色板 -->
    <view v-if="showPresets && presetColors.length > 0" class="ui-color-panel__presets" :style="presetsStyle">
      <view v-for="(color, index) in presetColors" :key="index" class="ui-color-panel__preset" :style="{ backgroundColor: color }" @click="handlePresetClick(color)" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { CSSProperties } from "vue"

import { useRect, useStyle } from "../hooks"

import { colorPanelEmits, colorPanelProps } from "./index"

import { ref, watch, computed, getCurrentInstance } from "vue"

const props = defineProps(colorPanelProps)
const emits = defineEmits(colorPanelEmits)

// === 状态 ===
const inputValue = ref(props.modelValue || "#6366F1")
const currentColor = ref(props.modelValue || "#6366F1")

// HSV 状态
const hue = ref(0)
const saturation = ref(100)
const brightness = ref(100)
const alpha = ref(100)

// RGB 值
const rgbValues = ref({ r: 99, g: 102, b: 241 })

// === 计算属性 ===
const rootClasses = computed(() => [`ui-color-panel--${props.size}`, { "ui-color-panel--disabled": props.disabled }, { "ui-color-panel--readonly": props.readonly }])

const rootStyle = computed(() => useStyle(props.customStyle))

const saturationStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = { backgroundColor: `hsl(${hue.value}, 100%, 50%)` }
  if (props.panelHeight) {
    style.height = typeof props.panelHeight === "number" ? `${props.panelHeight}rpx` : props.panelHeight
  }
  return style
})

const presetsStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
}))

const saturationCursorStyle = computed<CSSProperties>(() => ({
  left: `${saturation.value}%`,
  top: `${100 - brightness.value}%`,
}))

const hueCursorStyle = computed<CSSProperties>(() => ({
  left: `${(hue.value / 360) * 100}%`,
}))

const alphaBgStyle = computed<CSSProperties>(() => ({
  background: `linear-gradient(to right, transparent, ${currentColor.value})`,
}))

const alphaCursorStyle = computed<CSSProperties>(() => ({
  left: `${alpha.value}%`,
}))

// === 方法 ===
function isActiveColor(color: string): boolean {
  return color.toUpperCase() === currentColor.value.toUpperCase()
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const rgb = hexToRgb(hex)
  if (!rgb) return { h: 0, s: 0, v: 0 }

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, v: v * 100 }
}

function hsvToHex(h: number, s: number, v: number): string {
  s /= 100
  v /= 100

  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c

  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, n)).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function isValidHex(hex: string): boolean {
  return /^#[\da-f]{6}$/i.test(hex)
}

function updateColor(color: string) {
  currentColor.value = color.toUpperCase()
  inputValue.value = color.toUpperCase()
  const rgb = hexToRgb(color)
  if (rgb) rgbValues.value = rgb
  emits("update:modelValue", color.toUpperCase())
  emits("change", color.toUpperCase())
}

function updateColorFromHsv() {
  const hex = hsvToHex(hue.value, saturation.value, brightness.value)
  updateColor(hex)
}

function syncHsvFromColor(color: string) {
  const hsv = hexToHsv(color)
  hue.value = hsv.h
  saturation.value = hsv.s
  brightness.value = hsv.v
}

// === 事件处理 ===
function handleHexInput(e: any) {
  const value = e.detail?.value || e.target?.value || ""
  inputValue.value = value.toUpperCase()
}

function handleHexBlur() {
  let value = inputValue.value
  if (!value.startsWith("#")) value = `#${value}`
  if (isValidHex(value)) {
    syncHsvFromColor(value)
    updateColor(value)
  } else {
    inputValue.value = currentColor.value
  }
}

function handleRgbInput(channel: "r" | "g" | "b", e: any) {
  const value = Number.parseInt(e.detail?.value || e.target?.value || "0", 10)
  const clamped = Math.max(0, Math.min(255, value || 0))
  rgbValues.value[channel] = clamped
  const hex = rgbToHex(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
  syncHsvFromColor(hex)
  updateColor(hex)
}

function handlePresetClick(color: string) {
  if (props.disabled) return
  syncHsvFromColor(color)
  updateColor(color)
}

// 组件实例
const instance = getCurrentInstance()

// 元素位置缓存
const saturationRect = ref<UniApp.NodeInfo>({})
const hueRect = ref<UniApp.NodeInfo>({})
const alphaRect = ref<UniApp.NodeInfo>({})

// 获取元素位置
async function updateSaturationRect() {
  saturationRect.value = await useRect(".ui-color-panel__saturation", instance!)
}

async function updateHueRect() {
  hueRect.value = await useRect(".ui-color-panel__hue", instance!)
}

async function updateAlphaRect() {
  alphaRect.value = await useRect(".ui-color-panel__alpha", instance!)
}

async function handleSaturationStart(e: any) {
  await updateSaturationRect()
  handleSaturationMove(e)
}

function handleSaturationMove(e: any) {
  if (props.disabled) return
  const touch = e.touches[0]
  const rect = saturationRect.value
  if (!rect.width || !rect.height) return

  const x = ((touch.clientX - (rect.left || 0)) / rect.width) * 100
  const y = ((touch.clientY - (rect.top || 0)) / rect.height) * 100

  saturation.value = Math.max(0, Math.min(100, x))
  brightness.value = 100 - Math.max(0, Math.min(100, y))
  updateColorFromHsv()
}

async function handleHueStart(e: any) {
  await updateHueRect()
  handleHueMove(e)
}

function handleHueMove(e: any) {
  if (props.disabled) return
  const touch = e.touches[0]
  const rect = hueRect.value
  if (!rect.width) return

  const x = ((touch.clientX - (rect.left || 0)) / rect.width) * 360
  hue.value = Math.max(0, Math.min(360, x))
  updateColorFromHsv()
}

async function handleAlphaStart(e: any) {
  await updateAlphaRect()
  handleAlphaMove(e)
}

function handleAlphaMove(e: any) {
  if (props.disabled) return
  const touch = e.touches[0]
  const rect = alphaRect.value
  if (!rect.width) return

  const x = ((touch.clientX - (rect.left || 0)) / rect.width) * 100
  alpha.value = Math.max(0, Math.min(100, x))
}

// === 监听 ===
watch(
  () => props.modelValue,
  (val) => {
    if (val && isValidHex(val)) {
      currentColor.value = val.toUpperCase()
      inputValue.value = val.toUpperCase()
      syncHsvFromColor(val)
      const rgb = hexToRgb(val)
      if (rgb) rgbValues.value = rgb
    }
  },
  { immediate: true },
)
</script>

<script lang="ts">
export default {
  name: "ui-color-panel",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-color-panel {
  padding: 24rpx;
  border-radius: var(--ui-radius-lg);
  background-color: var(--ui-color-background);

  // 尺寸预设
  &--small {
    padding: 16rpx;
  }

  &--large {
    padding: 32rpx;
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &--readonly {
    pointer-events: none;
  }

  // ===== 饱和度/亮度选择区 =====
  &__saturation {
    width: 100%;
    cursor: pointer;
    height: 320rpx;
    overflow: hidden;
    position: relative;
    border-radius: var(--ui-radius-md);
  }

  &__saturation-white {
    inset: 0;
    position: absolute;
    background: linear-gradient(to right, #fff, transparent);
  }

  &__saturation-black {
    inset: 0;
    position: absolute;
    background: linear-gradient(to top, #000, transparent);
  }

  &__cursor {
    width: 20rpx;
    border: 3rpx solid #fff;
    height: 20rpx;
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow:
      0 0 0 2rpx rgba(0, 0, 0, 0.15),
      inset 0 0 2rpx rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    pointer-events: none;
  }

  // ===== 滑块区域 =====
  &__sliders {
    gap: 16rpx;
    display: flex;
    margin-top: 20rpx;
    flex-direction: column;
  }

  &__slider {
    width: 100%;
    cursor: pointer;
    height: 24rpx;
    position: relative;
    border-radius: 12rpx;
  }

  &__slider-cursor {
    top: 50%;
    width: 20rpx;
    border: 2rpx solid rgba(0, 0, 0, 0.1);
    height: 28rpx;
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.2);
    border-radius: 4rpx;
    pointer-events: none;
    background-color: #fff;
  }

  &__hue {
    background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  }

  &__alpha {
    overflow: hidden;
    background-size: 12rpx 12rpx;
    background-image: linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);
    background-position:
      0 0,
      6rpx 6rpx;
  }

  &__alpha-bg {
    inset: 0;
    position: absolute;
    border-radius: 12rpx;
  }

  // ===== 输入区域 =====
  &__inputs {
    gap: 12rpx;
    display: flex;
    margin-top: 20rpx;
  }

  &__input-group {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  &__input-hex {
    flex: 2;
  }

  &__input {
    border: var(--ui-border-width) solid var(--ui-color-border);
    height: 64rpx;
    font-size: 24rpx;
    text-align: center;
    border-radius: var(--ui-radius-sm);
    background-color: var(--ui-color-background-section);
  }

  &__input-label {
    color: var(--ui-color-text-tertiary);
    font-size: 20rpx;
    margin-top: 6rpx;
  }

  // ===== 预设色板 =====
  &__presets {
    gap: 8rpx;
    display: grid;
    margin-top: 20rpx;
  }

  &__preset {
    cursor: pointer;
    position: relative;
    box-shadow: inset 0 0 0 2rpx rgba(0, 0, 0, 0.06);
    transition: transform 0.15s ease;
    aspect-ratio: 1;
    border-radius: 8rpx;

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
