<template>
  <demo-page>
    <demo-section title="基础用法" desc="model 双向绑定 + rules 校验，validate() 返回 Promise">
      <ui-form ref="formRef" :model="formData" :rules="rules">
        <ui-form-item label="用户名" prop="username">
          <ui-input v-model="formData.username" placeholder="请输入用户名" />
        </ui-form-item>
        <ui-form-item label="密码" prop="password">
          <ui-input v-model="formData.password" type="password" placeholder="请输入密码" />
        </ui-form-item>
        <ui-form-item label="手机号" prop="phone">
          <ui-input v-model="formData.phone" type="number" placeholder="请输入手机号" />
        </ui-form-item>
      </ui-form>
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="onSubmit">提交</ui-button>
        <ui-button type="danger" plain @click="onReset">重置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="必填星号 (required)" desc="auto 跟随 rules / true 全显 / false 全隐 / 单项可覆盖父级">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="m in requiredModes" :key="String(m.value)" size="small" :type="requiredMode === m.value ? 'primary' : 'default'" @click="requiredMode = m.value">
          {{ m.label }}
        </ui-button>
      </demo-block>
      <ui-form :model="requiredData" :rules="requiredRules" :required="requiredMode">
        <ui-form-item label="姓名" prop="name">
          <ui-input v-model="requiredData.name" placeholder="rules 含 required" />
        </ui-form-item>
        <ui-form-item label="覆盖项" prop="override" :required="true">
          <ui-input v-model="requiredData.override" placeholder="item 强制 true，覆盖父级" />
        </ui-form-item>
        <ui-form-item label="备注" prop="remark">
          <ui-input v-model="requiredData.remark" placeholder="rules 无 required" />
        </ui-form-item>
      </ui-form>
    </demo-section>

    <demo-section title="标签位置 (labelPosition)" desc="left（默认）/ right / top">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="p in labelPositions" :key="p" size="small" :type="labelPosition === p ? 'primary' : 'default'" @click="labelPosition = p">{{ p }}</ui-button>
      </demo-block>
      <ui-form :model="layoutData" :label-position="labelPosition">
        <ui-form-item label="用户名">
          <ui-input v-model="layoutData.name" placeholder="请输入" />
        </ui-form-item>
        <ui-form-item label="详细地址">
          <ui-textarea v-model="layoutData.address" placeholder="请输入详细地址" />
        </ui-form-item>
      </ui-form>
    </demo-section>

    <demo-section title="标签宽度自动对齐" desc="labelWidth='auto' 时各 item 取最大宽度对齐">
      <ui-form :model="autoData" label-width="auto">
        <ui-form-item label="名">
          <ui-input v-model="autoData.first" placeholder="短标签" />
        </ui-form-item>
        <ui-form-item label="姓名">
          <ui-input v-model="autoData.full" placeholder="中等标签" />
        </ui-form-item>
        <ui-form-item label="紧急联系人">
          <ui-input v-model="autoData.emergency" placeholder="长标签 → 决定整组宽度" />
        </ui-form-item>
      </ui-form>
    </demo-section>

    <demo-section title="标签样式" desc="labelWidth / labelSize / labelColor / labelWeight + colon">
      <ui-form :model="styleData" label-width="180rpx" label-size="30rpx" label-color="#1989fa" label-weight="600" colon>
        <ui-form-item label="自定义标签">
          <ui-input v-model="styleData.name" placeholder="标签宽 180rpx，蓝色加粗" />
        </ui-form-item>
        <ui-form-item label="字号30rpx">
          <ui-input v-model="styleData.value" placeholder="带冒号" />
        </ui-form-item>
      </ui-form>
    </demo-section>

    <demo-section title="内容对齐 (contentAlign)">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="a in contentAligns" :key="a" size="small" :type="contentAlign === a ? 'primary' : 'default'" @click="contentAlign = a">{{ a }}</ui-button>
      </demo-block>
      <ui-form :model="alignData" :content-align="contentAlign" label-width="160rpx">
        <ui-form-item label="对齐方式">
          <ui-input v-model="alignData.value" placeholder="切换上方按钮查看" />
        </ui-form-item>
      </ui-form>
    </demo-section>

    <demo-section title="状态切换" desc="border / disabled / readonly 三态可叠加">
      <demo-block direction="column" align="start" :gap="12">
        <demo-block align="center" :gap="20">
          <demo-block align="center" :gap="8">
            <ui-switch v-model="hasBorder" />
            <text class="switch-label">border</text>
          </demo-block>
          <demo-block align="center" :gap="8">
            <ui-switch v-model="isDisabled" />
            <text class="switch-label">disabled</text>
          </demo-block>
          <demo-block align="center" :gap="8">
            <ui-switch v-model="isReadonly" />
            <text class="switch-label">readonly</text>
          </demo-block>
        </demo-block>
      </demo-block>
      <ui-form :model="stateData" :border="hasBorder" :disabled="isDisabled" :readonly="isReadonly" border-color="#1989fa">
        <ui-form-item label="用户名">
          <ui-input v-model="stateData.username" placeholder="请输入" />
        </ui-form-item>
        <ui-form-item label="邮箱">
          <ui-input v-model="stateData.email" placeholder="请输入" />
        </ui-form-item>
      </ui-form>
    </demo-section>

    <demo-section title="校验触发时机 (validateTrigger)" desc="blur / change / submit">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="t in triggers" :key="t" size="small" :type="currentTrigger === t ? 'primary' : 'default'" @click="currentTrigger = t">{{ t }}</ui-button>
      </demo-block>
      <ui-form ref="triggerFormRef" :model="triggerData" :rules="triggerRules" :validate-trigger="currentTrigger">
        <ui-form-item label="邮箱" prop="email">
          <ui-input v-model="triggerData.email" placeholder="请输入邮箱" />
        </ui-form-item>
      </ui-form>
      <ui-button type="primary" size="small" custom-style="margin-top: 24rpx" @click="onTriggerSubmit">提交</ui-button>
    </demo-section>

    <demo-section title="自定义校验器" desc="同步返回 string=错误 / true=通过；可引用其他字段">
      <ui-form ref="customFormRef" :model="customData" :rules="customRules">
        <ui-form-item label="年龄" prop="age">
          <ui-input v-model="customData.age" type="number" placeholder="18-60" />
        </ui-form-item>
        <ui-form-item label="密码" prop="password">
          <ui-input v-model="customData.password" type="password" placeholder="≥6 位" />
        </ui-form-item>
        <ui-form-item label="确认密码" prop="confirmPassword">
          <ui-input v-model="customData.confirmPassword" type="password" placeholder="再次输入" />
        </ui-form-item>
      </ui-form>
      <ui-button type="primary" size="small" custom-style="margin-top: 24rpx" @click="onCustomSubmit">提交</ui-button>
    </demo-section>

    <demo-section title="异步校验" desc="validator 返回 Promise，适合远程唯一性校验">
      <ui-form ref="asyncFormRef" :model="asyncData" :rules="asyncRules">
        <ui-form-item label="用户名" prop="username">
          <ui-input v-model="asyncData.username" placeholder="输入 admin 模拟占用" />
        </ui-form-item>
      </ui-form>
      <ui-button type="primary" size="small" custom-style="margin-top: 24rpx" @click="onAsyncSubmit">检查</ui-button>
    </demo-section>

    <demo-section title="深层 prop" desc="prop 支持点路径，自动取嵌套值">
      <ui-form ref="nestedFormRef" :model="nestedData" :rules="nestedRules">
        <ui-form-item label="姓名" prop="user.profile.name">
          <ui-input v-model="nestedData.user.profile.name" placeholder="user.profile.name" />
        </ui-form-item>
        <ui-form-item label="邮箱" prop="user.contact.email">
          <ui-input v-model="nestedData.user.contact.email" placeholder="user.contact.email" />
        </ui-form-item>
      </ui-form>
      <ui-button type="primary" size="small" custom-style="margin-top: 24rpx" @click="onNestedSubmit">校验并取值</ui-button>
      <text v-if="nestedValues" class="demo-text">getValues(): {{ nestedValues }}</text>
    </demo-section>

    <demo-section title="错误信息样式" desc="errorMessageSize / Color / Align">
      <ui-form ref="errorFormRef" :model="errorData" :rules="errorRules" error-message-size="24rpx" error-message-color="#ff9500" error-message-align="right">
        <ui-form-item label="必填字段" prop="value">
          <ui-input v-model="errorData.value" placeholder="请输入" />
        </ui-form-item>
      </ui-form>
      <ui-button type="primary" size="small" custom-style="margin-top: 24rpx" @click="onErrorSubmit">触发校验</ui-button>
    </demo-section>

    <demo-section title="事件 (submit / failed)">
      <ui-form ref="eventFormRef" :model="eventData" :rules="eventRules" @submit="onFormSubmit" @failed="onFormFailed">
        <ui-form-item label="姓名" prop="name">
          <ui-input v-model="eventData.name" placeholder="请输入姓名" />
        </ui-form-item>
      </ui-form>
      <ui-button type="primary" size="small" custom-style="margin-top: 24rpx" @click="eventFormRef?.submit()">提交</ui-button>
      <text class="demo-text">{{ eventLog }}</text>
    </demo-section>

    <demo-section title="实例方法" desc="单字段校验 / 重置 / 数据收集 / 状态查看">
      <ui-form ref="methodFormRef" :model="methodData" :rules="methodRules" :validate-first="validateFirst">
        <ui-form-item label="用户名" prop="username">
          <ui-input v-model="methodData.username" placeholder="必填，≥3 位" />
        </ui-form-item>
        <ui-form-item label="邮箱" prop="email">
          <ui-input v-model="methodData.email" placeholder="必填，邮箱格式" />
        </ui-form-item>
      </ui-form>
      <demo-block direction="column" align="start" :gap="12" custom-style="margin-top: 16rpx">
        <demo-block align="center" :gap="8">
          <ui-switch v-model="validateFirst" />
          <text class="switch-label">validateFirst（首个失败即停）</text>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="onValidateField('username')">校验 username</ui-button>
          <ui-button size="small" @click="onClearOne">清错误</ui-button>
          <ui-button size="small" @click="onResetOne">重置 username</ui-button>
          <ui-button size="small" type="primary" @click="onShowValues">getValues()</ui-button>
          <ui-button size="small" type="primary" @click="onShowStatus">状态</ui-button>
        </demo-block>
        <text v-if="methodLog" class="demo-text">{{ methodLog }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { FormValidateError } from "@/uni_modules/uniapp-ui/ui-form"
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Form 表单" },
})

