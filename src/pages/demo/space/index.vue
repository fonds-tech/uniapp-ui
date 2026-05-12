<template>
  <demo-page>
    <demo-section title="基础用法" desc="水平排列子元素，默认 md 间距">
      <demo-block>
        <ui-space>
          <ui-button type="primary">按钮1</ui-button>
          <ui-button type="primary">按钮2</ui-button>
          <ui-button type="primary">按钮3</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="方向" desc="horizontal / vertical 切换">
      <demo-block direction="column" :gap="16">
        <ui-space :direction="dir" :fill="dir === 'vertical'">
          <ui-button type="primary" :block="dir === 'vertical'">按钮1</ui-button>
          <ui-button type="success" :block="dir === 'vertical'">按钮2</ui-button>
          <ui-button type="warning" :block="dir === 'vertical'">按钮3</ui-button>
        </ui-space>
        <demo-block :cols="2" :gap="12">
          <ui-button v-for="d in directions" :key="d" size="small" :type="dir === d ? 'primary' : 'default'" @click="dir = d">
            {{ d }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="间距 size" desc="预设档 xs/sm/md/lg/xl + 任意数值">
      <demo-block direction="column" :gap="16">
        <ui-space :size="sizeDemo">
          <ui-button size="small">A</ui-button>
          <ui-button size="small">B</ui-button>
          <ui-button size="small">C</ui-button>
          <ui-button size="small">D</ui-button>
        </ui-space>
        <demo-block :cols="5" :gap="12">
          <ui-button v-for="s in sizes" :key="s" size="small" :type="sizeDemo === s ? 'primary' : 'default'" @click="sizeDemo = s">
            {{ s }}
          </ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="sizeDemo === '4rpx' ? 'primary' : 'default'" @click="sizeDemo = '4rpx'">4rpx</ui-button>
          <ui-button size="small" :type="sizeDemo === '48rpx' ? 'primary' : 'default'" @click="sizeDemo = '48rpx'">48rpx</ui-button>
          <ui-button size="small" :type="sizeDemo === '80rpx' ? 'primary' : 'default'" @click="sizeDemo = '80rpx'">80rpx</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="对齐 align" desc="交叉轴对齐方式切换（子元素高度不一）">
      <demo-block direction="column" :gap="16">
        <view class="align-box">
          <ui-space :align="alignDemo">
            <view class="bar" style="height: 60rpx">短</view>
            <view class="bar" style="height: 120rpx">中</view>
            <view class="bar" style="height: 90rpx">长</view>
          </ui-space>
        </view>
        <demo-block :cols="5" :gap="12">
          <ui-button v-for="a in aligns" :key="a" size="small" :type="alignDemo === a ? 'primary' : 'default'" @click="alignDemo = a">
            {{ a }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="主轴对齐 justify" desc="6 种主轴分布方式">
      <demo-block direction="column" :gap="16">
        <view class="justify-box">
          <ui-space :justify="justifyDemo">
            <ui-button size="small">A</ui-button>
            <ui-button size="small">B</ui-button>
            <ui-button size="small">C</ui-button>
          </ui-space>
        </view>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="j in justifies" :key="j" size="small" :type="justifyDemo === j ? 'primary' : 'default'" @click="justifyDemo = j">
            {{ j }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自动换行 wrap" desc="水平超出容器自动换行">
      <demo-block>
        <ui-space wrap>
          <ui-button v-for="i in 12" :key="i" size="small">按钮{{ i }}</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="行列间距分离" desc="wrap 时 gap-row / gap-col 独立设置">
      <demo-block direction="column" :gap="16">
        <ui-space wrap :gap-row="gapRow" :gap-col="gapCol">
          <ui-button v-for="i in 8" :key="i" size="small" type="primary">{{ i }}</ui-button>
        </ui-space>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="gapRow === '16rpx' ? 'primary' : 'default'" @click="gapRow = '16rpx'">行 16</ui-button>
          <ui-button size="small" :type="gapRow === '32rpx' ? 'primary' : 'default'" @click="gapRow = '32rpx'">行 32</ui-button>
          <ui-button size="small" :type="gapRow === '64rpx' ? 'primary' : 'default'" @click="gapRow = '64rpx'">行 64</ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="gapCol === '8rpx' ? 'primary' : 'default'" @click="gapCol = '8rpx'">列 8</ui-button>
          <ui-button size="small" :type="gapCol === '16rpx' ? 'primary' : 'default'" @click="gapCol = '16rpx'">列 16</ui-button>
          <ui-button size="small" :type="gapCol === '32rpx' ? 'primary' : 'default'" @click="gapCol = '32rpx'">列 32</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="均分填充 fill" desc="子元素 flex:1，常用底部按钮栏">
      <demo-block>
        <ui-space fill>
          <ui-button type="default">取消</ui-button>
          <ui-button type="primary">确认</ui-button>
          <ui-button type="danger">删除</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="行内布局 inline" desc="inline-flex，紧贴文本/标签场景">
      <demo-block>
        <text class="inline-line">
          状态：
          <ui-space inline size="xs">
            <ui-tag type="success">已发布</ui-tag>
            <ui-tag type="primary">推荐</ui-tag>
          </ui-space>
        </text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 卡片底部操作栏" desc="均分按钮 + sm 间距">
      <demo-block>
        <view class="scene-card">
          <text class="scene-card__title">订单确认</text>
          <text class="scene-card__desc">¥ 198.00 · 2 件商品</text>
          <ui-space fill size="sm">
            <ui-button>放弃</ui-button>
            <ui-button type="primary">立即支付</ui-button>
          </ui-space>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 标签云" desc="wrap + 自定义行列间距">
      <demo-block>
        <ui-space wrap gap-row="16rpx" gap-col="12rpx">
          <ui-tag v-for="t in tags" :key="t.text" :type="t.type">{{ t.text }}</ui-tag>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 头像组 + 文案" desc="inline + align center + sm 间距">
      <demo-block direction="column" :gap="16">
        <ui-space align="center" size="sm">
          <ui-avatar text="A" size="64rpx" color="primary" />
          <view class="user-meta">
            <text class="user-meta__name">设计师 Anna</text>
            <text class="user-meta__role">UI / 前端 · 在线</text>
          </view>
        </ui-space>
        <ui-space align="center" size="sm">
          <ui-avatar text="B" size="64rpx" color="success" />
          <view class="user-meta">
            <text class="user-meta__name">工程师 Bob</text>
            <text class="user-meta__role">后端 · 5 分钟前</text>
          </view>
        </ui-space>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SpaceAlign, SpaceJustify, SpaceDirection, SpaceSizeToken } from "@/uni_modules/uniapp-ui/ui-space"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Space 间距" },
})

