<template>
  <view class="ui-cascader" :class="[customClass]" :style="[style]">
    <view v-if="showHeader" class="ui-cascader__header">
      <slot name="title">
        <text class="ui-cascader__header__title">{{ title }}</text>
      </slot>
      <slot name="close">
        <ui-icon
          v-if="closeable"
          custom-class="ui-cascader__header__close"
          :name="closeIcon"
          :size="closeIconSize"
          :color="closeIconColor"
          :weight="closeIconWeight"
          @click="onClickClose"
        />
      </slot>
    </view>
    <scroll-view scroll-x>
      <view class="ui-cascader__tabs">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="ui-cascader__tabs__tab"
          :class="{ 'ui-cascader__tabs__tab--unselected': !item.selected }"
          @click="onClickTab(item, index)"
        >
          {{ item.selected ? item.selected[textKey] : placeholder }}
        </view>
        <view class="ui-cascader__tabs__line" :style="[tabsLineStyle]" />
      </view>
    </scroll-view>
    <swiper class="ui-cascader__swiper" :current="activeTab" @change="onSwiperChange">
      <swiper-item v-for="(item, index) in tabs" :key="index" class="ui-cascader__swiper__item">
        <scroll-view scroll-y>
          <view class="ui-cascader__options">
            <view
              v-for="(option, optionIndex) in item.options"
              :key="optionIndex"
              class="ui-cascader__options__option"
              :class="{ 'ui-cascader__options__option--selected': item.selected && option[valueKey] === item.selected[valueKey] }"
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
import type { CascaderTab, CascaderOption } from "./index"
import { clone, merge } from "../utils/utils"
import { callInterceptor } from "../utils/interceptor"
import { useRects, useStyle } from "../hooks"
import { isDef, isEmpty, isNoEmpty, isFunction } from "../utils/check"
import { cascaderEmits, cascaderProps, useCascaderProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-cascader" })

// 定义props和emits
const props = defineProps(cascaderProps)
const emits = defineEmits(cascaderEmits)
const useProps = useCascaderProps(props)
const instance = getCurrentInstance()

// 定义响应式数据
const tabs = ref<CascaderTab[]>([]) // 存储级联选择器的标签页
const tabsRect = ref<UniApp.NodeInfo[]>([]) // 存储标签页的位置信息
const loading = ref(false) // 加载状态
const activeTab = ref(0) // 当前激活的标签页索引
const currentValue = ref<string | number>("") // 当前选中的值

// 定义默认的字段键名
const defaultFieldKeys = { text: "text", value: "value", children: "children", disabled: "disabled" }
const { text: textKey, value: valueKey, children: childrenKey, disabled: disabledKey } = merge(defaultFieldKeys, useProps.fieldKeys)

// 计算样式
const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 计算标签页下划线的样式
const tabsLineStyle = computed(() => {
  const style: any = {}
  if (tabsRect.value.length > 0 && tabsRect.value[activeTab.value]) {
    style.left = `${tabsRect.value[activeTab.value].left}px`
    style.width = `${tabsRect.value[activeTab.value].width}px`
  }
  return style
})

// 监听useProps.modelValue的变化
watch(
  () => useProps.modelValue,
  (value) => {
    currentValue.value = value
    updateTabs()
  },
  { immediate: true },
)

// 监听useProps.options的变化
watch(() => useProps.options, updateTabs, { deep: true })

// 监听activeTab的变化
watch(() => activeTab.value, updateRect, { immediate: true })

// 更新标签页
async function updateTabs() {
  const { options } = props

  if (isDef(currentValue.value)) {
    const selectedOptions = getSelectedOptionsByValue(clone(options), currentValue.value)

    if (selectedOptions) {
      let optionsCursor = options

      tabs.value = selectedOptions.map((option) => {
        const tab = { options: optionsCursor, selected: option }

        const next = optionsCursor.find((item: any) => item[valueKey] === option[valueKey])
        if (next) optionsCursor = next[childrenKey]

        return tab
      })

      if (optionsCursor) {
        tabs.value.push({ options: optionsCursor, selected: null })
      }

      await updateRect()

      nextTick(() => {
        activeTab.value = tabs.value.length - 1
      })
      return
    }
  }
  tabs.value = [{ options, selected: null }]
}

// 根据值获取选中的选项
function getSelectedOptionsByValue(options: CascaderOption[], value: string | number): CascaderOption[] {
  for (const option of options) {
    if (option[valueKey] === value) return [option]

    if (option[childrenKey]) {
      const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value)
      if (selectedOptions) return [option, ...selectedOptions]
    }
  }
}

