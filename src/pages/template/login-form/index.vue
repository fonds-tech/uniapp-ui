<template>
  <view class="page">
    <view class="hero">
      <view class="hero__logo">
        <ui-icon name="user-o" size="48rpx" color="text-inverse" />
      </view>
      <text class="hero__title">欢迎回来</text>
      <text class="hero__subtitle">使用账号密码登录你的账户</text>
    </view>

    <view class="card">
      <ui-form ref="formRef" :model="form" :rules="rules" label-position="top" :show-error-message="false">
        <ui-form-item prop="username">
          <view class="field">
            <text class="field__label">账号</text>
            <view class="field__input">
              <ui-icon name="user-o" size="36rpx" color="text-tertiary" />
              <ui-input v-model="form.username" placeholder="用户名 / 手机号 / 邮箱" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" clearable />
            </view>
          </view>
        </ui-form-item>

        <view class="divider" />

        <ui-form-item prop="password">
          <view class="field">
            <text class="field__label">密码</text>
            <view class="field__input">
              <ui-icon name="lock" size="36rpx" color="text-tertiary" />
              <ui-input v-model="form.password" :password="!showPwd" placeholder="请输入密码" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" />
              <view class="field__toggle" @click="showPwd = !showPwd">
                <ui-icon :name="showPwd ? 'eye' : 'closed-eye'" size="36rpx" color="text-tertiary" />
              </view>
            </view>
          </view>
        </ui-form-item>
      </ui-form>
    </view>

    <view class="extras">
      <view class="extras__remember" @click="remember = !remember">
        <ui-checkbox v-model="remember" />
        <text class="extras__remember-text">记住我</text>
      </view>
      <text class="extras__forget" @click="onForget">忘记密码？</text>
    </view>

    <view class="actions">
      <ui-button block type="primary" size="large" radius="48rpx" :loading="submitting" :disabled="!canSubmit" @click="onSubmit">登 录</ui-button>

      <view class="actions__register">
        <text class="actions__register-text">还没有账号？</text>
        <text class="actions__register-link" @click="onRegister">立即注册</text>
      </view>
    </view>

    <view class="other">
      <view class="other__divider">
        <view class="other__line" />
        <text class="other__text">其他方式</text>
        <view class="other__line" />
      </view>
      <view class="other__icons">
        <view class="oauth oauth--sms" @click="onSwitchSms">
          <ui-icon name="comment" size="44rpx" color="text-inverse" />
        </view>
        <view class="oauth oauth--wechat" @click="onOauth('微信')">
          <ui-icon name="wechat" size="48rpx" color="text-inverse" />
        </view>
        <view class="oauth oauth--apple" @click="onOauth('Apple')">
          <ui-icon name="user-o" size="48rpx" color="text-inverse" />
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
const showPwd = ref(false)
const remember = ref(true)

const form = reactive({
  username: "",
  password: "",
})

const rules = {
  username: [{ required: true, message: "请输入账号" }],
  password: [
    { required: true, message: "请输入密码" },
    { pattern: /^.{6,}$/, message: "密码至少 6 位" },
  ],
}

const canSubmit = computed(() => form.username.length > 0 && form.password.length >= 6)

function onSubmit() {
  formRef.value?.validate((valid) => {
    if (!valid) return
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      toast.success("登录成功")
    }, 800)
  })
}

function onForget() {
  uni.navigateTo({ url: "/pages/template/forget-pwd/index" })
}

function onRegister() {
  uni.navigateTo({ url: "/pages/template/register/index" })
}

function onSwitchSms() {
  uni.navigateTo({ url: "/pages/template/login-sms/index" })
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
  }

  &__toggle {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.divider {
  height: 2rpx;
  background: var(--ui-color-border-light);
}

.extras {
  display: flex;
  padding: 0 var(--ui-spacing-md);
  align-items: center;
  margin-bottom: var(--ui-spacing-xl);
  justify-content: space-between;

  &__remember {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__remember-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__forget {
    color: var(--ui-color-primary);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
  }
}

.actions {
  &__register {
    gap: var(--ui-spacing-xxs);
    display: flex;
    margin-top: var(--ui-spacing-md);
    align-items: center;
    justify-content: center;
  }

  &__register-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__register-link {
    color: var(--ui-color-primary);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
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

  &--sms {
    background: linear-gradient(135deg, var(--ui-color-warning), var(--ui-color-danger));
  }

  &--wechat {
    background: var(--ui-color-success);
  }

  &--apple {
    background: var(--ui-gray-8);
  }
}
</style>
