<template>
  <demo-page>
    <demo-section title="基础用法" desc="text prop 或 default slot">
      <ui-text text="一段普通文本" />
    </demo-section>

    <demo-section title="字号" desc="size 切换">
      <demo-block direction="column" :gap="16">
        <ui-text :size="sizeDemo" text="演示文本 abc 123" />
        <demo-block :cols="6" :gap="12">
          <ui-button v-for="s in sizePresets" :key="s" size="small" :type="sizeDemo === s ? 'primary' : 'default'" @click="sizeDemo = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="颜色" desc="color 切换（语义色 / hex）">
      <demo-block direction="column" :gap="16">
        <ui-text :color="colorDemo" text="演示文本" size="32rpx" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c.value" size="small" :type="colorDemo === c.value ? 'primary' : 'default'" @click="colorDemo = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="粗细 weight" desc="400-700">
      <demo-block :gap="16" wrap>
        <ui-text v-for="w in weights" :key="w" :weight="w" :text="`字重 ${w}`" />
      </demo-block>
    </demo-section>

    <demo-section title="对齐 align" desc="left / center / right 切换">
      <demo-block direction="column" :gap="16">
        <view class="align-box">
          <ui-text :align="alignDemo" text="测试对齐方式 abc 123" />
        </view>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="a in aligns" :key="a" size="small" :type="alignDemo === a ? 'primary' : 'default'" @click="alignDemo = a">
            {{ a }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="装饰 decoration" desc="underline / line-through">
      <demo-block :gap="24" wrap>
        <ui-text decoration="underline" text="下划线" />
        <ui-text decoration="line-through" text="删除线" />
      </demo-block>
    </demo-section>

    <demo-section title="行数限制 rows" desc="1 单行省略 / 2+ 多行省略">
      <demo-block direction="column" :gap="16">
        <ui-text :rows="rowsDemo" :text="longText" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="r in rowsPresets" :key="r" size="small" :type="rowsDemo === r ? 'primary' : 'default'" @click="rowsDemo = r">
            {{ r === 0 ? "不限" : r }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="可点击 / 可选中" desc="clickable / selectable">
      <demo-block direction="column" :gap="16">
        <ui-text clickable color="primary" text="点击我" @click="onClick" />
        <ui-text selectable text="长按可选中这段文本" />
        <text class="event-log">{{ clickLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 商品卡片" desc="组合 weight + size + color + rows">
      <view class="card">
        <ui-text size="36rpx" weight="700" color="text" text="iPhone 15 Pro Max" />
        <ui-text size="26rpx" color="text-secondary" :rows="2" text="A17 Pro 芯片 / 钛金属边框 / 4800 万像素主摄" />
        <ui-text size="36rpx" weight="700" color="danger" text="¥ 9999" />
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TextAlign } from "@/uni_modules/uniapp-ui/ui-text"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Text 文本" },
})

const sizePresets = ["22rpx", "26rpx", "30rpx", "34rpx", "40rpx", "48rpx"]
const sizeDemo = ref("30rpx")

const colorPresets = [
  { label: "默认", value: "text" },
  { label: "次要", value: "text-secondary" },
  { label: "主色", value: "primary" },
  { label: "成功", value: "success" },
  { label: "警告", value: "warning" },
  { label: "危险", value: "danger" },
  { label: "占位", value: "text-placeholder" },
  { label: "自定义", value: "#7232dd" },
]
const colorDemo = ref("text")

const weights = ["400", "500", "600", "700"]

const aligns: TextAlign[] = ["left", "center", "right"]
const alignDemo = ref<TextAlign>("left")

const rowsPresets = [0, 1, 2, 3]
const rowsDemo = ref(2)

const longText = "这是一段很长的文本，用于演示多行省略行为。当超出指定行数会自动截断显示省略号。继续填充更多文字以触发省略效果。"

const clickLog = ref("点击 / 长按选中试试")
function onClick() {
  clickLog.value = `[click] ${Date.now()}`
}
</script>

<style lang="scss" scoped>
.align-box {
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
}

.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.card {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-sm);
  border-radius: var(--ui-radius-md);
  flex-direction: column;
}
</style>
