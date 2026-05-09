<template>
  <demo-page>
    <demo-section title="海报生成" desc="使用 Canvas 绘制可保存到相册的分享海报">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">{{ statusText }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="切换模板">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="(t, i) in templates" :key="t.label" size="small" :type="templateIndex === i ? 'primary' : 'default'" @click="templateIndex = i">{{ t.label }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="操作">
      <demo-block :cols="2" :gap="12">
        <ui-button type="primary" :loading="loading" @click="generate">生成海报</ui-button>
        <ui-button :disabled="!posterUrl" @click="save">保存到相册</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="预览">
      <demo-block class="preview-area">
        <image v-if="posterUrl" :src="posterUrl" mode="aspectFit" class="preview-img" />
        <view v-else class="preview-placeholder">
          <ui-icon name="photo-o" size="80rpx" color="text-tertiary" />
          <text class="preview-placeholder__text">点击"生成海报"</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="使用说明">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-tip">• 通过声明式 items 描述 (text / image / rect / line)</text>
        <text class="demo-tip">• 异步加载网络图后渲染到 canvas</text>
        <text class="demo-tip">• 返回 tempFilePath，调用方控制展示</text>
        <text class="demo-tip">• H5 端走 previewImage 长按保存；小程序/App 写入相册</text>
      </demo-block>
    </demo-section>

    <ui-poster ref="posterRef" :width="700" :height="900" @ready="onReady" />
  </demo-page>
</template>

<script setup lang="ts">
import type { PosterDrawItem, PosterInstance } from "@/uni_modules/uniapp-ui/ui-poster"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Poster 海报" },
})

const toast = useToast()

const posterRef = ref<PosterInstance>()
const posterUrl = ref("")
const loading = ref(false)
const isReady = ref(false)
const templateIndex = ref(0)

