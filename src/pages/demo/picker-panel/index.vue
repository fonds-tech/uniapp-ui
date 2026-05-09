<template>
  <demo-page>
    <demo-section title="基础用法" desc="纯面板,无头部按钮,适合嵌入业务页面">
      <view class="picker-box">
        <ui-picker-panel v-model="state.basic" :columns="cityColumns" @change="onChange" />
      </view>
      <demo-block direction="column" align="start">
        <text class="demo-text">当前选中:{{ state.basic.join(", ") }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="多列选择" desc="二维数组组成多列,modelValue 与列一一对应">
      <view class="picker-box">
        <ui-picker-panel v-model="state.multi" :columns="dateColumns" />
      </view>
      <demo-block direction="column" align="start">
        <text class="demo-text">日期:{{ state.multi.join(" - ") }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="级联选择" desc="单列对象带 children,逐级展开">
      <view class="picker-box">
        <ui-picker-panel v-model="state.cascade" :columns="areaColumns" />
      </view>
      <demo-block direction="column" align="start">
        <text class="demo-text">地区:{{ state.cascade.join(" / ") }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选项高度切换" desc="columnHeight 控制单项高度">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="h in heights" :key="h" size="small" :type="state.height === h ? 'primary' : 'default'" @click="state.height = h">{{ h }}</ui-button>
      </demo-block>
      <view class="picker-box">
        <ui-picker-panel v-model="state.heightPick" :columns="cityColumns" :column-height="state.height" />
      </view>
    </demo-section>

    <demo-section title="可见选项数" desc="visibleColumnNum 控制可视行数">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="n in visibleNums" :key="n" size="small" :type="state.visibleNum === n ? 'primary' : 'default'" @click="state.visibleNum = n">{{ n }} 行</ui-button>
      </demo-block>
      <view class="picker-box" :style="{ height: `${state.visibleNum * 88}rpx` }">
        <ui-picker-panel v-model="state.visiblePick" :columns="cityColumns" :visible-column-num="state.visibleNum" />
      </view>
    </demo-section>

    <demo-section title="自定义字段映射" desc="columns 字段名非默认时,通过 columnFields 映射">
      <view class="picker-box">
        <ui-picker-panel v-model="state.fields" :columns="customColumns" :column-fields="{ text: 'name', value: 'id' }" />
      </view>
      <demo-block direction="column" align="start">
        <text class="demo-text">选中 id:{{ state.fields.join(", ") }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="文字样式" desc="column-* 普通项,active-column-* 激活项">
      <view class="picker-box">
        <ui-picker-panel
          v-model="state.styled"
          :columns="cityColumns"
          column-size="26rpx"
          column-color="text-tertiary"
          active-column-size="32rpx"
          active-column-color="primary"
          active-column-weight="bold"
        />
      </view>
    </demo-section>

    <demo-section title="加载状态" desc="loading=true 显示加载遮罩">
      <view class="picker-box">
        <ui-picker-panel v-model="state.loading" :columns="cityColumns" loading />
      </view>
    </demo-section>

    <demo-section title="业务场景:时间选择" desc="时:分 双列">
      <view class="picker-box">
        <ui-picker-panel v-model="state.time" :columns="timeColumns" />
      </view>
      <demo-block direction="column" align="start">
        <text class="demo-text">时间:{{ state.time.join(":") }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:商品规格" desc="多列规格联动">
      <view class="picker-box">
        <ui-picker-panel v-model="state.spec" :columns="specColumns" />
      </view>
      <demo-block direction="column" align="start">
        <text class="demo-text">规格:{{ state.spec.join(" / ") }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "PickerPanel 选择器面板" },
})

const heights = ["60rpx", "88rpx", "120rpx"]
const visibleNums = [3, 5, 7]

const state = reactive({
  basic: ["hangzhou"],
  multi: ["2024", "06", "15"],
  cascade: ["zhejiang", "hangzhou", "xihu"],
  height: "88rpx",
  heightPick: ["beijing"],
  visibleNum: 5,
  visiblePick: ["shenzhen"],
  fields: ["1"],
  styled: ["hangzhou"],
  loading: ["hangzhou"],
  time: ["12", "30"],
  spec: ["black", "M"],
})
const eventLog = ref("滚动选择触发事件")

const cityColumns = [
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
  { text: "杭州", value: "hangzhou" },
  { text: "深圳", value: "shenzhen" },
  { text: "广州", value: "guangzhou" },
  { text: "成都", value: "chengdu" },
  { text: "武汉", value: "wuhan" },
]

const dateColumns = [
  [
    { text: "2023", value: "2023" },
    { text: "2024", value: "2024" },
    { text: "2025", value: "2025" },
  ],
  Array.from({ length: 12 }, (_, i) => ({ text: String(i + 1).padStart(2, "0"), value: String(i + 1).padStart(2, "0") })),
  Array.from({ length: 31 }, (_, i) => ({ text: String(i + 1).padStart(2, "0"), value: String(i + 1).padStart(2, "0") })),
]

const timeColumns = [
  Array.from({ length: 24 }, (_, i) => ({ text: String(i).padStart(2, "0"), value: String(i).padStart(2, "0") })),
  Array.from({ length: 60 }, (_, i) => ({ text: String(i).padStart(2, "0"), value: String(i).padStart(2, "0") })),
]

const areaColumns = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      {
        text: "杭州",
        value: "hangzhou",
        children: [
          { text: "西湖区", value: "xihu" },
          { text: "余杭区", value: "yuhang" },
          { text: "萧山区", value: "xiaoshan" },
        ],
      },
      {
        text: "宁波",
        value: "ningbo",
        children: [
          { text: "海曙区", value: "haishu" },
          { text: "江北区", value: "jiangbei" },
        ],
      },
    ],
  },
  {
    text: "广东",
    value: "guangdong",
    children: [
      {
        text: "广州",
        value: "guangzhou",
        children: [
          { text: "天河区", value: "tianhe" },
          { text: "越秀区", value: "yuexiu" },
        ],
      },
      {
        text: "深圳",
        value: "shenzhen",
        children: [
          { text: "南山区", value: "nanshan" },
          { text: "福田区", value: "futian" },
        ],
      },
    ],
  },
]

const customColumns = [
  { id: "1", name: "选项一" },
  { id: "2", name: "选项二" },
  { id: "3", name: "选项三" },
  { id: "4", name: "选项四" },
  { id: "5", name: "选项五" },
]

const specColumns = [
  [
    { text: "黑色", value: "black" },
    { text: "白色", value: "white" },
    { text: "红色", value: "red" },
  ],
  [
    { text: "S", value: "S" },
    { text: "M", value: "M" },
    { text: "L", value: "L" },
    { text: "XL", value: "XL" },
  ],
]

function onChange(data: any) {
  eventLog.value = `change → ${JSON.stringify(data.values)}`
}
</script>

<style scoped lang="scss">
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.picker-box {
  width: 100%;
  border: 2rpx solid var(--ui-color-border-light);
  height: 440rpx;
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: 16rpx;
}
</style>
