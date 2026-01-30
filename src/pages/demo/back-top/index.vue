<template>
  <demo-page>
    <demo-section title="基础用法" desc="向下滚动页面，右下角会出现返回顶部按钮" />

    <demo-section title="scrollTop 滚动距离">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">不传则自动监听页面滚动，传入则使用外部滚动位置</text>
        <text class="demo-text">当前模式: 自动监听</text>
      </demo-block>
    </demo-section>

    <demo-section title="offset 显示阈值">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">滚动高度达到此值时显示按钮</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentOffset = '100rpx'">100rpx</ui-button>
          <ui-button size="small" @click="currentOffset = '200rpx'">200rpx</ui-button>
          <ui-button size="small" @click="currentOffset = '400rpx'">400rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentOffset }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="right 右侧距离">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">按钮距离页面右侧的距离</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentRight = '20rpx'">20rpx</ui-button>
          <ui-button size="small" @click="currentRight = '40rpx'">40rpx</ui-button>
          <ui-button size="small" @click="currentRight = '80rpx'">80rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentRight }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="bottom 底部距离">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">按钮距离页面底部的距离</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentBottom = '100rpx'">100rpx</ui-button>
          <ui-button size="small" @click="currentBottom = '200rpx'">200rpx</ui-button>
          <ui-button size="small" @click="currentBottom = '300rpx'">300rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentBottom }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="duration 过渡时间">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">返回顶部的动画过渡时间（毫秒）</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentDuration = 100">100ms</ui-button>
          <ui-button size="small" @click="currentDuration = 300">300ms</ui-button>
          <ui-button size="small" @click="currentDuration = 500">500ms</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentDuration }}ms</text>
      </demo-block>
    </demo-section>

    <demo-section title="background 背景颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">按钮的背景颜色</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentBackground = undefined">默认</ui-button>
          <ui-button size="small" @click="currentBackground = '#1989fa'">蓝色</ui-button>
          <ui-button size="small" @click="currentBackground = '#07c160'">绿色</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentBackground || "primary (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="borderRadius 圆角">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">按钮的圆角值</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentBorderRadius = undefined">默认</ui-button>
          <ui-button size="small" @click="currentBorderRadius = '16rpx'">16rpx</ui-button>
          <ui-button size="small" @click="currentBorderRadius = '50%'">50%</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentBorderRadius || "round (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="icon 图标名称">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">图标名称或图片链接</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentIcon = undefined">默认</ui-button>
          <ui-button size="small" @click="currentIcon = 'rocket'">rocket</ui-button>
          <ui-button size="small" @click="currentIcon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png'">图片</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentIcon || "back-top (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="iconColor 图标颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">图标的颜色</text>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="currentIconColor = undefined">默认</ui-button>
          <ui-button size="small" @click="currentIconColor = '#ff5722'">橙色</ui-button>
          <ui-button size="small" @click="currentIconColor = '#ffeb3b'">黄色</ui-button>
          <ui-button size="small" @click="currentIconColor = '#4caf50'">绿色</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentIconColor || "#fff (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="iconSize 图标大小">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">图标的大小</text>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="currentIconSize = undefined">默认</ui-button>
          <ui-button size="small" @click="currentIconSize = '32rpx'">32rpx</ui-button>
          <ui-button size="small" @click="currentIconSize = '48rpx'">48rpx</ui-button>
          <ui-button size="small" @click="currentIconSize = '56rpx'">56rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentIconSize || "40rpx (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="iconWeight 图标粗细">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">图标的粗细</text>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" @click="currentIconWeight = undefined">默认</ui-button>
          <ui-button size="small" @click="currentIconWeight = 'bold'">加粗</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentIconWeight || "默认" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="text 按钮文字">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">按钮显示的文字</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentText = ''">无</ui-button>
          <ui-button size="small" @click="currentText = '顶部'">顶部</ui-button>
          <ui-button size="small" @click="currentText = 'TOP'">TOP</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentText || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="textColor 文字颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">文字的颜色</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentTextColor = undefined">默认</ui-button>
          <ui-button size="small" @click="currentTextColor = '#ffeb3b'">黄色</ui-button>
          <ui-button size="small" @click="currentTextColor = '#4caf50'">绿色</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentTextColor || "#fff (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="textSize 文字大小">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">文字的大小</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentTextSize = undefined">默认</ui-button>
          <ui-button size="small" @click="currentTextSize = '16rpx'">16rpx</ui-button>
          <ui-button size="small" @click="currentTextSize = '24rpx'">24rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentTextSize || "20rpx (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="textWeight 文字粗细">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">文字的粗细</text>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" @click="currentTextWeight = undefined">默认</ui-button>
          <ui-button size="small" @click="currentTextWeight = 'bold'">加粗</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentTextWeight || "默认" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="size 按钮尺寸">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">按钮的尺寸（宽高相等）</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentSize = undefined">默认</ui-button>
          <ui-button size="small" @click="currentSize = '60rpx'">60rpx</ui-button>
          <ui-button size="small" @click="currentSize = '100rpx'">100rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentSize || "80rpx (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="width/height 宽高">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">单独设置宽高（优先于 size）</text>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" @click="resetWidthHeight">默认</ui-button>
          <ui-button size="small" @click="setWidthHeight">120x80</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentWidth ? `${currentWidth} x ${currentHeight}` : "使用 size" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="transition 过渡动画">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">按钮显示/隐藏的过渡动画</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentTransition = undefined">fade</ui-button>
          <ui-button size="small" @click="currentTransition = 'slide-up'">slide-up</ui-button>
          <ui-button size="small" @click="currentTransition = 'zoom-in'">zoom-in</ui-button>
        </demo-block>
        <text class="demo-text">当前: {{ currentTransition || "fade (默认)" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="click 事件">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ clickLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section v-for="i in 20" :key="i" :title="`占位内容 ${i}`" desc="这是一段占位内容，用于演示滚动效果" />

    <ui-back-top
      :offset="currentOffset"
      :right="currentRight"
      :bottom="currentBottom"
      :z-index="currentZIndex"
      :duration="currentDuration"
      :background="currentBackground"
      :border-radius="currentBorderRadius"
      :icon="currentIcon"
      :icon-color="currentIconColor"
      :icon-size="currentIconSize"
      :icon-weight="currentIconWeight"
      :text="currentText"
      :text-color="currentTextColor"
      :text-size="currentTextSize"
      :text-weight="currentTextWeight"
      :size="currentSize"
      :width="currentWidth"
      :height="currentHeight"
      :transition="currentTransition"
      @click="onBackTopClick"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "BackTop 返回顶部" },
})

