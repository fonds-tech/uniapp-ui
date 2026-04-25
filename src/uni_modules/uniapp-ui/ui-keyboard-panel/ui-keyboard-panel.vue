<template>
  <view class="ui-keyboard" :class="[props.customClass]" :style="[rootStyle]">
    <slot name="header">
      <view v-if="props.showHeader" class="ui-keyboard__header">
        <view v-if="props.showCancel" class="ui-keyboard__cancel">
          <slot name="cancel">
            <ui-button text :text-color="props.cancelTextColor" :text-size="props.cancelTextSize" :text-weight="props.cancelTextWeight" @click="onCancel">
              {{ props.cancelText }}
            </ui-button>
          </slot>
        </view>
        <view class="ui-keyboard__title">
          <slot name="title">
            {{ props.title }}
          </slot>
        </view>
        <view v-if="props.showConfirm" class="ui-keyboard__confirm">
          <slot name="confirm">
            <ui-button text :text-color="props.confirmTextColor" :text-size="props.confirmTextSize" :text-weight="props.confirmTextWeight" @click="onConfirm">
              {{ props.confirmText }}
            </ui-button>
          </slot>
        </view>
      </view>
    </slot>
    <view class="ui-keyboard__keys" :class="[keysClass]">
      <view
        v-for="(item, index) in keys"
        :key="`${item.type}-${item.value || index}`"
        class="ui-keyboard__keys__key"
        :class="{ 'is-disabled': isKeyDisabled(item) }"
        :style="[keyStyle(item, index)]"
        @click="onClick(item)"
      >
        <view v-if="item.type === 'switch'" class="ui-keyboard__keys__key__switch">
          <text :class="{ 'is-active': language === 'zh-cn' }">中</text>
          <text>/</text>
          <text :class="{ 'is-active': language === 'en-us' }">英</text>
        </view>
        <ui-icon v-else-if="item.type === 'close'" :name="item.value" size="var(--ui-icon-size-lg)" />
        <ui-icon v-else-if="item.type === 'delete'" :name="item.value" size="var(--ui-icon-size-lg)" />
        <text v-else>{{ item.value }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { KeyboardPanelKeyItem } from "./index"
import UiIcon from "../ui-icon/ui-icon.vue"
import UiButton from "../ui-button/ui-button.vue"
import { useStyle } from "../hooks"
import { clone, shuffleArray } from "../utils/utils"
import { ref, watch, computed, onMounted } from "vue"
import { keyboardPanelEmits, keyboardPanelProps } from "./index"

defineOptions({ name: "ui-keyboard-panel" })

const props = defineProps(keyboardPanelProps)
const emits = defineEmits(keyboardPanelEmits)

const numbers = ref<KeyboardPanelKeyItem[]>([])
const letters = ref<KeyboardPanelKeyItem[]>([])
const cars = ref<KeyboardPanelKeyItem[]>([
  { value: "京", type: "key" },
  { value: "沪", type: "key" },
  { value: "粤", type: "key" },
  { value: "津", type: "key" },
  { value: "冀", type: "key" },
  { value: "豫", type: "key" },
  { value: "云", type: "key" },
  { value: "辽", type: "key" },
  { value: "黑", type: "key" },
  { value: "湘", type: "key" },
  { value: "皖", type: "key" },
  { value: "鲁", type: "key" },
  { value: "苏", type: "key" },
  { value: "浙", type: "key" },
  { value: "赣", type: "key" },
  { value: "鄂", type: "key" },
  { value: "桂", type: "key" },
  { value: "甘", type: "key" },
  { value: "晋", type: "key" },
  { value: "陕", type: "key" },
  { value: "蒙", type: "key" },
  { value: "吉", type: "key" },
  { value: "闽", type: "key" },
  { value: "贵", type: "key" },
  { value: "渝", type: "key" },
  { value: "川", type: "key" },
  { value: "青", type: "key" },
  { value: "琼", type: "key" },
  { value: "宁", type: "key" },
  { value: "挂", type: "key" },
  { value: "藏", type: "key" },
  { value: "港", type: "key" },
  { value: "澳", type: "key" },
  { value: "新", type: "key" },
  { value: "使", type: "key" },
  { value: "学", type: "key" },
])
const language = ref("zh-cn")
const inputValue = ref("")

const rootStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (props.background) styles.backgroundColor = props.background
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

const keysClass = computed(() => {
  const list: string[] = []
  list.push(`ui-keyboard__keys--${props.mode}`)
  return list
})

const keyStyle = computed(() => {
  return (item: KeyboardPanelKeyItem, _index: number) => {
    const style: Record<string, string> = {}
    if (props.mode === "car") {
      if (item.type === "switch") {
        style.gridArea = "4 / 1 / 5 / 3"
      }
      if (item.type === "delete") {
        style.gridArea = "4 / 9 / 5 / 11"
      }
    }
    return useStyle(style)
  }
})

const keys = computed(() => {
  const { random, showDot } = props
  let list: KeyboardPanelKeyItem[] = []
  if (props.mode === "number") {
    list = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
    showDot ? list.splice(9, 0, { value: ".", type: "key" }) : list.splice(9, 0, { value: "keyboard-hide", type: "close" })
    list.push({ value: "backspace", type: "delete" })
  }
  if (props.mode === "car") {
    if (language.value === "zh-cn") {
      list = random ? shuffleArray(clone(cars.value)) : clone(cars.value)
    } else {
      const ns = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
      const ls = random ? shuffleArray(clone(letters.value)) : clone(letters.value)
      list = [...ns, ...ls]
    }
    list.splice(30, 0, { value: "", type: "switch" })
    list.push({ value: "backspace", type: "delete" })
  }
  if (props.mode === "card") {
    const ns = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
    list = ns
    list.splice(9, 0, { value: "X", type: "key" })
    list.push({ value: "backspace", type: "delete" })
  }

  return list
})

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val
    if (props.mode === "car" && props.autoSwitch) {
      language.value = val.length === 0 ? "zh-cn" : "en-us"
    }
  },
  { immediate: true },
)

