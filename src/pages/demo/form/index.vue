<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="0">
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
      </demo-block>
      <demo-block :cols="2" :gap="24" custom-style="margin-top: 24rpx">
        <ui-button type="primary" @click="onSubmit">提交</ui-button>
        <ui-button @click="onReset">重置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="必填项标记">
      <demo-block direction="column" :gap="0">
        <ui-form :model="formData2" required>
          <ui-form-item label="姓名">
            <ui-input v-model="formData2.name" placeholder="请输入姓名" />
          </ui-form-item>
          <ui-form-item label="邮箱">
            <ui-input v-model="formData2.email" placeholder="请输入邮箱" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <!-- 新增：冒号设置 -->
    <demo-section title="冒号设置">
      <demo-block direction="column" :gap="0">
        <ui-form :model="formDataColon" colon>
          <ui-form-item label="姓名">
            <ui-input v-model="formDataColon.name" placeholder="请输入姓名" />
          </ui-form-item>
          <ui-form-item label="年龄">
            <ui-input v-model="formDataColon.age" type="number" placeholder="请输入年龄" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="标签位置">
      <demo-block direction="column" :gap="24">
        <view class="form-section">
          <text class="form-section__label">左侧（默认）:</text>
          <ui-form :model="formDataPos1" label-position="left">
            <ui-form-item label="用户名">
              <ui-input v-model="formDataPos1.name" placeholder="请输入" />
            </ui-form-item>
          </ui-form>
        </view>
        <view class="form-section">
          <text class="form-section__label">右侧:</text>
          <ui-form :model="formDataPos2" label-position="right">
            <ui-form-item label="用户名">
              <ui-input v-model="formDataPos2.name" placeholder="请输入" />
            </ui-form-item>
          </ui-form>
        </view>
        <view class="form-section">
          <text class="form-section__label">顶部:</text>
          <ui-form :model="formDataPos3" label-position="top">
            <ui-form-item label="详细地址">
              <ui-textarea v-model="formDataPos3.address" placeholder="请输入详细地址" />
            </ui-form-item>
          </ui-form>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：标签样式 -->
    <demo-section title="标签样式">
      <demo-block direction="column" :gap="0">
        <ui-form
          :model="formDataLabelStyle"
          label-width="180rpx"
          label-size="30rpx"
          label-color="#1989fa"
          label-weight="600"
        >
          <ui-form-item label="自定义标签">
            <ui-input v-model="formDataLabelStyle.name" placeholder="标签宽180rpx" />
          </ui-form-item>
          <ui-form-item label="字号30rpx">
            <ui-input v-model="formDataLabelStyle.value" placeholder="颜色蓝色，粗体" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <!-- 新增：内容对齐方式 -->
    <demo-section title="内容对齐方式">
      <demo-block direction="column" :gap="24">
        <ui-form :model="formDataAlign1" content-align="left" label-width="140rpx">
          <ui-form-item label="左对齐">
            <ui-input v-model="formDataAlign1.value" placeholder="输入内容" />
          </ui-form-item>
        </ui-form>
        <ui-form :model="formDataAlign2" content-align="center" label-width="140rpx">
          <ui-form-item label="居中对齐">
            <ui-input v-model="formDataAlign2.value" placeholder="输入内容" />
          </ui-form-item>
        </ui-form>
        <ui-form :model="formDataAlign3" content-align="right" label-width="140rpx">
          <ui-form-item label="右对齐">
            <ui-input v-model="formDataAlign3.value" placeholder="输入内容" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <!-- 新增：边框设置 -->
    <demo-section title="边框设置">
      <demo-block :cols="2" :gap="24">
        <ui-form :model="formDataBorder1" border>
          <ui-form-item label="有边框">
            <ui-input v-model="formDataBorder1.value" placeholder="请输入" />
          </ui-form-item>
        </ui-form>
        <ui-form :model="formDataBorder2" border border-color="#1989fa">
          <ui-form-item label="蓝色边框">
            <ui-input v-model="formDataBorder2.value" placeholder="请输入" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column" :gap="0">
        <ui-form :model="formData4" disabled>
          <ui-form-item label="用户名">
            <ui-input v-model="formData4.username" placeholder="请输入用户名" />
          </ui-form-item>
          <ui-form-item label="密码">
            <ui-input v-model="formData4.password" type="password" placeholder="请输入密码" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <!-- 新增：只读状态 -->
    <demo-section title="只读状态">
      <demo-block direction="column" :gap="0">
        <ui-form :model="formDataReadonly" readonly>
          <ui-form-item label="用户名">
            <ui-input v-model="formDataReadonly.username" placeholder="请输入用户名" />
          </ui-form-item>
          <ui-form-item label="邮箱">
            <ui-input v-model="formDataReadonly.email" placeholder="请输入邮箱" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <!-- 新增：验证触发时机 -->
    <demo-section title="验证触发时机">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentTrigger = 'blur'">失焦触发</ui-button>
          <ui-button size="small" @click="currentTrigger = 'change'">变化触发</ui-button>
          <ui-button size="small" @click="currentTrigger = 'submit'">提交触发</ui-button>
        </demo-block>
        <text class="demo-text">当前触发时机: {{ currentTrigger }}</text>
        <ui-form
          ref="triggerFormRef"
          :model="formDataTrigger"
          :rules="triggerRules"
          :validate-trigger="currentTrigger"
        >
          <ui-form-item label="邮箱" prop="email">
            <ui-input v-model="formDataTrigger.email" placeholder="请输入邮箱" />
          </ui-form-item>
        </ui-form>
        <ui-button type="primary" size="small" @click="onTriggerSubmit">提交验证</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义验证器 -->
    <demo-section title="自定义验证器">
      <demo-block direction="column" :gap="0">
        <ui-form ref="customFormRef" :model="formDataCustom" :rules="customRules">
          <ui-form-item label="年龄" prop="age">
            <ui-input v-model="formDataCustom.age" type="number" placeholder="请输入年龄(18-60)" />
          </ui-form-item>
          <ui-form-item label="密码" prop="password">
            <ui-input v-model="formDataCustom.password" type="password" placeholder="请输入密码" />
          </ui-form-item>
          <ui-form-item label="确认密码" prop="confirmPassword">
            <ui-input v-model="formDataCustom.confirmPassword" type="password" placeholder="请再次输入密码" />
          </ui-form-item>
        </ui-form>
        <demo-block :cols="2" :gap="24" custom-style="margin-top: 24rpx">
          <ui-button type="primary" @click="onCustomSubmit">提交</ui-button>
          <ui-button @click="onCustomReset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：异步验证 -->
    <demo-section title="异步验证">
      <demo-block direction="column" :gap="0">
        <ui-form ref="asyncFormRef" :model="formDataAsync" :rules="asyncRules">
          <ui-form-item label="用户名" prop="username">
            <ui-input v-model="formDataAsync.username" placeholder="输入 admin 会校验失败" />
          </ui-form-item>
        </ui-form>
        <ui-button type="primary" custom-style="margin-top: 24rpx" @click="onAsyncSubmit">检查用户名</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：错误信息样式 -->
    <demo-section title="错误信息样式">
      <demo-block direction="column" :gap="0">
        <ui-form
          ref="errorFormRef"
          :model="formDataError"
          :rules="errorRules"
          error-message-size="24rpx"
          error-message-color="#ff9500"
          error-message-align="right"
        >
          <ui-form-item label="必填字段" prop="value">
            <ui-input v-model="formDataError.value" placeholder="请输入内容" />
          </ui-form-item>
        </ui-form>
        <ui-button type="primary" size="small" custom-style="margin-top: 24rpx" @click="onErrorSubmit">触发验证</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：表单项自定义 -->
    <demo-section title="表单项自定义">
      <demo-block direction="column" :gap="0">
        <ui-form :model="formDataItem">
          <ui-form-item
            label="自定义标签"
            label-width="200rpx"
            label-color="#ee0a24"
            label-size="28rpx"
            label-weight="500"
            :padding="20"
          >
            <ui-input v-model="formDataItem.value1" placeholder="请输入" />
          </ui-form-item>
          <ui-form-item
            label="标签居顶"
            label-align="top"
            label-color="#07c160"
          >
            <ui-input v-model="formDataItem.value2" placeholder="标签垂直居顶" />
          </ui-form-item>
          <ui-form-item
            label="标签居底"
            label-align="bottom"
            label-color="#1989fa"
          >
            <ui-input v-model="formDataItem.value3" placeholder="标签垂直居底" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-form
          ref="eventFormRef"
          :model="formDataEvent"
          :rules="eventRules"
          @submit="onFormSubmit"
          @failed="onFormFailed"
        >
          <ui-form-item label="姓名" prop="name">
            <ui-input v-model="formDataEvent.name" placeholder="请输入姓名" />
          </ui-form-item>
        </ui-form>
        <ui-button type="primary" size="small" @click="onEventSubmit">提交触发事件</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="0">
        <ui-form
          :model="formDataStyle"
          custom-class="my-form"
          :custom-style="{ padding: '24rpx', background: '#f7f8fa', borderRadius: '16rpx' }"
        >
          <ui-form-item
            label="自定义表单"
            custom-class="my-form-item"
            :custom-style="{ background: '#fff', borderRadius: '8rpx', marginBottom: '16rpx' }"
          >
            <ui-input v-model="formDataStyle.value" placeholder="请输入内容" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 -->
    <demo-section title="综合示例">
      <demo-block direction="column" :gap="0">
        <ui-form
          ref="complexFormRef"
          :model="complexFormData"
          :rules="complexRules"
          label-width="160rpx"
          label-position="left"
          colon
          required
          validate-trigger="change"
        >
          <ui-form-item label="用户名" prop="username">
            <ui-input v-model="complexFormData.username" placeholder="请输入用户名" />
          </ui-form-item>
          <ui-form-item label="手机号" prop="phone">
            <ui-input v-model="complexFormData.phone" type="number" placeholder="请输入手机号" />
          </ui-form-item>
          <ui-form-item label="性别" prop="gender">
            <ui-radio-group v-model="complexFormData.gender">
              <ui-radio name="male" label="男" />
              <ui-radio name="female" label="女" />
            </ui-radio-group>
          </ui-form-item>
          <ui-form-item label="爱好" prop="hobbies">
            <ui-checkbox-group v-model="complexFormData.hobbies">
              <ui-checkbox name="read" label="阅读" />
              <ui-checkbox name="music" label="音乐" />
              <ui-checkbox name="sport" label="运动" />
            </ui-checkbox-group>
          </ui-form-item>
          <ui-form-item label="备注" prop="remark" label-position="top">
            <ui-textarea v-model="complexFormData.remark" placeholder="请输入备注信息" />
          </ui-form-item>
        </ui-form>
        <demo-block :cols="2" :gap="24" custom-style="margin-top: 24rpx">
          <ui-button type="primary" @click="onComplexSubmit">提交</ui-button>
          <ui-button @click="onComplexReset">重置</ui-button>
        </demo-block>
        <text class="demo-text" style="margin-top: 16rpx">{{ complexLog }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { FormValidateError } from "@/ui/ui-form"
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Form 表单" },
})

