<template>
  <view class="ui-form-item" :class="[customClass]" :style="[style]">
    <view class="ui-form-item__main" :class="[mainClass]">
      <view class="ui-form-item__label" :class="[labelClass]" :style="[labelStyle]">
        <slot name="label"> {{ label }}{{ colon ? ":" : "" }} </slot>
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
import { clone, toArray, getDeepValue } from "../utils/utils"
import { isDef, isEmpty, isNoEmpty, isPromise, isFunction } from "../utils/check"
import { formItemKey, formItemEmits, formItemProps, useFormItemProps } from "./index"
import { ref, toRaw, computed, nextTick, reactive, useSlots, onMounted, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useParent, usePxToRpx, useChildren, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-form-item" })

const props = defineProps(formItemProps)
const emits = defineEmits(formItemEmits)

const useProps = useFormItemProps(props)

const slots = useSlots()

const state = reactive({ status: "unvalidated", focused: false, validateMessage: "" })
const inited = ref(false)
const errorRect = ref<UniApp.NodeInfo>({})
const labelRect = ref<UniApp.NodeInfo>({ width: 0 })
const instance = getCurrentInstance()

const { parent: form } = useParent(formKey)
const { linkChildren } = useChildren(formItemKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.padding = useUnit(useProps.padding)
  if (prop("border")) {
    style.borderBottom = `2rpx solid ${useColor(prop("borderColor"))}`
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const mainClass = computed(() => {
  const list: string[] = []
  if (prop("labelPosition") === "top") {
    list.push("ui-form-item__main--position-top")
  }
  if (prop("labelAlign")) {
    list.push(`ui-form-item__main--align-${prop("labelAlign")}`)
  }
  return list
})

const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("labelColor"))
  style.fontSize = useUnit(prop("labelSize"))
  style.lineHeight = prop("labelLineHeight")
  style.fontWeight = prop("labelWeight")
  // 当 labelPosition 为 top 时，不受 labelWidth 控制，自动撑满
  if (prop("labelPosition") !== "top") {
    if (prop("labelWidth")) {
      style.width = useUnit(prop("labelWidth"))
    }
    if (inited.value && prop("labelWidth") === "auto" && form.maxLabelWidth.value >= 0) {
      style.width = `${usePxToRpx(form.maxLabelWidth.value)}rpx`
    }
  } else {
    style.width = "100%"
  }
  if (prop("labelPosition") === "top") {
    style.marginBottom = useUnit(prop("labelGap"))
  }
  if (["left", "right"].includes(prop("labelPosition"))) {
    style.marginRight = useUnit(prop("labelGap"))
  }

  return useStyle(style)
})

const labelClass = computed(() => {
  const list: string[] = []
  list.push(`ui-form-item__label--${prop("labelPosition")}`)
  if (prop("required")) {
    list.push("ui-form-item__label--required")
  }
  if (useProps.label || slots.label) {
    list.push("ui-form-item__label--effective")
  }
  return list
})

const contentClass = computed(() => {
  const list: string[] = []
  list.push(`ui-form-item__content--${prop("contentAlign")}`)
  return list
})

const errorStyle = computed(() => {
  const style: any = {}
  style.color = useColor(prop("errorMessageColor"))
  style.fontSize = useUnit(prop("errorMessageSize"))
  style.textAlign = prop("errorMessageAlign")
  style.fontWeight = prop("errorMessageWeight")
  return useStyle(style)
})

const errorClass = computed(() => {
  const list: string[] = []
  if (state.status === "failed") {
    list.push("ui-form-item__error--failed")
  }
  return list
})

const errorOffsetStyle = computed(() => {
  const style: CSSProperties = {}
  style.marginRight = 0
  if (prop("labelWidth")) {
    style.width = useUnit(prop("labelWidth"))
  }
  if (inited.value && prop("labelWidth") === "auto" && form.maxLabelWidth.value >= 0) {
    style.width = `${usePxToRpx(form.maxLabelWidth.value)}rpx`
  }
  if (prop("labelPosition") === "top") {
    style.width = "100%"
    style.marginBottom = useUnit(prop("labelGap"))
  }
  if (["left", "right"].includes(prop("labelPosition"))) {
    if ((prop("labelWidth") !== "auto" && useUnitToPx(prop("labelWidth")) > 0) || form.maxLabelWidth.value > 0) {
      style.marginRight = useUnit(prop("labelGap"))
    } else {
      style.marginRight = 0
    }
  }
  return useStyle(style)
})

const errorTextStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("errorMessageColor"))
  return useStyle(style)
})

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(form.props[name])) return form.props[name]
  return ""
}

/**
 * 执行一组验证规则
 * @param rules 表单验证规则数组
 * @returns 返回一个 Promise<void> 对象
 */
