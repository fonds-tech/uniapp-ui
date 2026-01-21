<template>
  <view class="ui-form" :class="[classs, customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { FormValidateCallback } from "../ui-form"
import type { FieldValidateError, FieldValidationStatus } from "../ui-field"
import { clone } from "../utils/utils"
import { ref, toRef, computed } from "vue"
import { useStyle, useChildren } from "../hooks"
import { formKey, formEmits, formProps, useFormProps } from "../ui-form"

defineOptions({ name: "ui-form" })

const props = defineProps(formProps)
const emits = defineEmits(formEmits)
const useProps = useFormProps(props)
const { childrens, linkChildren } = useChildren(formKey)

const initialModel = ref(clone(useProps.model))

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (useProps.readonly) list.push("ui-form--readonly")
  if (useProps.disabled) list.push("ui-form--disabled")
  return list
})

const model = computed({ get: () => useProps.model, set: (value) => emits("update:model", value) })
const maxLabelWidth = computed(() => {
  return Math.max(...childrens.filter((child) => child.exposed.labelPosition !== "top").map((child) => toRef(child.exposed.labelRect).value.width))
})

/**
 * 提交表单
 */
function submit() {
  const values = getValues()
  doValidate()
    .then(() => {
      emits("submit", values)
    })
    .catch((errors: FieldValidateError[]) => {
      emits("failed", { values, errors })
    })
}

/**
 * 验证全部字段
 */
function validate(callback?: FormValidateCallback): Promise<void> | void {
  const promise = doValidate()
  if (callback) {
    promise
      .then(() => callback(true))
      .catch((errors: FieldValidateError[]) => callback(false, errors))
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
    promise
      .then(() => callback(true))
      .catch((errors: FieldValidateError[]) => callback(false, errors))
    return
  }
  return promise
}

/**
 * 验证多个指定字段
 */
function validateFields(props: string[], callback?: FormValidateCallback): Promise<void> | void {
  const promise = useProps.validateFirst ? doValidateSeq(props) : doValidateAll(props)
  if (callback) {
    promise
      .then(() => callback(true))
      .catch((errors: FieldValidateError[]) => callback(false, errors))
    return
  }
  return promise
}

/**
 * 内部：执行全部字段验证
 */
function doValidate() {
  return useProps.validateFirst ? doValidateSeq() : doValidateAll()
}

/**
 * 内部：串行验证字段
 */
function doValidateSeq(props?: string[]) {
  return new Promise<void>((resolve, reject) => {
    const errors: FieldValidateError[] = []
    const fields = getFieldsByProps(props)

    fields
      .reduce(
        (promise, field) =>
          promise.then(() => {
            if (!errors.length) {
              return field.exposed.validate().then((error?: FieldValidateError) => {
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
function doValidateAll(props?: string[]) {
  return new Promise<void>((resolve, reject) => {
    const fields = getFieldsByProps(props)
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
    const children = childrens.find((item) => item.exposed.useProps.prop === prop)
    if (children) {
      children.exposed.validate().then((error?: FieldValidateError) => {
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
      form[field.exposed.prop] = useProps.model[field.exposed.prop]
    }
    return form
  }, {})
}

/**
 * 根据props数组获取对应的字段
 * @param props 字段属性数组
 * @returns 符合条件的字段数组
 */
function getFieldsByProps(props?: string[]) {
  return props ? childrens.filter((field) => props.includes(field.exposed.prop)) : childrens.filter((field) => field.exposed.prop)
}

/**
 * 获取所有字段的验证状态
 */
function getValidateStatus() {
  childrens.reduce<Record<string, FieldValidationStatus>>((form, field) => {
    form[field.exposed.prop] = field.exposed.getValidationStatus()
    return form
  }, {})
}

linkChildren({ props, useProps, model, rules: useProps.rules, initialModel, maxLabelWidth })
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
