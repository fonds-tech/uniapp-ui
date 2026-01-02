<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showBasicDialog">提示弹窗</ui-button>
        <ui-button type="primary" @click="showConfirmDialog">确认弹窗</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="圆角按钮">
      <demo-block>
        <ui-button @click="showRoundDialog">圆角按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="异步关闭">
      <demo-block>
        <ui-button @click="showAsyncDialog">异步关闭</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showNoTitleDialog">无标题</ui-button>
        <ui-button type="primary" @click="showLongDialog">长内容</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：内容对齐方式 -->
    <demo-section title="内容对齐">
      <demo-block :cols="3" :gap="16">
        <ui-button size="small" @click="showAlignDialog('left')">左对齐</ui-button>
        <ui-button size="small" @click="showAlignDialog('center')">居中</ui-button>
        <ui-button size="small" @click="showAlignDialog('right')">右对齐</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：按钮样式定制 -->
    <demo-section title="按钮样式">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showCustomButtonDialog">自定义按钮</ui-button>
        <ui-button @click="showReverseButtonDialog">按钮反转</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：遮罩层配置 -->
    <demo-section title="遮罩层配置">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showClickOverlayDialog">点击遮罩关闭</ui-button>
        <ui-button @click="showNoOverlayDialog">无遮罩</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：样式定制 -->
    <demo-section title="样式定制">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showCustomStyleDialog">自定义样式</ui-button>
        <ui-button @click="showCustomSizeDialog">自定义尺寸</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="组件调用">
      <demo-block>
        <ui-button type="primary" @click="showComponentDialog = true">组件方式</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：使用插槽 -->
    <demo-section title="自定义插槽">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showSlotDialog = true">自定义内容</ui-button>
        <ui-button type="primary" @click="showFooterSlotDialog = true">自定义底部</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block>
        <ui-button type="primary" @click="showEventDialog = true">监听事件</ui-button>
      </demo-block>
    </demo-section>

    <!-- Dialog Component 基础 -->
    <ui-dialog v-model:show="showComponentDialog" title="标题" message="这是通过组件方式调用的对话框" show-cancel-button />

    <!-- Dialog 自定义内容插槽 -->
    <ui-dialog v-model:show="showSlotDialog" title="自定义内容">
      <view class="custom-content">
        <ui-icon name="info" size="80rpx" color="primary" />
        <text class="custom-content__text">这是通过默认插槽自定义的内容区域</text>
        <ui-button type="primary" size="small" @click="showSlotDialog = false">我知道了</ui-button>
      </view>
    </ui-dialog>

    <!-- Dialog 自定义底部插槽 -->
    <ui-dialog v-model:show="showFooterSlotDialog" title="自定义底部">
      <text>这是弹窗内容</text>
      <template #footer>
        <view class="custom-footer">
          <ui-button type="default" size="small" @click="showFooterSlotDialog = false">取消</ui-button>
          <ui-button type="success" size="small" @click="showFooterSlotDialog = false">同意</ui-button>
          <ui-button type="primary" size="small" @click="showFooterSlotDialog = false">确认</ui-button>
        </view>
      </template>
    </ui-dialog>

    <!-- Dialog 事件处理 -->
    <ui-dialog
      v-model:show="showEventDialog"
      title="事件监听"
      message="点击按钮查看事件触发"
      show-cancel-button
      @open="onDialogOpen"
      @opened="onDialogOpened"
      @close="onDialogClose"
      @closed="onDialogClosed"
      @confirm="onDialogConfirm"
      @cancel="onDialogCancel"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast, useDialog } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Dialog 对话框" },
})

const { showDialog } = useDialog()
const toast = useToast()

// 组件方式调用的状态
const showComponentDialog = ref(false)
const showSlotDialog = ref(false)
const showFooterSlotDialog = ref(false)
const showEventDialog = ref(false)

// 基础用法
function showBasicDialog() {
  showDialog({
    title: "提示",
    message: "这是一个提示弹窗",
  })
}

function showConfirmDialog() {
  showDialog({
    title: "确认",
    message: "确定要执行此操作吗？",
    showCancelButton: true,
  })
}

// 圆角按钮
function showRoundDialog() {
  showDialog({
    title: "提示",
    message: "这是圆角按钮弹窗",
    theme: "round-button",
  })
}

// 异步关闭
function showAsyncDialog() {
  showDialog({
    title: "异步关闭",
    message: "点击确认后延迟1秒关闭",
    showCancelButton: true,
    beforeClose: (action) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(action === "confirm")
        }, 1000)
      })
    },
  })
}

// 自定义内容
function showNoTitleDialog() {
  showDialog({
    message: "这是一个没有标题的弹窗",
  })
}

function showLongDialog() {
  showDialog({
    title: "长内容",
    message: "这是一段很长的内容，用于测试对话框对长文本的显示效果。当内容过长时，对话框应该能够正确处理滚动或自适应高度。这里是更多的文字内容，让我们看看效果如何。",
    showCancelButton: true,
  })
}

// 内容对齐
function showAlignDialog(align: "left" | "center" | "right") {
  const alignText = { left: "左对齐", center: "居中对齐", right: "右对齐" }
  showDialog({
    title: alignText[align],
    message: "这段文字将按照指定的对齐方式显示。可以看到文字的对齐效果。",
    contentAlign: align,
  })
}

// 按钮样式定制
function showCustomButtonDialog() {
  showDialog({
    title: "自定义按钮",
    message: "可以自定义按钮的文字和颜色",
    showCancelButton: true,
    confirmButtonText: "好的",
    confirmButtonColor: "#07c160",
    cancelButtonText: "算了",
    cancelButtonColor: "#ee0a24",
  })
}

function showReverseButtonDialog() {
  showDialog({
    title: "按钮反转",
    message: "确认和取消按钮位置对调",
    showCancelButton: true,
    buttonReverse: true,
  })
}

// 遮罩层配置
function showClickOverlayDialog() {
  showDialog({
    title: "点击遮罩关闭",
    message: "点击遮罩层可以关闭弹窗",
    closeOnClickOverlay: true,
  })
}

function showNoOverlayDialog() {
  showDialog({
    title: "无遮罩",
    message: "这个弹窗没有遮罩层",
    overlay: false,
  })
}

// 样式定制
function showCustomStyleDialog() {
  showDialog({
    title: "自定义样式",
    message: "可以自定义弹窗的背景色和圆角",
    background: "#f0f9eb",
    borderRadius: 32,
  })
}

function showCustomSizeDialog() {
  showDialog({
    title: "自定义尺寸",
    message: "可以自定义弹窗的宽度和内边距",
    width: "70vw",
    padding: "40rpx",
  })
}

// 事件处理
function onDialogOpen() {
  console.log("Dialog opened")
}

function onDialogOpened() {
  toast.success("弹窗已打开")
}

function onDialogClose() {
  console.log("Dialog closing")
}

function onDialogClosed() {
  toast.text("弹窗已关闭")
}

function onDialogConfirm() {
  toast.success("点击了确认")
}

function onDialogCancel() {
  toast.fail("点击了取消")
}
</script>

<style lang="scss" scoped>
.custom-content {
  gap: 24rpx;
  display: flex;
  padding: 20rpx 0;
  align-items: center;
  flex-direction: column;

  &__text {
    color: #666;
    font-size: 28rpx;
    text-align: center;
  }
}

.custom-footer {
  gap: 16rpx;
  display: flex;
  padding: 24rpx;
  justify-content: space-around;
}
</style>
