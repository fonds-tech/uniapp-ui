<template>
  <view class="ui-form-item" :class="[customClass]" :style="[rootStyle]">
    <view class="ui-form-item__main" :class="[mainClass]">
      <view v-if="isLabelEffective" class="ui-form-item__label" :class="[labelClass]" :style="[labelStyle]">
        <slot name="label">{{ label }}{{ colon ? ":" : "" }}</slot>
      </view>
      <view class="ui-form-item__content" :class="[contentClass]">
        <slot />
      </view>
    </view>
    <view class="ui-form-item__error" :class="[errorClass]" :style="[errorStyle]">
      <view class="ui-form-item__error__offset" :style="[errorOffsetStyle]" />
      <slot name="error" :message="state.validateMessage">
        <view class="ui-form-item__error__text" :style="[errorTextStyle]">
          {{ state.validateMessage }}
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { FormValidateRule, FormValidateError, FormValidateTrigger } from "../ui-form"
import { formKey } from "../ui-form"
import { formItemKey, formItemEmits, formItemProps } from "./index"
import { clone, toArray, getDeepValue, setDeepValue } from "../utils/utils"
import { isDef, isEmpty, isNoEmpty, isPromise, isFunction } from "../utils/check"
import { useRect, useUnit, useColor, useStyle, useParent, usePxToRpx, useChildren, useUnitToPx } from "../hooks"
import { ref, toRaw, computed, nextTick, reactive, useSlots, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-form-item" })

const props = defineProps(formItemProps)
const emits = defineEmits(formItemEmits)
const slots = useSlots()
const instance = getCurrentInstance()
const { parent: form } = useParent(formKey)
const { linkChildren } = useChildren(formItemKey)

const inited = ref(false)
const state = reactive({ status: "unvalidated", focused: false, validateMessage: "" })

const isLabelEffective = computed(() => Boolean(slots.label || props.label))

// 有效禁用 / 只读：form 级与 form-item 级合并（任一为 true 即生效）
const formItemDisabled = computed(() => Boolean(getProp("disabled")))
const formItemReadonly = computed(() => Boolean(getProp("readonly")))

// 有效 label 宽度：labelWidth="auto" 且兄弟项已注册时取最大值对齐
const effectiveLabelWidth = computed(() => {
  const w = getProp("labelWidth")
  if (!w) return ""
  if (inited.value && w === "auto" && (form?.maxLabelWidth.value ?? 0) > 0) {
    return `${usePxToRpx(form!.maxLabelWidth.value)}rpx`
  }
  return useUnit(w)
})

const showRequiredMark = computed(() => {
  const r = getProp("required")
  if (r === true) return true
  if (r === false) return false
  if (!props.prop) return false
  const rules = getPropRules()
  if (!rules) return false
  return (Array.isArray(rules) ? rules : [rules]).some((rule: any) => rule?.required === true)
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.padding = useUnit(props.padding)
  if (getProp("border")) {
    style.borderBottom = `2rpx solid ${useColor(getProp("borderColor"))}`
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const mainClass = computed(() => {
  const list: string[] = []
  if (getProp("labelPosition") === "top") list.push("ui-form-item__main--position-top")
  if (getProp("labelAlign")) list.push(`ui-form-item__main--align-${getProp("labelAlign")}`)
  return list
})

const labelClass = computed(() => {
  const list = [`ui-form-item__label--${getProp("labelPosition")}`]
  if (showRequiredMark.value) list.push("ui-form-item__label--required")
  if (isLabelEffective.value) list.push("ui-form-item__label--effective")
  return list
})

const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(getProp("labelColor"))
  style.fontSize = useUnit(getProp("labelSize"))
  style.lineHeight = getProp("labelLineHeight")
  style.fontWeight = getProp("labelWeight")
  if (getProp("labelPosition") === "top") {
    style.width = "100%"
    style.marginBottom = useUnit(getProp("labelGap"))
  } else {
    if (effectiveLabelWidth.value) style.width = effectiveLabelWidth.value
    style.marginRight = useUnit(getProp("labelGap"))
  }
  return useStyle(style)
})

const contentClass = computed(() => [`ui-form-item__content--${getProp("contentAlign")}`])

const errorClass = computed(() => {
  const list: string[] = []
  if (state.status === "failed") list.push("ui-form-item__error--failed")
  return list
})

const errorStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(getProp("errorMessageColor"))
  style.fontSize = useUnit(getProp("errorMessageSize"))
  style.textAlign = getProp("errorMessageAlign")
  style.fontWeight = getProp("errorMessageWeight")
  return useStyle(style)
})

const errorOffsetStyle = computed(() => {
  const style: CSSProperties = {}
  if (getProp("labelPosition") === "top") {
    style.width = "100%"
    style.marginRight = 0
    if (isLabelEffective.value) style.marginBottom = useUnit(getProp("labelGap"))
    return useStyle(style)
  }
  if (effectiveLabelWidth.value) style.width = effectiveLabelWidth.value
  // 仅 label 占位有宽度时给右间距，否则贴左
  const hasWidth = (getProp("labelWidth") !== "auto" && useUnitToPx(getProp("labelWidth")) > 0) || (form?.maxLabelWidth.value ?? 0) > 0
  style.marginRight = hasWidth ? useUnit(getProp("labelGap")) : 0
  return useStyle(style)
})

const errorTextStyle = computed(() => useStyle({ color: useColor(getProp("errorMessageColor")) }))

// 优先取自身 prop，回退到 form 上同名 prop
function getProp(name: string): any {
  if (isDef((props as any)[name])) return (props as any)[name]
  if (form && isDef((form.props as any)[name])) return (form.props as any)[name]
  return ""
}

function getPropValue() {
  if (!form) return undefined
  return getDeepValue(form.model.value, props.prop)
}