// 更新标签页位置信息
async function updateRect() {
  await nextTick()
  tabsRect.value = await useRects(".ui-cascader__tabs__tab", instance)
}

// 点击标签页的处理函数
function onClickTab(item: CascaderTab, index: number) {
  activeTab.value = index
  emits("clickTab", { index })
}

// 点击选项的处理函数
async function onClickOption(option: CascaderOption, index: number, optionIndex: number) {
  if (option[disabledKey]) return

  const next = async () => {
    tabs.value[index].selected = option

    if (tabs.value.length > index + 1) {
      tabs.value = tabs.value.slice(0, index + 1)
    }

    if (isNoEmpty(option[childrenKey])) {
      const nextTab = { options: option[childrenKey], selected: null }

      if (tabs.value[index + 1]) {
        tabs.value[index + 1] = nextTab
      } else {
        tabs.value.push(nextTab)
      }
      await updateRect()
      nextTick(() => {
        activeTab.value = tabs.value.length - 1
      })
    }

    const selectedOptions = tabs.value.map((tab) => toRaw(tab.selected)).filter(Boolean)

    const params = { value: option[valueKey], text: option[textKey], index, selectedOptions }
    currentValue.value = option[valueKey]
    emits("change", toRaw(params))

    if (isEmpty(option[childrenKey])) {
      emits("finish", toRaw(params))
      emits("update:modelValue", option[valueKey])
    }

    nextTick(updateRect)
  }

  // 处理beforeChange拦截器
  if (isFunction(useProps.beforeChange)) {
    const indexs = [...tabs.value.filter((tab) => tab.selected).map((tab) => tab.options.findIndex((item: any) => item[valueKey] === tab.selected?.[valueKey]))]
    indexs[index] = optionIndex
    loading.value = true
    callInterceptor(useProps.beforeChange, {
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

// 滑动切换标签页的处理函数
function onSwiperChange(event: any) {
  activeTab.value = event.detail.current
}

// 点击关闭按钮的处理函数
function onClickClose() {
  emits("close")
}
</script>

<script lang="ts">
export default {
  name: "ui-cascader",
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
    padding: var(--ui-spacing-xl);
    align-items: center;
    justify-content: space-between;

    &__title {
      font-size: var(--ui-font-size-lg);
      font-weight: var(--ui-font-weight-bold);
    }
  }

  &__tabs {
    height: 100rpx;
    display: flex;
    padding: 0 var(--ui-spacing-md);
    position: relative;

    &__tab {
      width: max-content;
      height: 100%;
      margin: 0 var(--ui-spacing-md);
      display: flex;
      font-size: var(--ui-font-size-md);
      align-items: center;
      font-weight: var(--ui-font-weight-bold);
      justify-content: center;

      &--unselected {
        color: var(--ui-color-text-secondary);
        font-weight: var(--ui-font-weight-normal);
      }
    }

    &__line {
      left: 0;
      width: 100rpx;
      bottom: 0;
      height: 6rpx;
      position: absolute;
      transition: all var(--ui-transition-duration);
      border-radius: var(--ui-radius-sm);
      background-color: var(--ui-color-primary);
    }
  }

  &__swiper {
    height: 100%;
    padding-top: var(--ui-spacing-xl);

    &__item {
      flex: 1;
      display: flex;
      overflow: hidden;
      position: relative;
      flex-direction: row;
    }
  }

  &__options {
    &__option {
      display: flex;
      padding: var(--ui-spacing-lg) var(--ui-spacing-xl);
      font-size: var(--ui-font-size-md);
      align-items: center;
      justify-content: space-between;

      &--selected {
        color: var(--ui-color-primary);
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