const toast = useToast()

// 基础
const formRef = ref()
const formData = ref({ username: "", password: "", phone: "" })
const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
  ],
}

// 必填星号
const requiredModes = [
  { label: "auto", value: "auto" as const },
  { label: "true", value: true },
  { label: "false", value: false },
] as const
const requiredMode = ref<"auto" | boolean>("auto")
const requiredData = ref({ name: "", override: "", remark: "" })
const requiredRules = {
  name: [{ required: true, message: "请输入姓名" }],
  remark: [{ message: "选填" }],
}

// 标签位置
const labelPositions = ["left", "right", "top"] as const
const labelPosition = ref<"left" | "right" | "top">("left")
const layoutData = ref({ name: "", address: "" })

// 自动对齐
const autoData = ref({ first: "", full: "", emergency: "" })

// 标签样式
const styleData = ref({ name: "", value: "" })

// 内容对齐
const contentAligns = ["left", "center", "right"] as const
const contentAlign = ref<"left" | "center" | "right">("left")
const alignData = ref({ value: "" })

// 状态切换
const hasBorder = ref(false)
const isDisabled = ref(false)
const isReadonly = ref(false)
const stateData = ref({ username: "admin", email: "admin@example.com" })

// 触发时机
const triggers = ["blur", "change", "submit"] as const
const triggerFormRef = ref()
const currentTrigger = ref<"blur" | "change" | "submit">("blur")
const triggerData = ref({ email: "" })
const triggerRules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { pattern: /^[\w-]+@[\w-]+\.\w+$/, message: "邮箱格式不正确" },
  ],
}

