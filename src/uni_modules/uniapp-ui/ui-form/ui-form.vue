<template>
  <view class="ui-form" :class="[classNames, customClass]" :style="[customStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { FormValidateError, FormValidateCallback, FormValidationStatus } from "../ui-form"
import { useChildren } from "../hooks"
import { clone, getDeepValue } from "../utils/utils"
import { formKey, formEmits, formProps } from "../ui-form"
import { ref, watch, computed, reactive } from "vue"

defineOptions({ name: "ui-form" })

const props = defineProps(formProps)
const emits = defineEmits(formEmits)
const { childrens, linkChildren } = useChildren(formKey)

const initialModel = ref(clone(props.model))
// 子组件标签宽度收集 { [uid]: width }，用于 labelWidth=auto 时对齐
const labelWidthMap = reactive<Record<number, number>>({})

const model = computed({ get: () => props.model, set: (v) => emits("update:model", v) })

// 子组件深层 mutation（如 form-item resetField + setDeepValue）不会触发 set，
// 这里 deep watch 兜底，让 v-model:model 能拿到任意字段变化（同对象引用，不致循环）
watch(
  () => props.model,
  (v) => emits("update:model", v),
  { deep: true },
)
const maxLabelWidth = computed(() => {
  const widths = Object.values(labelWidthMap).filter((w) => w > 0)
  return widths.length > 0 ? Math.max(...widths) : 0
})

const classNames = computed(() => {
  const list: string[] = []
  if (props.readonly) list.push("ui-form--readonly")
  if (props.disabled) list.push("ui-form--disabled")
  return list
})

function registerLabelWidth(uid: number, width: number, isTop: boolean) {
  if (isTop) delete labelWidthMap[uid]
  else labelWidthMap[uid] = width
}

function unregisterLabelWidth(uid: number) {
  delete labelWidthMap[uid]
}

function getFieldsByProps(fieldProps?: string[]) {
  return fieldProps ? childrens.filter((f) => fieldProps.includes(f.exposed.props.prop)) : childrens.filter((f) => f.exposed.props.prop)
}

function getValues() {
  return childrens.reduce<Record<string, unknown>>((acc, field) => {
    const p = field.exposed.props.prop
    if (p !== undefined) acc[p] = getDeepValue(props.model, p)
    return acc
  }, {})
}

async function doValidateAll(fieldProps?: string[]) {
  const fields = getFieldsByProps(fieldProps)
  const results = await Promise.all(fields.map((f) => f.exposed.validate()))
  const errors = results.filter(Boolean) as FormValidateError[]
  if (errors.length) return Promise.reject(errors)
}

async function doValidateSeq(fieldProps?: string[]) {
  const fields = getFieldsByProps(fieldProps)
  const errors: FormValidateError[] = []
  for (const field of fields) {
    if (errors.length) break
    const error = await field.exposed.validate()
    if (error) errors.push(error)
  }
  if (errors.length) return Promise.reject(errors)
}

async function doValidateField(prop: string) {
  const field = childrens.find((f) => f.exposed.props.prop === prop)
  if (!field) return Promise.reject([])
  const error = await field.exposed.validate()
  if (error) return Promise.reject([error])
}

function doValidate() {
  return props.validateFirst ? doValidateSeq() : doValidateAll()
}

function withCallback(promise: Promise<void>, callback?: FormValidateCallback): Promise<void> | void {
  if (!callback) return promise
  promise.then(() => callback(true)).catch((errors: FormValidateError[]) => callback(false, errors))
}

function validate(callback?: FormValidateCallback) {
  return withCallback(doValidate(), callback)
}

function validateField(prop: string, callback?: FormValidateCallback) {
  return withCallback(doValidateField(prop), callback)
}

function validateFields(fieldProps: string[], callback?: FormValidateCallback) {
  return withCallback(props.validateFirst ? doValidateSeq(fieldProps) : doValidateAll(fieldProps), callback)
}

function submit() {
  const values = getValues()
  doValidate()
    .then(() => emits("submit", values))
    .catch((errors: FormValidateError[]) => emits("failed", { values, errors }))
}

function resetFields(prop?: string | string[]) {
  if (typeof prop === "string") prop = [prop]
  getFieldsByProps(prop).forEach((f) => f.exposed.resetField())
}

function clearValidate(prop?: string | string[]) {
  if (typeof prop === "string") prop = [prop]
  getFieldsByProps(prop).forEach((f) => f.exposed.resetValidate())
}

function getValidateStatus() {
  return childrens.reduce<Record<string, FormValidationStatus>>((acc, field) => {
    acc[field.exposed.props.prop] = field.exposed.getValidationStatus()
    return acc
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
.ui-form {
  width: 100%;

  &:empty {
    display: none;
  }
}
</style>
