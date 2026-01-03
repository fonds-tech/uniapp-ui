<template>
  <ui-popup
    v-model:show="visible"
    mode="bottom"
    :overlay="overlay"
    :background="background"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
  >
    <view class="ui-keyboard" :class="[classs, customClass]" :style="[style]">
      <slot name="header">
        <view v-if="showHeader" class="ui-keyboard__header">
          <view class="ui-keyboard__cancel" @click="onCancel">
            <slot name="cancel">
              <ui-button text :text-color="cancelTextColor" :text-size="cancelTextSize" :text-weight="cancelTextWeight" @click="onCancel">
                {{ cancelText }}
              </ui-button>
            </slot>
          </view>
          <view class="ui-keyboard__title">
            <slot name="title">
              {{ title }}
            </slot>
          </view>
          <view class="ui-keyboard__confirm" @click="onConfirm">
            <slot name="confirm">
              <ui-button text :text-color="confirmTextColor" :text-size="confirmTextSize" :text-weight="confirmTextWeight" @click="onConfirm">
                {{ confirmText }}
              </ui-button>
            </slot>
          </view>
        </view>
      </slot>
      <view class="ui-keyboard__keys" :class="[keysClass]">
        <view v-for="(item, index) in keys" :key="item.value" class="ui-keyboard__keys__key" :style="[keyStyle(item, index)]" @click="onClick(item)">
          <view v-if="item.type === 'switch'" class="ui-keyboard__keys__key__switch">
            <text :class="{ 'is-active': language === 'zh-cn' }">中</text>
            <text>/</text>
            <text :class="{ 'is-active': language === 'en-us' }">英</text>
          </view>
          <ui-icon v-else-if="item.type === 'close'" :name="item.value" size="56rpx" />
          <ui-icon v-else-if="item.type === 'delete'" :name="item.value" size="56rpx" />
          <text v-else>{{ item.value }}</text>
        </view>
      </view>
    </view>
  </ui-popup>
</template>

<script setup lang="ts">
import { useStyle } from "../hooks"
import { clone, shuffleArray } from "../utils/utils"
import { keyboardEmits, keyboardProps, useKeyboardProps } from "./index"

defineOptions({ name: "ui-keyboard" })

const props = defineProps(keyboardProps)
const emits = defineEmits(keyboardEmits)
const useProps = useKeyboardProps(props)
const visible = ref(false)
const numbers = ref([])
const letters = ref([])
const cars = ref([
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

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  return list
})

const keysClass = computed(() => {
  const list: string[] = []
  list.push(`ui-keyboard__keys--${useProps.mode}`)
  return list
})

const keyStyle = computed(() => {
  return (item: any, index: number) => {
    const style: any = {}
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
  const { random, showDot } = props
  let list = []
  if (useProps.mode === "number") {
    list = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
    showDot ? list.splice(9, 0, { value: ".", type: "key" }) : list.splice(9, 0, { value: "keyboard-hide", type: "close" })
    list.push({ value: "backspace-o", type: "delete" })
  }
  if (useProps.mode === "car") {
    if (language.value === "zh-cn") {
      list = random ? shuffleArray(clone(cars.value)) : clone(cars.value)
    } else {
      const ns = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
      const ls = random ? shuffleArray(clone(letters.value)) : clone(letters.value)
      if (ns.length) ns.push(ns.shift())
      list = [...ns, ...ls]
    }
    list.splice(30, 0, { value: "", type: "switch" })
    list.push({ value: "backspace-o", type: "delete" })
  }
  if (useProps.mode === "card") {
    const ns = random ? shuffleArray(clone(numbers.value)) : clone(numbers.value)
    if (ns.length) ns.push(ns.shift())
    list = ns
    list.splice(9, 0, { value: "X", type: "key" })
    list.push({ value: "backspace-o", type: "delete" })
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
  (val) => emits("update:show", val),
)

function init() {
  numbers.value = Array.from({ length: 10 }, () => ({})).map((_, i) => ({ value: i.toString(), type: "key" }))
  letters.value = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => ({ value: letter, type: "key" }))
}

function onClick(item: { type: string; value: string }) {
  if (item.type === "key") {
    emits("input", item.value)
  }
  if (item.type === "delete") {
    emits("delete")
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

onMounted(() => init())
defineExpose({ name: "ui-keyboard" })
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
    padding: 24rpx;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    padding: 0 24rpx;
    font-size: 28rpx;
    text-align: center;
  }

  &__keys {
    padding: 12rpx;

    &__key {
      display: flex;
      align-items: center;
      border-radius: 8rpx;
      justify-content: center;
      background-color: #fff;

      &:active {
        background-color: #ebedf0;
      }
    }

    &--number {
      gap: 12rpx;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .ui-keyboard__keys__key {
        height: 96rpx;
        font-size: 56rpx;
      }
    }

    &--car {
      gap: 12rpx;
      display: grid;
      grid-template-columns: repeat(10, 1fr);

      .ui-keyboard__keys__key {
        height: 56rpx;
        font-weight: 400;

        &__switch {
          flex: 1;
          display: flex;
          padding: 0 30rpx;
          align-items: center;
          justify-content: space-around;

          .is-active {
            color: var(--ui-color-primary);
          }
        }
      }
    }

    &--card {
      gap: 12rpx;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .ui-keyboard__keys__key {
        height: 96rpx;
        font-size: 56rpx;
      }
    }
  }
}
</style>
