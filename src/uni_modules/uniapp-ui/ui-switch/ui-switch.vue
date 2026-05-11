<template>
  <view class="ui-switch" :class="[classNames, customClass]" :style="[rootStyle]" @click="onClick">
    <view v-if="props.activeText" class="ui-switch__text ui-switch__text--left" :class="{ 'ui-switch__text--visible': isActive }">
      {{ props.activeText }}
    </view>
    <view class="ui-switch__node">
      <ui-loading v-if="props.loading" :size="props.loadingIconSize" :color="props.loadingIconColor" />
      <slot v-else name="node" :checked="isActive" />
    </view>
    <view v-if="props.inactiveText" class="ui-switch__text ui-switch__text--right" :class="{ 'ui-switch__text--visible': !isActive }">
      {{ props.inactiveText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import type { SwitchValue } from "./index"
import type { CSSProperties } from "vue"
import { isFunction } from "../utils/check"
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed } from "vue"
import { switchEmits, switchProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-switch" })

const props = defineProps(switchProps)
const emits = defineEmits(switchEmits)

const { parent: formItem } = useParent(formItemKey)
const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(formItem?.disabled?.value))

const active = ref<SwitchValue>(props.modelValue)
const isActive = computed(() => active.value === props.activeValue)

const classNames = computed(() => {
  const list: string[] = []
  if (isActive.value) list.push("ui-switch--active")
  if (effectiveDisabled.value) list.push("ui-switch--disabled")
  if (props.loading) list.push("ui-switch--loading")
  return list
})

// 根节点 CSS var 注入：颜色 / 尺寸 / 文字
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.activeColor) vars["--ui-switch-color-active"] = useColor(props.activeColor)
  if (props.inactiveColor) vars["--ui-switch-color-inactive"] = useColor(props.inactiveColor)
  if (props.size) vars["--ui-switch-size"] = useUnit(props.size)
  if (props.gutter) vars["--ui-switch-gutter"] = useUnit(props.gutter)
  if (props.textSize) vars["--ui-switch-text-size"] = useUnit(props.textSize)
  if (props.textColor) vars["--ui-switch-text-color"] = useColor(props.textColor)
  if (props.textWeight) vars["--ui-switch-text-weight"] = String(props.textWeight)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

watch(
  () => props.modelValue,
  (val) => {
    if (val !== active.value) active.value = val
  },
)

function onClick() {
  if (props.loading || effectiveDisabled.value) return
  updateValue(isActive.value ? props.inactiveValue : props.activeValue)
}

function updateValue(value: SwitchValue) {
  const commit = (val: SwitchValue = value) => {
    active.value = val
    emits("change", val)
    emits("update:modelValue", val)
  }
  if (isFunction(props.beforeChange)) {
    props.beforeChange(value, commit)
  } else {
    commit()
  }
}

defineExpose({ name: "ui-switch" })
</script>

<script lang="ts">
export default {
  name: "ui-switch",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-switch {
  --ui-switch-size: 40rpx;
  --ui-switch-gutter: 4rpx;
  --ui-switch-text-size: var(--ui-font-size-xs);
  --ui-switch-node-color: var(--ui-color-background);
  --ui-switch-text-color: var(--ui-color-text-inverse);
  --ui-switch-text-weight: var(--ui-font-weight-normal);
  --ui-switch-color-active: var(--ui-color-primary);
  --ui-switch-color-inactive: var(--ui-color-border);

  width: calc(var(--ui-switch-size) * 2);
  height: var(--ui-switch-size);
  display: inline-flex;
  overflow: hidden;
  position: relative;
  background: var(--ui-switch-color-inactive);
  transition: background-color var(--ui-transition-duration) cubic-bezier(0.3, 1.05, 0.4, 1.05);
  flex-shrink: 0;
  border-radius: var(--ui-radius-round);

  &--active {
    background: var(--ui-switch-color-active);
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
  }

  &--loading {
    pointer-events: none;
  }

  &__node {
    top: var(--ui-switch-gutter);
    left: var(--ui-switch-gutter);
    width: calc(var(--ui-switch-size) - var(--ui-switch-gutter) * 2);
    height: calc(var(--ui-switch-size) - var(--ui-switch-gutter) * 2);
    display: flex;
    position: absolute;
    background: var(--ui-switch-node-color);
    box-shadow: var(--ui-shadow-sm);
    transition: transform var(--ui-transition-duration) cubic-bezier(0.3, 1.05, 0.4, 1.05);
    align-items: center;
    border-radius: 50%;
    justify-content: center;
  }

  // 激活时 node 平移：distance = switchWidth - nodeWidth - 2*gutter = 2*size - (size - 2*gutter) - 2*gutter = size
  &--active &__node {
    transform: translateX(var(--ui-switch-size));
  }

  &__text {
    color: var(--ui-switch-text-color);
    opacity: 0;
    padding: 0 var(--ui-spacing-xs);
    z-index: 1;
    font-size: var(--ui-switch-text-size);
    align-self: center;
    transition: opacity var(--ui-transition-duration);
    font-weight: var(--ui-switch-text-weight);
    line-height: 1;
    white-space: nowrap;

    &--left {
      margin-right: auto;
    }

    &--right {
      margin-left: auto;
    }

    &--visible {
      opacity: 1;
    }
  }
}
</style>
