<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <ui-text-ellipsis :content="longText" />
      </demo-block>
    </demo-section>

    <demo-section title="展开/收起">
      <demo-block direction="column" :gap="16">
        <ui-text-ellipsis :content="longText" :rows="2" @change="onChange" />
        <text class="demo-text">当前状态: {{ expanded1 ? "已展开" : "已收起" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义行数">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">1 行:</text>
        <ui-text-ellipsis :content="longText" :rows="1" />
        <text class="demo-text">2 行:</text>
        <ui-text-ellipsis :content="longText" :rows="2" />
        <text class="demo-text">4 行:</text>
        <ui-text-ellipsis :content="longText" :rows="4" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义操作文案">
      <demo-block direction="column" :gap="16">
        <ui-text-ellipsis :content="longText" expand-text="查看更多" collapse-text="收起内容" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">自定义文本颜色和大小:</text>
        <ui-text-ellipsis :content="longText" color="#1989fa" font-size="28rpx" action-color="#ee0a24" />
      </demo-block>
    </demo-section>

    <demo-section title="隐藏操作按钮">
      <demo-block direction="column" :gap="16">
        <ui-text-ellipsis :content="longText" :show-action="false" />
      </demo-block>
    </demo-section>

    <demo-section title="通过 ref 控制">
      <demo-block direction="column" :gap="16">
        <ui-text-ellipsis ref="textEllipsisRef" :content="longText" :show-action="false" />
        <demo-block :gap="16">
          <ui-button size="small" @click="handleExpand">展开</ui-button>
          <ui-button size="small" @click="handleCollapse">收起</ui-button>
          <ui-button size="small" @click="handleToggle">切换</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TextEllipsisInstance } from "@/uni_modules/uniapp-ui/ui-text-ellipsis"

definePage({
  style: { navigationBarTitleText: "TextEllipsis 文本省略" },
})

const longText =
  "慢慢来，比较快。人生是一场马拉松，不是百米冲刺。保持节奏，稳步前行，你会发现，那些看似遥不可及的目标，终将在不经意间到达。不要被眼前的困难吓倒，也不要被暂时的失败击垮。每一次跌倒都是一次成长的机会，每一次挫折都是通往成功的必经之路。相信自己，坚持下去，美好的明天正在前方等待着你。"

const expanded1 = ref(false)
const textEllipsisRef = ref<TextEllipsisInstance | null>(null)

function onChange(expanded: boolean) {
  expanded1.value = expanded
}

function handleExpand() {
  textEllipsisRef.value?.expand()
}

function handleCollapse() {
  textEllipsisRef.value?.collapse()
}

function handleToggle() {
  textEllipsisRef.value?.toggle()
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
