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

    <demo-section title="标签位置 (顶部)">
      <demo-block direction="column" :gap="0">
        <ui-form :model="formData3" label-position="top">
          <ui-form-item label="详细地址">
            <ui-textarea v-model="formData3.address" placeholder="请输入详细地址" />
          </ui-form-item>
          <ui-form-item label="备注说明">
            <ui-textarea v-model="formData3.remark" placeholder="请输入备注" />
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
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Form 表单" },
})

const formRef = ref()

const formData = ref({
  username: "",
  password: "",
  phone: "",
})

const formData2 = ref({
  name: "",
  email: "",
})

const formData3 = ref({
  address: "",
  remark: "",
})

const formData4 = ref({
  username: "admin",
  password: "123456",
})

const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
  ],
}

async function onSubmit() {
  try {
    await formRef.value?.validate()
    uni.showToast({ title: "验证通过", icon: "success" })
  } catch {
    uni.showToast({ title: "验证失败", icon: "none" })
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
</script>
