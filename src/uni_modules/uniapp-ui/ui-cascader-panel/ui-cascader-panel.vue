<template>
  <view class="ui-cascader-panel" :class="[props.customClass]" :style="[rootStyle, props.customStyle]">
    <view v-if="props.showHeader" class="ui-cascader-panel__header">
      <slot name="title">
        <text class="ui-cascader-panel__header__title">{{ props.title }}</text>
      </slot>
      <slot name="close">
        <ui-icon
          v-if="props.closeable"
          class="ui-cascader-panel__header__close"
          :name="props.closeIcon"
          :size="props.closeIconSize"
          :color="props.closeIconColor"
          :weight="props.closeIconWeight"
          @click.stop="onClickClose"
        />
      </slot>
    </view>
    <scroll-view scroll-x :show-scrollbar="false">
      <view class="ui-cascader-panel__tabs">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="ui-cascader-panel__tabs__tab"
          :class="{ 'ui-cascader-panel__tabs__tab--unselected': !item.selected }"
          @click="onClickTab(item, index)"
        >
          {{ item.selected ? item.selected[fieldKeys.text] : props.placeholder }}
        </view>
        <view class="ui-cascader-panel__tabs__line" :style="[tabsLineStyle]" />
      </view>
    </scroll-view>
    <swiper class="ui-cascader-panel__swiper" :current="activeTab" :disable-touch="!props.swipeable" @change="onSwiperChange">
      <swiper-item v-for="(item, index) in tabs" :key="index" class="ui-cascader-panel__swiper__item">
        <scroll-view scroll-y :show-scrollbar="false" class="ui-cascader-panel__scroll">
          <view v-if="!item.options || item.options.length === 0" class="ui-cascader-panel__empty">
            <slot name="empty">
              <text class="ui-cascader-panel__empty__text">暂无数据</text>
            </slot>
          </view>
          <view v-else class="ui-cascader-panel__options">
            <view
              v-for="(option, optionIndex) in item.options"
              :key="optionIndex"
              class="ui-cascader-panel__options__option"
              :class="{
                'ui-cascader-panel__options__option--selected': item.selected && option[fieldKeys.value] === item.selected[fieldKeys.value],
                'ui-cascader-panel__options__option--disabled': option[fieldKeys.disabled],
              }"
              @click="onClickOption(option, index, optionIndex)"
            >
              <text class="ui-cascader-panel__options__option__text">{{ option[fieldKeys.text] }}</text>
              <ui-icon v-if="item.selected && option[fieldKeys.value] === item.selected[fieldKeys.value]" name="check" />
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <view v-if="loading" class="ui-cascader-panel__loading">
      <ui-loading color="primary" size="50rpx" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { CascaderPanelTab, CascaderPanelOption } from "./index"
import UiIcon from "../ui-icon/ui-icon.vue"
import UiLoading from "../ui-loading/ui-loading.vue"
import { clone, merge } from "../utils/utils"
import { callInterceptor } from "../utils/interceptor"
import { isDef, isEmpty, isNoEmpty, isFunction } from "../utils/check"
import { cascaderPanelEmits, cascaderPanelProps } from "./index"
import { useRect, useUnit, useColor, useRects, useStyle } from "../hooks"
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

// 字段映射：响应 props.fieldKeys 变化
const fieldKeys = computed(() => merge({ text: "text", value: "value", children: "children", disabled: "disabled" }, props.fieldKeys))

// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.height !== undefined) style["--ui-cascader-panel-height" as any] = useUnit(props.height)
  if (props.color) style["--ui-cascader-panel-option-color" as any] = useColor(props.color)
  if (props.activeColor) style["--ui-cascader-panel-option-active-color" as any] = useColor(props.activeColor)
  if (props.titleSize) style["--ui-cascader-panel-title-font-size" as any] = useUnit(props.titleSize)
  if (props.titleColor) style["--ui-cascader-panel-title-color" as any] = useColor(props.titleColor)
  if (props.titleWeight) style["--ui-cascader-panel-title-font-weight" as any] = String(props.titleWeight)
  return useStyle(style)
})

