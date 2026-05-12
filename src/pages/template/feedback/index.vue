<template>
  <view class="page">
    <ui-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <ui-form-item label="问题类型" prop="type">
        <ui-radio-group v-model="form.type" direction="horizontal">
          <ui-radio v-for="t in types" :key="t" :name="t" shape="button">{{ t }}</ui-radio>
        </ui-radio-group>
      </ui-form-item>

      <ui-form-item label="问题描述" prop="content">
        <ui-textarea v-model="form.content" placeholder="请详细描述您遇到的问题或建议，以便我们更好地为您解决..." :maxlength="500" show-count :min-height="240" background="background-section" radius="16rpx" />
      </ui-form-item>

      <ui-form-item label="图片上传">
        <ui-upload v-model="form.images" multiple :max-count="4" />
      </ui-form-item>

      <ui-form-item label="联系方式" prop="contact">
        <ui-input v-model="form.contact" placeholder="手机号 / 邮箱 / 微信号 (选填)" prefix-icon="phone" background="background-section" radius="16rpx" clearable />
      </ui-form-item>

      <ui-form-item label="紧急程度">
        <view class="urgency">
          <text class="urgency__label">不紧急</text>
          <ui-slider v-model="form.urgency" :min="0" :max="100" :step="25" :custom-style="{ flex: 1 }" />
          <text class="urgency__label">非常紧急</text>
        </view>
      </ui-form-item>
    </ui-form>

    <view class="actions">
      <ui-button block type="primary" size="large" radius="48rpx" :loading="submitting" @click="onSubmit">提交反馈</ui-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "意见反馈" },
})

const toast = useToast()
const formRef = ref<FormInstance>()
const submitting = ref(false)

const types = ["功能异常", "体验优化", "新功能建议", "其他"]

const form = reactive({
  type: "功能异常",
  content: "",
  images: [] as string[],
  contact: "",
  urgency: 25,
})

const rules = {
  type: [{ required: true, message: "请选择问题类型" }],
  content: [{ required: true, message: "请描述问题" }],
}

function onSubmit() {
  formRef.value?.validate((valid) => {
    if (!valid) return
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      toast.success("已提交，感谢反馈")
    }, 600)
  })
}
</script>

<style lang="scss" scoped>
.page {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.urgency {
  gap: var(--ui-spacing-md);
  flex: 1;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    white-space: nowrap;
  }
}

.actions {
  margin-top: var(--ui-spacing-xl);
}
</style>