// 自定义校验
const customFormRef = ref()
const customData = ref({ age: "", password: "", confirmPassword: "" })
const customRules = {
  age: [
    { required: true, message: "请输入年龄" },
    {
      validator: (v: string) => {
        const n = Number.parseInt(v)
        return Number.isNaN(n) || n < 18 || n > 60 ? "年龄必须在 18-60 之间" : true
      },
    },
  ],
  password: [{ required: true, message: "请输入密码" }, { validator: (v: string) => (v.length < 6 ? "密码至少 6 位" : true) }],
  confirmPassword: [{ required: true, message: "请确认密码" }, { validator: (v: string) => (v !== customData.value.password ? "两次密码不一致" : true) }],
}

// 异步
const asyncFormRef = ref()
const asyncData = ref({ username: "" })
const asyncRules = {
  username: [
    { required: true, message: "请输入用户名" },
    {
      validator: async (v: string) => {
        await new Promise((r) => setTimeout(r, 1000))
        return v === "admin" ? "用户名已被占用" : true
      },
    },
  ],
}

// 深层 prop
const nestedFormRef = ref()
const nestedData = ref({ user: { profile: { name: "" }, contact: { email: "" } } })
const nestedRules = {
  "user.profile.name": [{ required: true, message: "请输入姓名" }],
  "user.contact.email": [
    { required: true, message: "请输入邮箱" },
    { pattern: /^[\w-]+@[\w-]+\.\w+$/, message: "邮箱格式不正确" },
  ],
}
const nestedValues = ref("")

