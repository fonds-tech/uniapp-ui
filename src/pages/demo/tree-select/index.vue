<template>
  <demo-page>
    <demo-section title="基础用法" desc="单选模式，点击右侧选项时会触发 click-item 事件">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前选中: {{ activeId1 ?? '无' }}</text>
        <view class="tree-select-wrap">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex1"
            v-model:active-id="activeId1"
            :items="items"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="多选模式" desc="activeId 传入数组时开启多选">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前选中: {{ activeIds2.length > 0 ? activeIds2.join(', ') : '无' }}</text>
        <view class="tree-select-wrap">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex2"
            v-model:active-id="activeIds2"
            :items="items"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义高度" desc="通过 height 属性设置组件高度">
      <demo-block :cols="2" :gap="24">
        <view class="tree-select-wrap tree-select-wrap--small">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex3a"
            v-model:active-id="activeId3a"
            :items="items"
            height="400rpx"
          />
        </view>
        <view class="tree-select-wrap tree-select-wrap--large">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex3b"
            v-model:active-id="activeId3b"
            :items="items"
            height="500rpx"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项" desc="通过 disabled 属性禁用分类或选项">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">禁用了 "宁波" 和 "广东" 分类</text>
        <view class="tree-select-wrap">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex4"
            v-model:active-id="activeId4"
            :items="itemsWithDisabled"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="最大选择数" desc="通过 max 属性限制多选数量">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">最多选择 2 项，当前: {{ activeIds5.join(', ') || '无' }}</text>
        <view class="tree-select-wrap">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex5"
            v-model:active-id="activeIds5"
            :items="items"
            :max="2"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容" desc="通过 content 插槽自定义右侧内容区域">
      <demo-block direction="column" align="start" :gap="16">
        <view class="tree-select-wrap">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex6"
            :items="items"
          >
            <template #content>
              <view class="custom-content">
                <text class="custom-content__title">{{ currentNavItem?.text }}</text>
                <view class="custom-content__list">
                  <view
                    v-for="child in currentNavItem?.children || []"
                    :key="child.id"
                    class="custom-content__item"
                  >
                    <ui-icon name="location" size="32rpx" />
                    <text>{{ child.text }}</text>
                  </view>
                </view>
              </view>
            </template>
          </ui-tree-select>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件处理" desc="监听 click-nav 和 click-item 事件">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <view class="tree-select-wrap">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex7"
            v-model:active-id="activeId7"
            :items="items"
            @click-nav="onClickNav"
            @click-item="onClickItem"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合示例" desc="多分类商品选择">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">已选商品: {{ selectedProducts.join(', ') || '请选择' }}</text>
        <view class="tree-select-wrap tree-select-wrap--large">
          <ui-tree-select
            v-model:main-active-index="mainActiveIndex8"
            v-model:active-id="activeIds8"
            :items="productItems"
            :max="5"
            height="500rpx"
          />
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TreeSelectItem, TreeSelectChild } from "@/uni_modules/uniapp-ui/ui-tree-select"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "TreeSelect 分类选择" },
})

const toast = useToast()

// 基础数据
const items = ref<TreeSelectItem[]>([
  {
    text: "浙江",
    children: [
      { id: 1, text: "杭州" },
      { id: 2, text: "温州" },
      { id: 3, text: "宁波", disabled: true },
    ],
  },
  {
    text: "江苏",
    children: [
      { id: 4, text: "南京" },
      { id: 5, text: "苏州" },
    ],
  },
])

// 带禁用分类的数据
const itemsWithDisabled = ref<TreeSelectItem[]>([
  {
    text: "浙江",
    children: [
      { id: 1, text: "杭州" },
      { id: 2, text: "温州" },
      { id: 3, text: "宁波", disabled: true },
    ],
  },
  {
    text: "江苏",
    children: [
      { id: 4, text: "南京" },
      { id: 5, text: "苏州" },
    ],
  },
  {
    text: "广东",
    disabled: true,
    children: [
      { id: 6, text: "广州" },
      { id: 7, text: "深圳" },
    ],
  },
])

// 商品分类数据
const productItems = ref<TreeSelectItem[]>([
  {
    text: "水果",
    children: [
      { id: "apple", text: "苹果" },
      { id: "banana", text: "香蕉" },
      { id: "orange", text: "橙子" },
      { id: "grape", text: "葡萄" },
    ],
  },
  {
    text: "蔬菜",
    children: [
      { id: "tomato", text: "番茄" },
      { id: "potato", text: "土豆" },
      { id: "carrot", text: "胡萝卜" },
    ],
  },
  {
    text: "肉类",
    children: [
      { id: "pork", text: "猪肉" },
      { id: "beef", text: "牛肉" },
      { id: "chicken", text: "鸡肉" },
    ],
  },
  {
    text: "海鲜",
    children: [
      { id: "fish", text: "鱼" },
      { id: "shrimp", text: "虾" },
      { id: "crab", text: "蟹", disabled: true },
    ],
  },
])

// 基础用法 - 单选模式
const mainActiveIndex1 = ref(0)
const activeId1 = ref<number | string>(1)

// 多选模式
const mainActiveIndex2 = ref(0)
const activeIds2 = ref<(number | string)[]>([1, 2])

// 自定义高度
const mainActiveIndex3a = ref(0)
const activeId3a = ref<number | string>(1)
const mainActiveIndex3b = ref(0)
const activeId3b = ref<number | string>(1)

// 禁用选项
const mainActiveIndex4 = ref(0)
const activeId4 = ref<number | string>(1)

// 最大选择数
const mainActiveIndex5 = ref(0)
const activeIds5 = ref<(number | string)[]>([1])

// 自定义内容
const mainActiveIndex6 = ref(0)
const currentNavItem = computed(() => items.value[mainActiveIndex6.value])

// 事件处理
const mainActiveIndex7 = ref(0)
const activeId7 = ref<number | string>(1)
const eventLog = ref("点击左侧导航或右侧选项查看事件")

function onClickNav(index: number) {
  eventLog.value = `点击导航，index: ${index}`
  toast.text(`切换到 ${items.value[index]?.text}`)
}

function onClickItem(item: TreeSelectChild) {
  eventLog.value = `点击选项，id: ${item.id}, text: ${item.text}`
  toast.text(`选择了 ${item.text}`)
}

// 综合示例
const mainActiveIndex8 = ref(0)
const activeIds8 = ref<(number | string)[]>(["apple", "banana"])

const selectedProducts = computed(() => {
  const allChildren = productItems.value.flatMap(item => item.children)
  return activeIds8.value.map(id => {
    const child = allChildren.find(c => c.id === id)
    return child?.text || ""
  }).filter(Boolean)
})
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.tree-select-wrap {
  width: 100%;
  overflow: hidden;
  border-radius: 12rpx;

  &--small {
    height: 400rpx;
  }

  &--large {
    height: 500rpx;
  }
}

.custom-content {
  padding: var(--ui-spacing-lg);

  &__title {
    color: var(--ui-color-text-primary);
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: var(--ui-spacing-md);
  }

  &__list {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-direction: column;
  }

  &__item {
    gap: var(--ui-spacing-sm);
    color: var(--ui-color-text-secondary);
    display: flex;
    padding: var(--ui-spacing-sm) 0;
    font-size: 28rpx;
    align-items: center;
  }
}
</style>
