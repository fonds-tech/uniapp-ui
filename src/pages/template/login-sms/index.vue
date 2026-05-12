<template>
  <view class="page">
    <view class="hero">
      <view class="hero__logo">
        <ui-icon name="phone" size="48rpx" color="text-inverse" />
      </view>
      <text class="hero__title">验证码登录</text>
      <text class="hero__subtitle">未注册手机号将自动创建账号</text>
    </view>

    <view class="card">
      <ui-form ref="formRef" :model="form" :rules="rules" label-position="top" :show-error-message="false">
        <ui-form-item prop="phone">
          <view class="field">
            <text class="field__label">手机号</text>
            <view class="field__input">
              <text class="field__prefix">+86</text>
              <ui-input v-model="form.phone" type="number" placeholder="请输入手机号码" :maxlength="11" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" clearable />
            </view>
          </view>
        </ui-form-item>

        <view class="divider" />

        <ui-form-item prop="code">
          <view class="field">
            <text class="field__label">验证码</text>
            <view class="field__input field__input--inline">
              <ui-input v-model="form.code" type="number" placeholder="6 位短信验证码" :maxlength="6" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" />
              <ui-button type="text" size="small" :disabled="countdown > 0" @click="onSendCode">
                {{ countdown > 0 ? `${countdown} s` : "获取验证码" }}
              </ui-button>
            </view>
          </view>
        </ui-form-item>
      </ui-form>
    </view>

    <view class="agreement">
      <ui-checkbox v-model="agree">
        <text class="agreement__text">
          我已阅读并同意
          <text class="agreement__link" @click.stop="onProtocol('服务条款')">《服务条款》</text>
          和
          <text class="agreement__link" @click.stop="onProtocol('隐私政策')">《隐私政策》</text>
        </text>
      </ui-checkbox>
    </view>

    <view class="actions">
      <ui-button block type="primary" size="large" radius="48rpx" :loading="submitting" :disabled="!canSubmit" @click="onSubmit">登录 / 注册</ui-button>

      <view class="actions__links">
        <text class="actions__link" @click="onSwitchLogin">账号密码登录</text>
        <ui-divider direction="vertical" :custom-style="{ height: '24rpx' }" />
        <text class="actions__link" @click="onProtocol('遇到问题')">遇到问题？</text>
      </view>
    </view>

    <view class="other">
      <view class="other__divider">
        <view class="other__line" />
        <text class="other__text">其他方式登录</text>
        <view class="other__line" />
      </view>
      <view class="other__icons">
        <view class="oauth oauth--wechat" @click="onOauth('微信')">
          <ui-icon name="wechat" size="48rpx" color="text-inverse" />
        </view>
        <view class="oauth oauth--apple" @click="onOauth('Apple')">
          <ui-icon name="user-o" size="48rpx" color="text-inverse" />
        </view>
        <view class="oauth oauth--qq" @click="onOauth('QQ')">
          <ui-icon name="comment" size="48rpx" color="text-inverse" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "登录" },
})

const toast = useToast()
const formRef = ref<FormInstance>()
const submitting = ref(false)
const countdown = ref(0)
const agree = ref(false)

const form = reactive({
  phone: "",
  code: "",
})

const rules = {
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1[3-9]\d{9}$/, message: "手机号格式有误" },
  ],
  code: [
    { required: true, message: "请输入验证码" },
    { pattern: /^\d{6}$/, message: "验证码为 6 位数字" },
  ],
}

const canSubmit = computed(() => agree.value && form.phone.length === 11 && form.code.length === 6)

function onSendCode() {
  if (countdown.value > 0) return
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    toast.fail("请先填正确的手机号")
    return
  }
  toast.success("验证码已发送")
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

function onSubmit() {
  if (!agree.value) {
    toast.fail("请先同意协议")
    return
  }
  formRef.value?.validate((valid) => {
    if (!valid) return
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      toast.success("登录成功")
    }, 800)
  })
}

function onSwitchLogin() {
  uni.navigateTo({ url: "/pages/template/login-form/index" })
}

function onProtocol(name: string) {
  toast.text(`查看 ${name}`)
}

function onOauth(name: string) {
  toast.text(`${name} 登录`)
}
</script>

<style lang="scss" scoped>
.page {
  padding: 120rpx var(--ui-spacing-lg) var(--ui-spacing-xl);
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.hero {
  gap: var(--ui-spacing-sm);
  display: flex;
  align-items: center;
  margin-bottom: var(--ui-spacing-xxl);
  flex-direction: column;

  &__logo {
    width: 120rpx;
    height: 120rpx;
    display: flex;
    background: linear-gradient(135deg, var(--ui-color-primary), var(--ui-color-primary-active));
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    border-radius: var(--ui-radius-xl);
    justify-content: center;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 52rpx;
    font-weight: var(--ui-font-weight-bold);
  }

  &__subtitle {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }
}

.card {
  padding: var(--ui-spacing-xs) var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-xl);
  margin-bottom: var(--ui-spacing-lg);
}

.field {
  gap: var(--ui-spacing-xs);
  flex: 1;
  display: flex;
  padding: var(--ui-spacing-md) 0;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__input {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;

    &--inline {
      justify-content: space-between;
    }
  }

  &__prefix {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
    border-right: 2rpx solid var(--ui-color-border-light);
    padding-right: var(--ui-spacing-sm);
  }
}

.divider {
  height: 2rpx;
  background: var(--ui-color-border-light);
}

.agreement {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: 0 var(--ui-spacing-md);
  align-items: flex-start;
  margin-bottom: var(--ui-spacing-xl);

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    line-height: 1.6;
  }

  &__link {
    color: var(--ui-color-primary);
  }
}

.actions {
  &__links {
    gap: var(--ui-spacing-md);
    display: flex;
    margin-top: var(--ui-spacing-md);
    align-items: center;
    justify-content: center;
  }

  &__link {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.other {
  margin-top: var(--ui-spacing-xxl);

  &__divider {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-xl);
  }

  &__line {
    flex: 1;
    height: 2rpx;
    background: var(--ui-color-border-light);
  }

  &__text {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__icons {
    gap: var(--ui-spacing-xl);
    display: flex;
    justify-content: center;
  }
}

.oauth {
  width: 88rpx;
  height: 88rpx;
  display: flex;
  box-shadow: var(--ui-shadow-xs);
  align-items: center;
  border-radius: var(--ui-radius-round);
  justify-content: center;

  &--wechat {
    background: var(--ui-color-success);
  }

  &--apple {
    background: var(--ui-gray-8);
  }

  &--qq {
    background: var(--ui-color-primary);
  }
}
</style>
