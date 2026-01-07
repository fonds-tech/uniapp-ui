<template>
  <demo-page>
    <!-- ==================== 形状对比 ==================== -->
    <demo-section title="形状对比">
      <demo-block :cols="2" :gap="32">
        <ui-radio-group v-model="shapeDot">
          <ui-radio name="1" shape="dot" label="圆点 (dot)" />
        </ui-radio-group>
        <ui-radio-group v-model="shapeIcon">
          <ui-radio name="1" shape="icon" label="勾选 (icon)" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 圆角 ==================== -->
    <demo-section title="形状 × 圆角">
      <demo-block :cols="2" :gap="32">
        <ui-radio-group v-model="dotSquare">
          <ui-radio name="1" shape="dot" :round="false" label="dot + 方形" />
        </ui-radio-group>
        <ui-radio-group v-model="dotRound">
          <ui-radio name="1" shape="dot" :round="true" label="dot + 圆形" />
        </ui-radio-group>
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-radio-group v-model="iconSquare">
          <ui-radio name="1" shape="icon" :round="false" label="icon + 方形" />
        </ui-radio-group>
        <ui-radio-group v-model="iconRound">
          <ui-radio name="1" shape="icon" :round="true" label="icon + 圆形" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 尺寸 ==================== -->
    <demo-section title="形状 × 尺寸">
      <demo-block :cols="3" :gap="24">
        <ui-radio-group v-model="dotSmall">
          <ui-radio name="1" shape="dot" icon-size="28rpx" label="dot 小" />
        </ui-radio-group>
        <ui-radio-group v-model="dotMedium">
          <ui-radio name="1" shape="dot" icon-size="36rpx" label="dot 中" />
        </ui-radio-group>
        <ui-radio-group v-model="dotLarge">
          <ui-radio name="1" shape="dot" icon-size="48rpx" label="dot 大" />
        </ui-radio-group>
      </demo-block>
      <demo-block :cols="3" :gap="24" class="mt-16">
        <ui-radio-group v-model="iconSmall">
          <ui-radio name="1" shape="icon" icon-size="28rpx" label="icon 小" />
        </ui-radio-group>
        <ui-radio-group v-model="iconMedium">
          <ui-radio name="1" shape="icon" icon-size="36rpx" label="icon 中" />
        </ui-radio-group>
        <ui-radio-group v-model="iconLarge">
          <ui-radio name="1" shape="icon" icon-size="48rpx" label="icon 大" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 颜色 ==================== -->
    <demo-section title="形状 × 颜色">
      <demo-block :cols="3" :gap="24">
        <ui-radio-group v-model="dotRed">
          <ui-radio name="1" shape="dot" checked-color="#ee0a24" label="dot 红" />
        </ui-radio-group>
        <ui-radio-group v-model="dotGreen">
          <ui-radio name="1" shape="dot" checked-color="#07c160" label="dot 绿" />
        </ui-radio-group>
        <ui-radio-group v-model="dotPurple">
          <ui-radio name="1" shape="dot" checked-color="#7232dd" label="dot 紫" />
        </ui-radio-group>
      </demo-block>
      <demo-block :cols="3" :gap="24" class="mt-16">
        <ui-radio-group v-model="iconRed">
          <ui-radio name="1" shape="icon" checked-color="#ee0a24" label="icon 红" />
        </ui-radio-group>
        <ui-radio-group v-model="iconGreen">
          <ui-radio name="1" shape="icon" checked-color="#07c160" label="icon 绿" />
        </ui-radio-group>
        <ui-radio-group v-model="iconPurple">
          <ui-radio name="1" shape="icon" checked-color="#7232dd" label="icon 紫" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 禁用状态 ==================== -->
    <demo-section title="形状 × 禁用状态">
      <demo-block :cols="2" :gap="32">
        <ui-radio-group model-value="">
          <ui-radio name="1" shape="dot" disabled label="dot 禁用未选" />
        </ui-radio-group>
        <ui-radio-group model-value="1">
          <ui-radio name="1" shape="dot" disabled label="dot 禁用已选" />
        </ui-radio-group>
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-radio-group model-value="">
          <ui-radio name="1" shape="icon" disabled label="icon 禁用未选" />
        </ui-radio-group>
        <ui-radio-group model-value="1">
          <ui-radio name="1" shape="icon" disabled label="icon 禁用已选" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 形状 × 只读状态 ==================== -->
    <demo-section title="形状 × 只读状态">
      <demo-block :cols="2" :gap="32">
        <ui-radio-group model-value="">
          <ui-radio name="1" shape="dot" readonly label="dot 只读未选" />
        </ui-radio-group>
        <ui-radio-group model-value="1">
          <ui-radio name="1" shape="dot" readonly label="dot 只读已选" />
        </ui-radio-group>
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-radio-group model-value="">
          <ui-radio name="1" shape="icon" readonly label="icon 只读未选" />
        </ui-radio-group>
        <ui-radio-group model-value="1">
          <ui-radio name="1" shape="icon" readonly label="icon 只读已选" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 标签配置 ==================== -->
    <demo-section title="标签配置">
      <demo-block direction="column" align="start" :gap="24">
        <ui-radio-group v-model="labelSize1">
          <ui-radio name="1" label-size="24rpx" label="小号标签" />
        </ui-radio-group>
        <ui-radio-group v-model="labelSize2">
          <ui-radio name="1" label-size="32rpx" label="大号标签" />
        </ui-radio-group>
        <ui-radio-group v-model="labelColor1">
          <ui-radio name="1" label-color="#1989fa" label="蓝色标签" />
        </ui-radio-group>
        <ui-radio-group v-model="labelWeight1">
          <ui-radio name="1" label-weight="600" label="粗体标签" />
        </ui-radio-group>
        <ui-radio-group v-model="labelGap1">
          <ui-radio name="1" label-gap="24rpx" label="大间距标签" />
        </ui-radio-group>
        <ui-radio-group v-model="labelCheckedColor">
          <ui-radio name="1" checked-label-color="#07c160" label="选中变色标签" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 标签位置 ==================== -->
    <demo-section title="标签位置">
      <demo-block :cols="2" :gap="32">
        <ui-radio-group v-model="labelPosRight">
          <ui-radio name="1" label="右侧标签" />
        </ui-radio-group>
        <ui-radio-group v-model="labelPosLeft">
          <ui-radio name="1" label-left label="左侧标签" />
        </ui-radio-group>
      </demo-block>
      <demo-block :cols="2" :gap="32" class="mt-16">
        <ui-radio-group v-model="labelPosRightIcon">
          <ui-radio name="1" shape="icon" label="icon 右侧" />
        </ui-radio-group>
        <ui-radio-group v-model="labelPosLeftIcon">
          <ui-radio name="1" shape="icon" label-left label="icon 左侧" />
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 禁用标签点击 ==================== -->
    <demo-section title="禁用标签点击">
      <demo-block :cols="2" :gap="32">
        <ui-radio-group v-model="labelDisabledDot">
          <ui-radio name="1" shape="dot" label-disabled label="dot 禁用标签" />
        </ui-radio-group>
        <ui-radio-group v-model="labelDisabledIcon">
          <ui-radio name="1" shape="icon" label-disabled label="icon 禁用标签" />
        </ui-radio-group>
      </demo-block>
      <text class="demo-text">只有点击图标才能切换状态</text>
    </demo-section>

    <!-- ==================== 单选框组 ==================== -->
    <demo-section title="单选框组">
      <demo-block direction="column" :gap="24">
        <view>
          <ui-text size="small" color="secondary" class="mb-8">dot 样式</ui-text>
          <ui-radio-group v-model="groupValueDot" shape="dot" :gap="32" @change="onGroupChange">
            <ui-radio name="a" label="选项 A" />
            <ui-radio name="b" label="选项 B" />
            <ui-radio name="c" label="选项 C" />
          </ui-radio-group>
        </view>
        <view>
          <ui-text size="small" color="secondary" class="mb-8">icon 样式</ui-text>
          <ui-radio-group v-model="groupValueIcon" shape="icon" :gap="32" @change="onGroupChange">
            <ui-radio name="a" label="选项 A" />
            <ui-radio name="b" label="选项 B" />
            <ui-radio name="c" label="选项 C" />
          </ui-radio-group>
        </view>
        <text class="demo-text">当前选中: dot={{ groupValueDot || "无" }}, icon={{ groupValueIcon || "无" }}</text>
      </demo-block>
    </demo-section>

    <!-- ==================== 单选框组 - 垂直排列 ==================== -->
    <demo-section title="单选框组 - 垂直排列">
      <demo-block direction="column" :gap="24">
        <view>
          <ui-text size="small" color="secondary" class="mb-8">dot 样式</ui-text>
          <ui-radio-group v-model="verticalValueDot" shape="dot" vertical :gap="16">
            <ui-radio name="a" label="选项 A" />
            <ui-radio name="b" label="选项 B" />
            <ui-radio name="c" label="选项 C" />
          </ui-radio-group>
        </view>
        <view>
          <ui-text size="small" color="secondary" class="mb-8">icon 样式</ui-text>
          <ui-radio-group v-model="verticalValueIcon" shape="icon" vertical :gap="16">
            <ui-radio name="a" label="选项 A" />
            <ui-radio name="b" label="选项 B" />
            <ui-radio name="c" label="选项 C" />
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 单选框组 - 统一样式 ==================== -->
    <demo-section title="单选框组 - 统一样式">
      <demo-block direction="column" align="start" :gap="24">
        <ui-radio-group v-model="groupStyleDot" shape="dot" checked-color="#ee0a24" icon-size="44rpx" :gap="32">
          <ui-radio name="a" label="选项 A" />
          <ui-radio name="b" label="选项 B" />
          <ui-radio name="c" label="选项 C" />
        </ui-radio-group>
        <text class="demo-text">统一 dot 样式 + 红色 + 大尺寸</text>
      </demo-block>
      <demo-block direction="column" align="start" :gap="24" class="mt-16">
        <ui-radio-group v-model="groupStyleIcon" shape="icon" checked-color="#07c160" icon-size="44rpx" :gap="32">
          <ui-radio name="a" label="选项 A" />
          <ui-radio name="b" label="选项 B" />
          <ui-radio name="c" label="选项 C" />
        </ui-radio-group>
        <text class="demo-text">统一 icon 样式 + 绿色 + 大尺寸</text>
      </demo-block>
    </demo-section>

    <!-- ==================== 自定义插槽 ==================== -->
    <demo-section title="自定义插槽">
      <demo-block direction="column" align="start" :gap="24">
        <ui-radio-group v-model="slotIcon">
          <ui-radio name="1">
            <template #icon="{ checked }">
              <ui-icon :name="checked ? 'check-circle-fill' : 'circle'" :color="checked ? '#07c160' : '#999'" size="44rpx" />
            </template>
            自定义图标插槽
          </ui-radio>
        </ui-radio-group>
        <ui-radio-group v-model="slotDefault">
          <ui-radio name="1">
            <view class="custom-label">
              <text class="custom-label__title">自定义内容</text>
              <text class="custom-label__desc">通过默认插槽自定义标签内容</text>
            </view>
          </ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 事件处理 ==================== -->
    <demo-section title="事件处理">
      <demo-block direction="column" :gap="24">
        <view>
          <ui-text size="small" color="secondary" class="mb-8">dot 样式</ui-text>
          <ui-radio-group v-model="eventValueDot" shape="dot" :gap="32" @change="onEventChange">
            <ui-radio name="a" label="选项 A" />
            <ui-radio name="b" label="选项 B" />
            <ui-radio name="c" label="选项 C" />
          </ui-radio-group>
        </view>
        <view>
          <ui-text size="small" color="secondary" class="mb-8">icon 样式</ui-text>
          <ui-radio-group v-model="eventValueIcon" shape="icon" :gap="32" @change="onEventChange">
            <ui-radio name="a" label="选项 A" />
            <ui-radio name="b" label="选项 B" />
            <ui-radio name="c" label="选项 C" />
          </ui-radio-group>
        </view>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- ==================== 自定义样式 ==================== -->
    <demo-section title="自定义样式">
      <demo-block>
        <ui-radio-group v-model="customStyleValue">
          <ui-radio name="1" custom-class="my-radio" :custom-style="{ padding: '16rpx', background: '#f5f5f5', borderRadius: '8rpx' }" label="自定义样式单选框" />
        </ui-radio-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Radio 单选框" },
})

