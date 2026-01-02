<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-dropdown-menu>
          <ui-dropdown-item v-model="value1" title="商品分类" :options="options1" />
          <ui-dropdown-item v-model="value2" title="排序方式" :options="options2" />
        </ui-dropdown-menu>
        <ui-text size="small" color="secondary">分类：{{ value1 }}，排序：{{ value2 }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="多选模式">
      <demo-block direction="column">
        <ui-dropdown-menu>
          <ui-dropdown-item
            v-model="value3"
            title="筛选标签"
            mode="multiple"
            :options="options3"
          />
        </ui-dropdown-menu>
        <ui-text size="small" color="secondary">已选：{{ value3.join(', ') || '无' }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-dropdown-menu>
          <ui-dropdown-item v-model="value4" title="可用" :options="options1" />
          <ui-dropdown-item v-model="value5" title="禁用" :options="options2" disabled />
        </ui-dropdown-menu>
      </demo-block>
    </demo-section>

    <demo-section title="自定义菜单高度">
      <demo-block direction="column">
        <ui-dropdown-menu>
          <ui-dropdown-item
            v-model="value6"
            title="更多选项"
            :options="manyOptions"
            max-height="300px"
          />
        </ui-dropdown-menu>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column">
        <ui-dropdown-menu>
          <ui-dropdown-item
            v-model="value7"
            title="自定义"
            :options="options1"
            active-title-color="#07c160"
            active-option-color="#07c160"
          />
        </ui-dropdown-menu>
      </demo-block>
    </demo-section>

    <demo-section title="向上展开">
      <demo-block direction="column">
        <view style="height: 200px" />
        <ui-dropdown-menu>
          <ui-dropdown-item
            v-model="value8"
            title="向上展开"
            :options="options1"
            direction="up"
          />
        </ui-dropdown-menu>
      </demo-block>
    </demo-section>

    <demo-section title="DropdownItem 属性说明">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="v-model" value="绑定值" />
          <ui-cell title="title" value="菜单标题" />
          <ui-cell title="options" value="选项数据" />
          <ui-cell title="mode" value="single/multiple" />
          <ui-cell title="disabled" value="是否禁用" />
          <ui-cell title="maxHeight" value="菜单最大高度" />
          <ui-cell title="direction" value="展开方向 up/down" />
          <ui-cell title="overlay" value="是否显示遮罩" />
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "DropdownItem 下拉菜单子项" },
})

const value1 = ref("all")
const value2 = ref("default")
const value3 = ref<string[]>([])
const value4 = ref("all")
const value5 = ref("default")
const value6 = ref("1")
const value7 = ref("all")
const value8 = ref("all")

const options1 = [
  { label: "全部商品", value: "all" },
  { label: "服装鞋帽", value: "clothes" },
  { label: "数码电器", value: "digital" },
  { label: "食品饮料", value: "food" },
]

const options2 = [
  { label: "默认排序", value: "default" },
  { label: "价格升序", value: "price-asc" },
  { label: "价格降序", value: "price-desc" },
  { label: "销量优先", value: "sales" },
]

const options3 = [
  { label: "包邮", value: "free-shipping" },
  { label: "有货", value: "in-stock" },
  { label: "促销", value: "promotion" },
  { label: "新品", value: "new" },
]

const manyOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `选项 ${i + 1}`,
  value: String(i + 1),
}))
</script>
