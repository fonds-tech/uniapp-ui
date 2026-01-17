<template>
  <demo-page>
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

    <demo-section title="水平排列">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value2" :gap="24">
          <ui-checkbox name="1">苹果</ui-checkbox>
          <ui-checkbox name="2">香蕉</ui-checkbox>
          <ui-checkbox name="3">橙子</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="垂直排列">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value3" vertical :gap="16">
          <ui-checkbox name="a">选项一</ui-checkbox>
          <ui-checkbox name="b">选项二</ui-checkbox>
          <ui-checkbox name="c">选项三</ui-checkbox>
          <ui-checkbox name="d">选项四</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="限制最大可选数">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value4" :max="2" :gap="16">
          <ui-checkbox name="1">选项 1</ui-checkbox>
          <ui-checkbox name="2">选项 2</ui-checkbox>
          <ui-checkbox name="3">选项 3</ui-checkbox>
          <ui-checkbox name="4">选项 4</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">最多选择 2 项</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="限制最小可选数">
      <demo-block direction="column">
        <ui-checkbox-group v-model="valueMin" :min="1" :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">最少选择 1 项</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value5" disabled :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <!-- ==================== 全选与不确定状态 ==================== -->
    <demo-section title="全选与不确定状态">
      <demo-block direction="column" :gap="16">
        <ui-checkbox v-model="selectAllChecked" :indeterminate="isIndeterminate" shape="icon" label="全选" @change="onSelectAllChange" />
        <ui-checkbox-group v-model="selectedItems" shape="icon" :gap="16" @change="onGroupChange">
          <ui-checkbox name="apple">苹果</ui-checkbox>
          <ui-checkbox name="banana">香蕉</ui-checkbox>
          <ui-checkbox name="orange">橙子</ui-checkbox>
          <ui-checkbox name="grape">葡萄</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">已选择：{{ selectedItems.length }}/4</ui-text>
      </demo-block>
    </demo-section>

    <!-- ==================== 不确定状态 × 形状 ==================== -->
    <demo-section title="不确定状态 × 形状">
      <demo-block direction="column" :gap="24">
        <!-- dot 形状 -->
        <view>
          <ui-text size="small" color="secondary" class="mb-8">dot 形状</ui-text>
          <ui-checkbox v-model="selectAllDot" :indeterminate="isIndeterminateDot" shape="dot" label="全选" @change="onSelectAllDotChange" />
          <ui-checkbox-group v-model="selectedDotItems" shape="dot" :gap="16" class="mt-12" @change="onDotGroupChange">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <!-- icon 形状 -->
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
    </demo-section>

    <!-- ==================== 不确定状态 × 颜色 ==================== -->
    <demo-section title="不确定状态 × 颜色">
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
    </demo-section>

    <!-- ==================== 不确定状态 × 禁用 ==================== -->
    <demo-section title="不确定状态 × 禁用">
      <demo-block direction="column" :gap="16">
        <ui-checkbox :model-value="false" indeterminate shape="dot" disabled label="dot 禁用不确定" />
        <ui-checkbox :model-value="false" indeterminate shape="icon" disabled label="icon 禁用不确定" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value6" checked-color="#07c160" :gap="16">
          <ui-checkbox name="1">绿色主题</ui-checkbox>
          <ui-checkbox name="2">选项二</ui-checkbox>
          <ui-checkbox name="3">选项三</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义形状">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">圆形（默认）</ui-text>
        <ui-checkbox-group v-model="value7" round :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
        </ui-checkbox-group>
        <view style="height: 16px" />
        <ui-text size="small" color="secondary">方形</ui-text>
        <ui-checkbox-group v-model="value8" :round="false" :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="统一形状配置">
      <demo-block direction="column" :gap="16">
        <view>
          <ui-text size="small" color="secondary" class="mb-8">统一 dot 样式</ui-text>
          <ui-checkbox-group v-model="shapeValueDot" shape="dot" :gap="16">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
        <view>
          <ui-text size="small" color="secondary" class="mb-8">统一 icon 样式</ui-text>
          <ui-checkbox-group v-model="shapeValueIcon" shape="icon" :gap="16">
            <ui-checkbox name="a">选项 A</ui-checkbox>
            <ui-checkbox name="b">选项 B</ui-checkbox>
            <ui-checkbox name="c">选项 C</ui-checkbox>
          </ui-checkbox-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="标签位置">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value9" label-left :gap="16">
          <ui-checkbox name="1">标签在左侧</ui-checkbox>
          <ui-checkbox name="2">选项二</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="事件监听">
      <demo-block direction="column">
        <ui-checkbox-group v-model="eventValue" :gap="16" @change="onEventChange">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">{{ eventLog }}</ui-text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "CheckboxGroup 复选框组" },
})

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

function onGroupChange(value: string[]) {
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
const eventLog = ref("点击复选框查看事件")

function onEventChange(value: string[]) {
  eventLog.value = `change 事件触发，当前值: [${value.join(", ")}]`
}
</script>

<style lang="scss" scoped>
.mb-8 {
  margin-bottom: 8rpx;
}

.mt-12 {
  margin-top: 12rpx;
}
</style>