function init() {
  numbers.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => ({ value: n.toString(), type: "key" as const }))
  letters.value = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => ({ value: letter, type: "key" as const }))
}

function triggerVibrate() {
  if (!props.vibrate) return
  // #ifdef APP-PLUS || MP
  try {
    uni.vibrateShort({ type: "light" })
  } catch {}
  // #endif
}

function isKeyDisabled(item: KeyboardPanelKeyItem): boolean {
  if (item.type !== "key") return false
  const maxLen = Number(props.maxlength)
  if (maxLen !== Infinity && inputValue.value.length >= maxLen) {
    return true
  }
  if (item.value === "." && inputValue.value.includes(".")) {
    return true
  }
  return false
}

function onClick(item: KeyboardPanelKeyItem) {
  if (isKeyDisabled(item)) return

  triggerVibrate()

  if (item.type === "key") {
    const maxLen = Number(props.maxlength)
    if (maxLen !== Infinity && inputValue.value.length >= maxLen) {
      return
    }
    const newValue = inputValue.value + item.value
    inputValue.value = newValue
    emits("input", item.value)
    emits("change", newValue)
    emits("update:modelValue", newValue)
    if (props.mode === "car" && props.autoSwitch && newValue.length === 1) {
      language.value = "en-us"
    }
  }
  if (item.type === "delete") {
    if (inputValue.value.length > 0) {
      const newValue = inputValue.value.slice(0, -1)
      inputValue.value = newValue
      emits("delete")
      emits("change", newValue)
      emits("update:modelValue", newValue)
      if (props.mode === "car" && props.autoSwitch && newValue.length === 0) {
        language.value = "zh-cn"
      }
    } else {
      emits("delete")
    }
  }
  if (item.type === "close") {
    emits("close")
  }
  if (item.type === "switch") {
    language.value = language.value === "zh-cn" ? "en-us" : "zh-cn"
  }
}

function onCancel() {
  emits("cancel")
}

function onConfirm() {
  emits("confirm")
}

function clear() {
  inputValue.value = ""
  emits("change", "")
  emits("update:modelValue", "")
  if (props.mode === "car") {
    language.value = "zh-cn"
  }
}

onMounted(() => init())

defineExpose({
  clear,
  value: inputValue,
})
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-keyboard {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    padding-bottom: 0;
    justify-content: space-between;
  }

  &__title {
    flex: 1;
    color: var(--ui-color-text-secondary);
    padding: 0 var(--ui-spacing-md);
    font-size: var(--ui-font-size-sm);
    text-align: center;
  }

  &__cancel,
  &__confirm {
    flex-shrink: 0;
  }

  &__keys {
    padding: var(--ui-spacing-sm);

    &__key {
      color: var(--ui-color-text);
      display: flex;
      box-shadow: var(--ui-shadow-xs);
      transition: background-color var(--ui-transition-fast) var(--ui-transition-timing);
      align-items: center;
      border-radius: var(--ui-radius-sm);
      justify-content: center;
      background-color: var(--ui-color-background);

      &:active {
        background-color: var(--ui-color-border-dark);
      }

      &.is-disabled {
        opacity: var(--ui-opacity-disabled);
        pointer-events: none;
      }

      &__switch {
        gap: var(--ui-spacing-xs);
        flex: 1;
        color: var(--ui-color-text-tertiary);
        display: flex;
        font-size: var(--ui-font-size-sm);
        align-items: center;
        justify-content: center;

        .is-active {
          color: var(--ui-color-primary);
          font-weight: var(--ui-font-weight-medium);
        }
      }
    }

    &--number {
      gap: var(--ui-spacing-sm);
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .ui-keyboard__keys__key {
        height: 96rpx;
        font-size: 56rpx;
        font-weight: var(--ui-font-weight-medium);
      }
    }

    &--car {
      gap: var(--ui-spacing-xs);
      display: grid;
      grid-template-columns: repeat(10, 1fr);

      .ui-keyboard__keys__key {
        height: 72rpx;
        font-size: var(--ui-font-size-sm);
        font-weight: var(--ui-font-weight-normal);
      }
    }

    &--card {
      gap: var(--ui-spacing-sm);
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .ui-keyboard__keys__key {
        height: 96rpx;
        font-size: 56rpx;
        font-weight: var(--ui-font-weight-medium);
      }
    }
  }
}
</style>