const toast = useToast()

// 基础表单
const formRef = ref()
const formData = ref({
  username: "",
  password: "",
  phone: "",
})

const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
  ],
}

// 必填项表单
const formData2 = ref({
  name: "",
  email: "",
})

// 冒号设置
const formDataColon = ref({
  name: "",
  age: "",
})

// 标签位置
const formDataPos1 = ref({ name: "" })
const formDataPos2 = ref({ name: "" })
const formDataPos3 = ref({ address: "" })

// 标签样式
const formDataLabelStyle = ref({
  name: "",
  value: "",
})

// 内容对齐
const formDataAlign1 = ref({ value: "" })
const formDataAlign2 = ref({ value: "" })
const formDataAlign3 = ref({ value: "" })

// 边框设置
const formDataBorder1 = ref({ value: "" })
const formDataBorder2 = ref({ value: "" })

// 禁用状态
const formData4 = ref({
  username: "admin",
  password: "123456",
})

// 只读状态
const formDataReadonly = ref({
  username: "readonly_user",
  email: "user@example.com",
})

// 验证触发时机
const triggerFormRef = ref()
const currentTrigger = ref<"blur" | "change" | "submit">("blur")
const formDataTrigger = ref({ email: "" })
const triggerRules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { pattern: /^[\w-]+@[\w-]+\.\w+$/, message: "邮箱格式不正确" },
  ],
}

