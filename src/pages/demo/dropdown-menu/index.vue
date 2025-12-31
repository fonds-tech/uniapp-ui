<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-dropdown-menu>
          <ui-dropdown-item v-model="value1" title="全部商品" :options="options1" />
          <ui-dropdown-item v-model="value2" title="默认排序" :options="options2" />
        </ui-dropdown-menu>
      </view>
    </view>

    <!-- 多选模式 -->
    <view class="demo-section">
      <text class="section-title">多选模式</text>
      <view class="demo-block-full">
        <ui-dropdown-menu>
          <ui-dropdown-item v-model="value3" title="筛选" mode="multiple" :options="options3" />
        </ui-dropdown-menu>
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block-full">
        <ui-dropdown-menu active-title-color="#07c160">
          <ui-dropdown-item v-model="value4" title="全部商品" :options="options1" />
          <ui-dropdown-item v-model="value5" title="默认排序" :options="options2" />
        </ui-dropdown-menu>
      </view>
    </view>

    <!-- 向上弹出 -->
    <view class="demo-section">
      <text class="section-title">向上弹出</text>
      <view class="demo-block-full">
        <ui-dropdown-menu direction="up">
          <ui-dropdown-item v-model="value6" title="全部商品" :options="options1" />
          <ui-dropdown-item v-model="value7" title="默认排序" :options="options2" />
        </ui-dropdown-menu>
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block-full">
        <ui-dropdown-menu>
          <ui-dropdown-item v-model="value8" title="全部商品" :options="options1" />
          <ui-dropdown-item v-model="value9" title="默认排序" :options="options2" disabled />
        </ui-dropdown-menu>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "DropdownMenu 下拉菜单" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref<string[]>([])
const value4 = ref("")
const value5 = ref("")
const value6 = ref("")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")

const options1 = [
  { label: "全部商品", value: "all" },
  { label: "新款商品", value: "new" },
  { label: "热销商品", value: "hot" },
]

const options2 = [
  { label: "默认排序", value: "default" },
  { label: "价格从低到高", value: "price-asc" },
  { label: "价格从高到低", value: "price-desc" },
  { label: "销量优先", value: "sales" },
]

const options3 = [
  { label: "包邮", value: "free-shipping" },
  { label: "有货", value: "in-stock" },
  { label: "促销", value: "promotion" },
  { label: "新品", value: "new-arrival" },
]
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
