<template>
  <demo-page>
    <demo-section title="基础用法" desc="ui-checkbox-group + ui-checkbox 多选组合">
      <demo-block direction="column" align="start" :gap="16">
        <ui-checkbox-group v-model="basic" :gap="24">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">已选：{{ basic.join(", ") || "无" }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="形状" desc="dot 圆点 / icon 勾选">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="shape.dot" shape="dot" label="dot 圆点" />
        <ui-checkbox v-model="shape.icon" shape="icon" label="icon 勾选" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角" desc="round 控制图标外形">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="round.dotRound" shape="dot" :round="true" label="dot 圆形" />
        <ui-checkbox v-model="round.dotSquare" shape="dot" :round="false" label="dot 方形" />
        <ui-checkbox v-model="round.iconRound" shape="icon" :round="true" label="icon 圆形" />
        <ui-checkbox v-model="round.iconSquare" shape="icon" :round="false" label="icon 方形" />
      </demo-block>
    </demo-section>

    <demo-section title="尺寸" desc="iconSize 接受任意连续数值">
      <demo-block :cols="4" :gap="24">
        <ui-checkbox v-model="size.s24" shape="icon" icon-size="24rpx" label="24" />
        <ui-checkbox v-model="size.s36" shape="icon" icon-size="36rpx" label="36" />
        <ui-checkbox v-model="size.s48" shape="icon" icon-size="48rpx" label="48" />
        <ui-checkbox v-model="size.s56" shape="icon" icon-size="56rpx" label="56" />
      </demo-block>
    </demo-section>

    <demo-section title="选中主色" desc="color 控制 fill 与边框">
      <demo-block :cols="4" :gap="24">
        <ui-checkbox v-model="color.primary" shape="icon" color="#1989fa" label="蓝" />
        <ui-checkbox v-model="color.success" shape="icon" color="#07c160" label="绿" />
        <ui-checkbox v-model="color.warning" shape="icon" color="#ff976a" label="橙" />
        <ui-checkbox v-model="color.danger" shape="icon" color="#ee0a24" label="红" />
      </demo-block>
    </demo-section>

    <demo-section title="未选边框色" desc="iconColor 仅作用未选态描边">
      <demo-block :cols="3" :gap="24">
        <ui-checkbox v-model="border.gray" icon-color="#999999" label="灰" />
        <ui-checkbox v-model="border.blue" icon-color="#1989fa" label="蓝" />
        <ui-checkbox v-model="border.red" icon-color="#ee0a24" label="红" />
      </demo-block>
    </demo-section>

    <demo-section title="图标圆角" desc="iconRadius 在 round=false 时可见">
      <demo-block :cols="3" :gap="24">
        <ui-checkbox v-model="radius.r0" shape="icon" :round="false" icon-radius="0" label="直角" />
        <ui-checkbox v-model="radius.r4" shape="icon" :round="false" icon-radius="4rpx" label="4rpx" />
        <ui-checkbox v-model="radius.r12" shape="icon" :round="false" icon-radius="12rpx" label="12rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="不确定状态" desc="indeterminate 优先于 checked">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox :model-value="false" shape="dot" indeterminate label="dot 不确定" />
        <ui-checkbox :model-value="false" shape="icon" indeterminate label="icon 不确定" />
        <ui-checkbox :model-value="false" shape="icon" indeterminate :round="false" label="方形不确定" />
        <ui-checkbox :model-value="false" shape="icon" indeterminate disabled label="禁用不确定" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用与只读" desc="disabled 不可点 / readonly 可见不可改">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox :model-value="false" shape="icon" disabled label="禁用未选" />
        <ui-checkbox :model-value="true" shape="icon" disabled label="禁用已选" />
        <ui-checkbox :model-value="false" shape="icon" readonly label="只读未选" />
        <ui-checkbox :model-value="true" shape="icon" readonly label="只读已选" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用整组" desc="group disabled 透传所有子项">
      <ui-checkbox-group v-model="disabledGroup" disabled :gap="24">
        <ui-checkbox name="a">选项 A</ui-checkbox>
        <ui-checkbox name="b">选项 B</ui-checkbox>
        <ui-checkbox name="c">选项 C</ui-checkbox>
      </ui-checkbox-group>
    </demo-section>

    <demo-section title="标签位置" desc="labelPosition right / left">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="labelPos.right" shape="icon" label-position="right" label="右侧（默认）" />
        <ui-checkbox v-model="labelPos.left" shape="icon" label-position="left" label="左侧" />
      </demo-block>
    </demo-section>

    <demo-section title="标签样式" desc="字号 / 颜色 / 字重 / 间距 / 选中变色">
      <demo-block direction="column" align="start" :gap="16">
        <ui-checkbox v-model="labelStyle.size" shape="icon" label-size="32rpx" label="大号字 32rpx" />
        <ui-checkbox v-model="labelStyle.color" shape="icon" label-color="#1989fa" label="蓝色文本" />
        <ui-checkbox v-model="labelStyle.weight" shape="icon" :label-weight="600" label="粗体 600" />
        <ui-checkbox v-model="labelStyle.gap" shape="icon" label-gap="32rpx" label="大间距 32rpx" />
        <ui-checkbox v-model="labelStyle.checkedColor" shape="icon" checked-label-color="#07c160" label="选中变绿" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用标签点击" desc="labelDisabled 时只能点图标切换">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="labelDis.dot" shape="dot" label-disabled label="dot 禁用标签" />
        <ui-checkbox v-model="labelDis.icon" shape="icon" label-disabled label="icon 禁用标签" />
      </demo-block>
    </demo-section>

    <demo-section title="数量限制" desc="max 上限 / min 下限">
      <demo-block direction="column" align="start" :gap="24">
        <view class="block-item">
          <ui-text size="small" color="secondary">max=2 最多选 2 项</ui-text>
          <ui-checkbox-group v-model="limit.max" :max="2" :gap="24" :custom-style="{ marginTop: '12rpx' }">
            <ui-checkbox name="a">A</ui-checkbox>
            <ui-checkbox name="b">B</ui-checkbox>
            <ui-checkbox name="c">C</ui-checkbox>
            <ui-checkbox name="d">D</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view class="block-item">
          <ui-text size="small" color="secondary">min=1 至少选 1 项</ui-text>
          <ui-checkbox-group v-model="limit.min" :min="1" :gap="24" :custom-style="{ marginTop: '12rpx' }">
            <ui-checkbox name="a">A</ui-checkbox>
            <ui-checkbox name="b">B</ui-checkbox>
            <ui-checkbox name="c">C</ui-checkbox>
          </ui-checkbox-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="排列方式" desc="水平 / 垂直 / 网格">
      <demo-block direction="column" align="start" :gap="24">
        <view class="block-item">
          <ui-text size="small" color="secondary">水平 + gap=24</ui-text>
          <ui-checkbox-group v-model="layout.h" :gap="24" :custom-style="{ marginTop: '12rpx' }">
            <ui-checkbox name="a">A</ui-checkbox>
            <ui-checkbox name="b">B</ui-checkbox>
            <ui-checkbox name="c">C</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view class="block-item">
          <ui-text size="small" color="secondary">垂直</ui-text>
          <ui-checkbox-group v-model="layout.v" vertical :gap="16" :custom-style="{ marginTop: '12rpx' }">
            <ui-checkbox name="a">选项一</ui-checkbox>
            <ui-checkbox name="b">选项二</ui-checkbox>
            <ui-checkbox name="c">选项三</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view class="block-item">
          <ui-text size="small" color="secondary">网格 columns=2</ui-text>
          <ui-checkbox-group v-model="layout.g" :columns="2" :gap="16" :custom-style="{ marginTop: '12rpx' }">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
            <ui-checkbox name="d">选项 D</ui-checkbox>
          </ui-checkbox-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="组级样式继承" desc="group 上设置一次，所有子项继承">
      <ui-checkbox-group v-model="groupTheme" shape="icon" color="#7232dd" icon-size="44rpx" :gap="24">
        <ui-checkbox name="a">选项 A</ui-checkbox>
        <ui-checkbox name="b">选项 B</ui-checkbox>
        <ui-checkbox name="c">选项 C</ui-checkbox>
      </ui-checkbox-group>
    </demo-section>

    <demo-section title="全选与不确定">
      <demo-block direction="column" align="start" :gap="16">
        <ui-checkbox :model-value="isAllChecked" :indeterminate="isSomeChecked" shape="icon" label="全选" @click="onToggleAll" />
        <ui-checkbox-group v-model="all" shape="icon" :gap="24">
          <ui-checkbox v-for="name in ALL_FRUITS" :key="name" :name="name">{{ FRUIT_LABELS[name] }}</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">已选 {{ all.length }} / {{ ALL_FRUITS.length }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义插槽" desc="icon 插槽接收 checked / disabled / indeterminate">
      <demo-block direction="column" align="start" :gap="16">
        <ui-checkbox v-model="slotIcon">
          <template #icon="{ checked }">
            <ui-icon :name="checked ? 'check-circle-fill' : 'circle'" :color="checked ? '#07c160' : '#c8c9cc'" size="44rpx" />
          </template>
          自定义图标
        </ui-checkbox>
        <ui-checkbox v-model="slotLabel" shape="icon">
          <view class="rich-label">
            <text class="rich-label__title">富文本标签</text>
            <text class="rich-label__desc">通过默认插槽渲染多行结构</text>
          </view>
        </ui-checkbox>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式" desc="customClass / customStyle">
      <ui-checkbox
        v-model="customCheck"
        shape="icon"
        custom-class="custom-checkbox"
        :custom-style="{ padding: '16rpx 24rpx', background: '#f5f6fa', borderRadius: '12rpx' }"
        label="带容器样式"
      />
    </demo-section>

    <demo-section title="事件监听" desc="click / change">
      <demo-block direction="column" align="start" :gap="12">
        <ui-checkbox v-model="event.value" shape="icon" label="点击触发事件" @click="onCheckboxClick" @change="onCheckboxChange" />
        <ui-text size="small" color="secondary">{{ event.log || "尚未触发" }}</ui-text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Checkbox 复选框" },
})

