<template>
  <demo-page>
    <demo-section title="基础用法" desc="滚动到顶部时元素自动吸附">
      <ui-sticky>
        <view class="bar bar--primary">基础吸顶</view>
      </ui-sticky>
    </demo-section>

    <demo-section title="设置偏移 offset-top" desc="距顶部预留间距，常用于躲过自定义 navbar">
      <ui-sticky offset-top="120rpx">
        <view class="bar bar--success">offset-top: 120rpx</view>
      </ui-sticky>
    </demo-section>

    <demo-section title="设置层级 z-index" desc="多个 sticky 重叠时控制覆盖关系">
      <ui-sticky offset-top="240rpx" :z-index="100">
        <view class="bar bar--warning">z-index: 100</view>
      </ui-sticky>
    </demo-section>

    <demo-section title="吸顶背景色 background" desc="吸顶后背景填充，避免透出页面内容">
      <ui-sticky offset-top="360rpx" background="background">
        <view class="bar bar--info">background: background（吸顶后白底）</view>
      </ui-sticky>
    </demo-section>

    <demo-section title="禁用 disabled" desc="切换开关控制是否吸顶">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" :type="!disabled ? 'primary' : 'default'" @click="disabled = false">启用</ui-button>
          <ui-button size="small" :type="disabled ? 'primary' : 'default'" @click="disabled = true">禁用</ui-button>
        </demo-block>
        <ui-sticky offset-top="480rpx" :disabled="disabled">
          <view class="bar bar--danger">{{ disabled ? "已禁用（不吸顶）" : "正常吸顶" }}</view>
        </ui-sticky>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="change / scroll 实时记录吸顶状态">
      <demo-block direction="column" :gap="12">
        <view class="log-card">
          <text class="log-row"><text class="log-label">change：</text>{{ changeLog }}</text>
          <text class="log-row"><text class="log-label">scroll：</text>{{ scrollLog }}</text>
        </view>
        <ui-sticky offset-top="600rpx" @change="onChange" @scroll="onScroll">
          <view class="bar bar--primary">监听我吸顶</view>
        </ui-sticky>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法 resize" desc="内部尺寸变化后调用重新测量">
      <demo-block direction="column" :gap="12">
        <ui-button size="small" @click="onResize">手动 resize()</ui-button>
        <ui-sticky ref="manualRef" offset-top="720rpx">
          <view class="bar bar--success">resize 演示</view>
        </ui-sticky>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 章节标题吸顶" desc="文章长列表，标题滚动到顶时吸附">
      <view v-for="section in sections" :key="section.id" class="article-section">
        <ui-sticky offset-top="0">
          <view class="article-title">{{ section.title }}</view>
        </ui-sticky>
        <view v-for="(p, i) in section.paragraphs" :key="i" class="article-paragraph">
          {{ p }}
        </view>
      </view>
    </demo-section>

    <demo-section title="综合 · 表头吸顶" desc="数据列表常用">
      <view class="table">
        <ui-sticky offset-top="0" background="background-section">
          <view class="table__head">
            <text class="table__cell table__cell--name">名称</text>
            <text class="table__cell">销量</text>
            <text class="table__cell">单价</text>
          </view>
        </ui-sticky>
        <view v-for="row in tableData" :key="row.name" class="table__row">
          <text class="table__cell table__cell--name">{{ row.name }}</text>
          <text class="table__cell">{{ row.sold }}</text>
          <text class="table__cell">¥{{ row.price }}</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="尾部填充" desc="增加页面高度便于滚动测试">
      <view class="filler">
        <view v-for="i in 8" :key="i" class="filler__card">
          <text class="filler__title">填充卡片 {{ i }}</text>
          <text class="filler__body">滚动这里看吸顶生效</text>
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { StickyInstance } from "@/uni_modules/uniapp-ui/ui-sticky"
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Sticky 吸顶" },
})

const toast = useToast()

const disabled = ref(false)

const changeLog = ref("等待 change...")
const scrollLog = ref("等待 scroll...")
function onChange(sticky: boolean) {
  changeLog.value = sticky ? "吸顶中" : "已脱离"
}
function onScroll(data: { scrollTop: number; isFixed: boolean }) {
  scrollLog.value = `isFixed=${data.isFixed}, scrollTop=${data.scrollTop}`
}

const manualRef = ref<StickyInstance>()
function onResize() {
  manualRef.value?.resize()
  toast.success("已 resize")
}

const sections = [
  {
    id: 1,
    title: "第一章 起步",
    paragraphs: ["这是第一段示例文字，模拟较长的文章内容。", "继续填充，让滚动看到吸顶切换效果。", "段落 3，再加点高度。"],
  },
  {
    id: 2,
    title: "第二章 进阶",
    paragraphs: ["第二章开始，标题随之吸顶。", "上一章的标题被推出顶部，新标题接管。", "段落 3。"],
  },
  {
    id: 3,
    title: "第三章 实战",
    paragraphs: ["实战示例。", "再加内容。", "结尾。"],
  },
]

const tableData = [
  { name: "拿铁咖啡", sold: 320, price: 28 },
  { name: "提拉米苏", sold: 188, price: 38 },
  { name: "气泡水", sold: 642, price: 12 },
  { name: "焦糖布丁", sold: 95, price: 22 },
  { name: "抹茶蛋糕", sold: 268, price: 42 },
  { name: "美式咖啡", sold: 412, price: 22 },
]
</script>

<style lang="scss" scoped>
.bar {
  color: var(--ui-color-text-inverse);
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  font-size: var(--ui-font-size-sm);
  box-shadow: var(--ui-shadow-sm);
  text-align: center;
  border-radius: var(--ui-radius-md);

  &--primary {
    background: var(--ui-color-primary);
  }

  &--success {
    background: var(--ui-color-success);
  }

  &--warning {
    background: var(--ui-color-warning);
  }

  &--danger {
    background: var(--ui-color-danger);
  }

  &--info {
    color: var(--ui-color-text);
    background: var(--ui-color-background);
  }
}

.log-card {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
  flex-direction: column;
}

.log-row {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-xs);
}

.log-label {
  color: var(--ui-color-text-secondary);
}

.article-section {
  margin-bottom: var(--ui-spacing-lg);
}

.article-title {
  color: var(--ui-color-text-inverse);
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  background: var(--ui-color-primary);
  font-weight: var(--ui-font-weight-bold);
}

.article-paragraph {
  color: var(--ui-color-text);
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  font-size: var(--ui-font-size-sm);
  background: var(--ui-color-background);
  line-height: 1.6;
  border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border-light);
}

.table {
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-md);

  &__head {
    color: var(--ui-color-text);
    display: flex;
    padding: var(--ui-spacing-md);
    background: var(--ui-color-background-section);
    font-weight: var(--ui-font-weight-bold);
  }

  &__row {
    display: flex;
    padding: var(--ui-spacing-md);
    border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border-light);
  }

  &__cell {
    flex: 1;
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    text-align: center;

    &--name {
      flex: 2;
      text-align: left;
    }
  }
}

.filler {
  gap: var(--ui-spacing-md);
  display: flex;
  flex-direction: column;
  padding-bottom: var(--ui-spacing-xxl);

  &__card {
    gap: var(--ui-spacing-xs);
    display: flex;
    padding: var(--ui-spacing-lg);
    background: var(--ui-color-background-section);
    border-radius: var(--ui-radius-md);
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-medium);
  }

  &__body {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