// 自定义验证器
const customFormRef = ref()
const formDataCustom = ref({
  age: "",
  password: "",
  confirmPassword: "",
})
const customRules = {
  age: [
    { required: true, message: "请输入年龄" },
    {
      validator: (value: string) => {
        const age = Number.parseInt(value)
        if (Number.isNaN(age) || age < 18 || age > 60) {
          return "年龄必须在18-60之间"
        }
        return true
      },
    },
  ],
  password: [
    { required: true, message: "请输入密码" },
    {
      validator: (value: string) => {
        if (value.length < 6) {
          return "密码长度不能少于6位"
        }
        return true
      },
    },
  ],
  confirmPassword: [
    { required: true, message: "请确认密码" },
    {
      validator: (value: string) => {
        if (value !== formDataCustom.value.password) {
          return "两次密码输入不一致"
        }
        return true
      },
    },
  ],
}

// 异步验证
const asyncFormRef = ref()
const formDataAsync = ref({ username: "" })
const asyncRules = {
  username: [
    { required: true, message: "请输入用户名" },
    {
      validator: async (value: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (value === "admin") {
          return "用户名已被占用"
        }
        return true
      },
    },
  ],
}

// 错误信息样式
const errorFormRef = ref()
const formDataError = ref({ value: "" })
const errorRules = {
  value: [{ required: true, message: "此字段为必填项" }],
}

