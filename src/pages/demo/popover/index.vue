<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法">
      <demo-block>
        <ui-popover v-model:show="show1" :actions="baseActions" @select="onSelect">
          <ui-button type="primary">点击弹出</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 弹出位置 -->
    <demo-section title="弹出位置">
      <demo-block :cols="3" :gap="24">
        <ui-popover v-model:show="showTop" :actions="baseActions" placement="top">
          <ui-button size="small">上方</ui-button>
        </ui-popover>
        <ui-popover v-model:show="showBottom" :actions="baseActions" placement="bottom">
          <ui-button size="small">下方</ui-button>
        </ui-popover>
        <ui-popover v-model:show="showLeft" :actions="baseActions" placement="left">
          <ui-button size="small">左侧</ui-button>
        </ui-popover>
      </demo-block>
      <demo-block :cols="3" :gap="24" class="mt-16">
        <ui-popover v-model:show="showRight" :actions="baseActions" placement="right">
          <ui-button size="small">右侧</ui-button>
        </ui-popover>
        <ui-popover v-model:show="showTopStart" :actions="baseActions" placement="top-start">
          <ui-button size="small">上左</ui-button>
        </ui-popover>
        <ui-popover v-model:show="showTopEnd" :actions="baseActions" placement="top-end">
          <ui-button size="small">上右</ui-button>
        </ui-popover>
      </demo-block>
      <demo-block :cols="2" :gap="24" class="mt-16">
        <ui-popover v-model:show="showBottomStart" :actions="baseActions" placement="bottom-start">
          <ui-button size="small">下左</ui-button>
        </ui-popover>
        <ui-popover v-model:show="showBottomEnd" :actions="baseActions" placement="bottom-end">
          <ui-button size="small">下右</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 主题风格 -->
    <demo-section title="主题风格">
      <demo-block :cols="2" :gap="24">
        <ui-popover v-model:show="showLight" :actions="baseActions" theme="light">
          <ui-button>浅色风格</ui-button>
        </ui-popover>
        <ui-popover v-model:show="showDark" :actions="baseActions" theme="dark">
          <ui-button>深色风格</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 操作菜单 -->
    <demo-section title="操作菜单">
      <demo-block>
        <ui-popover v-model:show="showActions" :actions="iconActions" @select="onSelect">
          <ui-button type="primary">带图标选项</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 禁用选项 -->
    <demo-section title="禁用选项">
      <demo-block>
        <ui-popover v-model:show="showDisabled" :actions="disabledActions" @select="onSelect">
          <ui-button type="primary">禁用选项</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 显示遮罩 -->
    <demo-section title="显示遮罩">
      <demo-block>
        <ui-popover v-model:show="showOverlay" :actions="baseActions" :overlay="true" @select="onSelect">
          <ui-button type="primary">显示遮罩层</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 关闭行为 -->
    <demo-section title="关闭行为">
      <demo-block :cols="2" :gap="24">
        <ui-popover v-model:show="showNoCloseOnAction" :actions="baseActions" :close-on-click-action="false" @select="onSelectNoClose">
          <ui-button>点击选项不关闭</ui-button>
        </ui-popover>
        <ui-popover v-model:show="showNoCloseOutside" :actions="baseActions" :close-on-click-outside="false" :overlay="true">
          <ui-button>点击外部不关闭</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 自定义内容 -->
    <demo-section title="自定义内容">
      <demo-block>
        <ui-popover v-model:show="showCustom">
          <ui-button type="primary">自定义内容</ui-button>
          <template #content>
            <view class="custom-content">
              <view class="custom-content__header">自定义标题</view>
              <view class="custom-content__body"> 这是自定义的弹出内容，可以放置任意元素。 </view>
              <view class="custom-content__footer">
                <ui-button size="small" type="primary" @click="showCustom = false">确定</ui-button>
              </view>
            </view>
          </template>
        </ui-popover>
      </demo-block>
    </demo-section>

    <!-- 事件处理 -->
    <demo-section title="事件处理">
      <demo-block>
        <ui-popover v-model:show="showEvent" :actions="baseActions" @select="onEventSelect" @open="onOpen" @close="onClose" @opened="onOpened" @closed="onClosed">
          <ui-button type="primary">监听事件</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { PopoverAction } from "@/uni_modules/uniapp-ui/ui-popover"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Popover 气泡弹出框" },
})

const toast = useToast()

// 基础用法
const show1 = ref(false)

// 弹出位置
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showTopStart = ref(false)
const showTopEnd = ref(false)
const showBottomStart = ref(false)
const showBottomEnd = ref(false)

// 主题风格
const showLight = ref(false)
const showDark = ref(false)

// 操作菜单
const showActions = ref(false)

// 禁用选项
const showDisabled = ref(false)

// 显示遮罩
const showOverlay = ref(false)

// 关闭行为
const showNoCloseOnAction = ref(false)
const showNoCloseOutside = ref(false)

// 自定义内容
const showCustom = ref(false)

// 事件处理
const showEvent = ref(false)

// 基础操作项
const baseActions: PopoverAction[] = [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }]

// 带图标的操作项
const iconActions: PopoverAction[] = [
  { text: "复制", icon: "copy" },
  { text: "编辑", icon: "edit" },
  { text: "分享", icon: "share" },
  { text: "删除", icon: "delete" },
]

// 禁用选项
const disabledActions: PopoverAction[] = [{ text: "选项一" }, { text: "选项二", disabled: true }, { text: "选项三" }]

// 选择回调
function onSelect(action: PopoverAction, index: number) {
  toast.success(`选择了: ${action.text}`)
}

// 选择但不关闭
function onSelectNoClose(action: PopoverAction, index: number) {
  toast.text(`选择了: ${action.text}，需手动关闭`)
}

// 事件选择
function onEventSelect(action: PopoverAction, index: number) {
  toast.success(`选择了: ${action.text}`)
}

// 打开事件
function onOpen() {
  console.log("Popover open")
}

// 打开完成事件
function onOpened() {
  toast.text("气泡已打开")
}

// 关闭事件
function onClose() {
  console.log("Popover close")
}

// 关闭完成事件
function onClosed() {
  toast.text("气泡已关闭")
}
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16rpx;
}

.custom-content {
  width: 400rpx;
  padding: 24rpx;

  &__header {
    color: #333;
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 16rpx;
  }

  &__body {
    color: #666;
    font-size: 28rpx;
    line-height: 1.5;
    margin-bottom: 24rpx;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
