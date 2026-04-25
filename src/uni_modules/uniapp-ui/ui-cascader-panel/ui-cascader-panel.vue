<template>
  <view class="ui-cascader" :class="[props.customClass]" :style="[rootStyle]">
    <view v-if="props.showHeader" class="ui-cascader__header">
      <slot name="title">
        <text class="ui-cascader__header__title" :style="[titleStyle]">{{ props.title }}</text>
      </slot>
      <slot name="close">
        <ui-icon
          v-if="props.closeable"
          :name="props.closeIcon"
          :size="props.closeIconSize"
          :color="props.closeIconColor"
          :weight="props.closeIconWeight"
          @click="onClickClose"
        />
      </slot>
    </view>
    <scroll-view scroll-x :show-scrollbar="false">
      <view class="ui-cascader__tabs">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="ui-cascader__tabs__tab"
          :class="{ 'ui-cascader__tabs__tab--unselected': !item.selected }"
          @click="onClickTab(item, index)"
        >
          {{ item.selected ? item.selected[textKey] : props.placeholder }}
        </view>
        <view class="ui-cascader__tabs__line" :style="[tabsLineStyle]" />
      </view>
    </scroll-view>
    <swiper class="ui-cascader__swiper" :current="activeTab" :disable-touch="!props.swipeable" @change="onSwiperChange">
      <swiper-item v-for="(item, index) in tabs" :key="index" class="ui-cascader__swiper__item">
        <scroll-view scroll-y :show-scrollbar="false" class="ui-cascader__scroll">
          <view v-if="!item.options || item.options.length === 0" class="ui-cascader__empty">
            <slot name="empty">
              <text class="ui-cascader__empty__text">暂无数据</text>
            </slot>
          </view>
          <view v-else class="ui-cascader__options">
            <view
              v-for="(option, optionIndex) in item.options"
              :key="optionIndex"
              class="ui-cascader__options__option"
              :class="{
                'ui-cascader__options__option--selected': item.selected && option[valueKey] === item.selected[valueKey],
                'ui-cascader__options__option--disabled': option[disabledKey],
              }"
              :style="[item.selected && option[valueKey] === item.selected[valueKey] ? activeOptionStyle : optionStyle]"
              @click="onClickOption(option, index, optionIndex)"
            >
              <view class="option-text">
                {{ option[textKey] }}
              </view>
              <ui-icon v-if="item.selected && option[valueKey] === item.selected[valueKey]" name="check" />
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <view v-if="loading" class="ui-cascader__loading">
      <ui-loading color="primary" size="50rpx" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CascaderPanelTab, CascaderPanelOption } from "./index"
import UiIcon from "../ui-icon/ui-icon.vue"
import UiLoading from "../ui-loading/ui-loading.vue"
import { clone, merge } from "../utils/utils"
import { callInterceptor } from "../utils/interceptor"
import { useUnit, useColor, useRects, useStyle } from "../hooks"
import { isDef, isEmpty, isNoEmpty, isFunction } from "../utils/check"
import { cascaderPanelEmits, cascaderPanelProps } from "./index"
import { ref, toRaw, watch, computed, nextTick, getCurrentInstance } from "vue"

defineOptions({ name: "ui-cascader-panel" })

const props = defineProps(cascaderPanelProps)
const emits = defineEmits(cascaderPanelEmits)

const instance = getCurrentInstance()
const tabs = ref<CascaderPanelTab[]>([])
const tabsRect = ref<UniApp.NodeInfo[]>([])
const loading = ref(false)
const activeTab = ref(0)
const currentValue = ref<string | number>("")

const defaultFieldKeys = { text: "text", value: "value", children: "children", disabled: "disabled" }
const { text: textKey, value: valueKey, children: childrenKey, disabled: disabledKey } = merge(defaultFieldKeys, props.fieldKeys)

const rootStyle = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
const titleStyle = computed(() => {
  const style: any = {}
  if (props.titleSize) style.fontSize = useUnit(props.titleSize)
  if (props.titleColor) style.color = useColor(props.titleColor)
  if (props.titleWeight) style.fontWeight = props.titleWeight
  return useStyle(style)
})
const optionStyle = computed(() => {
  const style: any = {}
  if (props.color) style.color = useColor(props.color)
  return useStyle(style)
})
const activeOptionStyle = computed(() => {
  const style: any = {}
  if (props.activeColor) style.color = useColor(props.activeColor)
  return useStyle(style)
})
const tabsLineStyle = computed(() => {
  const style: any = {}
  if (tabsRect.value.length > 0 && tabsRect.value[activeTab.value]) {
    style.left = `${tabsRect.value[activeTab.value].left}px`
    style.width = `${tabsRect.value[activeTab.value].width}px`
  }
  return style
})

watch(
  () => props.modelValue,
  (value) => {
    currentValue.value = value as string | number
    updateTabs()
  },
  { immediate: true },
)
watch(() => props.options, updateTabs, { deep: true })
watch(() => activeTab.value, updateRect, { immediate: true })

function updateTabs() {
  const options = props.options

  if (isDef(currentValue.value)) {
    const selectedOptions = getSelectedOptionsByValue(clone(options), currentValue.value)

    if (selectedOptions) {
      let optionsCursor: CascaderPanelOption[] | undefined = options

      tabs.value = selectedOptions.map((option) => {
        const tab = { options: optionsCursor, selected: option }

        const next = optionsCursor!.find((item: any) => item[valueKey] === option[valueKey])
        if (next) {
          optionsCursor = next[childrenKey] as CascaderPanelOption[] | undefined
        } else {
          optionsCursor = undefined
        }

        return tab
      }) as CascaderPanelTab[]

      if (optionsCursor && optionsCursor.length > 0) {
        tabs.value.push({ options: optionsCursor, selected: null })
      }

      nextTick(updateRect)
      nextTick(() => {
        activeTab.value = tabs.value.length - 1
      })
      return
    }
  }
  tabs.value = [{ options, selected: null }]
  activeTab.value = 0
  nextTick(updateRect)
}

