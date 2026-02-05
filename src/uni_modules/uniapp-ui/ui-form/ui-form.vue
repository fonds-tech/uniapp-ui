<template>
  <view class="ui-form" :class="[classs, customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { FormValidateError, FormValidateCallback, FormValidationStatus } from "../ui-form"
import { clone } from "../utils/utils"
import { useStyle, useChildren } from "../hooks"
import { ref, computed, reactive } from "vue"
import { formKey, formEmits, formProps } from "../ui-form"

defineOptions({ name: "ui-form" })

const props = defineProps(formProps)
const emits = defineEmits(formEmits)
const { childrens, linkChildren } = useChildren(formKey)

const initialModel = ref(clone(props.model))
// 存储各子组件的标签宽度 { [uid]: width }
const labelWidthMap = reactive<Record<number, number>>({})

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.readonly) list.push("ui-form--readonly")
  if (props.disabled) list.push("ui-form--disabled")
  return list
})

const model = computed({ get: () => props.model, set: (value) => emits("update:model", value) })
const maxLabelWidth = computed(() => {
  const widths = Object.values(labelWidthMap).filter((w) => w > 0)
  return widths.length > 0 ? Math.max(...widths) : 0
})

/**
 * 注册子组件的标签宽度
 */
function registerLabelWidth(uid: number, width: number, isTop: boolean) {
  if (isTop) {
    // labelPosition 为 top 时不参与计算
    delete labelWidthMap[uid]
  } else {
    labelWidthMap[uid] = width
  }
}

/**
 * 注销子组件的标签宽度
 */
function unregisterLabelWidth(uid: number) {
  delete labelWidthMap[uid]
}

/**
 * 提交表单
 */
function submit() {
  const values = getValues()
  doValidate()
    .then(() => {
      emits("submit", values)
    })
    .catch((errors: FormValidateError[]) => {
      emits("failed", { values, errors })
    })
}

/**
 * 验证全部字段
 */
function validate(callback?: FormValidateCallback): Promise<void> | void {
  const promise = doValidate()
  if (callback) {
    promise.then(() => callback(true)).catch((errors: FormValidateError[]) => callback(false, errors))
    return
  }
  return promise
}

/**
 * 验证单个字段
 */
function validateField(prop: string, callback?: FormValidateCallback): Promise<void> | void {
  const promise = doValidateField(prop)
  if (callback) {
    promise.then(() => callback(true)).catch((errors: FormValidateError[]) => callback(false, errors))
    return
  }
  return promise
}

/**
 * 验证多个指定字段
 */
function validateFields(fieldProps: string[], callback?: FormValidateCallback): Promise<void> | void {
  const promise = props.validateFirst ? doValidateSeq(fieldProps) : doValidateAll(fieldProps)
  if (callback) {
    promise.then(() => callback(true)).catch((errors: FormValidateError[]) => callback(false, errors))
    return
  }
  return promise
}

/**
 * 内部：执行全部字段验证
 */
function doValidate() {
  return props.validateFirst ? doValidateSeq() : doValidateAll()
}

/**
 * 内部：串行验证字段
 */
function doValidateSeq(fieldProps?: string[]) {
  return new Promise<void>((resolve, reject) => {
    const errors: FormValidateError[] = []
    const fields = getFieldsByProps(fieldProps)

    fields
      .reduce(
        (promise, field) =>
          promise.then(() => {
            if (!errors.length) {
              return field.exposed.validate().then((error?: FormValidateError) => {
                if (error) {
                  errors.push(error)
                }
              })
            }
          }),
        Promise.resolve(),
      )
      .then(() => {
        if (errors.length) {
          reject(errors)
        } else {
          resolve()
        }
      })
  })
}

/**
 * 内部：并行验证所有字段
 */
function doValidateAll(fieldProps?: string[]) {
  return new Promise<void>((resolve, reject) => {
    const fields = getFieldsByProps(fieldProps)
    Promise.all(fields.map((item) => item.exposed.validate())).then((errors) => {
      errors = errors.filter(Boolean)
      if (errors.length) {
        reject(errors)
      } else {
        resolve()
      }
    })
  })
}

/**
 * 内部：验证单个字段
 */
function doValidateField(prop: string) {
  return new Promise<void>((resolve, reject) => {
    const children = childrens.find((item) => item.exposed.props.prop === prop)
    if (children) {
      children.exposed.validate().then((error?: FormValidateError) => {
        if (error) {
          reject([error])
        } else {
          resolve()
        }
      })
    } else {
      reject([])
    }
  })
}

/**
 * 重置单项，将其重置为初始值，并移除校验结果
 * @param prop 字段属性
 */
function resetFields(prop?: string | string[]) {
  if (typeof prop === "string") prop = [prop]
  const fields = getFieldsByProps(prop)
  fields?.forEach((item) => item.exposed.resetField())
}

/**
 * 清除字段验证
 * @param prop 待重置验证的属性，可以是字符串或字符串数组
 */
function clearValidate(prop?: string | string[]) {
  if (typeof prop === "string") {
    prop = [prop]
  }
  const fields = getFieldsByProps(prop)
  fields?.forEach((item) => {
    item.exposed.resetValidate()
  })
}

/**
 * 获取所有字段的值
 * @returns 所有字段的值组成的对象
 */
function getValues() {
  return childrens.reduce<Record<string, unknown>>((form, field) => {
    if (field.exposed.prop !== undefined) {
      form[field.exposed.prop] = props.model[field.exposed.prop]
    }
    return form
  }, {})
}

/**
 * 根据字段属性数组获取对应的字段
 * @param fieldProps 字段属性数组
 * @returns 符合条件的字段数组
 */
function getFieldsByProps(fieldProps?: string[]) {
  return fieldProps ? childrens.filter((field) => fieldProps.includes(field.exposed.prop)) : childrens.filter((field) => field.exposed.prop)
}

/**
 * 获取所有字段的验证状态
 */
function getValidateStatus() {
  return childrens.reduce<Record<string, FormValidationStatus>>((form, field) => {
    form[field.exposed.prop] = field.exposed.getValidationStatus()
    return form
  }, {})
}

linkChildren({ props, model, rules: props.rules, initialModel, maxLabelWidth, registerLabelWidth, unregisterLabelWidth })
defineExpose({ submit, validate, validateField, validateFields, resetFields, getValues, clearValidate, getValidateStatus })
</script>

<script lang="ts">
export default {
  name: "ui-form",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-form:empty {
  display: none;
}
</style>
