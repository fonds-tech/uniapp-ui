<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-radio-group v-model="value1">
          <demo-block :gap="32">
            <ui-radio name="1" label="选项一" />
            <ui-radio name="2" label="选项二" />
          </demo-block>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="水平排列">
      <demo-block>
        <ui-radio-group v-model="value2" direction="horizontal">
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
          <ui-radio name="3" label="选项三" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-radio-group v-model="value3" disabled>
          <demo-block :gap="32">
            <ui-radio name="1" label="选项一" />
            <ui-radio name="2" label="选项二" />
          </demo-block>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="图标样式">
      <demo-block :cols="2" :gap="32">
        <view class="radio-item">
          <ui-radio-group v-model="value4">
            <demo-block :gap="24">
              <ui-radio name="1" label="选项一" />
              <ui-radio name="2" label="选项二" />
            </demo-block>
          </ui-radio-group>
          <text class="radio-label">方形</text>
        </view>
        <view class="radio-item">
          <ui-radio-group v-model="value5" shape="round">
            <demo-block :gap="24">
              <ui-radio name="1" label="选项一" />
              <ui-radio name="2" label="选项二" />
            </demo-block>
          </ui-radio-group>
          <text class="radio-label">圆形</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="圆点样式">
      <demo-block>
        <ui-radio-group v-model="value6" shape="dot">
          <demo-block :gap="32">
            <ui-radio name="1" label="选项一" />
            <ui-radio name="2" label="选项二" />
          </demo-block>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="3" :gap="24">
        <view class="radio-item">
          <ui-radio-group v-model="value7" checked-color="primary">
            <ui-radio name="1" label="主题色" />
          </ui-radio-group>
        </view>
        <view class="radio-item">
          <ui-radio-group v-model="value8" checked-color="success">
            <ui-radio name="1" label="成功色" />
          </ui-radio-group>
        </view>
        <view class="radio-item">
          <ui-radio-group v-model="value9" checked-color="danger">
            <ui-radio name="1" label="危险色" />
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="左侧文本">
      <demo-block>
        <ui-radio-group v-model="value10" label-position="left">
          <demo-block :gap="32">
            <ui-radio name="1" label="选项一" />
            <ui-radio name="2" label="选项二" />
          </demo-block>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block :cols="3" :gap="24">
        <view class="radio-item">
          <ui-radio-group v-model="value11" icon-size="32rpx">
            <ui-radio name="1" label="小" />
          </ui-radio-group>
        </view>
        <view class="radio-item">
          <ui-radio-group v-model="value12" icon-size="40rpx">
            <ui-radio name="1" label="中" />
          </ui-radio-group>
        </view>
        <view class="radio-item">
          <ui-radio-group v-model="value13" icon-size="48rpx">
            <ui-radio name="1" label="大" />
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Radio 单选框" },
})

const value1 = ref("1")
const value2 = ref("1")
const value3 = ref("1")
const value4 = ref("1")
const value5 = ref("1")
const value6 = ref("1")
const value7 = ref("1")
const value8 = ref("1")
const value9 = ref("1")
const value10 = ref("1")
const value11 = ref("1")
const value12 = ref("1")
const value13 = ref("1")
</script>

<style lang="scss" scoped>
.radio-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12rpx;
}

.radio-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
