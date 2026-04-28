<template>
  <demo-page>
    <ui-dialog ref="globalDialogRef" />

    <demo-section title="基础用法">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showBasicDialog">提示弹窗</ui-button>
        <ui-button type="primary" @click="showConfirmDialog">确认弹窗</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="Promise API（alert / confirm）">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="callAlert">alert()</ui-button>
        <ui-button @click="callConfirm">confirm()</ui-button>
      </demo-block>
      <text v-if="promiseResult" class="demo-text">{{ promiseResult }}</text>
    </demo-section>

    <demo-section title="自定义圆角">
      <demo-block>
        <ui-button @click="showRoundDialog">borderRadius=24rpx</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="异步关闭">
      <demo-block>
        <ui-button @click="showAsyncDialog">点确认延迟 1 秒关闭</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showNoTitleDialog">无标题</ui-button>
        <ui-button type="primary" @click="showLongDialog">长内容</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="内容对齐">
      <demo-block :cols="3" :gap="16">
        <ui-button size="small" @click="showAlignDialog('left')">左对齐</ui-button>
        <ui-button size="small" @click="showAlignDialog('center')">居中</ui-button>
        <ui-button size="small" @click="showAlignDialog('right')">右对齐</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="按钮样式">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showCustomButtonDialog">自定义按钮</ui-button>
        <ui-button @click="showReverseButtonDialog">按钮反转</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="遮罩层配置">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showClickOverlayDialog">点击遮罩关闭</ui-button>
        <ui-button @click="showNoOverlayDialog">无遮罩</ui-button>
      </demo-block>
    </demo-section>

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

    <demo-section title="自定义插槽">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showSlotDialog = true">自定义内容</ui-button>
        <ui-button type="primary" @click="showFooterSlotDialog = true">自定义底部</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="事件监听">
      <demo-block direction="column" :gap="12">
        <ui-button type="primary" @click="showEventDialog = true">触发事件</ui-button>
        <view class="event-list">
          <text v-for="(log, index) in eventLogs" :key="index" class="event-text">{{ log }}</text>
        </view>
      </demo-block>
    </demo-section>

    <ui-dialog v-model:show="showComponentDialog" title="标题" content="这是通过组件方式调用的对话框" show-cancel-button />

    <ui-dialog v-model:show="showSlotDialog" title="自定义内容">
      <view class="custom-content">
        <ui-icon name="info" size="80rpx" color="primary" />
        <text class="custom-content__text">这是通过默认插槽自定义的内容区域</text>
        <ui-button type="primary" size="small" @click="showSlotDialog = false">我知道了</ui-button>
      </view>
    </ui-dialog>

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

    <ui-dialog
      v-model:show="showEventDialog"
      title="事件监听"
      content="点击按钮查看事件触发"
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
import type { DialogInstance } from "@/uni_modules/uniapp-ui"
import { useDialog, provideDialog } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Dialog 对话框" },
})

const globalDialogRef = ref<DialogInstance | null>(null)

onMounted(() => {
  if (globalDialogRef.value) {
    provideDialog(globalDialogRef)
  }
})

const dialog = useDialog()

const showComponentDialog = ref(false)
const showSlotDialog = ref(false)
const showFooterSlotDialog = ref(false)
const showEventDialog = ref(false)

const promiseResult = ref("")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

// 基础用法
function showBasicDialog() {
  dialog.show({
    title: "提示",
    content: "这是一个提示弹窗",
  })
}

function showConfirmDialog() {
  dialog.show({
    title: "确认",
    content: "确定要执行此操作吗？",
    showCancelButton: true,
  })
}

// Promise API
async function callAlert() {
  await dialog.alert({
    title: "提示",
    content: "alert 是 Promise 风格，仅含确定按钮",
  })
  promiseResult.value = "alert() resolved"
}

async function callConfirm() {
  const ok = await dialog.confirm({
    title: "确认",
    content: "confirm 返回 Promise<boolean>，确定 true / 取消 false",
  })
  promiseResult.value = `confirm() = ${ok}`
}

// 圆角
function showRoundDialog() {
  dialog.show({
    title: "提示",
    content: "borderRadius 自定义为 24rpx",
    borderRadius: "24rpx",
  })
}

// 异步关闭
function showAsyncDialog() {
  dialog.show({
    title: "异步关闭",
    content: "点击确认后延迟 1 秒关闭",
    showCancelButton: true,
    asyncClose: true,
    onConfirm: (next) => {
      setTimeout(() => {
        next?.close()
      }, 1000)
    },
  })
}

// 自定义内容
function showNoTitleDialog() {
  dialog.show({
    content: "这是一个没有标题的弹窗",
  })
}

function showLongDialog() {
  dialog.show({
    title: "长内容",
    content: "这是一段很长的内容，用于测试对话框对长文本的显示效果。当内容过长时，对话框应该能够正确处理滚动或自适应高度。这里是更多的文字内容，让我们看看效果如何。",
    showCancelButton: true,
  })
}

// 内容对齐
function showAlignDialog(align: "left" | "center" | "right") {
  const alignText = { left: "左对齐", center: "居中对齐", right: "右对齐" }
  dialog.show({
    title: alignText[align],
    content: "这段文字将按照指定的对齐方式显示。可以看到文字的对齐效果。",
    contentAlign: align,
  })
}

// 按钮样式（用 token 名）
function showCustomButtonDialog() {
  dialog.show({
    title: "自定义按钮",
    content: "可以自定义按钮的文字和颜色",
    showCancelButton: true,
    confirmButtonText: "好的",
    confirmButtonColor: "success",
    cancelButtonText: "算了",
    cancelButtonColor: "danger",
  })
}

function showReverseButtonDialog() {
  dialog.show({
    title: "按钮反转",
    content: "确认和取消按钮位置对调",
    showCancelButton: true,
    buttonReverse: true,
  })
}

// 遮罩层
function showClickOverlayDialog() {
  dialog.show({
    title: "点击遮罩关闭",
    content: "点击遮罩层可以关闭弹窗",
    closeOnClickOverlay: true,
  })
}

function showNoOverlayDialog() {
  dialog.show({
    title: "无遮罩",
    content: "这个弹窗没有遮罩层",
    overlay: false,
  })
}

// 样式定制（用 token）
function showCustomStyleDialog() {
  dialog.show({
    title: "自定义样式",
    content: "可以自定义弹窗的背景色和圆角",
    background: "var(--ui-color-success-light)",
    borderRadius: 32,
  })
}

function showCustomSizeDialog() {
  dialog.show({
    title: "自定义尺寸",
    content: "可以自定义弹窗的宽度和内边距",
    width: "70vw",
    padding: "40rpx",
  })
}

// 事件
function onDialogOpen() {
  addEventLog("open")
}
function onDialogOpened() {
  addEventLog("opened")
}
function onDialogClose() {
  addEventLog("close")
}
function onDialogClosed() {
  addEventLog("closed")
}
function onDialogConfirm() {
  addEventLog("confirm")
}
function onDialogCancel() {
  addEventLog("cancel")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-top: 8rpx;
}

.event-list {
  gap: 4rpx;
  width: 100%;
  display: flex;
  padding: 16rpx;
  background: var(--ui-color-background-page);
  max-height: 250rpx;
  overflow-y: auto;
  border-radius: 8rpx;
  flex-direction: column;
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}

.custom-content {
  gap: 24rpx;
  display: flex;
  padding: 20rpx 0;
  align-items: center;
  flex-direction: column;

  &__text {
    color: var(--ui-color-text-secondary);
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
