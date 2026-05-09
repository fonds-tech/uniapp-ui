<template>
  <demo-page>
    <demo-section title="数字键盘">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-keyboard-panel v-model="value1" mode="number" />
        </view>
        <text class="demo-text">输入值: {{ value1 || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="带小数点">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-keyboard-panel v-model="value2" mode="number" show-dot />
        </view>
        <text class="demo-text">输入值: {{ value2 || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="身份证键盘">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-keyboard-panel v-model="value3" mode="card" :maxlength="18" />
        </view>
        <text class="demo-text">输入值: {{ value3 || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="车牌键盘">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-keyboard-panel v-model="value4" mode="car" :maxlength="8" />
        </view>
        <text class="demo-text">输入值: {{ value4 || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="随机排列">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-keyboard-panel v-model="value5" mode="number" random />
        </view>
        <text class="demo-text">输入值: {{ value5 || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="无头部栏">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-keyboard-panel v-model="value6" mode="number" :show-header="false" />
        </view>
        <text class="demo-text">输入值: {{ value6 || "无" }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("")
</script>

<style lang="scss" scoped>
.panel-box {
  overflow: hidden;
  border-radius: 16rpx;
  background-color: var(--ui-color-background);
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
