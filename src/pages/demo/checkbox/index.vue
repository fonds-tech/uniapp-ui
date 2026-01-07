<template>
  <demo-page>
    <!-- ==================== 形状对比 ==================== -->
    <demo-section title="形状对比">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="shapeDot" shape="dot" label="圆点 (dot)" />
        <ui-checkbox v-model="shapeIcon" shape="icon" label="勾选 (icon)" />
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 圆角 ==================== -->
    <demo-section title="形状 × 圆角">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="dotSquare" shape="dot" :round="false" label="dot + 方形" />
        <ui-checkbox v-model="dotRound" shape="dot" :round="true" label="dot + 圆形" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="iconSquare" shape="icon" :round="false" label="icon + 方形" />
        <ui-checkbox v-model="iconRound" shape="icon" :round="true" label="icon + 圆形" />
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 尺寸 ==================== -->
    <demo-section title="形状 × 尺寸">
      <demo-block :cols="3" :gap="24">
        <ui-checkbox v-model="dotSmall" shape="dot" icon-size="28rpx" label="dot 小" />
        <ui-checkbox v-model="dotMedium" shape="dot" icon-size="36rpx" label="dot 中" />
        <ui-checkbox v-model="dotLarge" shape="dot" icon-size="48rpx" label="dot 大" />
      </demo-block>
      <demo-block :cols="3" :gap="24" class="mt-16">
        <ui-checkbox v-model="iconSmall" shape="icon" icon-size="28rpx" label="icon 小" />
        <ui-checkbox v-model="iconMedium" shape="icon" icon-size="36rpx" label="icon 中" />
        <ui-checkbox v-model="iconLarge" shape="icon" icon-size="48rpx" label="icon 大" />
      </demo-block>
    </demo-section>

    <!-- ==================== 勾选图标尺寸对比 ==================== -->
    <demo-section title="勾选图标尺寸对比">
      <demo-block direction="row" align="center" :gap="32">
        <ui-checkbox v-model="iconXs" shape="icon" icon-size="24rpx" label="24rpx" />
        <ui-checkbox v-model="iconSm" shape="icon" icon-size="32rpx" label="32rpx" />
        <ui-checkbox v-model="iconMd" shape="icon" icon-size="40rpx" label="40rpx" />
        <ui-checkbox v-model="iconLg" shape="icon" icon-size="52rpx" label="52rpx" />
        <ui-checkbox v-model="iconXl" shape="icon" icon-size="64rpx" label="64rpx" />
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 颜色 ==================== -->
    <demo-section title="形状 × 颜色">
      <demo-block :cols="3" :gap="24">
        <ui-checkbox v-model="dotRed" shape="dot" color="#ee0a24" label="dot 红" />
        <ui-checkbox v-model="dotGreen" shape="dot" color="#07c160" label="dot 绿" />
        <ui-checkbox v-model="dotPurple" shape="dot" color="#7232dd" label="dot 紫" />
      </demo-block>
      <demo-block :cols="3" :gap="24" class="mt-16">
        <ui-checkbox v-model="iconRed" shape="icon" color="#ee0a24" label="icon 红" />
        <ui-checkbox v-model="iconGreen" shape="icon" color="#07c160" label="icon 绿" />
        <ui-checkbox v-model="iconPurple" shape="icon" color="#7232dd" label="icon 紫" />
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 禁用状态 ==================== -->
    <demo-section title="形状 × 禁用状态">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox :model-value="false" shape="dot" disabled label="dot 禁用未选" />
        <ui-checkbox :model-value="true" shape="dot" disabled label="dot 禁用已选" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox :model-value="false" shape="icon" disabled label="icon 禁用未选" />
        <ui-checkbox :model-value="true" shape="icon" disabled label="icon 禁用已选" />
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 只读状态 ==================== -->
    <demo-section title="形状 × 只读状态">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox :model-value="false" shape="dot" readonly label="dot 只读未选" />
        <ui-checkbox :model-value="true" shape="dot" readonly label="dot 只读已选" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox :model-value="false" shape="icon" readonly label="icon 只读未选" />
        <ui-checkbox :model-value="true" shape="icon" readonly label="icon 只读已选" />
      </demo-block>
    </demo-section>

    <!-- ==================== 不确定状态 ==================== -->
    <demo-section title="不确定状态">
      <!-- 形状对比 -->
      <demo-block :cols="2" :gap="32">
        <ui-checkbox :model-value="false" shape="dot" indeterminate label="dot 不确定" />
        <ui-checkbox :model-value="false" shape="icon" indeterminate label="icon 不确定" />
      </demo-block>
      <!-- 圆角对比 -->
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox :model-value="false" shape="icon" indeterminate :round="false" label="方形" />
        <ui-checkbox :model-value="false" shape="icon" indeterminate :round="true" label="圆形" />
      </demo-block>
      <text class="demo-text">配合 checkbox-group 使用的全选示例请查看 CheckboxGroup 页面</text>
    </demo-section>

    <!-- ==================== 图标边框配置 ==================== -->
    <demo-section title="图标边框配置">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="borderColor1" icon-color="#1989fa" label="蓝色边框" />
        <ui-checkbox v-model="borderColor2" icon-color="#ee0a24" label="红色边框" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="borderRadius1" :round="false" icon-radius="2rpx" label="小圆角" />
        <ui-checkbox v-model="borderRadius2" :round="false" icon-radius="8rpx" label="大圆角" />
      </demo-block>
    </demo-section>

    <!-- ==================== 标签配置 ==================== -->
    <demo-section title="标签配置">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="labelSize1" label-size="24rpx" label="小号标签" />
        <ui-checkbox v-model="labelSize2" label-size="32rpx" label="大号标签" />
        <ui-checkbox v-model="labelColor1" label-color="#1989fa" label="蓝色标签" />
        <ui-checkbox v-model="labelWeight1" label-weight="600" label="粗体标签" />
        <ui-checkbox v-model="labelGap1" label-gap="24rpx" label="大间距标签" />
        <ui-checkbox v-model="labelCheckedColor" checked-label-color="#07c160" label="选中变色标签" />
      </demo-block>
    </demo-section>

    <!-- ==================== 标签位置 ==================== -->
    <demo-section title="标签位置">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="labelPosRight" label-position="right" label="右侧标签" />
        <ui-checkbox v-model="labelPosLeft" label-position="left" label="左侧标签" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="labelPosRightIcon" shape="icon" label-position="right" label="icon 右侧" />
        <ui-checkbox v-model="labelPosLeftIcon" shape="icon" label-position="left" label="icon 左侧" />
      </demo-block>
    </demo-section>

    <!-- ==================== 禁用标签点击 ==================== -->
    <demo-section title="禁用标签点击">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="labelDisabledDot" shape="dot" label-disabled label="dot 禁用标签" />
        <ui-checkbox v-model="labelDisabledIcon" shape="icon" label-disabled label="icon 禁用标签" />
      </demo-block>
      <text class="demo-text">只有点击图标才能切换状态</text>
    </demo-section>

    <!-- ==================== 复选框组 ==================== -->
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

    <!-- ==================== 复选框组 - 数量限制 ==================== -->
    <demo-section title="复选框组 - 数量限制">
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
      <demo-block direction="column" align="start" :gap="24" class="mt-16">
        <ui-checkbox-group v-model="minValue" :min="1">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">最少选择 1 项</text>
      </demo-block>
    </demo-section>

    <!-- ==================== 复选框组 - 统一样式 ==================== -->
    <demo-section title="复选框组 - 统一样式">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox-group v-model="groupStyleDot" shape="dot" color="#ee0a24" icon-size="44rpx">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">统一 dot 样式 + 红色 + 大尺寸</text>
      </demo-block>
      <demo-block direction="column" align="start" :gap="24" class="mt-16">
        <ui-checkbox-group v-model="groupStyleIcon" shape="icon" color="#07c160" icon-size="44rpx">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">统一 icon 样式 + 绿色 + 大尺寸</text>
      </demo-block>
    </demo-section>

    <!-- ==================== 自定义插槽 ==================== -->
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

    <!-- ==================== 事件处理 ==================== -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="eventCheck" label="点击触发事件" @click="onCheckboxClick" @change="onCheckboxChange" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- ==================== 自定义样式 ==================== -->
    <demo-section title="自定义样式">
      <demo-block>
        <ui-checkbox
          v-model="customStyleCheck"
          custom-class="my-checkbox"
          :custom-style="{ padding: '16rpx', background: '#f5f5f5', borderRadius: '8rpx' }"
          label="自定义样式复选框"
        />
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