// 表单项自定义
const formDataItem = ref({
  value1: "",
  value2: "",
  value3: "",
})

// 事件处理
const eventFormRef = ref()
const formDataEvent = ref({ name: "" })
const eventRules = {
  name: [{ required: true, message: "请输入姓名" }],
}
const eventLog = ref("等待表单事件触发...")

// 自定义样式
const formDataStyle = ref({ value: "" })

// 综合示例
const complexFormRef = ref()
const complexFormData = ref({
  username: "",
  phone: "",
  gender: "",
  hobbies: [],
  remark: "",
})
const complexRules = {
  username: [
    { required: true, message: "请输入用户名" },
    { validator: (value: string) => value.length >= 2 || "用户名至少2个字符" },
  ],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
  ],
  gender: [{ required: true, message: "请选择性别" }],
  hobbies: [
    {
      validator: (value: string[]) => (value && value.length > 0) || "请至少选择一个爱好",
    },
  ],
}
const complexLog = ref("")

// 基础表单方法
async function onSubmit() {
  try {
    await formRef.value?.validate()
    toast.success("验证通过")
  } catch {
    toast.text("验证失败")
  }
}

function onReset() {
  formData.value = {
    username: "",
    password: "",
    phone: "",
  }
  formRef.value?.resetValidation()
}

// 触发时机表单
async function onTriggerSubmit() {
  try {
    await triggerFormRef.value?.validate()
    toast.success("验证通过")
  } catch {
    toast.text("验证失败")
  }
}

// 自定义验证器表单
async function onCustomSubmit() {
  try {
    await customFormRef.value?.validate()
    toast.success("验证通过")
  } catch {
    toast.text("验证失败")
  }
}

function onCustomReset() {
  formDataCustom.value = {
    age: "",
    password: "",
    confirmPassword: "",
  }
  customFormRef.value?.resetValidation()
}

// 异步验证表单
async function onAsyncSubmit() {
  try {
    toast.text("正在验证...")
    await asyncFormRef.value?.validate()
    toast.success("用户名可用")
  } catch {
    toast.text("验证失败")
  }
}

// 错误信息样式表单
async function onErrorSubmit() {
  try {
    await errorFormRef.value?.validate()
    toast.success("验证通过")
  } catch {
    // 验证失败，错误信息会显示
  }
}

// 事件处理
function onFormSubmit(values: Record<string, unknown>) {
  eventLog.value = `触发 submit 事件，数据: ${JSON.stringify(values)}`
  toast.success("表单提交成功")
}

function onFormFailed(result: { values: Record<string, unknown>; errors: FormValidateError[] }) {
  eventLog.value = `触发 failed 事件，错误: ${result.errors.map((e) => e.message).join(", ")}`
}

async function onEventSubmit() {
  try {
    await eventFormRef.value?.validate()
    eventFormRef.value?.submit?.()
  } catch {
    // 验证失败
  }
}

// 综合示例
async function onComplexSubmit() {
  try {
    await complexFormRef.value?.validate()
    complexLog.value = `提交成功: ${JSON.stringify(complexFormData.value)}`
    toast.success("表单提交成功")
  } catch {
    complexLog.value = "验证失败，请检查表单"
    toast.text("验证失败")
  }
}

function onComplexReset() {
  complexFormData.value = {
    username: "",
    phone: "",
    gender: "",
    hobbies: [],
    remark: "",
  }
  complexFormRef.value?.resetValidation()
  complexLog.value = ""
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.form-section {
  &__label {
    color: var(--ui-color-text-secondary);
    display: block;
    font-size: 26rpx;
    margin-bottom: 8rpx;
  }
}

:deep(.my-form) {
  border: 2rpx solid #1989fa;
}

:deep(.my-form-item) {
  padding: 16rpx;
}
</style>
