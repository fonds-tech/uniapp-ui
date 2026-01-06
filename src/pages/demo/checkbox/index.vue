<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-checkbox v-model="checked" label="复选框" @change="onChange" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="disabled1" disabled label="禁用状态" />
        <ui-checkbox :model-value="true" disabled label="禁用且选中" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义形状">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="shape1" :round="false" label="方形" />
        <ui-checkbox v-model="shape2" :round="true" label="圆形" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="shapeDot" shape="dot" label="点状" />
        <ui-checkbox v-model="shapeIcon" shape="icon" icon="check" label="图标" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="3" :gap="32">
        <ui-checkbox v-model="color1" checked-color="#ee0a24" label="红色" />
        <ui-checkbox v-model="color2" checked-color="#07c160" label="绿色" />
        <ui-checkbox v-model="color3" checked-color="#7232dd" label="紫色" />
      </demo-block>
    </demo-section>

    <!-- 新增：图标配置 -->
    <demo-section title="图标配置">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="iconConfig1" shape="icon" icon="check" icon-color="#999" checked-icon-color="#1989fa" label="自定义图标颜色" />
        <ui-checkbox v-model="iconConfig2" shape="icon" icon="check" icon-weight="600" label="粗图标" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="iconConfig3" shape="icon" :round="false" icon-radius="4rpx" label="方角图标" />
        <ui-checkbox v-model="iconConfig4" shape="icon" :round="true" label="圆形图标" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block :cols="3" :gap="32">
        <ui-checkbox v-model="size1" icon-size="32rpx" label="小" />
        <ui-checkbox v-model="size2" icon-size="40rpx" label="中" />
        <ui-checkbox v-model="size3" icon-size="48rpx" label="大" />
      </demo-block>
    </demo-section>

    <!-- 新增：标签样式 -->
    <demo-section title="标签样式">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="labelStyle1" label-size="32rpx" label-color="#1989fa" label="大号蓝色标签" />
        <ui-checkbox v-model="labelStyle2" label-weight="600" label="粗体标签" />
        <ui-checkbox v-model="labelStyle3" label-gap="32rpx" label="大间距标签" />
        <ui-checkbox v-model="labelStyle4" checked-label-color="#07c160" label="选中变色标签" />
      </demo-block>
    </demo-section>

    <!-- 新增：标签位置 -->
    <demo-section title="标签位置">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="labelPos1" label="右侧标签（默认）" />
        <ui-checkbox v-model="labelPos2" label-left label="左侧标签" />
      </demo-block>
    </demo-section>

    <!-- 新增：禁用标签点击 -->
    <demo-section title="禁用标签点击">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="labelDisabled" label-disabled label="只能点击图标切换" />
        <text class="demo-text">标签点击无效，只有点击图标才能切换状态</text>
      </demo-block>
    </demo-section>

    <demo-section title="复选框组">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox-group v-model="groupValue" @change="onGroupChange">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">当前选中: {{ groupValue.join(", ") || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="限制最大可选数">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox-group v-model="maxValue" :max="2">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
            <ui-checkbox name="d" label="选项 D" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">最多选择 2 项</text>
      </demo-block>
    </demo-section>

    <demo-section title="水平排列">
      <demo-block>
        <ui-checkbox-group v-model="horizontalValue" direction="horizontal">
          <ui-checkbox name="a" label="选项 A" />
          <ui-checkbox name="b" label="选项 B" />
          <ui-checkbox name="c" label="选项 C" />
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <!-- 新增：组内统一样式 -->
    <demo-section title="组内统一样式">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox-group v-model="groupStyleValue" checked-color="#ee0a24" icon-size="44rpx" shape="dot">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">组内统一设置颜色、大小、形状</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义插槽 -->
    <demo-section title="自定义插槽">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="slotIcon">
          <template #icon="{ checked }">
            <ui-icon :name="checked ? 'check-circle-fill' : 'circle'" :color="checked ? '#07c160' : '#999'" size="44rpx" />
          </template>
          自定义图标插槽
        </ui-checkbox>
        <ui-checkbox v-model="slotDefault">
          <view class="custom-label">
            <text class="custom-label__title">自定义内容</text>
            <text class="custom-label__desc">通过默认插槽自定义标签内容</text>
          </view>
        </ui-checkbox>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="eventCheck" label="点击触发事件" @click="onCheckboxClick" @change="onCheckboxChange" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block>
        <ui-checkbox v-model="customStyle" custom-class="my-checkbox" :custom-style="{ padding: '16rpx', background: '#f5f5f5', borderRadius: '8rpx' }" label="自定义样式复选框" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Checkbox 复选框" },
})

const toast = useToast()

// 基础示例
const checked = ref(true)
const disabled1 = ref(false)
const shape1 = ref(true)
const shape2 = ref(true)
const shapeDot = ref(true)
const shapeIcon = ref(true)
const color1 = ref(true)
const color2 = ref(true)
const color3 = ref(true)
const size1 = ref(true)
const size2 = ref(true)
const size3 = ref(true)
const groupValue = ref(["a"])
const maxValue = ref(["a"])
const horizontalValue = ref(["a", "b"])

// 新增示例
const iconConfig1 = ref(true)
const iconConfig2 = ref(true)
const iconConfig3 = ref(true)
const iconConfig4 = ref(true)
const labelStyle1 = ref(true)
const labelStyle2 = ref(true)
const labelStyle3 = ref(true)
const labelStyle4 = ref(true)
const labelPos1 = ref(true)
const labelPos2 = ref(true)
const labelDisabled = ref(false)
const groupStyleValue = ref(["a"])
const slotIcon = ref(true)
const slotDefault = ref(true)
const eventCheck = ref(false)
const eventLog = ref("点击复选框查看事件")
const customStyle = ref(false)

// 事件处理
function onChange(value: boolean) {
  toast.text(`状态: ${value ? "选中" : "未选中"}`)
}

function onGroupChange(value: string[]) {
  toast.text(`选中: ${value.join(", ") || "无"}`)
}

function onCheckboxClick() {
  eventLog.value = "触发了 click 事件"
}

function onCheckboxChange(value: boolean) {
  eventLog.value = `触发了 change 事件，值: ${value}`
}
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.custom-label {
  gap: 8rpx;
  display: flex;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text-main);
    font-size: 28rpx;
    font-weight: 500;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}

:deep(.my-checkbox) {
  border: 2rpx solid #eee;
}
</style>
