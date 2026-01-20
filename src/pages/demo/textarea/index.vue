<template>
  <demo-page padding-x="0">
    <demo-section title="基础用法" :card="false">
      <ui-textarea v-model="basic" placeholder="请输入留言内容" />
    </demo-section>

    <demo-section title="字数统计" :card="false">
      <ui-textarea v-model="count" placeholder="请输入个人简介" :maxlength="100" show-count />
    </demo-section>

    <demo-section title="自动高度" :card="false">
      <ui-textarea v-model="autoHeight" placeholder="输入内容时高度自动增加" auto-height />
    </demo-section>

    <demo-section title="可清除" :card="false">
      <ui-textarea v-model="clearable" placeholder="请输入反馈意见" clearable />
    </demo-section>

    <demo-section title="禁用状态" :card="false">
      <ui-textarea v-model="disabled" placeholder="禁用状态" disabled />
    </demo-section>

    <demo-section title="只读状态" :card="false">
      <ui-textarea model-value="这是只读状态的文本内容，无法编辑。" readonly />
    </demo-section>

    <demo-section title="自定义样式" :card="false">
      <ui-textarea v-model="custom" placeholder="带边框和圆角" border="1rpx solid #dcdee0" radius="16rpx" />
    </demo-section>

    <demo-section title="表单场景">
      <view class="form-card">
        <view class="form-item">
          <text class="form-label">姓名</text>
          <ui-input v-model="formName" placeholder="请输入姓名" />
        </view>
        <view class="form-item">
          <text class="form-label">手机号</text>
          <ui-input v-model="formPhone" type="number" placeholder="请输入手机号" />
        </view>
        <view class="form-item form-item--vertical">
          <text class="form-label">详细地址</text>
          <ui-textarea v-model="formAddress" placeholder="请输入详细地址" :maxlength="200" show-count background="#f7f8fa" />
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Textarea 文本域" },
})

const basic = ref("")
const count = ref("")
const autoHeight = ref("")
const clearable = ref("点击右侧图标清除")
const disabled = ref("这是禁用状态的文本")
const custom = ref("")

const formName = ref("")
const formPhone = ref("")
const formAddress = ref("")
</script>

<style lang="scss" scoped>
.form-card {
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-xl);
}

.form-item {
  display: flex;
  padding: var(--ui-spacing-xl) var(--ui-spacing-xxl);
  align-items: center;
  border-bottom: 1px solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }

  &--vertical {
    gap: var(--ui-spacing-lg);
    align-items: stretch;
    flex-direction: column;
  }
}

.form-label {
  color: var(--ui-color-text-primary);
  width: 160rpx;
  font-size: var(--ui-font-size-md);
  flex-shrink: 0;

  .form-item--vertical & {
    width: auto;
  }
}
</style>
