<template>
  <demo-page>
    <ui-navbar
      ref="navbarRef"
      :title="currentScene.title"
      :show-back="currentScene.showBack"
      :back-text="currentScene.backText"
      :background="background"
      :title-color="titleColor"
      :title-size="titleSize"
      :title-weight="titleWeight"
      :center-title="centerTitle"
      :border-bottom="borderBottom"
      :padding="padding"
      :z-index="zIndex"
      :custom-back="useCustomBack ? onCustomBack : undefined"
      @back="onBack"
      @title-click="onTitleClick"
      @rect="onRect"
      @height="onHeight"
    >
      <template v-if="currentScene.left" #left>
        <view class="slot-row">
          <ui-icon v-for="ic in currentScene.left" :key="ic" :name="ic" size="40rpx" color="text-primary" />
        </view>
      </template>
      <template v-if="currentScene.right" #right>
        <view class="slot-row">
          <ui-icon v-for="ic in currentScene.right" :key="ic" :name="ic" size="40rpx" color="text-primary" />
        </view>
      </template>
    </ui-navbar>

    <demo-section title="基础用法" desc="顶部导航栏，自动撑开状态栏，标题居中由左右内容宽度自适应。" />

    <demo-section title="场景切换" desc="切换标题/返回按钮/左右 slot 组合">
      <demo-block direction="column" align="start" :gap="12">
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="(s, i) in scenes" :key="s.key" size="small" :type="current === i ? 'primary' : 'default'" @click="current = i">{{ s.label }}</ui-button>
        </demo-block>
        <text class="demo-text">{{ scenes[current].desc }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="背景色 (background)">
      <demo-block :cols="4" :gap="12">
        <ui-button size="small" :type="background === '' ? 'primary' : 'default'" @click="background = ''">默认</ui-button>
        <ui-button size="small" :type="background === 'primary' ? 'primary' : 'default'" @click="background = 'primary'">主色</ui-button>
        <ui-button size="small" :type="background === 'success' ? 'primary' : 'default'" @click="background = 'success'">成功</ui-button>
        <ui-button
          size="small"
          :type="background.startsWith('linear') ? 'primary' : 'default'"
          @click="background = 'linear-gradient(90deg, var(--ui-color-primary) 0%, var(--ui-color-success) 100%)'"
        >
          渐变
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="标题颜色 (titleColor)">
      <demo-block :cols="4" :gap="12">
        <ui-button size="small" :type="titleColor === '' ? 'primary' : 'default'" @click="titleColor = ''">默认</ui-button>
        <ui-button size="small" :type="titleColor === 'primary' ? 'primary' : 'default'" @click="titleColor = 'primary'">主色</ui-button>
        <ui-button size="small" :type="titleColor === 'danger' ? 'primary' : 'default'" @click="titleColor = 'danger'">危险</ui-button>
        <ui-button size="small" :type="titleColor === '#ffffff' ? 'primary' : 'default'" @click="titleColor = '#ffffff'">白色</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="标题字号 (titleSize)">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="s in titleSizeOptions" :key="String(s)" size="small" :type="titleSize === s ? 'primary' : 'default'" @click="titleSize = s">
          {{
            s === "" ? "默认" : s
          }}
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="标题粗细 (titleWeight)">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="w in titleWeightOptions" :key="String(w)" size="small" :type="titleWeight === w ? 'primary' : 'default'" @click="titleWeight = w">
          {{
            w === "" ? "默认" : w
          }}
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="标题居中 (centerTitle)" desc="开启后绝对定位真居中">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="centerTitle" />
        <text class="switch-label">{{ centerTitle ? "居中" : "居左" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="底部边框 (borderBottom)">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="borderBottom" />
        <text class="switch-label">{{ borderBottom ? "显示" : "隐藏" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="左右内边距 (padding)">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="p in paddingOptions" :key="String(p)" size="small" :type="padding === p ? 'primary' : 'default'" @click="padding = p">
          {{
            p === "" ? "默认" : p
          }}
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="层级 (z-index)">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="z in [50, 100, 999]" :key="z" size="small" :type="zIndex === z ? 'primary' : 'default'" @click="zIndex = z">{{ z }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义返回 (customBack)" desc="开启后点返回会触发 toast 而不真后退">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="useCustomBack" />
        <text class="switch-label">{{ useCustomBack ? "已劫持" : "默认行为" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显 (rect / height)" desc="场景切换/状态变化时高度自动上报">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">height: {{ navbarHeight }} px</text>
        <text class="demo-text">rect: {{ rectText }}</text>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法 (resize)" desc="ref 调用，强制重算尺寸">
      <demo-block :gap="12">
        <ui-button size="small" @click="onResize">手动触发 resize()</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="渐变背景" desc="开启 gradient 后导航栏背景随滚动联动，单独示例页">
      <demo-block :gap="12">
        <ui-button type="primary" size="small" @click="toGradientDemo">查看渐变示例</ui-button>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { NavbarInstance } from "@/uni_modules/uniapp-ui/ui-navbar"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationStyle: "custom", navigationBarTitleText: "Navbar 导航栏" },
})

const toast = useToast()

const scenes = [
  { key: "title", label: "纯标题", title: "标题", showBack: false, backText: "", left: null, right: null, desc: "无返回按钮，仅展示标题" },
  { key: "back", label: "返回 + 标题", title: "标题", showBack: true, backText: "", left: null, right: null, desc: "默认返回按钮 + 居中标题" },
  { key: "back-text", label: "返回带文字", title: "标题", showBack: true, backText: "返回", left: null, right: null, desc: "返回按钮 + 文字描述" },
  { key: "right", label: "标题 + 右侧", title: "消息列表", showBack: true, backText: "", left: null, right: ["search", "more"], desc: "返回 + 标题 + 右侧操作图标" },
  { key: "left-right", label: "左右 slot", title: "首页", showBack: false, backText: "", left: ["scan"], right: ["search", "bell"], desc: "首页常见双侧操作布局" },
  { key: "long", label: "长标题省略", title: "这是一个很长很长很长的标题会自动省略", showBack: true, backText: "", left: null, right: ["more"], desc: "长标题自动 ellipsis" },
] as const

const titleSizeOptions = ["", "28rpx", "32rpx", "40rpx"] as const
const titleWeightOptions = ["", 400, 600, 800] as const
const paddingOptions = ["", "0rpx", "20rpx", "40rpx"] as const

const current = ref(0)
const background = ref("")
const titleColor = ref("")
const titleSize = ref<string>("")
const titleWeight = ref<number | string>("")
const centerTitle = ref(true)
const borderBottom = ref(false)
const padding = ref<string>("")
const zIndex = ref(100)
const useCustomBack = ref(false)

const navbarHeight = ref(0)
const rectText = ref("尚未触发")
const eventLog = ref("点击导航栏触发事件")
const navbarRef = ref<NavbarInstance>()

const currentScene = computed(() => scenes[current.value])

function onBack() {
  if (useCustomBack.value) return
  eventLog.value = "触发 back 事件"
  toast.text("点击了返回按钮")
}

function onCustomBack() {
  eventLog.value = "触发 customBack"
  toast.success("已拦截返回")
}

function onTitleClick() {
  eventLog.value = "触发 titleClick 事件"
  toast.text("点击了标题")
}

function onHeight(h: number) {
  navbarHeight.value = Math.round(h)
}

function onRect(rect: UniApp.NodeInfo) {
  rectText.value = `top=${Math.round(rect.top ?? 0)}, height=${Math.round(rect.height ?? 0)}`
}

function onResize() {
  navbarRef.value?.resize()
  toast.text("已触发 resize()")
}

function toGradientDemo() {
  uni.navigateTo({ url: "/pages/demo/navbar-gradient/index" })
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  word-break: break-all;
}

.switch-label {
  color: var(--ui-color-text);
  font-size: 26rpx;
  margin-left: 12rpx;
}

.slot-row {
  gap: 24rpx;
  display: flex;
  align-items: center;
}
</style>
