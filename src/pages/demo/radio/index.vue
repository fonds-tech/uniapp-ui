<template>
  <demo-page>
    <demo-section title="Radio 单选框" desc="用于在多个选项中选择单个结果" :card="false" />

    <!-- ==================== 基础用法 ==================== -->
    <demo-section title="基础用法">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="basicDot" shape="dot" vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="basicIcon" shape="icon" vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 圆角设置 ==================== -->
    <demo-section title="圆角设置">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="roundDot" shape="dot" vertical :gap="12">
            <ui-radio name="round" :round="true">圆形</ui-radio>
            <ui-radio name="square" :round="false">方形</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="roundIcon" shape="icon" vertical :gap="12">
            <ui-radio name="round" :round="true">圆形</ui-radio>
            <ui-radio name="square" :round="false">方形</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 尺寸设置 ==================== -->
    <demo-section title="尺寸设置">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="sizeDot" shape="dot" vertical :gap="12">
            <ui-radio name="s" icon-size="24rpx">小 (24rpx)</ui-radio>
            <ui-radio name="m" icon-size="36rpx">中 (36rpx)</ui-radio>
            <ui-radio name="l" icon-size="48rpx">大 (48rpx)</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="sizeIcon" shape="icon" vertical :gap="12">
            <ui-radio name="s" icon-size="24rpx">小 (24rpx)</ui-radio>
            <ui-radio name="m" icon-size="36rpx">中 (36rpx)</ui-radio>
            <ui-radio name="l" icon-size="48rpx">大 (48rpx)</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 颜色主题 ==================== -->
    <demo-section title="颜色主题">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="colorDot" shape="dot" vertical :gap="12">
            <ui-radio name="red" checked-color="#ee0a24">红色</ui-radio>
            <ui-radio name="green" checked-color="#07c160">绿色</ui-radio>
            <ui-radio name="purple" checked-color="#7232dd">紫色</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="colorIcon" shape="icon" vertical :gap="12">
            <ui-radio name="red" checked-color="#ee0a24">红色</ui-radio>
            <ui-radio name="green" checked-color="#07c160">绿色</ui-radio>
            <ui-radio name="purple" checked-color="#7232dd">紫色</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 图标样式 ==================== -->
    <demo-section title="图标样式">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="iconStyleDot" shape="dot" vertical :gap="12">
            <ui-radio name="color" icon-color="#1989fa">边框蓝色</ui-radio>
            <ui-radio name="weight" icon-weight="3">边框加粗</ui-radio>
            <ui-radio name="radius" :round="false" icon-radius="4rpx">小圆角</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="iconStyleIcon" shape="icon" vertical :gap="12">
            <ui-radio name="color" icon-color="#1989fa">边框蓝色</ui-radio>
            <ui-radio name="weight" icon-weight="3">边框加粗</ui-radio>
            <ui-radio name="radius" :round="false" icon-radius="4rpx">小圆角</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 禁用状态 ==================== -->
    <demo-section title="禁用状态">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group model-value="checked" shape="dot" vertical :gap="12">
            <ui-radio name="checked" disabled>已选禁用</ui-radio>
            <ui-radio name="unchecked" disabled>未选禁用</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group model-value="checked" shape="icon" vertical :gap="12">
            <ui-radio name="checked" disabled>已选禁用</ui-radio>
            <ui-radio name="unchecked" disabled>未选禁用</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
      <!-- 整组禁用 -->
      <demo-block :cols="2" :gap="40" class="mt-20">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">整组禁用 (dot)</ui-text>
          <ui-radio-group v-model="disabledGroupDot" shape="dot" disabled vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">整组禁用 (icon)</ui-text>
          <ui-radio-group v-model="disabledGroupIcon" shape="icon" disabled vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 只读状态 ==================== -->
    <demo-section title="只读状态">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group model-value="checked" shape="dot" vertical :gap="12">
            <ui-radio name="checked" readonly>已选只读</ui-radio>
            <ui-radio name="unchecked" readonly>未选只读</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group model-value="checked" shape="icon" vertical :gap="12">
            <ui-radio name="checked" readonly>已选只读</ui-radio>
            <ui-radio name="unchecked" readonly>未选只读</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 标签样式 ==================== -->
    <demo-section title="标签样式">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="labelStyleDot" shape="dot" vertical :gap="12">
            <ui-radio name="size" label-size="24rpx">小号标签</ui-radio>
            <ui-radio name="color" label-color="#1989fa">蓝色标签</ui-radio>
            <ui-radio name="weight" label-weight="600">粗体标签</ui-radio>
            <ui-radio name="gap" label-gap="20rpx">大间距</ui-radio>
            <ui-radio name="checked" checked-label-color="#07c160">选中变色</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="labelStyleIcon" shape="icon" vertical :gap="12">
            <ui-radio name="size" label-size="24rpx">小号标签</ui-radio>
            <ui-radio name="color" label-color="#1989fa">蓝色标签</ui-radio>
            <ui-radio name="weight" label-weight="600">粗体标签</ui-radio>
            <ui-radio name="gap" label-gap="20rpx">大间距</ui-radio>
            <ui-radio name="checked" checked-label-color="#07c160">选中变色</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 标签位置 ==================== -->
    <demo-section title="标签位置">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="labelPosDot" shape="dot" vertical :gap="12">
            <ui-radio name="right">标签在右</ui-radio>
            <ui-radio name="left" label-left>标签在左</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="labelPosIcon" shape="icon" vertical :gap="12">
            <ui-radio name="right">标签在右</ui-radio>
            <ui-radio name="left" label-left>标签在左</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
      <!-- 整组标签位置 -->
      <demo-block :cols="2" :gap="40" class="mt-20">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">整组左侧 (dot)</ui-text>
          <ui-radio-group v-model="labelLeftGroupDot" shape="dot" label-left vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">整组左侧 (icon)</ui-text>
          <ui-radio-group v-model="labelLeftGroupIcon" shape="icon" label-left vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 交互限制 ==================== -->
    <demo-section title="交互限制">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="labelDisabledDot" shape="dot" vertical :gap="12">
            <ui-radio name="a" label-disabled>仅图标可点</ui-radio>
            <ui-radio name="b" label-disabled>标签不可点</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="labelDisabledIcon" shape="icon" vertical :gap="12">
            <ui-radio name="a" label-disabled>仅图标可点</ui-radio>
            <ui-radio name="b" label-disabled>标签不可点</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 排列方式 ==================== -->
    <demo-section title="排列方式">
      <demo-block direction="column" :gap="24">
        <view class="layout-group">
          <ui-text size="small" color="secondary" class="group-label">水平排列（默认）</ui-text>
          <ui-radio-group v-model="layoutH" :gap="24">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
        <view class="layout-group">
          <ui-text size="small" color="secondary" class="group-label">垂直排列</ui-text>
          <ui-radio-group v-model="layoutV" vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
        <view class="layout-group">
          <ui-text size="small" color="secondary" class="group-label">自定义间距 (gap="48rpx")</ui-text>
          <ui-radio-group v-model="layoutGap" gap="48rpx">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== Group 统一配置 ==================== -->
    <demo-section title="Group 统一配置">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">统一尺寸 + 颜色</ui-text>
          <ui-radio-group v-model="groupConfigDot" shape="dot" icon-size="44rpx" checked-color="#7232dd" vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">统一尺寸 + 颜色</ui-text>
          <ui-radio-group v-model="groupConfigIcon" shape="icon" icon-size="44rpx" checked-color="#07c160" vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 自定义插槽 ==================== -->
    <demo-section title="自定义插槽">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">自定义图标</ui-text>
          <ui-radio-group v-model="slotValue" vertical :gap="16">
            <ui-radio name="heart">
              <template #icon="{ checked }">
                <ui-icon :name="checked ? 'heart-fill' : 'heart'" :color="checked ? '#ee0a24' : '#999'" size="40rpx" />
              </template>
              喜欢
            </ui-radio>
            <ui-radio name="star">
              <template #icon="{ checked }">
                <ui-icon :name="checked ? 'star-fill' : 'star'" :color="checked ? '#faad14' : '#999'" size="40rpx" />
              </template>
              收藏
            </ui-radio>
          </ui-radio-group>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">自定义内容</ui-text>
          <ui-radio-group v-model="slotContentValue" vertical :gap="16">
            <ui-radio name="vip">
              <view class="custom-content">
                <text class="custom-content__title">VIP 会员</text>
                <text class="custom-content__desc">享专属权益</text>
              </view>
            </ui-radio>
            <ui-radio name="svip">
              <view class="custom-content">
                <text class="custom-content__title">SVIP 会员</text>
                <text class="custom-content__desc">享全部权益</text>
              </view>
            </ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 事件监听 ==================== -->
    <demo-section title="事件监听">
      <demo-block :cols="2" :gap="40">
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">dot 形状</ui-text>
          <ui-radio-group v-model="eventDot" shape="dot" vertical :gap="12" @change="onChangeDot">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
          <ui-text size="small" color="secondary" class="mt-8">{{ eventLogDot }}</ui-text>
        </view>
        <view class="shape-group">
          <ui-text size="small" color="secondary" class="group-label">icon 形状</ui-text>
          <ui-radio-group v-model="eventIcon" shape="icon" vertical :gap="12" @change="onChangeIcon">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
          </ui-radio-group>
          <ui-text size="small" color="secondary" class="mt-8">{{ eventLogIcon }}</ui-text>
        </view>
      </demo-block>
    </demo-section>

    <!-- ==================== 搭配单元格 ==================== -->
    <demo-section title="搭配单元格">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-radio-group v-model="cellValue" vertical>
            <ui-cell title="微信支付" icon="wechat">
              <template #right>
                <ui-radio name="wechat" />
              </template>
            </ui-cell>
            <ui-cell title="支付宝" icon="alipay">
              <template #right>
                <ui-radio name="alipay" />
              </template>
            </ui-cell>
            <ui-cell title="银行卡" icon="bank-card">
              <template #right>
                <ui-radio name="bank" />
              </template>
            </ui-cell>
          </ui-radio-group>
        </ui-cell-group>
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

