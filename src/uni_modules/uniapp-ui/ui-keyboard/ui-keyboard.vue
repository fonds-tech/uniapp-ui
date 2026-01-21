<template>
  <ui-popup
    v-model:show="visible"
    mode="bottom"
    :overlay="useProps.overlay"
    :z-index="useProps.zIndex"
    :background="useProps.background"
    :close-on-click-overlay="useProps.closeOnClickOverlay"
    :safe-area-inset-bottom="useProps.safeAreaInsetBottom"
    @opened="emits('opened')"
    @closed="emits('closed')"
  >
    <view class="ui-keyboard" :class="[useProps.customClass]" :style="[style]">
      <slot name="header">
        <view v-if="useProps.showHeader" class="ui-keyboard__header">
          <view v-if="useProps.showCancel" class="ui-keyboard__cancel">
            <slot name="cancel">
              <ui-button text :text-color="useProps.cancelTextColor" :text-size="useProps.cancelTextSize" :text-weight="useProps.cancelTextWeight" @click="onCancel">
                {{ useProps.cancelText }}
              </ui-button>
            </slot>
          </view>
          <view class="ui-keyboard__title">
            <slot name="title">
              {{ useProps.title }}
            </slot>
          </view>
          <view v-if="useProps.showConfirm" class="ui-keyboard__confirm">
            <slot name="confirm">
              <ui-button text :text-color="useProps.confirmTextColor" :text-size="useProps.confirmTextSize" :text-weight="useProps.confirmTextWeight" @click="onConfirm">
                {{ useProps.confirmText }}
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
  </ui-popup>
</template>

<script setup lang="ts">
import type { KeyboardKeyItem } from "./index"
import { useStyle } from "../hooks"
import { clone, shuffleArray } from "../utils/utils"
import { ref, watch, computed, onMounted } from "vue"
import { keyboardEmits, keyboardProps, useKeyboardProps } from "./index"

defineOptions({ name: "ui-keyboard" })

const props = defineProps(keyboardProps)
const emits = defineEmits(keyboardEmits)
const useProps = useKeyboardProps(props)
const visible = ref(false)
const numbers = ref<KeyboardKeyItem[]>([])
const letters = ref<KeyboardKeyItem[]>([])
const cars = ref<KeyboardKeyItem[]>([
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

watch(
  () => useProps.modelValue,
  (val) => {
    inputValue.value = val
    // 车牌键盘自动切换：根据输入长度判断显示中文还是英文
    if (useProps.mode === "car" && useProps.autoSwitch) {
      language.value = val.length === 0 ? "zh-cn" : "en-us"
    }
  },
  { immediate: true },
)

const style = computed(() => {
  const styles: Record<string, string> = {}
  return useStyle({ ...styles, ...useStyle(useProps.customStyle) })
})

const keysClass = computed(() => {
  const list: string[] = []
  list.push(`ui-keyboard__keys--${useProps.mode}`)
  return list
})

const keyStyle = computed(() => {
  return (item: KeyboardKeyItem, index: number) => {
    const style: Record<string, string> = {}
    if (useProps.mode === "car") {
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
  const { random, showDot } = useProps
  let list: KeyboardKeyItem[] = []
  if (useProps.mode === "number") {
    list = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
    // 在位置9插入小数点或关闭按钮，0在位置10，删除在位置11
    showDot ? list.splice(9, 0, { value: ".", type: "key" }) : list.splice(9, 0, { value: "keyboard", type: "close" })
    list.push({ value: "backspace", type: "delete" })
  }
  if (useProps.mode === "car") {
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
  if (useProps.mode === "card") {
    const ns = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
    list = ns
    list.splice(9, 0, { value: "X", type: "key" })
    list.push({ value: "backspace", type: "delete" })
  }

  return list
})

watch(
  () => useProps.show,
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

function init() {
  // 数字键盘布局: 1-9 在前，0 在后（符合用户习惯）
  numbers.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => ({ value: n.toString(), type: "key" as const }))
  letters.value = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => ({ value: letter, type: "key" as const }))
}

function triggerVibrate() {
  if (!useProps.vibrate) return
  // #ifdef APP-PLUS || MP
  try {
    uni.vibrateShort({ type: "light" })
  } catch {}
  // #endif
}

function isKeyDisabled(item: KeyboardKeyItem): boolean {
  if (item.type !== "key") return false
  const maxLen = Number(useProps.maxlength)
  // 达到最大长度时禁用所有输入键
  if (maxLen !== Infinity && inputValue.value.length >= maxLen) {
    return true
  }
  // 小数点键盘：已输入小数点则禁用
  if (item.value === "." && inputValue.value.includes(".")) {
    return true
  }
  return false
}

function onClick(item: KeyboardKeyItem) {
  // 禁用状态不响应点击
  if (isKeyDisabled(item)) return

  triggerVibrate()

  if (item.type === "key") {
    const maxLen = Number(useProps.maxlength)
    if (maxLen !== Infinity && inputValue.value.length >= maxLen) {
      return
    }
    const newValue = inputValue.value + item.value
    inputValue.value = newValue
    emits("input", item.value)
    emits("change", newValue)
    emits("update:modelValue", newValue)
    // 车牌键盘：输入第一个字符后自动切换到英文
    if (useProps.mode === "car" && useProps.autoSwitch && newValue.length === 1) {
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
      // 车牌键盘：删除到第一位时自动切回中文
      if (useProps.mode === "car" && useProps.autoSwitch && newValue.length === 0) {
        language.value = "zh-cn"
      }
    } else {
      emits("delete")
    }
  }
  if (item.type === "close") {
    visible.value = false
    emits("close")
  }
  if (item.type === "switch") {
    language.value = language.value === "zh-cn" ? "en-us" : "zh-cn"
  }
}

function onCancel() {
  visible.value = false
  emits("cancel")
}

function onConfirm() {
  visible.value = false
  emits("confirm")
}

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function clear() {
  inputValue.value = ""
  emits("change", "")
  emits("update:modelValue", "")
  // 车牌键盘重置语言
  if (useProps.mode === "car") {
    language.value = "zh-cn"
  }
}

onMounted(() => init())
defineExpose({
  name: "ui-keyboard",
  open,
  close,
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
      color: var(--ui-color-text-primary);
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
