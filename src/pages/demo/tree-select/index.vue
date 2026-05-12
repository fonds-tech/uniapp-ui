<template>
  <demo-page>
    <demo-section title="基础用法 · 单选" desc="activeId 传单值开启单选">
      <demo-block direction="column" :gap="12">
        <text class="event-log">当前: {{ activeId1 ?? "无" }}</text>
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex1" v-model:active-id="activeId1" :items="items" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="多选模式" desc="activeId 传数组开启多选">
      <demo-block direction="column" :gap="12">
        <text class="event-log">当前: {{ activeIds2.length ? activeIds2.join(", ") : "无" }}</text>
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex2" v-model:active-id="activeIds2" :items="items" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="最大数量 max" desc="多选上限达到再点触发 maxReached">
      <demo-block direction="column" :gap="12">
        <text class="event-log">已选 {{ activeIds3.length }} / 2 · {{ maxLog }}</text>
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex3" v-model:active-id="activeIds3" :items="items" :max="2" @max-reached="onMaxReached" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用" desc="分类层 / 子项层均可 disabled">
      <view class="ts-wrap">
        <ui-tree-select v-model:main-active-index="navIndex4" v-model:active-id="activeId4" :items="itemsWithDisabled" />
      </view>
    </demo-section>

    <demo-section title="组件高度 height">
      <demo-block direction="column" :gap="16">
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex5" v-model:active-id="activeId5" :items="items" :height="heightDemo" />
        </view>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="h in heightPresets" :key="h" size="small" :type="heightDemo === h ? 'primary' : 'default'" @click="heightDemo = h">
            {{ h }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="nav 宽度 navWidth">
      <demo-block direction="column" :gap="16">
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex6" v-model:active-id="activeId6" :items="items" :nav-width="navWidthDemo" />
        </view>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="w in navWidthPresets" :key="w" size="small" :type="navWidthDemo === w ? 'primary' : 'default'" @click="navWidthDemo = w">
            {{ w }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="主题色 activeColor">
      <demo-block direction="column" :gap="16">
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex7" v-model:active-id="activeId7" :items="items" :active-color="colorDemo" />
        </view>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c" size="small" :type="colorDemo === c ? 'primary' : 'default'" @click="colorDemo = c">
            {{ c }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="选中图标 selectedIcon">
      <demo-block direction="column" :gap="16">
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex8" v-model:active-id="activeIds8" :items="items" :selected-icon="iconDemo" />
        </view>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="i in iconPresets" :key="i" size="small" :type="iconDemo === i ? 'primary' : 'default'" @click="iconDemo = i">
            {{ i }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容 slot" desc="content 完全自定义右侧">
      <view class="ts-wrap">
        <ui-tree-select v-model:main-active-index="navIndex9" :items="items">
          <template #content>
            <view class="custom-content">
              <text class="custom-content__title">{{ items[navIndex9]?.text }}</text>
              <view class="custom-content__list">
                <view v-for="c in items[navIndex9]?.children || []" :key="c.id" class="custom-content__item">
                  <ui-icon name="location" size="32rpx" color="text-secondary" />
                  <text>{{ c.text }}</text>
                </view>
              </view>
            </view>
          </template>
        </ui-tree-select>
      </view>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" :gap="12">
        <view class="ts-wrap">
          <ui-tree-select v-model:main-active-index="navIndex10" v-model:active-id="activeId10" :items="items" @click-nav="onClickNav" @click-item="onClickItem" />
        </view>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 商品多分类选择">
      <demo-block direction="column" :gap="12">
        <text class="event-log">已选: {{ selectedProducts.length ? selectedProducts.join("、") : "请选择" }}</text>
        <view class="ts-wrap ts-wrap--large">
          <ui-tree-select v-model:main-active-index="navIndex11" v-model:active-id="activeIds11" :items="productItems" :max="5" height="500rpx" />
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TreeSelectItem, TreeSelectChild } from "@/uni_modules/uniapp-ui/ui-tree-select"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "TreeSelect 分类选择" },
})