const toast = useToast()

// Props 状态
const currentOffset = ref("200rpx")
const currentRight = ref("40rpx")
const currentBottom = ref("200rpx")
const currentZIndex = ref(999)
const currentDuration = ref(200)
const currentBackground = ref<string | undefined>(undefined)
const currentBorderRadius = ref<string | undefined>(undefined)
const currentIcon = ref<string | undefined>(undefined)
const currentIconColor = ref<string | undefined>(undefined)
const currentIconSize = ref<string | undefined>(undefined)
const currentIconWeight = ref<string | undefined>(undefined)
const currentText = ref("")
const currentTextColor = ref<string | undefined>(undefined)
const currentTextSize = ref<string | undefined>(undefined)
const currentTextWeight = ref<string | undefined>(undefined)
const currentSize = ref<string | undefined>(undefined)
const currentWidth = ref<string | undefined>(undefined)
const currentHeight = ref<string | undefined>(undefined)
const currentTransition = ref<"fade" | "slide-up" | "zoom-in" | undefined>(undefined)

// 点击日志
const clickLog = ref("点击返回顶部按钮触发 click 事件")

// 宽高设置
function setWidthHeight() {
  currentWidth.value = "120rpx"
  currentHeight.value = "80rpx"
}

function resetWidthHeight() {
  currentWidth.value = undefined
  currentHeight.value = undefined
}

// 事件处理
function onBackTopClick() {
  clickLog.value = `触发 click 事件，时间: ${new Date().toLocaleTimeString()}`
  toast.success("返回顶部")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

:deep(.my-back-top) {
  border: 2rpx solid #fff;
}
</style>
