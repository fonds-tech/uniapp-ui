<template>
  <demo-page>
    <demo-section title="Checkbox 复选框" desc="复选与复选组全部配置示例" :card="false" />

    <!-- ==================== 基础用法 ==================== -->
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value1">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">当前选中：{{ value1.join(", ") || "无" }}</ui-text>
      </demo-block>
    </demo-section>

    <!-- ==================== 外观样式 ==================== -->
    <demo-section title="外观样式">
      <ui-text size="small" color="secondary" class="mb-8">形状对比</ui-text>
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="shapeDot" shape="dot" label="圆点 (dot)" />
        <ui-checkbox v-model="shapeIcon" shape="icon" label="勾选 (icon)" />
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">圆角设置</ui-text>
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="dotSquare" shape="dot" :round="false" label="dot + 方形" />
        <ui-checkbox v-model="dotRound" shape="dot" :round="true" label="dot + 圆形" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="iconSquare" shape="icon" :round="false" label="icon + 方形" />
        <ui-checkbox v-model="iconRound" shape="icon" :round="true" label="icon + 圆形" />
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">尺寸设置</ui-text>
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
      <demo-block direction="row" align="center" :gap="32" class="mt-16">
        <ui-checkbox v-model="iconXs" shape="icon" icon-size="24rpx" label="24rpx" />
        <ui-checkbox v-model="iconSm" shape="icon" icon-size="32rpx" label="32rpx" />
        <ui-checkbox v-model="iconMd" shape="icon" icon-size="40rpx" label="40rpx" />
        <ui-checkbox v-model="iconLg" shape="icon" icon-size="52rpx" label="52rpx" />
        <ui-checkbox v-model="iconXl" shape="icon" icon-size="64rpx" label="64rpx" />
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">颜色主题</ui-text>
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
      <demo-block direction="column" class="mt-16">
        <ui-checkbox-group v-model="value6" checked-color="#07c160" :gap="16">
          <ui-checkbox name="1">组级别自定义颜色</ui-checkbox>
          <ui-checkbox name="2">继承颜色</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">图标边框与样式</ui-text>
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="borderColor1" icon-color="#1989fa" label="蓝色边框" />
        <ui-checkbox v-model="borderColor2" icon-color="#ee0a24" label="红色边框" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="borderRadius1" :round="false" icon-radius="2rpx" label="小圆角" />
        <ui-checkbox v-model="borderRadius2" :round="false" icon-radius="8rpx" label="大圆角" />
      </demo-block>
      <demo-block class="mt-16">
        <ui-checkbox
          v-model="customStyleCheck"
          custom-class="my-checkbox"
          :custom-style="{ padding: '16rpx', background: '#f5f5f5', borderRadius: '8rpx' }"
          label="自定义样式复选框"
        />
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">复选框组样式</ui-text>
      <demo-block direction="column" :gap="16">
        <ui-text size="small" color="secondary">圆形（默认）</ui-text>
        <ui-checkbox-group v-model="value7" round :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">方形</ui-text>
        <ui-checkbox-group v-model="value8" :round="false" :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
        </ui-checkbox-group>
        <view class="mt-16">
          <ui-text size="small" color="secondary" class="mb-8">统一 dot 样式</ui-text>
          <ui-checkbox-group v-model="shapeValueDot" shape="dot" :gap="16">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view class="mt-16">
          <ui-text size="small" color="secondary" class="mb-8">统一 icon 样式</ui-text>
          <ui-checkbox-group v-model="shapeValueIcon" shape="icon" :gap="16">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view class="mt-16">
          <ui-checkbox-group v-model="groupStyleDot" shape="dot" color="#ee0a24" icon-size="44rpx">
            <demo-block :gap="32">
              <ui-checkbox name="a" label="选项 A" />
              <ui-checkbox name="b" label="选项 B" />
              <ui-checkbox name="c" label="选项 C" />
            </demo-block>
          </ui-checkbox-group>
          <text class="demo-text">统一 dot 样式 + 红色 + 大尺寸</text>
        </view>
        <view class="mt-16">
          <ui-checkbox-group v-model="groupStyleIcon" shape="icon" color="#07c160" icon-size="44rpx">
            <demo-block :gap="32">
              <ui-checkbox name="a" label="选项 A" />
              <ui-checkbox name="b" label="选项 B" />
              <ui-checkbox name="c" label="选项 C" />
            </demo-block>
          </ui-checkbox-group>
          <text class="demo-text">统一 icon 样式 + 绿色 + 大尺寸</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 状态与限制 ==================== -->
    <demo-section title="状态与限制">
      <ui-text size="small" color="secondary" class="mb-8">禁用与只读</ui-text>
      <demo-block :cols="2" :gap="32">
        <ui-checkbox :model-value="false" shape="dot" disabled label="dot 禁用未选" />
        <ui-checkbox :model-value="true" shape="dot" disabled label="dot 禁用已选" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox :model-value="false" shape="icon" disabled label="icon 禁用未选" />
        <ui-checkbox :model-value="true" shape="icon" disabled label="icon 禁用已选" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox :model-value="false" shape="dot" readonly label="dot 只读未选" />
        <ui-checkbox :model-value="true" shape="dot" readonly label="dot 只读已选" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox :model-value="false" shape="icon" readonly label="icon 只读未选" />
        <ui-checkbox :model-value="true" shape="icon" readonly label="icon 只读已选" />
      </demo-block>
      <demo-block direction="column" class="mt-16">
        <ui-checkbox-group v-model="value5" disabled :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">数量限制</ui-text>
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
      <demo-block direction="column" class="mt-16">
        <ui-checkbox-group v-model="value4" :max="2" :gap="16">
          <ui-checkbox name="1">选项 1</ui-checkbox>
          <ui-checkbox name="2">选项 2</ui-checkbox>
          <ui-checkbox name="3">选项 3</ui-checkbox>
          <ui-checkbox name="4">选项 4</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">最多选择 2 项</ui-text>
      </demo-block>
      <demo-block direction="column" class="mt-16">
        <ui-checkbox-group v-model="valueMin" :min="1" :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">最少选择 1 项</ui-text>
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">不确定状态</ui-text>
      <demo-block :cols="2" :gap="32">
        <ui-checkbox :model-value="false" shape="dot" indeterminate label="dot 不确定" />
        <ui-checkbox :model-value="false" shape="icon" indeterminate label="icon 不确定" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox :model-value="false" shape="icon" indeterminate :round="false" label="方形" />
        <ui-checkbox :model-value="false" shape="icon" indeterminate :round="true" label="圆形" />
      </demo-block>
      <demo-block direction="column" :gap="16" class="mt-16">
        <ui-checkbox :model-value="false" indeterminate shape="dot" disabled label="dot 禁用不确定" />
        <ui-checkbox :model-value="false" indeterminate shape="icon" disabled label="icon 禁用不确定" />
      </demo-block>
    </demo-section>

    <!-- ==================== 标签与布局 ==================== -->
    <demo-section title="标签与布局">
      <ui-text size="small" color="secondary" class="mb-8">标签配置</ui-text>
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="labelSize1" label-size="24rpx" label="小号标签" />
        <ui-checkbox v-model="labelSize2" label-size="32rpx" label="大号标签" />
        <ui-checkbox v-model="labelColor1" label-color="#1989fa" label="蓝色标签" />
        <ui-checkbox v-model="labelWeight1" label-weight="600" label="粗体标签" />
        <ui-checkbox v-model="labelGap1" label-gap="24rpx" label="大间距标签" />
        <ui-checkbox v-model="labelCheckedColor" checked-label-color="#07c160" label="选中变色标签" />
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">标签位置</ui-text>
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="labelPosRight" label-position="right" label="右侧标签" />
        <ui-checkbox v-model="labelPosLeft" label-position="left" label="左侧标签" />
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-checkbox v-model="labelPosRightIcon" shape="icon" label-position="right" label="icon 右侧" />
        <ui-checkbox v-model="labelPosLeftIcon" shape="icon" label-position="left" label="icon 左侧" />
      </demo-block>
      <demo-block direction="column" class="mt-16">
        <ui-checkbox-group v-model="value9" label-left :gap="16">
          <ui-checkbox name="1">标签在左侧</ui-checkbox>
          <ui-checkbox name="2">选项二</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">禁用标签点击</ui-text>
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="labelDisabledDot" shape="dot" label-disabled label="dot 禁用标签" />
        <ui-checkbox v-model="labelDisabledIcon" shape="icon" label-disabled label="icon 禁用标签" />
      </demo-block>
      <text class="demo-text">只有点击图标才能切换状态</text>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">排列方式</ui-text>
      <demo-block direction="column">
        <ui-checkbox-group v-model="value2" :gap="24">
          <ui-checkbox name="1">苹果</ui-checkbox>
          <ui-checkbox name="2">香蕉</ui-checkbox>
          <ui-checkbox name="3">橙子</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
      <demo-block direction="column" class="mt-16">
        <ui-checkbox-group v-model="value3" vertical :gap="16">
          <ui-checkbox name="a">选项一</ui-checkbox>
          <ui-checkbox name="b">选项二</ui-checkbox>
          <ui-checkbox name="c">选项三</ui-checkbox>
          <ui-checkbox name="d">选项四</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 全选与高级应用 ==================== -->
    <demo-section title="全选与高级应用">
      <ui-text size="small" color="secondary" class="mb-8">全选与不确定状态</ui-text>
      <demo-block direction="column" :gap="16">
        <ui-checkbox v-model="selectAllChecked" :indeterminate="isIndeterminate" shape="icon" label="全选" @change="onSelectAllChange" />
        <ui-checkbox-group v-model="selectedItems" shape="icon" :gap="16" @change="onGroupChangeAll">
          <ui-checkbox name="apple">苹果</ui-checkbox>
          <ui-checkbox name="banana">香蕉</ui-checkbox>
          <ui-checkbox name="orange">橙子</ui-checkbox>
          <ui-checkbox name="grape">葡萄</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">已选择：{{ selectedItems.length }}/4</ui-text>
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">不确定状态 × 形状</ui-text>
      <demo-block direction="column" :gap="24">
        <view>
          <ui-text size="small" color="secondary" class="mb-8">dot 形状</ui-text>
          <ui-checkbox v-model="selectAllDot" :indeterminate="isIndeterminateDot" shape="dot" label="全选" @change="onSelectAllDotChange" />
          <ui-checkbox-group v-model="selectedDotItems" shape="dot" :gap="16" class="mt-12" @change="onDotGroupChange">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view>
          <ui-text size="small" color="secondary" class="mb-8">icon 形状</ui-text>
          <ui-checkbox v-model="selectAllIcon" :indeterminate="isIndeterminateIcon" shape="icon" label="全选" @change="onSelectAllIconChange" />
          <ui-checkbox-group v-model="selectedIconItems" shape="icon" :gap="16" class="mt-12" @change="onIconGroupChange">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">不确定状态 × 颜色</ui-text>
      <demo-block direction="column" :gap="24">
        <view>
          <ui-checkbox v-model="selectAllRed" :indeterminate="isIndeterminateRed" shape="icon" color="#ee0a24" label="红色主题 - 全选" @change="onSelectAllRedChange" />
          <ui-checkbox-group v-model="selectedRedItems" shape="icon" color="#ee0a24" :gap="16" class="mt-12" @change="onRedGroupChange">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view>
          <ui-checkbox v-model="selectAllGreen" :indeterminate="isIndeterminateGreen" shape="icon" color="#07c160" label="绿色主题 - 全选" @change="onSelectAllGreenChange" />
          <ui-checkbox-group v-model="selectedGreenItems" shape="icon" color="#07c160" :gap="16" class="mt-12" @change="onGreenGroupChange">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
      </demo-block>

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">自定义插槽</ui-text>
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

      <view class="mt-16" />
      <ui-text size="small" color="secondary" class="mb-8">事件处理</ui-text>
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox v-model="eventCheck" label="点击触发事件" @click="onCheckboxClick" @change="onCheckboxChange" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
      <demo-block direction="column" align="start" :gap="24" class="mt-16">
        <ui-checkbox-group v-model="eventValue" :gap="16" @change="onEventChange">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">{{ groupEventLog }}</ui-text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

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