// ==================== 形状对比 ====================
const shapeDot = ref(true)
const shapeIcon = ref(true)

// ==================== 形状 × 圆角 ====================
const dotSquare = ref(true)
const dotRound = ref(true)
const iconSquare = ref(true)
const iconRound = ref(true)

// ==================== 形状 × 尺寸 ====================
const dotSmall = ref(true)
const dotMedium = ref(true)
const dotLarge = ref(true)
const iconSmall = ref(true)
const iconMedium = ref(true)
const iconLarge = ref(true)

// ==================== 勾选图标尺寸对比 ====================
const iconXs = ref(true)
const iconSm = ref(true)
const iconMd = ref(true)
const iconLg = ref(true)
const iconXl = ref(true)

// ==================== 形状 × 颜色 ====================
const dotRed = ref(true)
const dotGreen = ref(true)
const dotPurple = ref(true)
const iconRed = ref(true)
const iconGreen = ref(true)
const iconPurple = ref(true)

// ==================== 图标边框配置 ====================
const borderColor1 = ref(true)
const borderColor2 = ref(true)
const borderRadius1 = ref(true)
const borderRadius2 = ref(true)

// ==================== 标签配置 ====================
const labelSize1 = ref(true)
const labelSize2 = ref(true)
const labelColor1 = ref(true)
const labelWeight1 = ref(true)
const labelGap1 = ref(true)
const labelCheckedColor = ref(true)

// ==================== 标签位置 ====================
const labelPosRight = ref(true)
const labelPosLeft = ref(true)
const labelPosRightIcon = ref(true)
const labelPosLeftIcon = ref(true)

// ==================== 禁用标签点击 ====================
const labelDisabledDot = ref(false)
const labelDisabledIcon = ref(false)

// ==================== 复选框组 ====================
const groupValue = ref(["a"])
const maxValue = ref(["a"])
const minValue = ref(["a"])
const groupStyleDot = ref(["a"])
const groupStyleIcon = ref(["a"])

function onGroupChange(value: string[]) {
  toast.text(`选中: ${value.join(", ") || "无"}`)
}

// ==================== 自定义插槽 ====================
const slotIcon = ref(true)
const slotDefault = ref(true)

// ==================== 事件处理 ====================
const eventCheck = ref(false)
const eventLog = ref("点击复选框查看事件")

function onCheckboxClick() {
  eventLog.value = "触发了 click 事件"
}

function onCheckboxChange(value: boolean) {
  eventLog.value = `触发了 change 事件，值: ${value}`
}

// ==================== 自定义样式 ====================
const customStyleCheck = ref(false)
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-top: 16rpx;
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