function getSelectedOptionsByValue(options: CascaderPanelOption[], value: string | number): CascaderPanelOption[] | undefined {
  for (const option of options) {
    if (option[valueKey] === value) return [option]

    const children = option[childrenKey] as CascaderPanelOption[] | undefined
    if (children && children.length > 0) {
      const selectedOptions = getSelectedOptionsByValue(children, value)
      if (selectedOptions) return [option, ...selectedOptions]
    }
  }
  return undefined
}

async function updateRect() {
  await nextTick()
  tabsRect.value = await useRects(".ui-cascader__tabs__tab", instance)
}

function onClickTab(_item: CascaderPanelTab, index: number) {
  activeTab.value = index
  emits("clickTab", { index })
}

function onClickOption(option: CascaderPanelOption, index: number, optionIndex: number) {
  if (option[disabledKey]) return

  const next = () => {
    tabs.value[index].selected = option

    if (tabs.value.length > index + 1) {
      tabs.value = tabs.value.slice(0, index + 1)
    }

    const children = option[childrenKey] as CascaderPanelOption[] | undefined
    if (isNoEmpty(children)) {
      const nextTab = { options: children!, selected: null }

      if (tabs.value[index + 1]) {
        tabs.value[index + 1] = nextTab
      } else {
        tabs.value.push(nextTab)
      }
      nextTick(updateRect)
      nextTick(() => {
        activeTab.value = tabs.value.length - 1
      })
    }

    nextTick(updateRect)

    const selectedOptions = tabs.value.map((tab) => toRaw(tab.selected)).filter((item): item is CascaderPanelOption => Boolean(item))
    const selectedValue = option[valueKey] as string | number
    const selectedText = String(option[textKey] ?? "")

    const params = { value: selectedValue, text: selectedText, index, selectedOptions }
    currentValue.value = selectedValue
    emits("change", toRaw(params))

    if (isEmpty(children)) {
      emits("finish", toRaw(params))
      emits("update:modelValue", selectedValue)
    }
  }

  if (isFunction(props.beforeChange)) {
    const indexs = [...tabs.value.filter((tab) => tab.selected).map((tab) => tab.options.findIndex((item: any) => item[valueKey] === tab.selected?.[valueKey]))]
    indexs[index] = optionIndex
    loading.value = true
    callInterceptor(props.beforeChange, {
      args: [{ index, option: toRaw(clone(option)), optionIndex, optionIndexs: indexs }],
      done() {
        next()
        loading.value = false
      },
      error() {
        loading.value = false
      },
      canceled() {
        loading.value = false
      },
    })
  } else {
    next()
  }
}

function onSwiperChange(event: any) {
  activeTab.value = event.detail.current
}

function onClickClose() {
  emits("close")
}

function reset() {
  currentValue.value = ""
  tabs.value = [{ options: props.options, selected: null }]
  activeTab.value = 0
}

defineExpose({
  reset,
  updateTabs,
})
</script>

<script lang="ts">
export default {
  name: "ui-cascader-panel",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-cascader {
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;

  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    justify-content: space-between;

    &__title {
      font-size: var(--ui-font-size-sm);
      font-weight: var(--ui-font-weight-bold);
    }
  }

  &__tabs {
    height: 60rpx;
    display: flex;
    padding: 0 var(--ui-spacing-md);
    position: relative;

    &__tab {
      width: max-content;
      height: 100%;
      display: flex;
      font-size: var(--ui-font-size-sm);
      align-items: center;
      font-weight: var(--ui-font-weight-bold);
      margin-right: var(--ui-spacing-md);
      justify-content: center;

      &--unselected {
        color: var(--ui-color-text-tertiary);
        font-weight: var(--ui-font-weight-normal);
      }
    }

    &__line {
      left: 0;
      bottom: 0;
      height: 4rpx;
      position: absolute;
      transition: all var(--ui-transition-duration);
      border-radius: var(--ui-radius-sm);
      background-color: var(--ui-color-primary);
    }
  }

  &__swiper {
    flex: 1;
    padding-top: var(--ui-spacing-md);

    &__item {
      flex: 1;
      display: flex;
      overflow: hidden;
      position: relative;
      flex-direction: row;
    }
  }

  &__scroll {
    height: 100%;
  }

  &__empty {
    display: flex;
    padding: var(--ui-spacing-xl) var(--ui-spacing-lg);
    align-items: center;
    justify-content: center;

    &__text {
      color: var(--ui-color-text-tertiary);
      font-size: var(--ui-font-size-md);
    }
  }

  &__options {
    gap: var(--ui-spacing-md);
    display: grid;
    padding-bottom: var(--ui-spacing-md);
    grid-template-columns: repeat(1, 1fr);

    &__option {
      display: flex;
      padding: 0 var(--ui-spacing-md);
      font-size: var(--ui-font-size-sm);
      align-items: center;
      justify-content: space-between;

      &--selected {
        color: var(--ui-color-primary);
      }

      &--disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
  &__loading {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: var(--ui-color-mask-light);
  }
}
</style>
