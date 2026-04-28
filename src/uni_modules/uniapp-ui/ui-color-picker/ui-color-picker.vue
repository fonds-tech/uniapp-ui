<template>
  <view class="ui-color-picker" :class="[props.customClass]" :style="[props.customStyle]">
    <ui-popup
      :show="props.show"
      :mode="props.mode"
      :border-radius="props.borderRadius"
      :safe-area-inset-bottom="props.safeAreaInsetBottom"
      :close-on-click-overlay="props.closeOnClickOverlay"
      :overlay="props.overlay"
      :z-index="props.zIndex"
      :duration="props.duration"
      @update:show="(v: boolean) => emits('update:show', v)"
      @close="onClose"
    >
      <template #header>
        <slot name="header">
          <view v-if="props.showHeader" class="ui-color-picker__header">
            <view class="ui-color-picker__header__cancel" @click="onCancel">
              <slot name="cancel">
                <ui-button text color="text-secondary">{{ props.cancelText }}</ui-button>
              </slot>
            </view>
            <view class="ui-color-picker__header__title">
              <slot name="title">{{ props.title }}</slot>
            </view>
            <view class="ui-color-picker__header__confirm" @click="onConfirm">
              <slot name="confirm">
                <ui-button text type="primary">{{ props.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <view class="ui-color-picker__body">
        <ui-color-panel
          v-model="tempColor"
          :preset-colors="presetColors"
          :show-input="props.showInput"
          :show-presets="props.showPresets"
          :show-preview="props.showPreview"
          :columns="props.columns"
          :panel-height="props.panelHeight"
          :disabled="props.disabled"
          :readonly="props.readonly"
        />
      </view>
    </ui-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue"
import { DEFAULT_PRESET_COLORS } from "../ui-color-panel"
import { colorPickerEmits, colorPickerProps } from "./index"

defineOptions({ name: "ui-color-picker" })

const props = defineProps(colorPickerProps)
const emits = defineEmits(colorPickerEmits)

// 临时颜色（确认前的编辑值，取消时还原）
const tempColor = ref(props.modelValue || "")

// 预设色：用户传 → 用户值；未传 → panel 默认（避免 picker 默认空数组覆盖 panel 默认）
const presetColors = computed(() => props.presetColors ?? DEFAULT_PRESET_COLORS)

// 重置临时色为外部 modelValue
function resetTempColor() {
  tempColor.value = props.modelValue || ""
}

// 弹窗打开时同步外部值
watch(
  () => props.show,
  (val) => {
    if (val) resetTempColor()
  },
)
// 关闭时外部 modelValue 变更也同步显示
watch(
  () => props.modelValue,
  () => {
    if (!props.show) resetTempColor()
  },
)

function onConfirm() {
  if (props.disabled || props.readonly) return
  emits("update:modelValue", tempColor.value)
  emits("change", tempColor.value)
  emits("confirm", tempColor.value)
  emits("update:show", false)
}

function onCancel() {
  resetTempColor()
  emits("cancel")
  emits("update:show", false)
}

function onClose() {
  resetTempColor()
  emits("close")
}
</script>

<script lang="ts">
export default {
  name: "ui-color-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-color-picker {
  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
    justify-content: space-between;

    &__title {
      color: var(--ui-color-text);
      font-size: var(--ui-font-size-md);
      font-weight: var(--ui-font-weight-bold);
    }
  }

  &__body {
    padding: var(--ui-spacing-md);
  }
}
</style>
