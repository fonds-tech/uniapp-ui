<template>
  <view class="ui-config-provider" :class="[customClass]" :style="[style]" :data-theme="currentTheme" @touchend="onTouchend" @touchmove="onTouchmove" @touchstart="onTouchstart">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useSystemInfo } from "../hooks/useSystemInfo"
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRgb, useMitt, useUnit, useColor, useStyle, useChildren } from "../hooks"
import { configProviderKey, configProviderEmits, configProviderProps } from "./index"

defineOptions({ name: "ui-config-provider" })

const props = defineProps(configProviderProps)
const emits = defineEmits(configProviderEmits)
const { linkChildren } = useChildren(configProviderKey)

const route = ref("")
const systemTheme = ref<"light" | "dark">("light")

const mitt = useMitt()

const currentTheme = computed(() => {
  if (props.theme === "auto") {
    return systemTheme.value
  }
  return props.theme
})

const style = computed(() => {
  const style: CSSProperties = {}

  if (props.themeVars) {
    Object.entries(props.themeVars).forEach(([key, value]) => {
      if (value) {
        Object.assign(style, generateColorVars(key, value))
      }
    })
  }

  applyCustomCssVars(style, props.cssVars)

  style.minHeight = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function init() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  route.value = page.route

  initSystemTheme()
}

function initSystemTheme() {
  try {
    const systemInfo = useSystemInfo()
    systemTheme.value = systemInfo.theme === "dark" ? "dark" : "light"
  } catch {
    systemTheme.value = "light"
  }

  uni.onThemeChange?.((result) => {
    systemTheme.value = result.theme === "dark" ? "dark" : "light"
  })
}

function generateColorVars(name: string, color: string): Record<string, string> {
  const cssVarName = `--ui-color-${name}`
  const vars: Record<string, string> = {
    [cssVarName]: color,
  }

  const rgb = useRgb(color)
  if (rgb) {
    vars[`${cssVarName}-rgb`] = `${rgb.r},${rgb.g},${rgb.b}`
  }

  return vars
}

function normalizeCssVarKey(key: string): string {
  if (!key) return ""
  const trimmed = key.trim()
  if (!trimmed) return ""
  if (trimmed.startsWith("--")) return trimmed
  if (trimmed.startsWith("ui-")) return `--${trimmed}`
  return `--ui-${trimmed}`
}

function applyCustomCssVars(target: CSSProperties, vars: Record<string, string | number>) {
  if (!vars) return
  const cssVarsTarget = target as Record<string, string>
  Object.entries(vars).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) return
    const cssVarKey = normalizeCssVarKey(key)
    if (!cssVarKey) return
    cssVarsTarget[cssVarKey] = String(value)
  })
}

function onTouchstart(e: any) {
  emits("touchstart", e)
  mitt.emit("touchstart", e)
}

function onTouchend(e: any) {
  emits("touchend", e)
  mitt.emit("touchend", e)
}

function onTouchmove(e: any) {
  emits("touchmove", e)
  mitt.emit("touchmove", e)
}

onMounted(init)
onUnmounted(() => {
  uni.offThemeChange?.(() => {})
})

linkChildren({ props, mitt })
defineExpose({ mitt, currentTheme })
</script>

<script lang="ts">
export default {
  name: "ui-config-provider",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style scoped lang="scss">
.ui-config-provider {
  color: var(--ui-color-text-primary);
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
}
</style>
