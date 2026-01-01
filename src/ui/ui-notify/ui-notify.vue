<template>
  <ui-transition
    :custom-class="classs"
    :custom-style="style"
    :show="visible"
    :z-index="useOptions.zIndex"
    name="slide-down"
    @before-enter="onOpen"
    @after-enter="onOpened"
    @before-leave="onClose"
    @after-leave="onClosed"
    @click="onClick"
    @touchmove.prevent.stop="noop"
  >
    <slot>
      <text class="ui-notify__content" :style="[contentStyle]">{{ useOptions.content }}</text>
    </slot>
  </ui-transition>
</template>

<script setup lang="ts">
import type { NotifyOptions } from "./index"
import { merge } from "../utils/utils"
import { notifyEmits, notifyProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-notify" })

const props = defineProps(notifyProps)
const emits = defineEmits(notifyEmits)

const visible = ref(false)
const useOptions = ref<NotifyOptions>({})
const propOptions = ref<NotifyOptions>({})
const baseOptions = ref<NotifyOptions>({
  type: "primary",
  content: "",
  color: "",
  zIndex: 2000,
  duration: 3000,
  fontSize: "",
  fontWeight: "",
  background: "",
  offsetTop: "",
  customClass: "",
  customStyle: "",
})

const classs = computed(() => {
  const list = ["ui-notify"]
  list.push(useOptions.value.customClass)
  list.push(`ui-notify--${useOptions.value.type}`)
  return list.join(" ")
})

const style = computed(() => {
  const style: any = {}
  style.position = "fixed"
  style.top = useUnit(useOptions.value.offsetTop)
  style.background = useColor(useOptions.value.background)
  return useStyle({ ...style, ...useStyle(useOptions.value.customStyle) })
})

const contentStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useOptions.value.color)
  style.fontSize = useUnit(useOptions.value.fontSize)
  style.fontWeight = useOptions.value.fontWeight
  return useStyle(style)
})

watch(
  () => props,
  (options) => {
    propOptions.value = merge(baseOptions.value, options)
  },
  { deep: true, immediate: true },
)

watch(
  () => props.show,
  (val) => {
    if (val) show()
    else close()
  },
  { immediate: true },
)

watch(visible, (val) => {
  emits("update:show", val)
})

function show(options: NotifyOptions = {}) {
  if (visible.value) return
  useOptions.value = merge(merge(baseOptions.value, propOptions.value), options)
  visible.value = true

  setTimeout(() => close(), +useOptions.value.duration || 3000)
}

function close() {
  visible.value = false
}

function onClick() {
  emits("click")
}

function onOpen() {
  emits("open")
}

function onOpened() {
  emits("opened")
}

function onClose() {
  emits("close")
}

function onClosed() {
  emits("closed")
}

function noop() {
  return false
}

defineExpose({ name: "ui-notify", show, close })
</script>

<script lang="ts">
export default {
  name: "ui-notify",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-notify {
  top: 0;
  left: 0;
  right: 0;
  padding: var(--ui-spacing-xl);

  &--primary {
    background-color: var(--ui-color-primary);
  }

  &__content {
    color: var(--ui-color-background);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
