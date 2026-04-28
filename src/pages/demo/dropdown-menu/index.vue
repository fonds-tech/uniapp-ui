<template>
  <demo-page padding-x="0">
    <demo-section title="基础用法" :card="false">
      <ui-dropdown-menu>
        <ui-dropdown-item v-model="value1" title="全部商品" :options="options1" />
        <ui-dropdown-item v-model="value2" title="默认排序" :options="options2" />
      </ui-dropdown-menu>
    </demo-section>

    <demo-section title="多选模式" :card="false">
      <ui-dropdown-menu>
        <ui-dropdown-item v-model="value3" title="筛选" mode="multiple" :options="options3" />
      </ui-dropdown-menu>
    </demo-section>

    <demo-section title="自定义激活色（success）" :card="false">
      <ui-dropdown-menu active-title-color="success">
        <ui-dropdown-item v-model="value4" title="全部商品" :options="options1" />
        <ui-dropdown-item v-model="value5" title="默认排序" :options="options2" />
      </ui-dropdown-menu>
    </demo-section>

    <demo-section title="向上弹出" desc="放在底部时使用，弹层从触发栏向上展开" :card="false">
      <ui-dropdown-menu direction="up">
        <ui-dropdown-item v-model="value6" title="全部商品" :options="options1" />
        <ui-dropdown-item v-model="value7" title="默认排序" :options="options2" />
      </ui-dropdown-menu>
    </demo-section>

    <demo-section title="禁用状态" :card="false">
      <ui-dropdown-menu>
        <ui-dropdown-item v-model="value8" title="全部商品" :options="options1" />
        <ui-dropdown-item v-model="value9" title="默认排序" :options="options2" disabled />
      </ui-dropdown-menu>
    </demo-section>

    <demo-section title="点击遮罩不关闭" :card="false">
      <ui-dropdown-menu :close-on-click-overlay="false">
        <ui-dropdown-item v-model="valueOverlay" title="点遮罩无效" :options="options1" />
      </ui-dropdown-menu>
    </demo-section>

    <demo-section title="自定义内容（默认插槽）" :card="false">
      <ui-dropdown-menu>
        <ui-dropdown-item title="自定义筛选">
          <view class="custom-panel">
            <text class="custom-panel__title">价格区间</text>
            <demo-block :cols="3" :gap="12">
              <ui-button size="small" @click="setPriceRange('0-100')">0-100</ui-button>
              <ui-button size="small" @click="setPriceRange('100-500')">100-500</ui-button>
              <ui-button size="small" @click="setPriceRange('500+')">500+</ui-button>
            </demo-block>
            <text v-if="priceRange" class="custom-panel__result">已选: {{ priceRange }}</text>
          </view>
        </ui-dropdown-item>
      </ui-dropdown-menu>
    </demo-section>

    <demo-section title="ref 调用 close()" :card="false">
      <view class="ref-close-action">
        <ui-button size="small" type="primary" @click="callClose">手动关闭所有 dropdown</ui-button>
      </view>
      <ui-dropdown-menu ref="menuRef">
        <ui-dropdown-item v-model="valueRef" title="全部商品" :options="options1" />
      </ui-dropdown-menu>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { DropdownMenuInstance } from "@/uni_modules/uniapp-ui/ui-dropdown-menu"

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
const valueOverlay = ref("")
const valueRef = ref("")

const priceRange = ref("")
function setPriceRange(range: string) {
  priceRange.value = range
}

const menuRef = ref<DropdownMenuInstance>()
function callClose() {
  menuRef.value?.close()
}

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

<style lang="scss" scoped>
.custom-panel {
  gap: 16rpx;
  display: flex;
  padding: var(--ui-spacing-lg);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__result {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }
}

// 非 card section 内手动给按钮加左右缩进 + 与下方触发栏间距
.ref-close-action {
  padding: 0 24rpx 16rpx;
}
</style>