const directions: SpaceDirection[] = ["horizontal", "vertical"]
const dir = ref<SpaceDirection>("horizontal")

const sizes: SpaceSizeToken[] = ["xs", "sm", "md", "lg", "xl"]
const sizeDemo = ref<SpaceSizeToken | string>("md")

const aligns: SpaceAlign[] = ["start", "end", "center", "baseline", "stretch"]
const alignDemo = ref<SpaceAlign>("center")

const justifies: SpaceJustify[] = ["start", "end", "center", "space-between", "space-around", "space-evenly"]
const justifyDemo = ref<SpaceJustify>("start")

const gapRow = ref("16rpx")
const gapCol = ref("16rpx")

const tags = [
  { text: "Vue", type: "primary" as const },
  { text: "UniApp", type: "success" as const },
  { text: "TypeScript", type: "warning" as const },
  { text: "SCSS", type: "danger" as const },
  { text: "Vite", type: "primary" as const },
  { text: "Node.js", type: "success" as const },
  { text: "Composition API", type: "warning" as const },
  { text: "ESLint", type: "danger" as const },
]
</script>

<style lang="scss" scoped>
.align-box,
.justify-box {
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
}

.bar {
  color: var(--ui-color-text-inverse);
  display: flex;
  padding: 0 var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: var(--ui-radius-sm);
  justify-content: center;
}

.inline-line {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-sm);
}

.scene-card {
  gap: var(--ui-spacing-sm);
  width: 100%;
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-sm);
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
    margin-bottom: var(--ui-spacing-sm);
  }
}

.user-meta {
  gap: var(--ui-spacing-xxs);
  display: flex;
  flex-direction: column;

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-normal);
  }

  &__role {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
