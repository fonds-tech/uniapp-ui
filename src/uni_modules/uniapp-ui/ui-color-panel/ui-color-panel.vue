<template>
  <view class="ui-color-panel" :class="[classNames, props.customClass]" :style="[rootStyle]">
    <view
      class="ui-color-panel__saturation"
      role="slider"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuenow="Math.round(saturation)"
      :style="[saturationStyle]"
      @touchstart="onSaturationStart"
      @touchmove.stop.prevent="onSaturationMove"
    >
      <view class="ui-color-panel__saturation-white" />
      <view class="ui-color-panel__saturation-black" />
      <view class="ui-color-panel__cursor" :style="[saturationCursorStyle]" />
    </view>

    <view class="ui-color-panel__sliders">
      <view
        class="ui-color-panel__slider ui-color-panel__hue"
        role="slider"
        :aria-valuemin="0"
        :aria-valuemax="360"
        :aria-valuenow="Math.round(hue)"
        @touchstart="onHueStart"
        @touchmove.stop.prevent="onHueMove"
      >
        <view class="ui-color-panel__slider-cursor" :style="[hueCursorStyle]" />
      </view>
    </view>

    <view v-if="props.showInput || props.showPreview" class="ui-color-panel__inputs">
      <view v-if="props.showPreview" class="ui-color-panel__preview" :style="{ backgroundColor: currentColor }" />
      <template v-if="props.showInput">
        <view class="ui-color-panel__input-group ui-color-panel__input-hex">
          <input class="ui-color-panel__input" :value="inputValue" :maxlength="7" @input="onHexInput" @blur="onHexBlur" />
          <text class="ui-color-panel__input-label">HEX</text>
        </view>
        <view class="ui-color-panel__input-group">
          <input class="ui-color-panel__input" type="digit" :value="String(rgbValues.r)" @input="(e) => onRgbInput('r', e)" />
          <text class="ui-color-panel__input-label">R</text>
        </view>
        <view class="ui-color-panel__input-group">
          <input class="ui-color-panel__input" type="digit" :value="String(rgbValues.g)" @input="(e) => onRgbInput('g', e)" />
          <text class="ui-color-panel__input-label">G</text>
        </view>
        <view class="ui-color-panel__input-group">
          <input class="ui-color-panel__input" type="digit" :value="String(rgbValues.b)" @input="(e) => onRgbInput('b', e)" />
          <text class="ui-color-panel__input-label">B</text>
        </view>
      </template>
    </view>

    <view v-if="props.showPresets && props.presetColors.length > 0" class="ui-color-panel__presets" :style="[presetsStyle]">
      <view
        v-for="(color, index) in props.presetColors"
        :key="index"
        class="ui-color-panel__preset"
        role="button"
        :aria-label="color"
        :class="{ 'ui-color-panel__preset--active': isActivePreset(color) }"
        :style="{ backgroundColor: color }"
        @click="onPresetClick(color)"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { CSSProperties } from "vue"
import { useRect, useUnit, useStyle } from "../hooks"
import { colorPanelEmits, colorPanelProps } from "./index"
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-color-panel" })

const props = defineProps(colorPanelProps)
const emits = defineEmits(colorPanelEmits)

const instance = getCurrentInstance()!

// 默认色（modelValue 未传时的兜底）
const FALLBACK_COLOR = "#6366F1"

// 状态：HSV / RGB / 输入显示值 / 当前色
const hue = ref(0)
const saturation = ref(100)
const brightness = ref(100)
const rgbValues = ref({ r: 0, g: 0, b: 0 })
// inputValue 与 currentColor 大部分时间同值，仅 HEX 输入框输入中途两者会暂时不一致（按键时 inputValue 实时更新，blur 时校验后才同步给 currentColor）
const initialColor = expandHex(props.modelValue || FALLBACK_COLOR).toUpperCase()
const inputValue = ref(initialColor)
const currentColor = ref(initialColor)
// 初始化 HSV / RGB 与 currentColor 同步（watch 因去重判断会跳过首次，故此处显式 sync）
{
  const hsv = hexToHsv(initialColor)
  hue.value = hsv.h
  saturation.value = hsv.s
  brightness.value = hsv.v
  const rgb = hexToRgb(initialColor)
  if (rgb) rgbValues.value = rgb
}

// 元素位置缓存（拖动时按需测量）
const saturationRect = ref<UniApp.NodeInfo>({})
const hueRect = ref<UniApp.NodeInfo>({})

