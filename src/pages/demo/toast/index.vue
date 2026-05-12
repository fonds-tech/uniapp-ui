<template>
  <demo-page>
    <ui-toast ref="toastRef" />

    <demo-section title="基础用法" desc="文字 / 成功 / 失败 / 等待">
      <demo-block :cols="2" :gap="12">
        <ui-button @click="toastRef?.text('文字提示')">文字</ui-button>
        <ui-button type="success" @click="toastRef?.success('操作成功')">成功</ui-button>
        <ui-button type="danger" @click="toastRef?.fail('操作失败')">失败</ui-button>
        <ui-button type="warning" @click="toastRef?.await('请稍候')">等待</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="加载提示" desc="loading 默认不自动关闭，需手动 hide">
      <demo-block :cols="2" :gap="12">
        <ui-button @click="onLoading">显示 → 2s 后 hide</ui-button>
        <ui-button @click="toastRef?.loading('永久加载...')">显示（不关闭）</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标" desc="icon 名 / 图片 URL">
      <demo-block :cols="2" :gap="12">
        <ui-button @click="toastRef?.show({ content: '收藏成功', icon: 'star' })">星星</ui-button>
        <ui-button @click="toastRef?.show({ content: '已喜欢', icon: 'heart' })">心形</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="显示位置 position">
      <demo-block :cols="3" :gap="12">
        <ui-button @click="toastRef?.show({ content: 'top 位置', position: 'top' })">top</ui-button>
        <ui-button @click="toastRef?.show({ content: 'middle 位置', position: 'middle' })">middle</ui-button>
        <ui-button @click="toastRef?.show({ content: 'bottom 位置', position: 'bottom' })">bottom</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="位置偏移 offset" desc="仅 top/bottom 生效">
      <demo-block :cols="3" :gap="12">
        <ui-button @click="toastRef?.show({ content: 'top + 100rpx', position: 'top', offset: 100 })">100rpx</ui-button>
        <ui-button @click="toastRef?.show({ content: 'top + 200rpx', position: 'top', offset: 200 })">200rpx</ui-button>
        <ui-button @click="toastRef?.show({ content: 'bottom + 200', position: 'bottom', offset: 200 })">bottom 200</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="时长 duration">
      <demo-block :cols="3" :gap="12">
        <ui-button @click="toastRef?.show({ content: '1 秒', duration: 1000 })">1 秒</ui-button>
        <ui-button @click="toastRef?.show({ content: '3 秒', duration: 3000 })">3 秒</ui-button>
        <ui-button @click="toastRef?.show({ content: '5 秒', duration: 5000 })">5 秒</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="宽度 width">
      <demo-block :cols="3" :gap="12">
        <ui-button @click="toastRef?.show({ content: '300rpx 宽', width: '300rpx' })">300rpx</ui-button>
        <ui-button @click="toastRef?.show({ content: '更长的内容，限制最大宽度 500rpx', width: '500rpx' })">500rpx</ui-button>
        <ui-button @click="toastRef?.show({ content: '不限宽', width: '' })">默认</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="背景色 background">
      <demo-block :cols="3" :gap="12">
        <ui-button @click="toastRef?.show({ content: '主色背景', background: 'primary' })">primary</ui-button>
        <ui-button @click="toastRef?.show({ content: '危险背景', background: 'danger' })">danger</ui-button>
        <ui-button @click="toastRef?.show({ content: '半透明黑', background: 'rgba(0,0,0,0.85)' })">默认</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="遮罩 mask" desc="开启后拦截屏幕点击">
      <demo-block :cols="2" :gap="12">
        <ui-button @click="toastRef?.show({ content: '有遮罩', mask: true, duration: 3000 })">开启 mask</ui-button>
        <ui-button @click="toastRef?.show({ content: '无遮罩', mask: false, duration: 3000 })">无 mask</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="声明式 v-model:show">
      <demo-block direction="column" :gap="12">
        <ui-toast v-model:show="declarativeShow" type="success" content="声明式调用" :duration="0" mask />
        <ui-button type="primary" @click="declarativeShow = true">显示</ui-button>
        <ui-button @click="declarativeShow = false">隐藏</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="默认插槽" desc="自定义内容覆盖默认 body">
      <demo-block direction="column" :gap="12">
        <ui-toast v-model:show="slotShow" :duration="2500">
          <view class="custom-toast">
            <ui-icon name="checked" size="48rpx" color="#fff" />
            <text class="custom-toast__text">完全自定义</text>
          </view>
        </ui-toast>
        <ui-button @click="slotShow = true">显示自定义</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" :gap="12">
        <ui-toast v-model:show="eventShow" content="事件演示" :duration="2000" @open="onOpen" @opened="onOpened" @close="onClose" @closed="onClosed" />
        <ui-button @click="eventShow = true">触发</ui-button>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 提交表单流" desc="loading → success / fail">
      <demo-block direction="column" :gap="12">
        <ui-button block type="primary" @click="onSubmit(true)">提交（成功）</ui-button>
        <ui-button block type="default" @click="onSubmit(false)">提交（失败）</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · useToast hook 调用">
      <demo-block direction="column" :gap="12">
        <ui-button @click="onHookCall">useToast().success</ui-button>
        <text class="event-log">hook 自动用全局实例，无需 ref</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { ToastInstance } from "@/uni_modules/uniapp-ui"
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Toast 轻提示" },
})

const toastRef = ref<ToastInstance>()

const declarativeShow = ref(false)
const slotShow = ref(false)
const eventShow = ref(false)

const eventLog = ref("等待事件...")
function onOpen() {
  eventLog.value = "[open]"
}
function onOpened() {
  eventLog.value = "[opened] 打开动画结束"
}
function onClose() {
  eventLog.value = "[close]"
}
function onClosed() {
  eventLog.value = "[closed] 关闭动画结束"
}

function onLoading() {
  toastRef.value?.loading("加载中...")
  setTimeout(() => toastRef.value?.hide(), 2000)
}

function onSubmit(ok: boolean) {
  toastRef.value?.loading("提交中...")
  setTimeout(() => {
    if (ok) toastRef.value?.success("提交成功")
    else toastRef.value?.fail("提交失败")
  }, 1500)
}

const toast = useToast()
function onHookCall() {
  toast.success("hook 调用 success")
}
</script>

<style lang="scss" scoped>
.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.custom-toast {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
