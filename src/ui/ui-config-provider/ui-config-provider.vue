<template>
  <view class="ui-config-provider" :class="[customClass]" :style="[style]" :data-theme="currentTheme" @touchend="onTouchend" @touchmove="onTouchmove" @touchstart="onTouchstart">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useRgb, useMitt, useUnit, useColor, useStyle, useChildren } from "../hooks"
import { configProviderKey, configProviderEmits, configProviderProps } from "./index"

defineOptions({ name: "ui-config-provider" })

const props = defineProps(configProviderProps)
const emits = defineEmits(configProviderEmits)
const { linkChildren } = useChildren(configProviderKey)

const route = ref("")
const systemTheme = ref<"light" | "dark">("light")

const mitt = useMitt()

/** 当前生效的主题 */
const currentTheme = computed(() => {
  if (props.theme === "auto") {
    return systemTheme.value
  }
  return props.theme
})

const style = computed(() => {
  const style: CSSProperties = {}

  // 遍历用户传入的 themeVars，生成对应的 CSS 变量
  if (props.themeVars) {
    Object.entries(props.themeVars).forEach(([key, value]) => {
      if (value) {
        Object.assign(style, generateColorVars(key, value))
      }
    })
  }

  // 注入自定义 CSS 变量（用于任意扩展）
  applyCustomCssVars(style, props.cssVars)

  style.minHeight = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function init() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  route.value = page.route

  // 获取系统主题
  initSystemTheme()
}

/** 初始化系统主题并监听变化 */
function initSystemTheme() {
  // 获取当前系统主题
  try {
    const systemInfo = uni.getSystemInfoSync()
    systemTheme.value = systemInfo.theme === "dark" ? "dark" : "light"
  } catch {
    systemTheme.value = "light"
  }

  // 监听系统主题变化
  uni.onThemeChange?.((result) => {
    systemTheme.value = result.theme === "dark" ? "dark" : "light"
  })
}

/**
 * 生成单个颜色的 CSS 变量
 * @param name 变量名称（如 primary、text-primary）
 * @param color 颜色值
 */
function generateColorVars(name: string, color: string): Record<string, string> {
  // 将名称转换为 CSS 变量名格式，例如 text-primary -> --ui-color-text-primary
  const cssVarName = `--ui-color-${name}`
  const vars: Record<string, string> = {
    [cssVarName]: color,
  }

  // 仅在成功解析颜色时生成 RGB 变量
  const rgb = useRgb(color)
  if (rgb) {
    // RGB 变量也使用相同的命名规则
    vars[`${cssVarName}-rgb`] = `${rgb.r},${rgb.g},${rgb.b}`
  }

  return vars
}

/**
 * 规范化 CSS 变量名
 * @param key 变量名
 */
function normalizeCssVarKey(key: string): string {
  if (!key) return ""
  const trimmed = key.trim()
  if (!trimmed) return ""
  if (trimmed.startsWith("--")) return trimmed
  if (trimmed.startsWith("ui-")) return `--${trimmed}`
  return `--ui-${trimmed}`
}

/**
 * 注入自定义 CSS 变量
 * @param target 目标样式对象
 * @param vars 自定义变量
 */
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
  // 移除系统主题变化监听
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
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
}
</style>