// ==================== CheckboxGroup: 基础示例 ====================
const value1 = ref(["a"])
const value2 = ref(["1", "2"])
const value3 = ref(["a", "c"])
const value4 = ref(["1"])
const valueMin = ref(["a"])
const value5 = ref(["a", "b"])
const value6 = ref(["1"])
const value7 = ref(["a"])
const value8 = ref(["a"])
const value9 = ref(["1"])
const shapeValueDot = ref(["a"])
const shapeValueIcon = ref(["a"])

// ==================== 全选与不确定状态 ====================
const ALL_ITEMS = ["apple", "banana", "orange", "grape"]
const selectAllChecked = ref(false)
const selectedItems = ref(["apple"])

const isIndeterminate = computed(() => {
  const len = selectedItems.value.length
  return len > 0 && len < ALL_ITEMS.length
})

function onSelectAllChange(checked: boolean) {
  selectedItems.value = checked ? [...ALL_ITEMS] : []
}

function onGroupChangeAll(value: string[]) {
  selectAllChecked.value = value.length === ALL_ITEMS.length
}

// ==================== 不确定状态 × 形状 (dot) ====================
const DOT_ITEMS = ["a", "b", "c"]
const selectAllDot = ref(false)
const selectedDotItems = ref(["a"])

const isIndeterminateDot = computed(() => {
  const len = selectedDotItems.value.length
  return len > 0 && len < DOT_ITEMS.length
})

