<template>
  <ui-popup
    :show="visible"
    :mode="props.mode"
    :border-radius="props.borderRadius"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :overlay="props.overlay"
    :duration="props.duration"
    :z-index="props.zIndex"
    :background="props.background"
    :safe-area-inset-bottom="props.safeAreaInsetBottom"
    :lazy-render="props.lazyRender"
    :height="props.height"
    :max-height="props.maxHeight"
    @update:show="handleUpdateShow"
  >
    <ui-cascader-panel
      ref="panelRef"
      :model-value="props.modelValue"
      :title="props.title"
      :options="props.options"
      :placeholder="props.placeholder"
      :color="props.color"
      :active-color="props.activeColor"
      :swipeable="props.swipeable"
      :closeable="props.closeable"
      :show-header="props.showHeader"
      :title-size="props.titleSize"
      :title-color="props.titleColor"
      :title-weight="props.titleWeight"
      :close-icon="props.closeIcon"
      :close-icon-size="props.closeIconSize"
      :close-icon-color="props.closeIconColor"
      :close-icon-weight="props.closeIconWeight"
      :before-change="props.beforeChange"
      :field-keys="props.fieldKeys"
      :custom-class="props.customClass"
      :custom-style="props.customStyle"
      @change="emits('change', $event)"
      @finish="onFinish"
      @click-tab="emits('clickTab', $event)"
      @update:model-value="(v: string | number) => emits('update:modelValue', v)"
      @close="onPanelClose"
    >
      <template #title>
        <slot name="title" />
      </template>
      <template #close>
        <slot name="close" />
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
    </ui-cascader-panel>
  </ui-popup>
</template>

<script setup lang="ts">
import type { CascaderPanelChangeData } from "../ui-cascader-panel"
import UiPopup from "../ui-popup/ui-popup.vue"
import UiCascaderPanel from "../ui-cascader-panel/ui-cascader-panel.vue"
import { ref, watch } from "vue"
import { cascaderEmits, cascaderProps } from "./index"

defineOptions({ name: "ui-cascader" })

const props = defineProps(cascaderProps)
const emits = defineEmits(cascaderEmits)

const visible = ref(false)
const panelRef = ref<InstanceType<typeof UiCascaderPanel>>()

watch(
  () => props.show,
  (value) => {
    visible.value = value
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (value) => {
    emits("update:show", value)
    if (!value) emits("close")
  },
)

function handleUpdateShow(value: boolean) {
  visible.value = value
}

function onPanelClose() {
  visible.value = false
}

function onFinish(data: CascaderPanelChangeData) {
  emits("finish", data)
  visible.value = false
}

function reset() {
  panelRef.value?.reset()
}

function updateTabs() {
  panelRef.value?.updateTabs()
}

defineExpose({
  reset,
  updateTabs,
})
</script>

<script lang="ts">
export default {
  name: "ui-cascader",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
