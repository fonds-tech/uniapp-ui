<template>
  <demo-page>
    <demo-section title="基础用法" desc="左滑显示操作按钮">
      <ui-swipe-cell>
        <ui-cell title="收件箱" value="左滑试试" :border="false" />
        <template #right>
          <view class="action action--danger">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <demo-section title="双向操作" desc="左右两侧均可显示操作">
      <ui-swipe-cell>
        <ui-cell title="文章标题" value="左右都可滑" :border="false" />
        <template #left>
          <view class="action action--primary">置顶</view>
        </template>
        <template #right>
          <view class="action action--warning">收藏</view>
          <view class="action action--danger">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <demo-section title="阈值 threshold" desc="切换打开触发比例（0-1）">
      <demo-block direction="column" :gap="16">
        <ui-swipe-cell :threshold="threshold">
          <ui-cell title="阈值演示" :value="`当前 ${threshold}`" :border="false" />
          <template #right>
            <view class="action action--danger">删除</view>
          </template>
        </ui-swipe-cell>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="t in thresholdPresets" :key="t" size="small" :type="threshold === t ? 'primary' : 'default'" @click="threshold = t">
            {{ t }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="禁用 disabled" desc="切换开关控制能否滑动">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" :type="!disabled ? 'primary' : 'default'" @click="disabled = false">启用</ui-button>
          <ui-button size="small" :type="disabled ? 'primary' : 'default'" @click="disabled = true">禁用</ui-button>
        </demo-block>
        <ui-swipe-cell :disabled="disabled">
          <ui-cell title="禁用滑动" :value="disabled ? '当前禁用' : '可滑动'" :border="false" />
          <template #right>
            <view class="action action--danger">删除</view>
          </template>
        </ui-swipe-cell>
      </demo-block>
    </demo-section>

    <demo-section title="自定义宽度" desc="left-width / right-width 显式指定">
      <ui-swipe-cell left-width="200rpx" right-width="300rpx">
        <ui-cell title="精确宽度" value="左 200 右 300" :border="false" />
        <template #left>
          <view class="action action--primary">收藏</view>
        </template>
        <template #right>
          <view class="action action--warning">编辑</view>
          <view class="action action--danger">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <demo-section title="异步关闭 before-close" desc="返回 false / Promise<false> 阻止关闭">
      <ui-swipe-cell :before-close="beforeClose">
        <ui-cell title="异步确认" value="点击删除按钮确认" :border="false" />
        <template #right>
          <view class="action action--danger" @click="onAsyncDelete">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <demo-section title="实例方法" desc="open / close / isOpen 编程式控制">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="cellRef?.open('left')">open(left)</ui-button>
          <ui-button size="small" @click="cellRef?.open('right')">open(right)</ui-button>
          <ui-button size="small" @click="cellRef?.close()">close()</ui-button>
        </demo-block>
        <ui-swipe-cell ref="cellRef">
          <ui-cell title="编程式控制" value="试试按钮" :border="false" />
          <template #left>
            <view class="action action--primary">收藏</view>
          </template>
          <template #right>
            <view class="action action--danger">删除</view>
          </template>
        </ui-swipe-cell>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="open / close / click 实时日志">
      <demo-block direction="column" :gap="12">
        <view class="event-log">{{ eventLog }}</view>
        <ui-swipe-cell name="event-demo" @open="onOpen" @close="onClose" @click="onClick">
          <ui-cell title="事件演示" value="滑/点都试试" :border="false" />
          <template #right>
            <view class="action action--danger">操作</view>
          </template>
        </ui-swipe-cell>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 消息列表" desc="互斥展开 + 多操作按钮">
      <view class="list-card">
        <ui-swipe-cell v-for="(msg, idx) in messages" :key="msg.id" :ref="(el) => (msgRefs[idx] = el as SwipeCellInstance)" :name="msg.id" @open="onMsgOpen(idx)" @click="(p) => onMsgClick(msg, p)">
          <view class="msg">
            <view class="msg__avatar" :style="{ background: msg.color }">
              <text>{{ msg.name[0] }}</text>
            </view>
            <view class="msg__body">
              <text class="msg__name">{{ msg.name }}</text>
              <text class="msg__last">{{ msg.last }}</text>
            </view>
            <text class="msg__time">{{ msg.time }}</text>
          </view>
          <template #right>
            <view class="action action--info" @click.stop="toggleRead(msg)">{{ msg.unread ? "已读" : "未读" }}</view>
            <view class="action action--danger" @click.stop="deleteMsg(idx)">删除</view>
          </template>
        </ui-swipe-cell>
      </view>
    </demo-section>

    <demo-section title="综合 · 收藏夹" desc="左滑取消收藏 + 双滑确认">
      <view class="list-card">
        <ui-swipe-cell v-for="(fav, idx) in favorites" :key="fav.id" :before-close="favBeforeClose">
          <view class="fav">
            <ui-image :src="fav.cover" width="96rpx" height="96rpx" radius="12rpx" />
            <view class="fav__body">
              <text class="fav__title">{{ fav.title }}</text>
              <text class="fav__desc">{{ fav.desc }}</text>
            </view>
          </view>
          <template #right>
            <view class="action action--danger" @click.stop="removeFavorite(idx)">取消收藏</view>
          </template>
        </ui-swipe-cell>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SwipeCellInstance, SwipeCellBeforeCloseParams } from "@/uni_modules/uniapp-ui/ui-swipe-cell"