// 单行 computed
const presetsStyle = computed<CSSProperties>(() => ({ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }))
const hueCursorStyle = computed<CSSProperties>(() => ({ left: `${(hue.value / 360) * 100}%` }))
const saturationCursorStyle = computed<CSSProperties>(() => ({ left: `${saturation.value}%`, top: `${100 - brightness.value}%` }))

// 多行 computed
const classNames = computed(() => ({
  "ui-color-panel--disabled": props.disabled,
  "ui-color-panel--readonly": props.readonly,
}))
const rootStyle = computed<CSSProperties>(() => {
  const s: Record<string, string | number | undefined> = {}
  if (props.panelHeight !== undefined) s["--ui-color-panel-saturation-height"] = useUnit(props.panelHeight)
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) }) as CSSProperties
})
const saturationStyle = computed<CSSProperties>(() => ({ backgroundColor: `hsl(${hue.value}, 100%, 50%)` }))

// 监听外部 modelValue 同步（去重避免自身 emit 回环：HSV→HEX→HSV 精度损失会导致拖动时其他滑块漂移）
// 初始化由上方代码块处理，watch 不开 immediate
watch(
  () => props.modelValue,
  (val) => {
    if (!val || !isValidHex(val)) return
    const normalized = expandHex(val).toUpperCase()
    if (normalized === currentColor.value.toUpperCase()) return
    currentColor.value = normalized
    inputValue.value = normalized
    syncHsvFromColor(normalized)
    const rgb = hexToRgb(normalized)
    if (rgb) rgbValues.value = rgb
  },
)

// 预热 rect 测量，避免首次拖动延迟一帧
onMounted(() => {
  setTimeout(() => {
    useRect(".ui-color-panel__saturation", instance).then((r) => (saturationRect.value = r))
    useRect(".ui-color-panel__hue", instance).then((r) => (hueRect.value = r))
  }, 50)
})

// 当前预设是否激活
function isActivePreset(color: string): boolean {
  return color.toUpperCase() === currentColor.value.toUpperCase()
}

// HEX 校验：3 位或 6 位（含/不含 #）
function isValidHex(hex: string): boolean {
  return /^#?(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex)
}

