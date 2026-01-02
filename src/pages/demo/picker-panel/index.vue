<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value1" :columns="columns1" @change="onChange" />
        </view>
        <ui-text size="small" color="secondary">当前选中：{{ value1.join(', ') }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="多列选择">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value2" :columns="columns2" />
        </view>
        <ui-text size="small" color="secondary">选中：{{ value2.join(' - ') }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="级联选择">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value3" :columns="cascadeColumns" />
        </view>
        <ui-text size="small" color="secondary">选中：{{ value3.join(' / ') }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义选项高度">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel 
            v-model="value4" 
            :columns="columns1"
            column-height="100rpx"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="可见选项数量">
      <demo-block direction="column">
        <view class="picker-panel-demo-small">
          <ui-picker-panel 
            v-model="value5" 
            :columns="columns1"
            :visible-column-num="3"
          />
        </view>
        <ui-text size="small" color="secondary">显示 3 个可见项</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义字段名">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel 
            v-model="value6" 
            :columns="customColumns"
            :column-fields="{ text: 'name', value: 'id' }"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel 
            v-model="value7" 
            :columns="columns1"
            column-size="28rpx"
            column-color="#999"
            active-column-size="32rpx"
            active-column-color="#1989fa"
            active-column-weight="600"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel 
            v-model="value8" 
            :columns="columns1"
            loading
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="PickerPanel 属性说明">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="v-model" value="绑定值数组" />
          <ui-cell title="columns" value="列数据" />
          <ui-cell title="loading" value="加载状态" />
          <ui-cell title="columnFields" value="自定义字段名" />
          <ui-cell title="columnHeight" value="选项高度" />
          <ui-cell title="visibleColumnNum" value="可见选项数" />
          <ui-cell title="columnSize" value="选项文字大小" />
          <ui-cell title="columnColor" value="选项文字颜色" />
          <ui-cell title="activeColumnColor" value="选中项颜色" />
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "PickerPanel 选择器面板" },
})

const value1 = ref(['hangzhou'])
const value2 = ref(['2024', '06', '15'])
const value3 = ref(['zhejiang', 'hangzhou', 'xihu'])
const value4 = ref(['beijing'])
const value5 = ref(['shanghai'])
const value6 = ref(['1'])
const value7 = ref(['hangzhou'])
const value8 = ref(['hangzhou'])

// 单列数据
const columns1 = [
  [
    { text: '北京', value: 'beijing' },
    { text: '上海', value: 'shanghai' },
    { text: '杭州', value: 'hangzhou' },
    { text: '深圳', value: 'shenzhen' },
    { text: '广州', value: 'guangzhou' },
  ]
]

// 多列数据
const columns2 = [
  [
    { text: '2023', value: '2023' },
    { text: '2024', value: '2024' },
    { text: '2025', value: '2025' },
  ],
  Array.from({ length: 12 }, (_, i) => ({
    text: String(i + 1).padStart(2, '0'),
    value: String(i + 1).padStart(2, '0'),
  })),
  Array.from({ length: 31 }, (_, i) => ({
    text: String(i + 1).padStart(2, '0'),
    value: String(i + 1).padStart(2, '0'),
  })),
]

// 级联数据
const cascadeColumns = [
  {
    text: '浙江',
    value: 'zhejiang',
    children: [
      {
        text: '杭州',
        value: 'hangzhou',
        children: [
          { text: '西湖区', value: 'xihu' },
          { text: '余杭区', value: 'yuhang' },
        ],
      },
      {
        text: '宁波',
        value: 'ningbo',
        children: [
          { text: '海曙区', value: 'haishu' },
          { text: '江北区', value: 'jiangbei' },
        ],
      },
    ],
  },
  {
    text: '江苏',
    value: 'jiangsu',
    children: [
      {
        text: '南京',
        value: 'nanjing',
        children: [
          { text: '玄武区', value: 'xuanwu' },
          { text: '秦淮区', value: 'qinhuai' },
        ],
      },
    ],
  },
]

// 自定义字段名
const customColumns = [
  [
    { id: '1', name: '选项一' },
    { id: '2', name: '选项二' },
    { id: '3', name: '选项三' },
  ]
]

function onChange(data: any) {
  console.log('change', data)
}
</script>

<style scoped lang="scss">
.picker-panel-demo {
  height: 400rpx;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
}

.picker-panel-demo-small {
  height: 280rpx;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
}
</style>
