<template>
  <view class="ui-radio" :class="[classNames, props.customClass]" :style="[rootStyle]" @click.stop="onClick">
    <view class="ui-radio__icon" :class="[iconClassList]">
      <slot name="icon" :checked="isChecked" :disabled="isDisabled">
        <ui-icon v-if="isChecked && actualShape === 'icon'" name="check" class="ui-radio__symbol" color="text-inverse" :size="symbolSize" />
        <view v-else-if="isChecked && actualShape === 'dot'" class="ui-radio__dot" :class="{ 'ui-radio__dot--round': isRound }" />
      </slot>
    </view>
    <view v-if="hasLabel" class="ui-radio__content">
      <view class="ui-radio__label" :class="labelClassList" @click.stop="onClickLabel">
        <slot>{{ props.label }}</slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { RadioProps } from "./index"
import { isDef } from "../utils/check"
import { formItemKey } from "../ui-form-item"
import { radioGroupKey } from "../ui-radio-group"
import { radioEmits, radioProps } from "./index"
import { toRaw, watch, computed, useSlots } from "vue"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-radio" })

const props = defineProps(radioProps)
const emits = defineEmits(radioEmits)
const slots = useSlots()

// 父级 radio-group + form-item（form-item 已合并 form 级 disabled/readonly）
const { index, parent } = useParent(radioGroupKey)
const { parent: formItem } = useParent(formItemKey)

// 内部图标字号：默认占容器 70%（基于 --ui-radio-icon-size 计算）
const symbolSize = "calc(var(--ui-radio-icon-size) * 0.7)"

// 单行 computed：派生状态（短→长排序）
const name = computed(() => (isDef(props.name) ? props.name : index.value))
const isRound = computed(() => !!prop("round"))
const hasLabel = computed(() => !!slots.default || isDef(props.label))
const isChecked = computed(() => (props.bindGroup && parent ? parent.props.modelValue === name.value : !!props.modelValue))
const isDisabled = computed(() => !!prop("disabled") || !!formItem?.disabled?.value)
const isReadonly = computed(() => !!prop("readonly") || !!formItem?.readonly?.value)
const actualShape = computed(() => prop("shape") ?? "dot")
const isLabelLeft = computed(() => prop("labelPosition") === "left")

// 根节点样式：所有 prop 通过 CSS var 注入；SCSS 选择器顶部声明默认值
const rootStyle = computed(() => {
  const s: Record<string, string | number | undefined> = {}
  // 图标尺寸：iconSize > size
  const iconSize = prop("iconSize") ?? prop("size")
  if (iconSize !== undefined) s["--ui-radio-icon-size"] = useUnit(iconSize)
  const iconColor = prop("iconColor")
  if (iconColor) s["--ui-radio-icon-color"] = useColor(iconColor)
  const iconRadius = prop("iconRadius")
  if (iconRadius !== undefined) s["--ui-radio-icon-radius"] = useUnit(iconRadius)
  const checkedColor = prop("color")
  if (checkedColor) s["--ui-radio-checked-color"] = useColor(checkedColor)
  // 标签
  const labelSize = prop("labelSize")
  if (labelSize !== undefined) s["--ui-radio-label-size"] = useUnit(labelSize)
  const labelColor = prop("labelColor")
  if (labelColor) s["--ui-radio-label-color"] = useColor(labelColor)
  const labelWeight = prop("labelWeight")
  if (labelWeight !== undefined) s["--ui-radio-label-weight"] = String(labelWeight)
  const labelGap = prop("labelGap")
  if (labelGap !== undefined) s["--ui-radio-gap"] = useUnit(labelGap)
  const checkedLabelColor = prop("checkedLabelColor")
  if (checkedLabelColor) s["--ui-radio-label-checked-color"] = useColor(checkedLabelColor)
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) })
})
// 根节点类名
const classNames = computed(() => {
  const list: string[] = []
  if (isChecked.value) list.push("ui-radio--checked")
  if (isDisabled.value) list.push("ui-radio--disabled")
  if (isReadonly.value) list.push("ui-radio--readonly")
  if (isLabelLeft.value) list.push("ui-radio--left")
  return list
})
// 图标节点类名：filled = 实心填充（icon 选中），dot-checked = dot 模式选中态粗环
const iconClassList = computed(() => {
  const list: string[] = []
  if (isRound.value) list.push("ui-radio__icon--round")
  if (isChecked.value && actualShape.value === "icon") {
    list.push("ui-radio__icon--filled", "ui-radio__icon--check")
  } else if (isChecked.value && actualShape.value === "dot") {
    list.push("ui-radio__icon--dot-checked")
  } else if (isDisabled.value) {
    list.push("ui-radio__icon--disabled")
  }
  return list
})
// 标签类名
const labelClassList = computed(() => {
  const list: string[] = []
  if (isChecked.value) list.push("ui-radio__label--checked")
  if (isDisabled.value) list.push("ui-radio__label--disabled")
  if (isLabelLeft.value) list.push("ui-radio__label--left")
  return list
})