function onSelectAllDotChange(checked: boolean) {
  selectedDotItems.value = checked ? [...DOT_ITEMS] : []
}

function onDotGroupChange(value: string[]) {
  selectAllDot.value = value.length === DOT_ITEMS.length
}

// ==================== 不确定状态 × 形状 (icon) ====================
const ICON_ITEMS = ["a", "b", "c"]
const selectAllIcon = ref(false)
const selectedIconItems = ref(["a"])

const isIndeterminateIcon = computed(() => {
  const len = selectedIconItems.value.length
  return len > 0 && len < ICON_ITEMS.length
})

function onSelectAllIconChange(checked: boolean) {
  selectedIconItems.value = checked ? [...ICON_ITEMS] : []
}

function onIconGroupChange(value: string[]) {
  selectAllIcon.value = value.length === ICON_ITEMS.length
}

// ==================== 不确定状态 × 颜色 (红) ====================
const RED_ITEMS = ["a", "b", "c"]
const selectAllRed = ref(false)
const selectedRedItems = ref(["a"])

const isIndeterminateRed = computed(() => {
  const len = selectedRedItems.value.length
  return len > 0 && len < RED_ITEMS.length
})

function onSelectAllRedChange(checked: boolean) {
  selectedRedItems.value = checked ? [...RED_ITEMS] : []
}

function onRedGroupChange(value: string[]) {
  selectAllRed.value = value.length === RED_ITEMS.length
}

// ==================== 不确定状态 × 颜色 (绿) ====================
const GREEN_ITEMS = ["a", "b", "c"]
const selectAllGreen = ref(false)
const selectedGreenItems = ref(["a"])

const isIndeterminateGreen = computed(() => {
  const len = selectedGreenItems.value.length
  return len > 0 && len < GREEN_ITEMS.length
})

function onSelectAllGreenChange(checked: boolean) {
  selectedGreenItems.value = checked ? [...GREEN_ITEMS] : []
}

function onGreenGroupChange(value: string[]) {
  selectAllGreen.value = value.length === GREEN_ITEMS.length
}

// ==================== 事件监听 ====================
const eventValue = ref(["a"])
const groupEventLog = ref("点击复选框查看事件")

function onEventChange(value: string[]) {
  groupEventLog.value = `change 事件触发，当前值: [${value.join(", ")}]`
}
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16rpx;
}

.mt-12 {
  margin-top: 12rpx;
}

.mb-8 {
  margin-bottom: 8rpx;
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
