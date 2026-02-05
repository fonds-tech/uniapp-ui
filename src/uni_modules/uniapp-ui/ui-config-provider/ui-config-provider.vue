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

// 收集子组件
const { linkChildren } = useChildren(configProviderKey)

// 当前路由
const route = ref("")
// 系统主题
const systemTheme = ref<"light" | "dark">("light")
// 主题变化监听函数引用
const themeChangeHandler = ref<((result: { theme: "light" | "dark" }) => void) | null>(null)
// 事件总线
const mitt = useMitt()

// 当前主题
const currentTheme = computed(() => {
  if (props.theme === "auto") {
    return systemTheme.value
  }
  return props.theme
})
// 根节点样式
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

// 组件挂载时初始化
onMounted(init)
// 组件卸载时清理
onUnmounted(() => {
  if (themeChangeHandler.value) {
    uni.offThemeChange?.(themeChangeHandler.value)
    themeChangeHandler.value = null
  }
})

// 初始化
function init() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  route.value = page.route

  initSystemTheme()
}

// 初始化系统主题
function initSystemTheme() {
  try {
    const systemInfo = useSystemInfo()
    systemTheme.value = systemInfo.theme === "dark" ? "dark" : "light"
  } catch {
    systemTheme.value = "light"
  }

  const handler = (result: { theme: "light" | "dark" }) => {
    systemTheme.value = result.theme === "dark" ? "dark" : "light"
  }
  themeChangeHandler.value = handler
  uni.onThemeChange?.(handler)
}

// 生成颜色 CSS 变量
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

// 标准化 CSS 变量键名
function normalizeCssVarKey(key: string): string {
  if (!key) return ""
  const trimmed = key.trim()
  if (!trimmed) return ""
  if (trimmed.startsWith("--")) return trimmed
  if (trimmed.startsWith("ui-")) return `--${trimmed}`
  return `--ui-${trimmed}`
}

// 应用自定义 CSS 变量
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

// 触摸开始
function onTouchstart(e: any) {
  emits("touchstart", e)
  mitt.emit("touchstart", e)
}

// 触摸结束
function onTouchend(e: any) {
  emits("touchend", e)
  mitt.emit("touchend", e)
}

// 触摸移动
function onTouchmove(e: any) {
  emits("touchmove", e)
  mitt.emit("touchmove", e)
}

// 建立父子组件关联
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
  color: var(--ui-color-text);
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
}
</style>