// 3 位简写展开为 6 位（#fff → #ffffff）
function expandHex(hex: string): string {
  const v = hex.startsWith("#") ? hex : `#${hex}`
  if (/^#[\da-f]{3}$/i.test(v)) {
    return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`
  }
  return v
}

// HEX → HSV
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

// HSV → HEX
function hsvToHex(h: number, s: number, v: number): string {
  s /= 100
  v /= 100
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0
  let g = 0
  let b = 0
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

// HEX → RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const v = expandHex(hex)
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(v)
  return m ? { r: Number.parseInt(m[1], 16), g: Number.parseInt(m[2], 16), b: Number.parseInt(m[3], 16) } : null
}

// RGB → HEX
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, n)).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

// 更新颜色（统一出口）
function updateColor(color: string) {
  const upper = color.toUpperCase()
  currentColor.value = upper
  inputValue.value = upper
  const rgb = hexToRgb(upper)
  if (rgb) rgbValues.value = rgb
  emits("update:modelValue", upper)
  emits("change", upper)
}

// 由当前 HSV 推 HEX 并 emit
function updateColorFromHsv() {
  updateColor(hsvToHex(hue.value, saturation.value, brightness.value))
}

// 由 HEX 同步 HSV
function syncHsvFromColor(color: string) {
  const hsv = hexToHsv(color)
  hue.value = hsv.h
  saturation.value = hsv.s
  brightness.value = hsv.v
}

// HEX 输入：仅同步显示，blur 时校验提交
function onHexInput(e: any) {
  inputValue.value = (e.detail?.value || e.target?.value || "").toUpperCase()
}
function onHexBlur() {
  let value = inputValue.value
  if (!value.startsWith("#")) value = `#${value}`
  if (isValidHex(value)) {
    const expanded = expandHex(value)
    syncHsvFromColor(expanded)
    updateColor(expanded)
  } else {
    inputValue.value = currentColor.value
  }
}

// RGB 输入：clamp + 实时同步
function onRgbInput(channel: "r" | "g" | "b", e: any) {
  const value = Number.parseInt(e.detail?.value || e.target?.value || "0", 10)
  rgbValues.value[channel] = Math.max(0, Math.min(255, value || 0))
  const hex = rgbToHex(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
  syncHsvFromColor(hex)
  updateColor(hex)
}

// 预设色点击
function onPresetClick(color: string) {
  if (props.disabled || props.readonly) return
  const expanded = expandHex(color)
  syncHsvFromColor(expanded)
  updateColor(expanded)
}

// 饱和度/亮度区拖动
async function onSaturationStart(e: any) {
  saturationRect.value = await useRect(".ui-color-panel__saturation", instance)
  onSaturationMove(e)
}
function onSaturationMove(e: any) {
  if (props.disabled || props.readonly) return
  const touch = e.touches?.[0]
  if (!touch) return
  const rect = saturationRect.value
  if (!rect.width || !rect.height) return
  const x = ((touch.clientX - (rect.left || 0)) / rect.width) * 100
  const y = ((touch.clientY - (rect.top || 0)) / rect.height) * 100
  saturation.value = Math.max(0, Math.min(100, x))
  brightness.value = 100 - Math.max(0, Math.min(100, y))
  updateColorFromHsv()
}

// 色相滑块拖动
async function onHueStart(e: any) {
  hueRect.value = await useRect(".ui-color-panel__hue", instance)
  onHueMove(e)
}
function onHueMove(e: any) {
  if (props.disabled || props.readonly) return
  const touch = e.touches?.[0]
  if (!touch) return
  const rect = hueRect.value
  if (!rect.width) return
  const x = ((touch.clientX - (rect.left || 0)) / rect.width) * 360
  hue.value = Math.max(0, Math.min(360, x))
  updateColorFromHsv()
}
</script>

<script lang="ts">
export default {
  name: "ui-color-panel",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-color-panel {
  --ui-color-panel-input-gap: 12rpx;
  --ui-color-panel-hue-height: 24rpx;
  --ui-color-panel-cursor-size: 20rpx;
  --ui-color-panel-section-gap: 20rpx;
  --ui-color-panel-input-height: 64rpx;
  --ui-color-panel-preview-size: 64rpx;
  --ui-color-panel-saturation-height: 320rpx;

  padding: var(--ui-spacing-md);
  border-radius: var(--ui-radius-lg);
  background-color: var(--ui-color-background);

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &__saturation {
    width: 100%;
    cursor: pointer;
    height: var(--ui-color-panel-saturation-height);
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
    width: var(--ui-color-panel-cursor-size);
    border: 3rpx solid #fff;
    height: var(--ui-color-panel-cursor-size);
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow:
      0 0 0 2rpx rgba(0, 0, 0, 0.15),
      inset 0 0 2rpx rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    pointer-events: none;
  }

  &__sliders {
    gap: var(--ui-spacing-sm);
    display: flex;
    margin-top: var(--ui-color-panel-section-gap);
    flex-direction: column;
  }

  &__slider {
    width: 100%;
    cursor: pointer;
    height: var(--ui-color-panel-hue-height);
    position: relative;
    border-radius: calc(var(--ui-color-panel-hue-height) / 2);
  }

  &__slider-cursor {
    top: 50%;
    width: var(--ui-color-panel-cursor-size);
    border: var(--ui-border-width) solid rgba(0, 0, 0, 0.1);
    height: calc(var(--ui-color-panel-hue-height) + 4rpx);
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.2);
    border-radius: var(--ui-radius-xs);
    pointer-events: none;
    background-color: #fff;
  }

  &__hue {
    background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  }

  &__inputs {
    gap: var(--ui-color-panel-input-gap);
    display: flex;
    margin-top: var(--ui-color-panel-section-gap);
    align-items: flex-start;
  }

  // 当前色预览块（与 HEX 输入并列显示）
  &__preview {
    width: var(--ui-color-panel-preview-size);
    border: var(--ui-border-width) solid var(--ui-color-border);
    height: var(--ui-color-panel-preview-size);
    flex-shrink: 0;
    border-radius: var(--ui-radius-sm);
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
    height: var(--ui-color-panel-input-height);
    font-size: var(--ui-font-size-xs);
    text-align: center;
    border-radius: var(--ui-radius-sm);
    background-color: var(--ui-color-background-section);
  }

  &__input-label {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
    margin-top: 6rpx;
  }

  &__presets {
    gap: var(--ui-spacing-xs);
    display: grid;
    margin-top: var(--ui-color-panel-section-gap);
  }

  &__preset {
    cursor: pointer;
    position: relative;
    box-shadow: inset 0 0 0 2rpx rgba(0, 0, 0, 0.06);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
    // aspect-ratio 在部分小程序老版本不稳定，用 padding-bottom hack 撑出 1:1
    width: 100%;
    height: 0;
    border-radius: var(--ui-radius-sm);
    padding-bottom: 100%;

    &:active {
      transform: scale(0.9);
    }

    // 选中态：主色描边环
    &--active {
      box-shadow:
        0 0 0 4rpx var(--ui-color-primary),
        inset 0 0 0 2rpx #fff;
    }
  }
}
</style>