// ==================== 基础用法 ====================
const basicDot = ref("a")
const basicIcon = ref("a")

// ==================== 圆角设置 ====================
const roundDot = ref("round")
const roundIcon = ref("round")

// ==================== 尺寸设置 ====================
const sizeDot = ref("m")
const sizeIcon = ref("m")

// ==================== 颜色主题 ====================
const colorDot = ref("green")
const colorIcon = ref("green")

// ==================== 图标样式 ====================
const iconStyleDot = ref("color")
const iconStyleIcon = ref("color")

// ==================== 禁用状态 ====================
const disabledGroupDot = ref("a")
const disabledGroupIcon = ref("a")

// ==================== 标签样式 ====================
const labelStyleDot = ref("size")
const labelStyleIcon = ref("size")

// ==================== 标签位置 ====================
const labelPosDot = ref("right")
const labelPosIcon = ref("right")
const labelLeftGroupDot = ref("a")
const labelLeftGroupIcon = ref("a")

// ==================== 交互限制 ====================
const labelDisabledDot = ref("a")
const labelDisabledIcon = ref("a")

// ==================== 排列方式 ====================
const layoutH = ref("a")
const layoutV = ref("a")
const layoutGap = ref("a")

// ==================== Group 统一配置 ====================
const groupConfigDot = ref("a")
const groupConfigIcon = ref("a")

// ==================== 自定义插槽 ====================
const slotValue = ref("heart")
const slotContentValue = ref("vip")

// ==================== 事件监听 ====================
const eventDot = ref("a")
const eventIcon = ref("a")
const eventLogDot = ref("点击查看事件")
const eventLogIcon = ref("点击查看事件")

function onChangeDot(value: string | number) {
  eventLogDot.value = `change → ${value}`
  toast.text(`dot: ${value}`)
}

function onChangeIcon(value: string | number) {
  eventLogIcon.value = `change → ${value}`
  toast.text(`icon: ${value}`)
}

// ==================== 搭配单元格 ====================
const cellValue = ref("wechat")
</script>

<style lang="scss" scoped>
.shape-group {
  display: flex;
  flex-direction: column;
}

.layout-group {
  display: flex;
  flex-direction: column;
}

.group-label {
  display: block;
  margin-bottom: 12rpx;
}

.mt-8 {
  margin-top: 8rpx;
}

.mt-20 {
  margin-top: 20rpx;
}

.custom-content {
  gap: 4rpx;
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
</style>