function runRules(rules: FormValidateRule[]): Promise<void> {
  return rules.reduce(
    (promise, rule) =>
      promise.then(() => {
        if (state.status === "failed") return
        let value = getPropValue()
        if (rule.formatter) {
          value = rule.formatter(value, rule)
        }

        if (!runSyncRule(value, rule)) {
          state.status = "failed"
          state.validateMessage = getRuleMessage(value, rule)
          return
        }
        if (rule.validator) {
          if (isEmpty(value) && rule.validateEmpty === false) {
            return
          }

          return runRuleValidator(value, rule).then((result) => {
            if (result && typeof result === "string") {
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

/**
 * 执行同步验证规则
 * @param value 待验证的值
 * @param rule 表单验证规则对象
 * @returns 返回验证结果，true表示验证通过，false表示验证失败
 */
function runSyncRule(value: unknown, rule: FormValidateRule) {
  if (isEmpty(value)) {
    if (rule.required) {
      return false
    }
    if (rule.validateEmpty === false) {
      return true
    }
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false
  }
  return true
}

/**
 * 执行验证规则的验证器
 * @param value 待验证的值
 * @param rule 表单验证规则对象
 * @returns 返回一个 Promise 对象
 */
function runRuleValidator(value: unknown, rule: FormValidateRule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator!(value, toRaw(rule))

    if (isPromise(returnVal)) {
      returnVal.then(resolve)
      return
    }

    resolve(returnVal)
  })
}

/**
 * 获取验证规则的消息
 * @param value 待验证的值
 * @param rule 表单验证规则对象
 */
function getRuleMessage(value: unknown, rule: FormValidateRule) {
  const { message } = rule

  if (isFunction(message)) {
    return message(value, rule)
  }
  return message || useProps.errorMessage
}

/**
 * 执行表单验证
 * @param rules 表单验证规则，默认为获取属性规则
 * @returns 返回一个 Promise，可能包含 FieldValidateError 对象或 void
 */
function validate(rules = getPropRules()) {
  return new Promise<FormValidateError | void>((resolve) => {
    resetValidate()
    if (isNoEmpty(rules)) {
      runRules(rules).then(() => {
        if (state.status === "failed") {
          resolve({ prop: useProps.prop, message: state.validateMessage })
        } else {
          state.status = "passed"
          resolve()
        }
      })
    } else {
      resolve()
    }
  })
}

function validateWithTrigger(trigger: FormValidateTrigger) {
  const rules = getPropRules()
  if (form && isNoEmpty(rules)) {
    const { validateTrigger } = form.props
    const defaultTrigger = toArray(validateTrigger).includes(trigger)
    const result = rules.filter((rule: FormValidateRule) => {
      if (rule.trigger) {
        return toArray(rule.trigger).includes(trigger)
      }
      return defaultTrigger
    })
    if (result.length) {
      validate(result)
    }
  }
}

/**
 * 重置字段状态
 */
async function resetField() {
  if (!form) {
    console.warn("[ui-form-item] resetField: 必须在 ui-form 组件内使用")
    return
  }
  const value = form.initialModel.value[useProps.prop]
  form.model.value[useProps.prop] = clone(value)
  await nextTick()
  resetValidate()
}

/**
 * 重置验证状态
 */
function resetValidate() {
  state.status = "unvalidated"
}

/**
 * 获取属性值
 * @returns 返回属性值
 */
function getPropValue() {
  if (!form) {
    console.warn("[ui-form-item] getPropValue: 必须在 ui-form 组件内使用")
    return undefined
  }
  return getDeepValue(form.model.value, useProps.prop)
}

/**
 * 获取属性验证规则
 * @returns 返回属性值
 */
function getPropRules() {
  if (!form) {
    return undefined
  }
  return getDeepValue(form.rules, useProps.prop)
}

/**
 * 重新获取元素rect
 */
async function resize() {
  await nextTick()
  labelRect.value = await useRect(".ui-form-item__label", instance)
  errorRect.value = await useRect(".ui-form-item__error__text", instance)
  inited.value = true
}

/**
 * 失去焦点事件处理函数
 */
function onBlur() {
  validateWithTrigger("blur")
}

/**
 * 值变化处理函数
 */
function onChange() {
  validateWithTrigger("change")
}

onMounted(resize)
linkChildren({ props, prop: useProps.prop, onBlur, onChange })
defineExpose({
  useProps,
  prop: useProps.prop,
  // 安全访问 form.model.value，避免 form 为 null 时报错
  modelValue: form?.model?.value?.[useProps.prop],
  labelRect,
  validate,
  resetField,
  resetValidate,
  labelPosition: prop("labelPosition"),
})
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
    width: max-content;
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
      margin-right: var(--ui-spacing-xl);
    }

    &--required {
      &::after {
        color: var(--ui-color-danger);
        content: "*";
        margin-top: var(--ui-spacing-xs);
        margin-left: var(--ui-spacing-xs);
      }
    }
  }

  &__content {
    flex: 1;
    display: flex;

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
      margin-right: var(--ui-spacing-xl);
    }
  }
}
</style>