const toast = useToast()

// ==================== 形状对比 ====================
const shapeDot = ref("1")
const shapeIcon = ref("1")

// ==================== 形状 × 圆角 ====================
const dotSquare = ref("1")
const dotRound = ref("1")
const iconSquare = ref("1")
const iconRound = ref("1")

// ==================== 形状 × 尺寸 ====================
const dotSmall = ref("1")
const dotMedium = ref("1")
const dotLarge = ref("1")
const iconSmall = ref("1")
const iconMedium = ref("1")
const iconLarge = ref("1")

// ==================== 形状 × 颜色 ====================
const dotRed = ref("1")
const dotGreen = ref("1")
const dotPurple = ref("1")
const iconRed = ref("1")
const iconGreen = ref("1")
const iconPurple = ref("1")

// ==================== 标签配置 ====================
const labelSize1 = ref("1")
const labelSize2 = ref("1")
const labelColor1 = ref("1")
const labelWeight1 = ref("1")
const labelGap1 = ref("1")
const labelCheckedColor = ref("1")

// ==================== 标签位置 ====================
const labelPosRight = ref("1")
const labelPosLeft = ref("1")
const labelPosRightIcon = ref("1")
const labelPosLeftIcon = ref("1")

// ==================== 禁用标签点击 ====================
const labelDisabledDot = ref("")
const labelDisabledIcon = ref("")

// ==================== 单选框组 ====================
const groupValueDot = ref("a")
const groupValueIcon = ref("a")
const verticalValueDot = ref("a")
const verticalValueIcon = ref("a")
const groupStyleDot = ref("a")
const groupStyleIcon = ref("a")

function onGroupChange(value: string | number) {
  toast.text(`选中: ${value}`)
}

// ==================== 自定义插槽 ====================
const slotIcon = ref("1")
const slotDefault = ref("1")

// ==================== 事件处理 ====================
const eventValueDot = ref("a")
const eventValueIcon = ref("a")
const eventLog = ref("点击单选框查看事件")

function onEventChange(value: string | number) {
  eventLog.value = `change 事件触发，当前值: ${value}`
}

// ==================== 自定义样式 ====================
const customStyleValue = ref("1")
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16rpx;
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

:deep(.my-radio) {
  border: 2rpx solid #eee;
}
</style>