// 监听选中态向外抛 change（兼容 bindGroup 模式：值由父级管理，无法靠 modelValue 触发）
watch(isChecked, (value) => emits("change", value))

// 取值优先级：自身 prop → 父 group 同名 prop（仅当 bindGroup 且存在父级）
function prop<K extends keyof RadioProps>(key: K): RadioProps[K] | undefined {
  if (props.bindGroup && parent) {
    if (isDef(props[key])) return props[key]
    const parentProps = parent.props as any
    if (isDef(parentProps[key])) return parentProps[key]
  }
  return props[key]
}

// 切换选中状态：在 group 内通过父更新值；独立使用直接 emit
function toggle(check?: boolean) {
  if (isDisabled.value || isReadonly.value) return
  if (parent && props.bindGroup) {
    if (!isChecked.value) parent.updateValue(name.value)
  } else {
    emits("update:modelValue", toRaw(check ?? !props.modelValue))
  }
}

// 根节点点击：先 toggle 再 emit click（toggle 内部已自处理 disabled/readonly）
function onClick(event: Event) {
  toggle()
  emits("click", event)
}
// 标签点击：labelDisabled 时仅屏蔽切换，仍 emit click 让外部能监听拦截尝试
function onClickLabel(event: Event) {
  if (!prop("labelDisabled")) toggle()
  emits("click", event)
}

defineExpose({ name, toggle, props, checked: isChecked })
</script>

<script lang="ts">
export default {
  name: "ui-radio",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-radio {
  --ui-radio-gap: var(--ui-spacing-sm);
  --ui-radio-icon-size: var(--ui-font-size-lg);
  --ui-radio-icon-color: var(--ui-color-border-dark);
  --ui-radio-label-size: var(--ui-font-size-sm);
  --ui-radio-icon-radius: var(--ui-radius-sm);
  --ui-radio-label-color: var(--ui-color-text);
  --ui-radio-label-weight: normal;
  --ui-radio-checked-color: var(--ui-color-primary);
  --ui-radio-label-disabled-color: var(--ui-color-text-disabled);
  gap: var(--ui-radio-gap);
  cursor: pointer;

  display: flex;
  align-items: center;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
  }

  &--readonly {
    cursor: default;
  }

  &--left {
    flex-direction: row-reverse;
  }

  &__icon {
    width: var(--ui-radio-icon-size);
    border: var(--ui-border-width-thick) solid var(--ui-radio-icon-color);
    height: var(--ui-radio-icon-size);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ui-radio-icon-radius);
    justify-content: center;
    background-color: transparent;
    transition-duration: var(--ui-transition-fast);
    transition-property: border-color, background-color, border-width;

    // 圆形（独立修饰，不与状态互斥）
    &--round {
      border-radius: var(--ui-radius-round);
    }

    // 实心填充：icon 选中态
    &--filled {
      border-color: var(--ui-radio-checked-color);
      background-color: var(--ui-radio-checked-color);
    }

    // dot 选中态：粗环（占容器 1/3）+ 主色
    &--dot-checked {
      border-color: var(--ui-radio-checked-color);
      border-width: calc(var(--ui-radio-icon-size) / 3);
    }

    // 未选 + 禁用：灰底（已选 + 禁用走根节点 opacity 削弱）
    &--disabled {
      background-color: var(--ui-color-background-disabled);
    }
  }

  // 内部 iconfont 符号（勾）
  &__symbol {
    line-height: 1;
  }

  // dot 中心点：仅在 dot 模式选中时显示
  &__dot {
    width: 50%;
    height: 50%;
    border-radius: var(--ui-radius-xs);
    background-color: var(--ui-color-text-inverse);

    &--round {
      border-radius: var(--ui-radius-round);
    }
  }

  &__content {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__label {
    flex: 1;
    color: var(--ui-radio-label-color);
    font-size: var(--ui-radio-label-size);
    word-break: break-word;
    font-weight: var(--ui-radio-label-weight);
    line-height: 1.4;

    &--checked {
      color: var(--ui-radio-label-checked-color, var(--ui-radio-label-color));
    }

    &--disabled {
      color: var(--ui-radio-label-disabled-color);
    }
  }
}
</style>
