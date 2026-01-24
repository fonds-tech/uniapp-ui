<template>
  <ui-popup
    :show="visible"
    :mode="useProps.mode"
    :border-radius="useProps.borderRadius"
    :close-on-click-overlay="useProps.closeOnClickOverlay"
    :overlay="useProps.overlay"
    :duration="useProps.duration"
    :z-index="useProps.zIndex"
    :background="useProps.background"
    :safe-area-inset-bottom="useProps.safeAreaInsetBottom"
    :lazy-render="useProps.lazyRender"
    @update:show="handleUpdateShow"
  >
    <view class="ui-cascader" :class="[customClass]" :style="[style]">
      <view v-if="showHeader" class="ui-cascader__header">
        <slot name="title">
          <text class="ui-cascader__header__title" :style="[titleStyle]">{{ title }}</text>
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
      <scroll-view scroll-x :show-scrollbar="false">
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
      <swiper class="ui-cascader__swiper" :current="activeTab" :disable-touch="!useProps.swipeable" @change="onSwiperChange">
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
  </ui-popup>
</template>

<script setup lang="ts">
import type { CascaderTab, CascaderOption } from "./index"
import { clone, merge } from "../utils/utils"
import { callInterceptor } from "../utils/interceptor"
import { useRects, useStyle } from "../hooks"
import { isDef, isEmpty, isNoEmpty, isFunction } from "../utils/check"
import { cascaderEmits, cascaderProps, useCascaderProps } from "./index"
import { ref, toRaw, watch, computed, nextTick, getCurrentInstance } from "vue"

// 定义组件名称
defineOptions({ name: "ui-cascader" })

// 定义props和emits
const props = defineProps(cascaderProps)
const emits = defineEmits(cascaderEmits)
const useProps = useCascaderProps(props)
const instance = getCurrentInstance()
// 定义响应式数据
const visible = ref(false) // 弹窗显示状态
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

// 标题样式
const titleStyle = computed(() => {
  const style: any = {}
  if (useProps.titleSize) style.fontSize = useProps.titleSize
  if (useProps.titleColor) style.color = useProps.titleColor
  if (useProps.titleWeight) style.fontWeight = useProps.titleWeight
  return useStyle(style)
})

// 选项样式
const optionStyle = computed(() => {
  const style: any = {}
  if (useProps.color) style.color = useProps.color
  return useStyle(style)
})

// 选中选项样式
const activeOptionStyle = computed(() => {
  const style: any = {}
  if (useProps.activeColor) style.color = useProps.activeColor
  return useStyle(style)
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

// 同步外部 show 与内部弹窗状态，保证受控与内部关闭一致
watch(
  () => useProps.show,
  (value) => {
    visible.value = value
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (value) => {
    emits("update:show", value)
    if (value) {
      nextTick(updateRect)
      return
    }
    emits("close")
  },
)

// 监听useProps.options的变化
watch(() => useProps.options, updateTabs, { deep: true })

// 监听activeTab的变化
watch(() => activeTab.value, updateRect, { immediate: true })

// 更新标签页
function updateTabs() {
  const options = useProps.options

  if (isDef(currentValue.value)) {
    const selectedOptions = getSelectedOptionsByValue(clone(options), currentValue.value)

    if (selectedOptions) {
      let optionsCursor: CascaderOption[] | undefined = options

      tabs.value = selectedOptions.map((option) => {
        const tab = { options: optionsCursor, selected: option }

        const next = optionsCursor.find((item: any) => item[valueKey] === option[valueKey])
        if (next) {
          optionsCursor = next[childrenKey] as CascaderOption[] | undefined
        } else {
          optionsCursor = undefined
        }

        return tab
      })

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
  nextTick(updateRect)
}

// 根据值获取选中的选项
function getSelectedOptionsByValue(options: CascaderOption[], value: string | number): CascaderOption[] | undefined {
  for (const option of options) {
    if (option[valueKey] === value) return [option]

    const children = option[childrenKey] as CascaderOption[] | undefined
    if (children && children.length > 0) {
      const selectedOptions = getSelectedOptionsByValue(children, value)
      if (selectedOptions) return [option, ...selectedOptions]
    }
  }
  return undefined
}

// 更新标签页位置信息
async function updateRect() {
  await nextTick()
  tabsRect.value = await useRects(".ui-cascader__tabs__tab", instance)
}

function handleUpdateShow(value: boolean) {
  visible.value = value
}

// 点击标签页的处理函数
function onClickTab(item: CascaderTab, index: number) {
  activeTab.value = index
  emits("clickTab", { index })
}

// 点击选项的处理函数
function onClickOption(option: CascaderOption, index: number, optionIndex: number) {
  if (option[disabledKey]) return

  const next = () => {
    tabs.value[index].selected = option

    if (tabs.value.length > index + 1) {
      tabs.value = tabs.value.slice(0, index + 1)
    }

    const children = option[childrenKey] as CascaderOption[] | undefined
    if (isNoEmpty(children)) {
      const nextTab = { options: children, selected: null }

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

    const selectedOptions = tabs.value.map((tab) => toRaw(tab.selected)).filter((item): item is CascaderOption => Boolean(item))
    const selectedValue = option[valueKey] as string | number
    const selectedText = String(option[textKey] ?? "")

    const params = { value: selectedValue, text: selectedText, index, selectedOptions }
    currentValue.value = selectedValue
    emits("change", toRaw(params))

    if (isEmpty(children)) {
      emits("finish", toRaw(params))
      emits("update:modelValue", selectedValue)
      visible.value = false
    }
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
  visible.value = false
}

// 重置选择
function reset() {
  currentValue.value = ""
  tabs.value = [{ options: useProps.options, selected: null }]
  activeTab.value = 0
}

// 暴露实例方法
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
      height: 6rpx;
      position: absolute;
      transition: all var(--ui-transition-duration);
      border-radius: var(--ui-radius-sm);
      background-color: var(--ui-color-primary);
    }
  }

  &__swiper {
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
