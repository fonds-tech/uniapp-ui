<template>
  <view class="ui-color-picker">
    <ui-popup :show="props.show" mode="bottom" border-radius="24" safe-area-inset-bottom @update:show="handleUpdateShow" @close="handleClose">
      <template #header>
        <view class="ui-color-picker__header">
          <view class="ui-color-picker__cancel" @click="handleCancel">
            <text>取消</text>
          </view>
          <view class="ui-color-picker__title">
            <text>{{ title || "选择颜色" }}</text>
          </view>
          <view class="ui-color-picker__confirm" @click="handleConfirm">
            <text>确定</text>
          </view>
        </view>
      </template>

      <view class="ui-color-picker__body">
        <ui-color-panel
          v-model="tempColor"
          :size="size"
          :show-alpha="showAlpha"
          :show-input="showInput"
          :show-presets="showPresets"
          :columns="columns"
          :preset-colors="presetColors"
          :format="format"
        />
      </view>
    </ui-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"

import { colorPickerEmits, colorPickerProps } from "./index"

const props = defineProps(colorPickerProps)
const emits = defineEmits(colorPickerEmits)

// === 状态 ===
const tempColor = ref(props.modelValue || "")

// === 方法 ===
function handleUpdateShow(show: boolean) {
  emits("update:show", show)
}

function handleConfirm() {
  emits("update:modelValue", tempColor.value)
  emits("change", tempColor.value)
  emits("confirm", tempColor.value)
  emits("update:show", false)
}

function handleCancel() {
  tempColor.value = props.modelValue || ""
  emits("cancel")
  emits("update:show", false)
}

function handleClose() {
  tempColor.value = props.modelValue || ""
  emits("close")
}

// === 监听 ===
watch(
  () => props.show,
  (val) => {
    if (val) {
      tempColor.value = props.modelValue || ""
    }
  },
)

watch(
  () => props.modelValue,
  (val) => {
    tempColor.value = val || ""
  },
)
</script>

<script lang="ts">
export default {
  name: "ui-color-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-color-picker {
  // 标题栏
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

  // 面板区域
  &__body {
    padding: var(--ui-spacing-md);
  }
}
</style>