// 海报模板：商品分享 / 活动 / 简介卡片
const templates: Array<{ label: string; build: () => PosterDrawItem[] }> = [
  {
    label: "商品分享",
    build: () => [
      // 米白底，暖色调
      { type: "rect", style: { left: 0, top: 0, width: 700, height: 900, backgroundColor: "#fff8f0" } },

      // 顶部品牌条
      { type: "rect", style: { left: 0, top: 0, width: 700, height: 80, backgroundColor: "#1f1f1f" } },
      { type: "text", text: "TEALEAF · 茶事", style: { left: 350, top: 50, fontSize: 28, color: "#fff8f0", textAlign: "center", baseLine: "middle", fontWeight: "bold" } },

      // 角标 (优惠 tag)
      { type: "rect", style: { left: 480, top: 120, width: 180, height: 60, backgroundColor: "#ff4d4f", borderRadius: [30, 30, 30, 0] } },
      { type: "text", text: "立减 ¥100", style: { left: 570, top: 150, fontSize: 26, color: "#ffffff", textAlign: "center", baseLine: "middle", fontWeight: "bold" } },

      // 产品图占位 (大圆角 + 渐变模拟茶汤色)
      { type: "rect", style: { left: 80, top: 140, width: 380, height: 380, backgroundColor: "#a16207", gradientColor: "#fbbf24", gradientType: 2, borderRadius: 24, shadow: { offsetX: 0, offsetY: 8, blur: 20, color: "rgba(161,98,7,0.25)" } } },
      { type: "text", text: "夏限·茶礼", style: { left: 270, top: 320, fontSize: 56, color: "rgba(255,255,255,0.95)", textAlign: "center", baseLine: "middle", fontWeight: "bold" } },
      { type: "text", text: "S U M M E R   2 0 2 6", style: { left: 270, top: 380, fontSize: 22, color: "rgba(255,255,255,0.7)", textAlign: "center" } },

      // 商品名 + 副标题
      { type: "text", text: "夏季限定·手工茶点礼盒", style: { left: 60, top: 580, fontSize: 44, color: "#1f1f1f", fontWeight: "bold" } },
      { type: "text", text: "六款经典茶点 · 节令限定", style: { left: 60, top: 640, fontSize: 24, color: "#a8a29e" } },

      // 价格区 (划线原价 + 现价)
      { type: "text", text: "¥ 298", style: { left: 60, top: 700, fontSize: 26, color: "#a8a29e", lineThrough: true, baseLine: "middle" } },
      { type: "text", text: "¥ 198", style: { left: 200, top: 695, fontSize: 56, color: "#ff4d4f", fontWeight: "bold" } },
      { type: "text", text: ".00", style: { left: 380, top: 715, fontSize: 28, color: "#ff4d4f" } },

      // 分割线
      { type: "line", style: { left: 60, top: 780, endLeft: 640, endTop: 780, color: "#e7e5e4", width: 1, lineDash: [4, 4] } },

      // 底部说明 + 二维码占位
      { type: "rect", style: { left: 540, top: 800, width: 100, height: 100, backgroundColor: "#1f1f1f", borderRadius: 12 } },
      { type: "rect", style: { left: 555, top: 815, width: 70, height: 70, backgroundColor: "#fff8f0", borderRadius: 6 } },
      { type: "text", text: "扫码立即购买", style: { left: 60, top: 820, fontSize: 26, color: "#1f1f1f", fontWeight: "bold" } },
      { type: "text", text: "顺丰包邮 · 7 天退换", style: { left: 60, top: 860, fontSize: 22, color: "#78716c" } },
    ],
  },
  {
    label: "活动海报",
    build: () => [
      // 深色科技感底
      { type: "rect", style: { left: 0, top: 0, width: 700, height: 900, backgroundColor: "#0f172a" } },
      { type: "rect", style: { left: 0, top: 0, width: 700, height: 900, backgroundColor: "rgba(99,102,241,0.12)", gradientColor: "rgba(15,23,42,0)", gradientType: 2 } },

      // 装饰：右上角金色弧形
      { type: "rect", style: { left: 480, top: -120, width: 320, height: 320, backgroundColor: "#fbbf24", borderRadius: 160, opacity: 0.12 } },
      { type: "rect", style: { left: 540, top: -60, width: 200, height: 200, backgroundColor: "#fbbf24", borderRadius: 100, opacity: 0.18 } },

      // 顶部小标 (日期)
      { type: "rect", style: { left: 60, top: 80, width: 180, height: 50, backgroundColor: "rgba(251,191,36,0.15)", borderRadius: 25 } },
      { type: "text", text: "01.18 — 02.08", style: { left: 150, top: 105, fontSize: 22, color: "#fbbf24", textAlign: "center", baseLine: "middle", fontWeight: "bold" } },

      // 主标题：大数字 + 主文字
      { type: "text", text: "2026", style: { left: 60, top: 200, fontSize: 200, color: "#fbbf24", fontWeight: "bold" } },
      { type: "text", text: "新春大促", style: { left: 60, top: 400, fontSize: 80, color: "#ffffff", fontWeight: "bold" } },
      { type: "text", text: "F E S T I V A L   S A L E", style: { left: 60, top: 480, fontSize: 24, color: "rgba(255,255,255,0.5)" } },

      // 装饰线条 + 分隔
      { type: "line", style: { left: 60, top: 540, endLeft: 200, endTop: 540, color: "#fbbf24", width: 4 } },

      // 卖点 (3 列)
      { type: "text", text: "全场", style: { left: 60, top: 600, fontSize: 24, color: "rgba(255,255,255,0.6)" } },
      { type: "text", text: "5", style: { left: 60, top: 640, fontSize: 88, color: "#ffffff", fontWeight: "bold" } },
      { type: "text", text: "折起", style: { left: 130, top: 720, fontSize: 28, color: "#ffffff" } },

      { type: "text", text: "新人", style: { left: 280, top: 600, fontSize: 24, color: "rgba(255,255,255,0.6)" } },
      { type: "text", text: "立减", style: { left: 280, top: 640, fontSize: 36, color: "#ffffff", fontWeight: "bold" } },
      { type: "text", text: "¥ 50", style: { left: 280, top: 690, fontSize: 48, color: "#fbbf24", fontWeight: "bold" } },

      { type: "text", text: "大额", style: { left: 480, top: 600, fontSize: 24, color: "rgba(255,255,255,0.6)" } },
      { type: "text", text: "红包", style: { left: 480, top: 640, fontSize: 36, color: "#ffffff", fontWeight: "bold" } },
      { type: "text", text: "天天领", style: { left: 480, top: 690, fontSize: 48, color: "#fbbf24", fontWeight: "bold" } },

      // CTA 按钮
      { type: "rect", style: { left: 60, top: 800, width: 580, height: 80, backgroundColor: "#fbbf24", borderRadius: 40, shadow: { offsetX: 0, offsetY: 8, blur: 24, color: "rgba(251,191,36,0.4)" } } },
      { type: "text", text: "立即参与 →", style: { left: 350, top: 840, fontSize: 32, color: "#0f172a", textAlign: "center", baseLine: "middle", fontWeight: "bold" } },
    ],
  },
  {
    label: "简介卡片",
    build: () => [
      // 浅灰底
      { type: "rect", style: { left: 0, top: 0, width: 700, height: 900, backgroundColor: "#f1f5f9" } },

      // 主卡片 + 阴影
      { type: "rect", style: { left: 40, top: 60, width: 620, height: 780, backgroundColor: "#ffffff", borderRadius: 32, shadow: { offsetX: 0, offsetY: 12, blur: 32, color: "rgba(15,23,42,0.08)" } } },

      // 顶部 hero 区 (紫蓝渐变 + 圆形装饰)
      { type: "rect", style: { left: 40, top: 60, width: 620, height: 360, backgroundColor: "#6366f1", gradientColor: "#8b5cf6", gradientType: 1, borderRadius: [32, 32, 0, 0] } },
      { type: "rect", style: { left: 480, top: 80, width: 220, height: 220, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 110 } },
      { type: "rect", style: { left: 540, top: 140, width: 100, height: 100, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 50 } },

      // Logo 区
      { type: "rect", style: { left: 80, top: 120, width: 80, height: 80, backgroundColor: "#ffffff", borderRadius: 20 } },
      { type: "text", text: "U", style: { left: 120, top: 160, fontSize: 56, color: "#6366f1", textAlign: "center", baseLine: "middle", fontWeight: "bold" } },

      // 品牌名 + slogan
      { type: "text", text: "UniApp UI", style: { left: 80, top: 240, fontSize: 48, color: "#ffffff", fontWeight: "bold" } },
      { type: "text", text: "跨端 · 现代 · 高质量组件库", style: { left: 80, top: 300, fontSize: 24, color: "rgba(255,255,255,0.85)" } },
      { type: "text", text: "v1.0 · 已开源", style: { left: 80, top: 340, fontSize: 20, color: "rgba(255,255,255,0.6)" } },

      // 数据 stats 区 (3 列)
      { type: "text", text: "80", style: { left: 140, top: 470, fontSize: 56, color: "#0f172a", textAlign: "center", fontWeight: "bold" } },
      { type: "text", text: "+", style: { left: 195, top: 470, fontSize: 32, color: "#0f172a", fontWeight: "bold" } },
      { type: "text", text: "组件", style: { left: 140, top: 540, fontSize: 22, color: "#64748b", textAlign: "center" } },

      { type: "line", style: { left: 240, top: 470, endLeft: 240, endTop: 560, color: "#e2e8f0", width: 2 } },

      { type: "text", text: "3", style: { left: 350, top: 470, fontSize: 56, color: "#0f172a", textAlign: "center", fontWeight: "bold" } },
      { type: "text", text: "终端", style: { left: 350, top: 540, fontSize: 22, color: "#64748b", textAlign: "center" } },

      { type: "line", style: { left: 460, top: 470, endLeft: 460, endTop: 560, color: "#e2e8f0", width: 2 } },

      { type: "text", text: "MIT", style: { left: 560, top: 470, fontSize: 44, color: "#0f172a", textAlign: "center", fontWeight: "bold" } },
      { type: "text", text: "开源协议", style: { left: 560, top: 540, fontSize: 22, color: "#64748b", textAlign: "center" } },

      // 特性列表
      { type: "rect", style: { left: 80, top: 610, width: 8, height: 8, backgroundColor: "#6366f1", borderRadius: 4 } },
      { type: "text", text: "Vue 3 + TypeScript 全类型", style: { left: 110, top: 610, fontSize: 26, color: "#0f172a" } },

      { type: "rect", style: { left: 80, top: 660, width: 8, height: 8, backgroundColor: "#6366f1", borderRadius: 4 } },
      { type: "text", text: "H5 / 微信小程序 / App 多端一致", style: { left: 110, top: 660, fontSize: 26, color: "#0f172a" } },

      { type: "rect", style: { left: 80, top: 710, width: 8, height: 8, backgroundColor: "#6366f1", borderRadius: 4 } },
      { type: "text", text: "深浅色主题 + 全局 token 体系", style: { left: 110, top: 710, fontSize: 26, color: "#0f172a" } },

      // 底部 footer
      { type: "line", style: { left: 80, top: 770, endLeft: 620, endTop: 770, color: "#f1f5f9", width: 2 } },
      { type: "text", text: "uniapp-ui.com", style: { left: 80, top: 805, fontSize: 22, color: "#64748b" } },
      { type: "text", text: "@uniapp-ui", style: { left: 620, top: 805, fontSize: 22, color: "#64748b", textAlign: "right" } },
    ],
  },
]

