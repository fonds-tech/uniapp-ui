<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-form>
          <ui-form-item label="用户名" prop="username">
            <ui-input v-model="form.username" placeholder="请输入用户名" />
          </ui-form-item>
          <ui-form-item label="密码" prop="password">
            <ui-input v-model="form.password" type="password" placeholder="请输入密码" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="必填项标记">
      <demo-block direction="column">
        <ui-form>
          <ui-form-item label="手机号" prop="phone" required>
            <ui-input v-model="form.phone" placeholder="请输入手机号" />
          </ui-form-item>
          <ui-form-item label="验证码" prop="code" required>
            <ui-input v-model="form.code" placeholder="请输入验证码" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="显示冒号">
      <demo-block direction="column">
        <ui-form>
          <ui-form-item label="姓名" prop="name" colon>
            <ui-input v-model="form.name" placeholder="请输入姓名" />
          </ui-form-item>
          <ui-form-item label="年龄" prop="age" colon>
            <ui-input v-model="form.age" placeholder="请输入年龄" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="自定义标签宽度">
      <demo-block direction="column">
        <ui-form>
          <ui-form-item label="收货人" prop="receiver" label-width="150rpx">
            <ui-input v-model="form.receiver" placeholder="请输入收货人" />
          </ui-form-item>
          <ui-form-item label="详细地址" prop="address" label-width="150rpx">
            <ui-input v-model="form.address" placeholder="请输入详细地址" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="标签对齐方式">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">顶部对齐</ui-text>
        <ui-form>
          <ui-form-item label="备注" prop="remark" label-align="top">
            <ui-textarea v-model="form.remark" placeholder="请输入备注信息" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="内容对齐方式">
      <demo-block direction="column">
        <ui-form>
          <ui-form-item label="金额" prop="amount" content-align="right">
            <ui-input v-model="form.amount" placeholder="请输入金额" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="错误提示">
      <demo-block direction="column">
        <ui-form>
          <ui-form-item label="邮箱" prop="email" error-message="请输入正确的邮箱格式">
            <ui-input v-model="form.email" placeholder="请输入邮箱" />
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>

    <demo-section title="配合其他表单组件">
      <demo-block direction="column">
        <ui-form>
          <ui-form-item label="开关" prop="switch">
            <template #default>
              <ui-switch v-model="form.switch" />
            </template>
          </ui-form-item>
          <ui-form-item label="评分" prop="rate">
            <template #default>
              <ui-rate v-model="form.rate" />
            </template>
          </ui-form-item>
          <ui-form-item label="步进器" prop="stepper">
            <template #default>
              <ui-stepper v-model="form.stepper" />
            </template>
          </ui-form-item>
        </ui-form>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "FormItem 表单项" },
})

const form = ref({
  username: '',
  password: '',
  phone: '',
  code: '',
  name: '',
  age: '',
  receiver: '',
  address: '',
  remark: '',
  amount: '',
  email: 'invalid-email',
  switch: true,
  rate: 3,
  stepper: 1,
})
</script>