// 数据 ----------------------------------------------------------------
const ALL_FRUITS = ["apple", "banana", "orange", "grape"] as const
type Fruit = (typeof ALL_FRUITS)[number]
const FRUIT_LABELS: Record<Fruit, string> = {
  apple: "苹果",
  banana: "香蕉",
  orange: "橙子",
  grape: "葡萄",
}

// 各 section 状态 ------------------------------------------------------
const basic = ref<string[]>(["a"])

const shape = reactive({ dot: true, icon: false })
const round = reactive({ dotRound: true, dotSquare: false, iconRound: true, iconSquare: false })
const size = reactive({ s24: true, s36: true, s48: true, s56: true })
const color = reactive({ primary: true, success: true, warning: true, danger: true })
const border = reactive({ gray: false, blue: false, red: false })
const radius = reactive({ r0: true, r4: true, r12: true })

const disabledGroup = ref<string[]>(["a"])

const labelPos = reactive({ right: true, left: true })
const labelStyle = reactive({ size: true, color: true, weight: true, gap: true, checkedColor: true })
const labelDis = reactive({ dot: false, icon: false })

const limit = reactive({ max: ["a"] as string[], min: ["a"] as string[] })
const layout = reactive({ h: ["a"] as string[], v: ["a"] as string[], g: ["a"] as string[] })

const groupTheme = ref<string[]>(["a"])

const all = ref<Fruit[]>(["apple"])
const isAllChecked = computed(() => all.value.length === ALL_FRUITS.length)
const isSomeChecked = computed(() => all.value.length > 0 && all.value.length < ALL_FRUITS.length)
function onToggleAll() {
  all.value = isAllChecked.value ? [] : [...ALL_FRUITS]
}

const slotIcon = ref(true)
const slotLabel = ref(true)

const customCheck = ref(false)

const event = reactive({ value: false, log: "" })
function onCheckboxClick() {
  event.log = `click @ ${formatTime()}`
}
function onCheckboxChange(value: boolean) {
  event.log = `change → ${value} @ ${formatTime()}`
}
function formatTime() {
  return new Date().toLocaleTimeString()
}
</script>

<style lang="scss" scoped>
.block-item {
  width: 100%;
}

.rich-label {
  gap: 4rpx;
  display: flex;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-normal);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