const statusText = computed(() => {
  if (!isReady.value) return "Canvas 初始化中..."
  if (loading.value) return "正在生成..."
  if (posterUrl.value) return "生成成功，点击保存到相册"
  return "Canvas 已就绪，选择模板后点击生成"
})

function onReady() {
  isReady.value = true
}

async function generate() {
  if (!isReady.value) {
    toast.text("Canvas 初始化中")
    return
  }
  loading.value = true
  posterUrl.value = ""
  try {
    const url = await posterRef.value!.draw(templates[templateIndex.value].build())
    posterUrl.value = url
    toast.success("生成成功")
  } catch {
    toast.text("生成失败")
  } finally {
    loading.value = false
  }
}

async function save() {
  if (!posterUrl.value) return
  try {
    await posterRef.value!.save(posterUrl.value)
  } catch {
    // save() 内部已弹 modal 提示，这里不重复
  }
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
}

.demo-tip {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  line-height: 1.8;
}

.preview-area {
  display: flex;
  min-height: 600rpx;
  background: var(--ui-color-background-page);
  align-items: center;
  border-radius: var(--ui-radius-md);
  justify-content: center;
}

.preview-img {
  width: 100%;
  max-height: 700rpx;
}

.preview-placeholder {
  gap: 16rpx;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__text {
    color: var(--ui-color-text-tertiary);
    font-size: 26rpx;
  }
}
</style>