// 错误样式
const errorFormRef = ref()
const errorData = ref({ value: "" })
const errorRules = { value: [{ required: true, message: "此字段为必填项" }] }

// 事件
const eventFormRef = ref()
const eventData = ref({ name: "" })
const eventRules = { name: [{ required: true, message: "请输入姓名" }] }
const eventLog = ref("等待事件触发...")

// 实例方法
const methodFormRef = ref()
const validateFirst = ref(false)
const methodData = ref({ username: "", email: "" })
const methodRules = {
  username: [{ required: true, message: "请输入用户名" }, { validator: (v: string) => (v.length < 3 ? "至少 3 位" : true) }],
  email: [
    { required: true, message: "请输入邮箱" },
    { pattern: /^[\w-]+@[\w-]+\.\w+$/, message: "邮箱格式不正确" },
  ],
}
const methodLog = ref("")

async function onSubmit() {
  try {
    await formRef.value?.validate()
    toast.success("校验通过")
  } catch {
    toast.text("校验失败")
  }
}

function onReset() {
  formData.value = { username: "", password: "", phone: "" }
  formRef.value?.clearValidate()
}

async function onTriggerSubmit() {
  try {
    await triggerFormRef.value?.validate()
    toast.success("校验通过")
  } catch {
    toast.text("校验失败")
  }
}

async function onCustomSubmit() {
  try {
    await customFormRef.value?.validate()
    toast.success("校验通过")
  } catch {
    toast.text("校验失败")
  }
}

async function onAsyncSubmit() {
  try {
    toast.text("正在校验...")
    await asyncFormRef.value?.validate()
    toast.success("用户名可用")
  } catch {
    toast.text("校验失败")
  }
}

async function onNestedSubmit() {
  try {
    await nestedFormRef.value?.validate()
    toast.success("校验通过")
  } catch {
    toast.text("校验失败")
  }
  nestedValues.value = JSON.stringify(nestedFormRef.value?.getValues())
}

async function onErrorSubmit() {
  try {
    await errorFormRef.value?.validate()
    toast.success("校验通过")
  } catch {
    /* 错误信息会显示 */
  }
}

function onFormSubmit(values: Record<string, unknown>) {
  eventLog.value = `submit: ${JSON.stringify(values)}`
  toast.success("提交成功")
}

function onFormFailed(result: { values: Record<string, unknown>; errors: FormValidateError[] }) {
  eventLog.value = `failed: ${result.errors.map((e) => e.message).join(", ")}`
}

async function onValidateField(prop: string) {
  try {
    await methodFormRef.value?.validateField(prop)
    methodLog.value = `validateField("${prop}") → 通过`
  } catch (errors: any) {
    methodLog.value = `validateField("${prop}") → 失败: ${errors?.[0]?.message ?? ""}`
  }
}

function onClearOne() {
  methodFormRef.value?.clearValidate("username")
  methodLog.value = `clearValidate("username")`
}

function onResetOne() {
  methodData.value.username = ""
  methodFormRef.value?.resetFields("username")
  methodLog.value = `resetFields("username")`
}

function onShowValues() {
  methodLog.value = `getValues(): ${JSON.stringify(methodFormRef.value?.getValues())}`
}

function onShowStatus() {
  methodLog.value = `getValidateStatus(): ${JSON.stringify(methodFormRef.value?.getValidateStatus())}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 12rpx;
  word-break: break-all;
}

.switch-label {
  color: var(--ui-color-text);
  font-size: 26rpx;
}
</style>
