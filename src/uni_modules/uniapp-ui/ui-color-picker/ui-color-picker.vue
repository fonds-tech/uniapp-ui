<template>
  <view class="ui-color-picker">
    <ui-popup :show="props.show" mode="bottom" border-radius="24" safe-area-inset-bottom @update:show="onUpdateShow" @close="onClose">
      <template #header>
        <view class="ui-color-picker__header">
          <view class="ui-color-picker__cancel" @click="onCancel">
            <text>取消</text>
          </view>
          <view class="ui-color-picker__title">
            <text>{{ props.title || "选择颜色" }}</text>
          </view>
          <view class="ui-color-picker__confirm" @click="onConfirm">
            <text>确定</text>
          </view>
        </view>
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

// 监听弹窗打开：重置 tempColor 为外部 modelValue
watch(
  () => props.show,
  (val) => {
    if (val) tempColor.value = props.modelValue || ""
  },
)
// 监听 modelValue 外部变化（弹窗关闭时同步显示）
watch(
  () => props.modelValue,
  (val) => {
    if (!props.show) tempColor.value = val || ""
  },
)

function onUpdateShow(show: boolean) {
  emits("update:show", show)
}

function onConfirm() {
  emits("update:modelValue", tempColor.value)
  emits("change", tempColor.value)
  emits("confirm", tempColor.value)
  emits("update:show", false)
}

function onCancel() {
  tempColor.value = props.modelValue || ""
  emits("cancel")
  emits("update:show", false)
}

function onClose() {
  tempColor.value = props.modelValue || ""
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
    height: 88rpx;
    display: flex;
    padding: 0 var(--ui-spacing-lg);
    align-items: center;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: 600;
  }

  &__cancel,
  &__confirm {
    padding: var(--ui-spacing-sm);
    font-size: var(--ui-font-size-sm);
  }

  &__cancel {
    color: var(--ui-color-text-secondary);
  }

  &__confirm {
    color: var(--ui-color-primary);
  }

  &__body {
    padding: var(--ui-spacing-md);
  }
}
</style>
