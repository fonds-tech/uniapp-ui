<template>
  <ui-popup
    v-model:show="visible"
    mode="bottom"
    :overlay="props.overlay"
    :z-index="props.zIndex"
    :background="props.background"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :safe-area-inset-bottom="props.safeAreaInsetBottom"
    @opened="emits('opened')"
    @closed="emits('closed')"
  >
    <ui-keyboard-panel
      ref="panelRef"
      :title="props.title"
      :mode="props.mode"
      :maxlength="props.maxlength"
      :random="props.random"
      :show-dot="props.showDot"
      :vibrate="props.vibrate"
      :model-value="props.modelValue"
      :auto-switch="props.autoSwitch"
      :show-header="props.showHeader"
      :show-cancel="props.showCancel"
      :cancel-text="props.cancelText"
      :show-confirm="props.showConfirm"
      :confirm-text="props.confirmText"
      :background="props.background"
      :custom-class="props.customClass"
      :custom-style="props.customStyle"
      @input="(v: string) => emits('input', v)"
      @change="(v: string) => emits('change', v)"
      @delete="emits('delete')"
      @cancel="onCancel"
      @confirm="onConfirm"
      @close="onPanelClose"
      @update:model-value="(v: string) => emits('update:modelValue', v)"
    >
      <template #header>
        <slot name="header" />
      </template>
      <template #title>
        <slot name="title" />
      </template>
      <template #cancel>
        <slot name="cancel" />
      </template>
      <template #confirm>
        <slot name="confirm" />
      </template>
    </ui-keyboard-panel>
  </ui-popup>
</template>

<script setup lang="ts">
import UiPopup from "../ui-popup/ui-popup.vue"
import UiKeyboardPanel from "../ui-keyboard-panel/ui-keyboard-panel.vue"
import { ref, watch } from "vue"
import { keyboardEmits, keyboardProps } from "./index"

defineOptions({ name: "ui-keyboard" })

const props = defineProps(keyboardProps)
const emits = defineEmits(keyboardEmits)
const visible = ref(false)
const panelRef = ref<InstanceType<typeof UiKeyboardPanel>>()

watch(
  () => props.show,
  (val) => {
    visible.value = val
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (val) => {
    emits("update:show", val)
    if (val) emits("open")
  },
)

function onCancel() {
  visible.value = false
  emits("cancel")
}

function onConfirm() {
  visible.value = false
  emits("confirm")
}

function onPanelClose() {
  visible.value = false
  emits("close")
}

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function clear() {
  panelRef.value?.clear()
}

defineExpose({
  name: "ui-keyboard",
  open,
  close,
  clear,
})
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