const items: TreeSelectItem[] = [
  { text: "浙江", children: [{ id: 1, text: "杭州" }, { id: 2, text: "温州" }, { id: 3, text: "宁波", disabled: true }] },
  { text: "江苏", children: [{ id: 4, text: "南京" }, { id: 5, text: "苏州" }] },
  { text: "上海", children: [{ id: 6, text: "黄浦" }, { id: 7, text: "浦东" }] },
]

const itemsWithDisabled: TreeSelectItem[] = [
  { text: "浙江", children: [{ id: 1, text: "杭州" }, { id: 2, text: "温州" }, { id: 3, text: "宁波", disabled: true }] },
  { text: "江苏", children: [{ id: 4, text: "南京" }, { id: 5, text: "苏州" }] },
  { text: "广东", disabled: true, children: [{ id: 6, text: "广州" }, { id: 7, text: "深圳" }] },
]

const productItems: TreeSelectItem[] = [
  { text: "水果", children: [{ id: "apple", text: "苹果" }, { id: "banana", text: "香蕉" }, { id: "orange", text: "橙子" }, { id: "grape", text: "葡萄" }] },
  { text: "蔬菜", children: [{ id: "tomato", text: "番茄" }, { id: "potato", text: "土豆" }, { id: "carrot", text: "胡萝卜" }] },
  { text: "肉类", children: [{ id: "pork", text: "猪肉" }, { id: "beef", text: "牛肉" }, { id: "chicken", text: "鸡肉" }] },
  { text: "海鲜", children: [{ id: "fish", text: "鱼" }, { id: "shrimp", text: "虾" }, { id: "crab", text: "蟹", disabled: true }] },
]

const navIndex1 = ref(0)
const activeId1 = ref<number>(1)

const navIndex2 = ref(0)
const activeIds2 = ref<number[]>([1, 2])

const navIndex3 = ref(0)
const activeIds3 = ref<number[]>([])
const maxLog = ref("")
function onMaxReached(max: number) {
  maxLog.value = `已达上限 ${max}`
  setTimeout(() => (maxLog.value = ""), 1500)
}

const navIndex4 = ref(0)
const activeId4 = ref<number>(1)

const heightPresets = ["400rpx", "600rpx", "800rpx"]
const heightDemo = ref("600rpx")
const navIndex5 = ref(0)
const activeId5 = ref<number>(1)

const navWidthPresets = ["160rpx", "200rpx", "280rpx"]
const navWidthDemo = ref("200rpx")
const navIndex6 = ref(0)
const activeId6 = ref<number>(1)

const colorPresets = ["primary", "success", "warning", "danger"]
const colorDemo = ref("primary")
const navIndex7 = ref(0)
const activeId7 = ref<number>(1)

const iconPresets = ["check", "checked", "success"]
const iconDemo = ref("check")
const navIndex8 = ref(0)
const activeIds8 = ref<number[]>([1, 2])

const navIndex9 = ref(0)

const navIndex10 = ref(0)
const activeId10 = ref<number>(1)
const eventLog = ref("等待事件...")
function onClickNav(index: number) {
  eventLog.value = `[click-nav] index=${index}`
}
function onClickItem(item: TreeSelectChild) {
  eventLog.value = `[click-item] id=${item.id} text=${item.text}`
}

const navIndex11 = ref(0)
const activeIds11 = ref<(number | string)[]>(["apple", "banana"])
const selectedProducts = computed(() => {
  const all = productItems.flatMap((g) => g.children)
  return activeIds11.value.map((id) => all.find((c) => c.id === id)?.text).filter(Boolean) as string[]
})
</script>

<style lang="scss" scoped>
.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.ts-wrap {
  width: 100%;
  overflow: hidden;
  border-radius: var(--ui-radius-md);

  &--large {
    height: 500rpx;
  }
}

.custom-content {
  padding: var(--ui-spacing-lg);

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
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
    font-size: var(--ui-font-size-sm);
    align-items: center;
  }
}
</style>
