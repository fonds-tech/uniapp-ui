<template>
  <demo-page>
    <demo-section title="基础用法">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">文本</text>
          <ui-input v-model="value1" placeholder="请输入内容" />
        </view>
      </view>
    </demo-section>

    <demo-section title="输入框类型">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">文本</text>
          <ui-input v-model="value2" type="text" placeholder="请输入文本" />
        </view>
        <view class="form-item">
          <text class="form-label">数字</text>
          <ui-input v-model="value3" type="number" placeholder="请输入数字" />
        </view>
        <view class="form-item">
          <text class="form-label">小数</text>
          <ui-input v-model="value4" type="digit" placeholder="请输入小数" />
        </view>
        <view class="form-item">
          <text class="form-label">密码</text>
          <ui-input v-model="value5" password placeholder="请输入密码" />
        </view>
      </view>
    </demo-section>

    <demo-section title="禁用和只读">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">禁用</text>
          <ui-input model-value="禁用状态" disabled placeholder="禁用状态" />
        </view>
        <view class="form-item">
          <text class="form-label">只读</text>
          <ui-input model-value="只读状态" readonly placeholder="只读状态" />
        </view>
      </view>
    </demo-section>

    <demo-section title="清除按钮">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">可清除</text>
          <ui-input v-model="value6" clearable placeholder="点击清除" />
        </view>
        <view class="form-item">
          <text class="form-label">不可清除</text>
          <ui-input v-model="value7" :clearable="false" placeholder="无法清除" />
        </view>
      </view>
    </demo-section>

    <demo-section title="自定义样式">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">自定义背景</text>
          <ui-input v-model="value8" background="#f5f6fa" radius="16rpx" placeholder="自定义背景和圆角" />
        </view>
        <view class="form-item">
          <text class="form-label">居中对齐</text>
          <ui-input v-model="value9" input-align="center" placeholder="居中对齐" />
        </view>
        <view class="form-item">
          <text class="form-label">右对齐</text>
          <ui-input v-model="value10" input-align="right" placeholder="右对齐" />
        </view>
      </view>
    </demo-section>

    <demo-section title="限制输入长度">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">最多10字</text>
          <ui-input v-model="value11" :maxlength="10" placeholder="最多输入10个字符" />
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Input 输入框" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("可以清除的内容")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")
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
}

.form-label {
  color: var(--ui-color-text-main);
  width: 160rpx;
  font-size: var(--ui-font-size-md);
  flex-shrink: 0;
}
</style>