function getPropRules() {
  if (!form) return undefined
  // 优先直接匹配 key（支持 "a.b.c" 这种带点的扁平 key）
  if (props.prop && form.rules[props.prop]) return form.rules[props.prop]
  return getDeepValue(form.rules, props.prop)
}

function getRuleMessage(value: unknown, rule: FormValidateRule) {
  const { message } = rule
  if (isFunction(message)) return message(value, rule)
  return message || props.errorMessage
}

function runSyncRule(value: unknown, rule: FormValidateRule) {
  if (isEmpty(value)) {
    if (rule.required) return false
    if (rule.validateEmpty === false) return true
  }
  if (rule.pattern && !rule.pattern.test(String(value))) return false
  return true
}

function runRuleValidator(value: unknown, rule: FormValidateRule) {
  return new Promise((resolve) => {
    const ret = rule.validator!(value, toRaw(rule))
    if (isPromise(ret)) ret.then(resolve)
    else resolve(ret)
  })
}

function runRules(rules: FormValidateRule[]) {
  return rules.reduce(
    (promise, rule) =>
      promise.then(() => {
        if (state.status === "failed") return
        let value = getPropValue()
        if (rule.formatter) value = rule.formatter(value, rule)

        if (!runSyncRule(value, rule)) {
          state.status = "failed"
          state.validateMessage = getRuleMessage(value, rule)
          return
        }
        if (rule.validator) {
          if (isEmpty(value) && rule.validateEmpty === false) return
          return runRuleValidator(value, rule).then((result) => {
            if (typeof result === "string" && result) {
              state.status = "failed"
              state.validateMessage = result
            } else if (result === false) {
              state.status = "failed"
              state.validateMessage = getRuleMessage(value, rule)
            }
          })
        }
      }),
    Promise.resolve(),
  )
}

async function validate(rules: any = getPropRules()): Promise<FormValidateError | void> {
  resetValidate()
  if (!isNoEmpty(rules)) return
  // 用户可写 rules.foo = { required: true } 单对象，标准化成数组避免 .reduce 崩
  const rulesArr: FormValidateRule[] = Array.isArray(rules) ? rules : [rules]
  await runRules(rulesArr)
  if (state.status === "failed") return { prop: props.prop, message: state.validateMessage }
  state.status = "passed"
}

function validateWithTrigger(trigger: FormValidateTrigger) {
  const rules = getPropRules()
  if (!form || !isNoEmpty(rules)) return
  const rulesArr: FormValidateRule[] = Array.isArray(rules) ? rules : [rules]
  const defaultTrigger = toArray(form.props.validateTrigger).includes(trigger)
  const matched = rulesArr.filter((rule) => {
    if (rule.trigger) return toArray(rule.trigger).includes(trigger)
    return defaultTrigger
  })
  if (matched.length) validate(matched)
}

async function resetField() {
  if (!form) return
  // 支持深层 prop（"user.profile.name"），需走 getDeepValue / setDeepValue 而非字面 key
  const initial = clone(getDeepValue(form.initialModel.value, props.prop))
  setDeepValue(form.model.value, props.prop, initial)
  await nextTick()
  resetValidate()
}

function resetValidate() {
  state.status = "unvalidated"
}

function onBlur() {
  validateWithTrigger("blur")
}

function onChange() {
  validateWithTrigger("change")
}

// 等待渲染完成再测量 label 宽度。MP 端布局回流较慢，nextTick 后短延迟兜底
async function resize() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 50))
  const rect = await useRect(".ui-form-item__label", instance)
  const w = rect?.width ?? 0
  inited.value = true
  form?.registerLabelWidth?.(instance?.uid ?? 0, w, getProp("labelPosition") === "top")
}

onMounted(resize)

onUnmounted(() => {
  form?.unregisterLabelWidth?.(instance?.uid ?? 0)
})

const validateStatus = computed(() => state.status)

linkChildren({ props, prop: props.prop, onBlur, onChange, disabled: formItemDisabled, readonly: formItemReadonly, validateStatus })
defineExpose({ props, validate, resetField, resetValidate, getValidationStatus: () => state.status })
</script>

<script lang="ts">
export default {
  name: "ui-form-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-form-item {
  flex: 1;
  display: flex;
  padding: var(--ui-spacing-md) 0;
  flex-direction: column;

  &__main {
    flex: 1;
    display: flex;
    align-items: center;

    &--align-top {
      align-items: flex-start;
    }

    &--align-center {
      align-items: center;
    }

    &--align-bottom {
      align-items: flex-end;
    }

    &--position-top {
      align-items: stretch;
      flex-direction: column;
    }
  }

  &__label {
    width: fit-content;
    display: flex;
    flex-shrink: 0;
    white-space: nowrap;

    &--left {
      justify-content: start;
    }

    &--right {
      justify-content: end;
    }

    &--top {
      margin-bottom: var(--ui-spacing-md);
    }

    &--effective {
      margin-right: var(--ui-spacing-lg);
    }

    &--required {
      &::after {
        color: var(--ui-color-danger);
        content: "*";
        line-height: 1;
        margin-left: var(--ui-spacing-xs);
        padding-top: var(--ui-spacing-xs);
      }
    }
  }

  &__content {
    flex: 1;
    display: flex;
    overflow: hidden;

    &--center {
      justify-content: center;
    }

    &--right {
      justify-content: flex-end;
    }
  }

  &__error {
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    max-height: 0;

    &--failed {
      margin-top: var(--ui-spacing-sm);
      max-height: max-content;
    }

    &__text {
      flex: 1;
      color: var(--ui-color-danger);
    }

    &__offset {
      margin-right: var(--ui-spacing-lg);
    }
  }
}
</style>
