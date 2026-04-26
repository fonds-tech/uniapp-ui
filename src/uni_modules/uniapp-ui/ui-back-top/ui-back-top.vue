<template>
  <ui-transition :show="visible" :name="props.transition" :custom-style="transitionStyle">
    <view class="ui-back-top" hover-class="ui-back-top--hover" :hover-stay-time="100" :class="[customClass]" :style="[rootStyle]" @click="onClick">
      <slot>
        <view class="ui-back-top__content">
          <ui-icon :name="props.icon" />
          <text v-if="props.text" class="ui-back-top__text">{{ props.text }}</text>
        </view>
      </slot>
    </view>
  </ui-transition>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { backTopEmits, backTopProps } from "./index"
import { useMitt, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from "vue"

defineOptions({ name: "ui-back-top" })

const props = defineProps(backTopProps)
const emits = defineEmits(backTopEmits)

const mitt = useMitt()

const innerScrollTop = ref(0)
// 当前页面路由（用于 mitt 事件 key），非响应式
let bindRoute = ""

const useExternalScrollTop = computed(() => isDef(props.scrollTop))
const currentScrollTop = computed(() => (useExternalScrollTop.value ? Number(props.scrollTop) : innerScrollTop.value))
const visible = computed(() => currentScrollTop.value >= useUnitToPx(props.offset))

// 过渡容器样式：透传给 ui-transition 内部根节点，承载 fixed 定位
const transitionStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    position: "fixed",
    right: useUnit(props.right),
    bottom: useUnit(props.bottom),
    zIndex: props.zIndex,
  }
  return useStyle(styles)
})

// 根节点样式：所有可配置项通过 CSS var 注入
const rootStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    "--ui-back-top-size": useUnit(props.size),
  }
  if (props.width !== undefined) styles["--ui-back-top-width"] = useUnit(props.width)
  if (props.height !== undefined) styles["--ui-back-top-height"] = useUnit(props.height)
  if (props.background) styles["--ui-back-top-background"] = useColor(props.background)
  if (props.borderRadius !== undefined) styles["--ui-back-top-radius"] = useUnit(props.borderRadius)
  if (props.iconColor) styles["--ui-back-top-icon-color"] = useColor(props.iconColor)
  if (props.iconSize) styles["--ui-back-top-icon-size"] = useUnit(props.iconSize)
  if (props.iconWeight) styles["--ui-back-top-icon-weight"] = String(props.iconWeight)
  if (props.textColor) styles["--ui-back-top-text-color"] = useColor(props.textColor)
  if (props.textSize) styles["--ui-back-top-text-size"] = useUnit(props.textSize)
  if (props.textWeight) styles["--ui-back-top-text-weight"] = String(props.textWeight)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

watch(useExternalScrollTop, (useExternal) => {
  if (useExternal) {
    clearAutoListener()
  } else {
    nextTick(initAutoListener)
  }
})

// 处理滚动事件
function handleScroll(options: { scrollTop: number }) {
  innerScrollTop.value = options.scrollTop
}

// 获取当前路由
function getCurrentRoute() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]?.route || ""
}

// 初始化页面滚动监听
function initAutoListener() {
  if (useExternalScrollTop.value || bindRoute) return

  bindRoute = getCurrentRoute()
  if (bindRoute) {
    mitt.on(`scroll:${bindRoute}`, handleScroll)
  }
}

// 清除滚动监听
function clearAutoListener() {
  if (bindRoute) {
    mitt.off(`scroll:${bindRoute}`, handleScroll)
    bindRoute = ""
  }
}

// 点击返回顶部
function onClick() {
  if (!useExternalScrollTop.value) {
    uni.pageScrollTo({ scrollTop: 0, duration: +props.duration })
  }
  emits("click")
}

onMounted(() => {
  nextTick(initAutoListener)
})

onUnmounted(() => {
  clearAutoListener()
})
</script>

<script lang="ts">
export default {
  name: "ui-back-top",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-back-top {
  --ui-back-top-size: 80rpx;
  --ui-back-top-width: var(--ui-back-top-size);
  --ui-back-top-height: var(--ui-back-top-size);
  --ui-back-top-radius: var(--ui-radius-round);
  --ui-back-top-icon-size: 40rpx;
  --ui-back-top-text-size: 20rpx;
  --ui-back-top-background: var(--ui-color-primary);
  --ui-back-top-icon-color: var(--ui-color-text-inverse);
  --ui-back-top-text-color: var(--ui-color-text-inverse);
  --ui-back-top-icon-weight: normal;
  --ui-back-top-text-weight: normal;

  display: flex;
  background: var(--ui-back-top-background);
  border-radius: var(--ui-back-top-radius);

  &--hover {
    opacity: var(--ui-opacity-active);
  }

  &__content {
    color: var(--ui-back-top-icon-color);
    width: var(--ui-back-top-width);
    height: var(--ui-back-top-height);
    display: flex;
    font-size: var(--ui-back-top-icon-size);
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    font-weight: var(--ui-back-top-icon-weight);
    border-radius: inherit;
    flex-direction: column;
    justify-content: center;
  }

  &__text {
    color: var(--ui-back-top-text-color);
    font-size: var(--ui-back-top-text-size);
    font-weight: var(--ui-back-top-text-weight);
    line-height: 1.2;
  }
}
</style>
