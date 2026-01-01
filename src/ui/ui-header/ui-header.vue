<template>
  <view class="ui-header">
    <view class="ui-header__content" :style="[style]">
      <ui-resize width="100%" @resize="resize">
        <slot />
      </ui-resize>
    </view>
    <view class="ui-header__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { configProviderKey } from "../ui-config-provider"
import { headerEmits, headerProps, useHeaderProps } from "./index"
import { useRect, useColor, useStyle, useParent, useUnitToPx } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-header" })

// 定义props和emits
const props = defineProps(headerProps)
const emits = defineEmits(headerEmits)
const useProps = useHeaderProps(props)
// 使用useParent hook获取父组件信息
const { parent } = useParent(configProviderKey)

// 初始化rect和instance
const rect = ref<UniApp.NodeInfo>({})
const uiNavbarHeight = ref(0)
const h5NavbarHeight = ref(0)

const instance = getCurrentInstance()

// 计算header样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = useProps.zIndex
  style.top = `calc(${uiNavbarHeight.value}px + ${h5NavbarHeight.value}px + ${useUnitToPx(useProps.offset)}px)`
  style.background = useColor(useProps.background)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 计算占位符样式
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  if (rect.value?.height) {
    style.height = `${rect.value.height}px`
  }
  return useStyle(style)
})

function init() {
  // #ifdef WEB
  const { windowTop } = uni.getSystemInfoSync()
  h5NavbarHeight.value = windowTop
  // #endif
}

// 重新计算尺寸的函数
async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-header__content", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
}

function onEvent() {
  parent?.mitt.on("navbar:rect", (rect: UniApp.NodeInfo) => {
    if (rect.height) {
      uiNavbarHeight.value = rect.height
    }
  })
}

onMounted(() => {
  init()
  resize()
})
onBeforeMount(onEvent)
</script>

<script lang="ts">
export default {
  name: "ui-header",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-header {
  width: 100%;
  z-index: 100;
  position: relative;

  &__content {
    left: 0;
    width: 100%;
    position: fixed;
  }
}
</style>