import { ref } from "vue"
import { useToast, useDialog } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "SwipeCell 滑动单元格" },
})

const toast = useToast()
const dialog = useDialog()

// 阈值切换
const thresholdPresets = [0.1, 0.3, 0.5, 0.8]
const threshold = ref(0.3)

// 禁用
const disabled = ref(false)

// 异步关闭
function beforeClose(params: SwipeCellBeforeCloseParams): Promise<boolean> {
  return new Promise((resolve) => {
    if (params.position !== "right") {
      resolve(true)
      return
    }
    dialog.confirm({
      title: "确认删除",
      content: "删除后不可恢复，是否继续？",
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })
}

function onAsyncDelete() {
  toast.success("已删除")
}

// 实例方法
const cellRef = ref<SwipeCellInstance>()

// 事件回显
const eventLog = ref("等待事件...")
function onOpen(p: { name: string | number; position: string }) {
  eventLog.value = `[open] name=${p.name}, position=${p.position}`
}
function onClose(p: { name: string | number; position: string }) {
  eventLog.value = `[close] name=${p.name}, position=${p.position}`
}
function onClick(position: string) {
  eventLog.value = `[click] ${position}`
}

// 综合：消息列表
const msgRefs: SwipeCellInstance[] = []
const messages = ref([
  { id: 1, name: "张三", last: "明天几点见？", time: "12:30", unread: true, color: "var(--ui-color-primary)" },
  { id: 2, name: "李四", last: "[图片]", time: "11:08", unread: false, color: "var(--ui-color-success)" },
  { id: 3, name: "王五", last: "周报已发送，请查收", time: "09:45", unread: true, color: "var(--ui-color-warning)" },
  { id: 4, name: "赵六", last: "晚上加班吗", time: "昨天", unread: false, color: "var(--ui-color-danger)" },
])

function onMsgOpen(activeIdx: number) {
  // 互斥：打开新的时关闭其他
  msgRefs.forEach((ref, idx) => {
    if (idx !== activeIdx) ref?.close?.()
  })
}
function onMsgClick(msg: (typeof messages.value)[number], position: string) {
  if (position === "cell") toast.info(`进入 ${msg.name} 会话`)
}
function toggleRead(msg: (typeof messages.value)[number]) {
  msg.unread = !msg.unread
  toast.success(msg.unread ? "标记未读" : "标记已读")
}
function deleteMsg(idx: number) {
  messages.value.splice(idx, 1)
  toast.success("已删除")
}

// 综合：收藏夹
const favorites = ref([
  { id: 1, title: "Vue 3 设计与实现", desc: "前端框架开发", cover: "https://img.yzcdn.cn/vant/cat.jpeg" },
  { id: 2, title: "深入 TypeScript", desc: "类型系统进阶", cover: "https://img.yzcdn.cn/vant/cat.jpeg" },
])

function favBeforeClose(params: SwipeCellBeforeCloseParams): Promise<boolean> {
  return new Promise((resolve) => {
    if (params.position !== "right") return resolve(true)
    dialog.confirm({
      title: "取消收藏",
      content: "确定要从收藏夹移除吗？",
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })
}
function removeFavorite(idx: number) {
  favorites.value.splice(idx, 1)
  toast.success("已取消收藏")
}
</script>

<style lang="scss" scoped>
.action {
  color: var(--ui-color-text-inverse);
  height: 100%;
  display: flex;
  padding: 0 var(--ui-spacing-lg);
  font-size: var(--ui-font-size-sm);
  align-items: center;
  white-space: nowrap;
  justify-content: center;

  &--primary {
    background: var(--ui-color-primary);
  }

  &--warning {
    background: var(--ui-color-warning);
  }

  &--danger {
    background: var(--ui-color-danger);
  }

  &--info {
    background: var(--ui-color-info);
  }
}

.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.list-card {
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-md);
}

.msg {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  background: var(--ui-color-background);
  align-items: center;
  border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border-light);

  &__avatar {
    color: var(--ui-color-text-inverse);
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    font-weight: var(--ui-font-weight-bold);
    border-radius: 50%;
    justify-content: center;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-medium);
  }

  &__last {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }

  &__time {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.fav {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  background: var(--ui-color-background);
  align-items: center;
  border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border-light);

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-medium);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }
}
</style>
