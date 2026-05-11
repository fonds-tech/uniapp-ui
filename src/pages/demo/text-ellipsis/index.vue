<template>
  <demo-page>
    <demo-section title="基础用法" desc="超 3 行自动省略 + 展开/收起">
      <ui-text-ellipsis :content="longText" />
    </demo-section>

    <demo-section title="行数切换 rows" desc="1 / 2 / 3 / 4 行">
      <demo-block direction="column" :gap="16">
        <ui-text-ellipsis :content="longText" :rows="rowsDemo" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="r in rowsPresets" :key="r" size="small" :type="rowsDemo === r ? 'primary' : 'default'" @click="rowsDemo = r">
            {{ r }} 行
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义文案" desc="expand-text / collapse-text">
      <ui-text-ellipsis :content="longText" expand-text="查看更多" collapse-text="收起内容" />
    </demo-section>

    <demo-section title="自定义颜色" desc="color + action-color + gradient-color">
      <view class="dark-bg">
        <ui-text-ellipsis :content="longText" color="text-inverse" action-color="warning" gradient-color="#333" />
      </view>
    </demo-section>

    <demo-section title="隐藏按钮 showAction" desc="纯截断不展开">
      <ui-text-ellipsis :content="longText" :show-action="false" />
    </demo-section>

    <demo-section title="实例方法" desc="expand / collapse / toggle">
      <demo-block direction="column" :gap="16">
        <ui-text-ellipsis ref="ellipsisRef" :content="longText" :show-action="false" />
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="ellipsisRef?.expand()">展开</ui-button>
          <ui-button size="small" @click="ellipsisRef?.collapse()">收起</ui-button>
          <ui-button size="small" type="primary" @click="ellipsisRef?.toggle()">切换</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="change 切换状态日志">
      <demo-block direction="column" :gap="12">
        <ui-text-ellipsis :content="longText" :rows="2" @change="onChange" />
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 评论列表" desc="单条评论长文本省略">
      <view class="comment-list">
        <view v-for="c in comments" :key="c.id" class="comment">
          <view class="comment__header">
            <text class="comment__name">{{ c.name }}</text>
            <text class="comment__time">{{ c.time }}</text>
          </view>
          <ui-text-ellipsis :content="c.content" :rows="2" gradient-color="background-section" />
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TextEllipsisInstance } from "@/uni_modules/uniapp-ui/ui-text-ellipsis"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "TextEllipsis 文本省略" },
})

const longText =
  "慢慢来，比较快。人生是一场马拉松，不是百米冲刺。保持节奏，稳步前行，你会发现，那些看似遥不可及的目标，终将在不经意间到达。不要被眼前的困难吓倒，也不要被暂时的失败击垮。每一次跌倒都是一次成长的机会，每一次挫折都是通往成功的必经之路。"

const rowsPresets = [1, 2, 3, 4]
const rowsDemo = ref(2)

const ellipsisRef = ref<TextEllipsisInstance>()

const eventLog = ref("等待事件...")
function onChange(expanded: boolean) {
  eventLog.value = `[change] expanded=${expanded}`
}

const comments = [
  { id: 1, name: "张三", time: "2 小时前", content: "产品质量很好，配送也很快。值得推荐。介绍给身边的朋友了，大家都说不错。" },
  { id: 2, name: "李四", time: "3 小时前", content: "外观漂亮，做工精致，使用一段时间后感觉性能稳定。客服态度也很好，遇到问题能及时解答。" },
  { id: 3, name: "王五", time: "1 天前", content: "这是我买过最满意的一次购物体验。从下单到收货只用了 2 天，包装严实没有任何损坏。" },
]
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

.dark-bg {
  padding: var(--ui-spacing-md);
  background: #333;
  border-radius: var(--ui-radius-md);
}

.comment-list {
  gap: var(--ui-spacing-md);
  display: flex;
  flex-direction: column;
}

.comment {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-medium);
  }

  &__time {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
