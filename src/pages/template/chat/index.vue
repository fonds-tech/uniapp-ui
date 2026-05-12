<template>
  <view class="page">
    <scroll-view scroll-y class="scroll" :scroll-into-view="scrollAnchor">
      <view class="messages">
        <view v-for="(m, idx) in messages" :id="`msg-${idx}`" :key="idx">
          <view v-if="m.type === 'time'" class="time">
            <text class="time__text">{{ m.text }}</text>
          </view>
          <view v-else class="bubble" :class="[m.from === 'me' ? 'bubble--me' : 'bubble--other']">
            <ui-avatar v-if="m.from !== 'me'" size="80rpx" :background="m.bg || 'primary'" :custom-style="{ marginRight: 'var(--ui-spacing-sm)' }" />
            <view class="bubble__body" :class="[m.from === 'me' ? 'bubble__body--me' : 'bubble__body--other']">
              <text class="bubble__text" :class="m.from === 'me' ? 'bubble__text--me' : ''">{{ m.text }}</text>
            </view>
            <ui-avatar v-if="m.from === 'me'" size="80rpx" background="info" :custom-style="{ marginLeft: 'var(--ui-spacing-sm)' }" />
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="composer">
      <view class="composer__icon-btn" @click="onVoice">
        <ui-icon name="phone-o" size="56rpx" color="text-secondary" />
      </view>
      <view class="composer__input">
        <textarea
          v-model="draft"
          auto-height
          cursor-spacing="20"
          placeholder="发消息..."
          class="composer__textarea"
          placeholder-style="color: var(--ui-color-text-placeholder)"
        />
      </view>
      <ui-popover v-model:show="showActions" placement="top-end">
        <view class="composer__icon-btn">
          <ui-icon name="plus" size="56rpx" color="text-secondary" />
        </view>
        <template #content>
          <view class="popover">
            <view v-for="a in actions" :key="a.icon" class="popover__item" @click="onAction(a)">
              <ui-icon :name="a.icon" size="40rpx" color="text" />
              <text class="popover__label">{{ a.label }}</text>
            </view>
          </view>
        </template>
      </ui-popover>
      <ui-button v-if="draft" type="primary" size="small" radius="32rpx" @click="onSend">发送</ui-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, nextTick } from "vue"

definePage({
  style: { navigationBarTitleText: "联系客服" },
})

const toast = useToast()

const draft = ref("")
const showActions = ref(false)
const scrollAnchor = ref("")

const messages = ref<{ type: "time" | "msg"; from?: "me" | "other"; text: string; bg?: string }[]>([
  { type: "time", text: "昨天 14:30" },
  { type: "msg", from: "other", text: "你好，请问这个商品什么时候发货呢？", bg: "primary" },
  { type: "msg", from: "me", text: "您好，我们一般在 24 小时内发货，请您耐心等待。" },
  { type: "time", text: "10:24" },
  { type: "msg", from: "other", text: "好的，谢谢！", bg: "primary" },
])

const actions = [
  { icon: "photo", label: "图片" },
  { icon: "photo", label: "拍照" },
  { icon: "location", label: "位置" },
  { icon: "bookmark-o", label: "文件" },
]

function onVoice() {
  toast.text("语音输入")
}

function onAction(a: { label: string }) {
  toast.text(`选择: ${a.label}`)
  showActions.value = false
}

function onSend() {
  messages.value.push({ type: "msg", from: "me", text: draft.value })
  draft.value = ""
  nextTick(() => (scrollAnchor.value = `msg-${messages.value.length - 1}`))
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  display: flex;
  background: var(--ui-color-background-page);
  flex-direction: column;
}

.scroll {
  flex: 1;
  overflow: hidden;
}

.messages {
  gap: var(--ui-spacing-xl);
  display: flex;
  padding: var(--ui-spacing-lg);
  flex-direction: column;
}

.time {
  display: flex;
  justify-content: center;

  &__text {
    color: var(--ui-color-text-tertiary);
    padding: var(--ui-spacing-xxs) var(--ui-spacing-sm);
    font-size: var(--ui-font-size-xs);
    background: var(--ui-color-border-light);
    border-radius: var(--ui-radius-sm);
  }
}

.bubble {
  display: flex;
  align-items: flex-start;

  &--me {
    justify-content: flex-end;
  }

  &__body {
    padding: var(--ui-spacing-md);
    max-width: 70%;
    background: var(--ui-color-background);
    box-shadow: var(--ui-shadow-xs);
    border-radius: var(--ui-radius-md);

    &--other {
      border-top-left-radius: var(--ui-radius-xs);
    }

    &--me {
      background: var(--ui-color-primary);
      border-top-right-radius: var(--ui-radius-xs);
    }
  }

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    line-height: 1.6;

    &--me {
      color: var(--ui-color-text-inverse);
    }
  }
}

.composer {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md) calc(var(--ui-spacing-sm) + env(safe-area-inset-bottom));
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: flex-end;

  &__input {
    flex: 1;
    padding: var(--ui-spacing-sm) var(--ui-spacing-lg);
    background: var(--ui-color-background-section);
    min-height: 72rpx;
    border-radius: var(--ui-radius-round);
  }

  &__icon-btn {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__textarea {
    color: var(--ui-color-text);
    width: 100%;
    font-size: var(--ui-font-size-sm);
    max-height: 200rpx;
    line-height: 1.5;
  }
}

.popover {
  gap: var(--ui-spacing-md);
  width: 360rpx;
  display: flex;
  padding: var(--ui-spacing-md);
  flex-wrap: wrap;

  &__item {
    gap: var(--ui-spacing-xs);
    width: 33%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
