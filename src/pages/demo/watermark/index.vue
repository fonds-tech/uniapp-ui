<template>
  <demo-page>
    <demo-section title="基础用法" desc="文字水印">
      <ui-watermark content="Uniapp UI" :full-page="false">
        <view class="wm-content">
          <text class="wm-content__text">这是一段需要水印保护的内容</text>
          <text class="wm-content__text">水印防止内容被盗用截图</text>
        </view>
      </ui-watermark>
    </demo-section>

    <demo-section title="多行文字" desc="content 传数组">
      <ui-watermark :content="['公司名称', '2026-05-12']" :full-page="false">
        <view class="wm-content">
          <text class="wm-content__text">多行水印展示更多信息</text>
        </view>
      </ui-watermark>
    </demo-section>

    <demo-section title="间距 gap" desc="切换水平 / 垂直间距">
      <demo-block direction="column" :gap="16">
        <ui-watermark content="间距" :gap-x="gapDemo" :gap-y="gapDemo" :full-page="false">
          <view class="wm-content">
            <text class="wm-content__text">gapX/gapY = {{ gapDemo }}px</text>
          </view>
        </ui-watermark>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="g in gapPresets" :key="g" size="small" :type="gapDemo === g ? 'primary' : 'default'" @click="gapDemo = g">
            {{ g }}px
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="旋转 rotate" desc="切换 -45/0/45 度">
      <demo-block direction="column" :gap="16">
        <ui-watermark content="旋转" :rotate="rotateDemo" :full-page="false">
          <view class="wm-content">
            <text class="wm-content__text">rotate = {{ rotateDemo }}°</text>
          </view>
        </ui-watermark>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="r in rotatePresets" :key="r" size="small" :type="rotateDemo === r ? 'primary' : 'default'" @click="rotateDemo = r">
            {{ r }}°
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="透明度 opacity" desc="切换 0.3 / 0.6 / 1">
      <demo-block direction="column" :gap="16">
        <ui-watermark content="透明" :opacity="opacityDemo" :full-page="false">
          <view class="wm-content">
            <text class="wm-content__text">opacity = {{ opacityDemo }}</text>
          </view>
        </ui-watermark>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="o in opacityPresets" :key="o" size="small" :type="opacityDemo === o ? 'primary' : 'default'" @click="opacityDemo = o">
            {{ o }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="字号 fontSize">
      <demo-block direction="column" :gap="16">
        <ui-watermark content="字号" :font-size="fontSizeDemo" :full-page="false">
          <view class="wm-content">
            <text class="wm-content__text">fontSize = {{ fontSizeDemo }}px</text>
          </view>
        </ui-watermark>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="f in fontSizePresets" :key="f" size="small" :type="fontSizeDemo === f ? 'primary' : 'default'" @click="fontSizeDemo = f">
            {{ f }}px
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="字色 fontColor" desc="canvas API 仅接具体色值">
      <demo-block direction="column" :gap="16">
        <ui-watermark content="颜色" :font-color="colorDemo" :full-page="false">
          <view class="wm-content">
            <text class="wm-content__text">{{ colorDemo }}</text>
          </view>
        </ui-watermark>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c.label" size="small" :type="colorDemo === c.value ? 'primary' : 'default'" @click="colorDemo = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="字重 fontWeight">
      <demo-block direction="column" :gap="16">
        <ui-watermark content="字重" :font-weight="weightDemo" :full-page="false">
          <view class="wm-content">
            <text class="wm-content__text">{{ weightDemo }}</text>
          </view>
        </ui-watermark>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="w in weightPresets" :key="w" size="small" :type="weightDemo === w ? 'primary' : 'default'" @click="weightDemo = w">
            {{ w }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法 regenerate">
      <demo-block direction="column" :gap="12">
        <ui-watermark ref="wmRef" :content="randomContent" :full-page="false">
          <view class="wm-content">
            <text class="wm-content__text">内容: {{ randomContent }}</text>
          </view>
        </ui-watermark>
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="changeContent">改内容</ui-button>
          <ui-button size="small" type="primary" @click="wmRef?.regenerate()">手动重生成</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="局部 vs 全屏 fullPage">
      <demo-block direction="column" :gap="12">
        <ui-button type="primary" @click="fullPageOn = !fullPageOn">
          {{ fullPageOn ? "关闭全屏水印" : "开启全屏水印" }}
        </ui-button>
        <ui-watermark v-if="fullPageOn" content="全屏机密" full-page />
        <text class="wm-tip">全屏水印覆盖整个页面（含 demo 容器外）</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 文档预览保护">
      <ui-watermark :content="['UniappUI', userId]" :font-size="16" :rotate="-30" :full-page="false">
        <view class="doc">
          <text class="doc__title">机密文件 - 2026Q2 计划</text>
          <text class="doc__paragraph">本文件涉及敏感商业信息，仅限内部传阅。任何截图、复印、转发行为均需经审批。</text>
          <text class="doc__paragraph">第一章：业务目标</text>
          <text class="doc__paragraph">2026 年第二季度核心 KPI...</text>
          <text class="doc__paragraph">第二章：执行计划</text>
          <text class="doc__paragraph">每月里程碑：4 月底完成 X、5 月底完成 Y、6 月底完成 Z...</text>
        </view>
      </ui-watermark>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { WatermarkInstance, WatermarkFontWeight } from "@/uni_modules/uniapp-ui/ui-watermark"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Watermark 水印" },
})

const gapPresets = [10, 24, 80]
const gapDemo = ref(24)

const rotatePresets = [-45, 0, 45]
const rotateDemo = ref(-22)

const opacityPresets = [0.3, 0.6, 1]
const opacityDemo = ref(1)

const fontSizePresets = [12, 14, 20]
const fontSizeDemo = ref(14)

const colorPresets = [
  { label: "灰", value: "rgba(0, 0, 0, 0.15)" },
  { label: "红", value: "rgba(255, 0, 0, 0.2)" },
  { label: "绿", value: "rgba(0, 128, 0, 0.2)" },
]
const colorDemo = ref("rgba(0, 0, 0, 0.15)")

const weightPresets: WatermarkFontWeight[] = ["normal", "light", "bold"]
const weightDemo = ref<WatermarkFontWeight>("normal")

const wmRef = ref<WatermarkInstance>()
const randomContent = ref("初始内容")
function changeContent() {
  randomContent.value = `更新-${Math.floor(Math.random() * 1000)}`
}

const fullPageOn = ref(false)

const userId = "user-9527"
</script>

<style lang="scss" scoped>
.wm-content {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-xl);
  background: var(--ui-color-background);
  min-height: 200rpx;
  align-items: center;
  border-radius: var(--ui-radius-md);
  flex-direction: column;
  justify-content: center;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
    text-align: center;
  }
}

.wm-tip {
  color: var(--ui-color-text-tertiary);
  font-size: var(--ui-font-size-xs);
}

.doc {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-xl);
  background: var(--ui-color-background);
  min-height: 400rpx;
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__paragraph {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
    line-height: var(--ui-line-height-normal);
  }
}
</style>
