<template>
  <demo-page>
    <demo-section title="基础用法">
      <view class="form-list">
        <view class="form-item form-item--vertical">
          <text class="form-label">留言</text>
          <ui-textarea v-model="value1" placeholder="请输入留言内容" />
        </view>
      </view>
    </demo-section>

    <demo-section title="字数统计">
      <view class="form-list">
        <view class="form-item form-item--vertical">
          <text class="form-label">个人简介</text>
          <ui-textarea v-model="value2" placeholder="请输入个人简介" :maxlength="100" show-count />
        </view>
      </view>
    </demo-section>

    <demo-section title="自动高度">
      <view class="form-list">
        <view class="form-item form-item--vertical">
          <text class="form-label">详细描述</text>
          <ui-textarea v-model="value3" placeholder="输入内容时高度自动增加" auto-height />
        </view>
      </view>
    </demo-section>

    <demo-section title="禁用和只读">
      <view class="form-list">
        <view class="form-item form-item--vertical">
          <text class="form-label">禁用状态</text>
          <ui-textarea v-model="value4" placeholder="禁用状态" disabled />
        </view>
        <view class="form-item form-item--vertical">
          <text class="form-label">只读状态</text>
          <ui-textarea model-value="这是只读状态的文本内容，无法编辑。" readonly />
        </view>
      </view>
    </demo-section>

    <demo-section title="可清除">
      <view class="form-list">
        <view class="form-item form-item--vertical">
          <text class="form-label">反馈意见</text>
          <ui-textarea v-model="value5" placeholder="请输入反馈意见" clearable />
        </view>
      </view>
    </demo-section>

    <demo-section title="自定义样式">
      <view class="form-list">
        <view class="form-item form-item--vertical">
          <text class="form-label">备注信息</text>
          <ui-textarea v-model="value6" placeholder="带边框和圆角的文本域" border="1rpx solid #dcdee0" radius="16rpx" padding="24rpx" />
        </view>
      </view>
    </demo-section>

    <demo-section title="表单场景">
      <view class="form-list">
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
          <ui-textarea v-model="formAddress" placeholder="请输入详细地址" :maxlength="200" show-count />
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Textarea 文本域" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("这是禁用状态的文本")
const value5 = ref("点击右侧图标清除")
const value6 = ref("")

// Form example
const formName = ref("")
const formPhone = ref("")
const formAddress = ref("")
</script>

<style lang="scss" scoped>
.form-list {
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
  color: var(--ui-color-text-main);
  width: 160rpx;
  font-size: var(--ui-font-size-md);
  flex-shrink: 0;

  .form-item--vertical & {
    width: auto;
  }
}

// Ensure textarea takes full width in vertical layout
.form-item--vertical {
  :deep(.ui-textarea) {
    width: 100%;
  }
}
</style>