// 当前激活 tab 下划线位置
const tabsLineStyle = computed<CSSProperties>(() => {
  const rect = tabsRect.value[activeTab.value]
  if (!rect) return {}
  return { left: `${rect.left}px`, width: `${rect.width}px` }
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

// 根据当前选中值还原 tab 链路
function updateTabs() {
  const options = props.options
  const keys = fieldKeys.value

  if (isDef(currentValue.value)) {
    const selectedOptions = getSelectedOptionsByValue(clone(options), currentValue.value)

    if (selectedOptions) {
      let optionsCursor: CascaderPanelOption[] | undefined = options

      tabs.value = selectedOptions.map((option) => {
        const tab = { options: optionsCursor, selected: option }

        const next = optionsCursor!.find((item: any) => item[keys.value] === option[keys.value])
        if (next) {
          optionsCursor = next[keys.children] as CascaderPanelOption[] | undefined
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

// 递归查找 value 对应的选中链路
function getSelectedOptionsByValue(options: CascaderPanelOption[], value: string | number): CascaderPanelOption[] | undefined {
  const keys = fieldKeys.value
  for (const option of options) {
    if (option[keys.value] === value) return [option]

    const children = option[keys.children] as CascaderPanelOption[] | undefined
    if (children && children.length > 0) {
      const selectedOptions = getSelectedOptionsByValue(children, value)
      if (selectedOptions) return [option, ...selectedOptions]
    }
  }
  return undefined
}

// 测量 tab 节点位置（驱动下划线）；rect.left 为视口坐标，需减去容器自身偏移得到相对位置
async function updateRect() {
  await nextTick()
  const tabRects = await useRects(".ui-cascader-panel__tabs__tab", instance)
  const containerRect = await useRect(".ui-cascader-panel__tabs", instance)
  const offset = containerRect?.left ?? 0
  tabsRect.value = tabRects.map((r) => ({ ...r, left: (r.left ?? 0) - offset }))
}

function onClickTab(_item: CascaderPanelTab, index: number) {
  activeTab.value = index
  emits("clickTab", { index })
}

function onClickOption(option: CascaderPanelOption, index: number, optionIndex: number) {
  const keys = fieldKeys.value
  if (option[keys.disabled]) return

  const next = () => {
    tabs.value[index].selected = option

    if (tabs.value.length > index + 1) {
      tabs.value = tabs.value.slice(0, index + 1)
    }

    const children = option[keys.children] as CascaderPanelOption[] | undefined
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
    const selectedValue = option[keys.value] as string | number
    const selectedText = String(option[keys.text] ?? "")

    const params = { value: selectedValue, text: selectedText, index, selectedOptions }
    currentValue.value = selectedValue
    emits("change", toRaw(params))

    if (isEmpty(children)) {
      emits("finish", toRaw(params))
      emits("update:modelValue", selectedValue)
    }
  }

  if (isFunction(props.beforeChange)) {
    const indexs = [...tabs.value.filter((tab) => tab.selected).map((tab) => tab.options.findIndex((item: any) => item[keys.value] === tab.selected?.[keys.value]))]
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
.ui-cascader-panel {
  --ui-cascader-panel-height: 100%;
  --ui-cascader-panel-tab-height: 60rpx;
  --ui-cascader-panel-line-height: 4rpx;
  --ui-cascader-panel-title-color: var(--ui-color-text);
  --ui-cascader-panel-option-color: var(--ui-color-text);
  --ui-cascader-panel-title-font-size: var(--ui-font-size-sm);
  --ui-cascader-panel-title-font-weight: var(--ui-font-weight-bold);
  --ui-cascader-panel-option-active-color: var(--ui-color-primary);

  height: var(--ui-cascader-panel-height);
  display: flex;
  position: relative;
  flex-direction: column;

  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    justify-content: space-between;

    &__title {
      color: var(--ui-cascader-panel-title-color);
      font-size: var(--ui-cascader-panel-title-font-size);
      font-weight: var(--ui-cascader-panel-title-font-weight);
    }
  }

  &__tabs {
    height: var(--ui-cascader-panel-tab-height);
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
      height: var(--ui-cascader-panel-line-height);
      position: absolute;
      background: var(--ui-color-primary);
      transition: all var(--ui-transition-duration);
      border-radius: var(--ui-radius-sm);
    }
  }

  &__swiper {
    flex: 1;
    padding-top: var(--ui-spacing-md);

    &__item {
      overflow: hidden;
      position: relative;
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
      color: var(--ui-cascader-panel-option-color);
      display: flex;
      padding: 0 var(--ui-spacing-md);
      font-size: var(--ui-font-size-sm);
      align-items: center;
      justify-content: space-between;

      &--selected {
        color: var(--ui-cascader-panel-option-active-color);
      }

      &--disabled {
        opacity: var(--ui-opacity-disabled);
        pointer-events: none;
      }

      &__text {
        flex: 1;
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
    background: var(--ui-color-mask-light);
    align-items: center;
    justify-content: center;
  }
}
</style>
