<template>
  <view class="page">
    <view class="card">
      <view class="card__head">
        <ui-avatar size="120rpx" :text="user.name.slice(0, 1)" background="primary" />
        <view class="card__user">
          <text class="card__name">{{ user.name }}</text>
          <text class="card__bio">{{ user.bio }}</text>
        </view>
      </view>

      <ui-divider content="扫码添加" />

      <view class="qrcode-wrap">
        <ui-qrcode :value="qrValue" :size="320" :margin="20" />
        <text class="qrcode-wrap__hint">长按识别 / 扫一扫</text>
      </view>

      <ui-divider />

      <view class="info">
        <text class="info__label">个人 ID</text>
        <view class="info__value" @click="onCopy">
          <text class="info__text">{{ user.id }}</text>
          <ui-icon name="description" size="32rpx" color="primary" />
        </view>
      </view>

      <ui-button block type="primary" radius="48rpx" :custom-style="{ marginTop: 'var(--ui-spacing-lg)' }" @click="onShare">分享名片</ui-button>
    </view>

    <ui-action-sheet v-model:show="showShare" title="分享到" :actions="shareActions" @select="onSelectShare" />

    <ui-popup v-model:show="showPoster" position="center" round>
      <view class="poster-wrap">
        <ui-watermark :content="['uniapp-ui', user.name]" :font-size="14" :gap-x="30" :gap-y="40" :full-page="false" font-color="rgba(99, 102, 241, 0.08)">
          <view class="poster">
            <view class="poster__head">
              <ui-avatar size="96rpx" :text="user.name.slice(0, 1)" background="primary" />
              <view class="poster__user">
                <text class="poster__name">{{ user.name }}</text>
                <text class="poster__bio">{{ user.bio }}</text>
              </view>
            </view>
            <view class="poster__qr">
              <ui-qrcode :value="qrValue" :size="240" />
            </view>
            <text class="poster__hint">扫一扫，加我为好友</text>
          </view>
        </ui-watermark>
        <view class="poster-wrap__actions">
          <ui-button block size="large" plain radius="44rpx" @click="showPoster = false">取消</ui-button>
          <ui-button block size="large" type="primary" radius="44rpx" @click="onSavePoster">保存图片</ui-button>
        </view>
      </view>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "我的二维码" },
})

const toast = useToast()

const user = {
  name: "张三丰",
  bio: "前端工程师 · uniapp-ui 用户",
  id: "uni-9527",
}

const qrValue = ref("https://example.com/profile/uni-9527")

const showShare = ref(false)
const showPoster = ref(false)

const shareActions = [
  { name: "微信好友" },
  { name: "朋友圈" },
  { name: "保存图片" },
  { name: "生成海报", subname: "更精美" },
]

function onCopy() {
  uni.setClipboardData({ data: user.id, success: () => toast.success("已复制") })
}

function onShare() {
  showShare.value = true
}

function onSelectShare(action: { name: string }) {
  if (action.name === "生成海报" || action.name === "保存图片") {
    showPoster.value = true
  } else {
    toast.success(`分享到 ${action.name}`)
  }
}

function onSavePoster() {
  toast.success("已保存到相册")
  showPoster.value = false
}
</script>

<style lang="scss" scoped>
.page {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.card {
  padding: var(--ui-spacing-xl);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);

  &__head {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: center;
  }

  &__user {
    gap: var(--ui-spacing-xs);
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__bio {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.qrcode-wrap {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-lg);
  align-items: center;
  flex-direction: column;

  &__hint {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }

  &__value {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
  }

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }
}

.poster-wrap {
  width: 600rpx;
  padding: var(--ui-spacing-lg);

  &__actions {
    gap: var(--ui-spacing-md);
    display: flex;
    margin-top: var(--ui-spacing-md);
  }
}

.poster {
  gap: var(--ui-spacing-lg);
  display: flex;
  padding: var(--ui-spacing-xl);
  background: var(--ui-color-background);
  align-items: center;
  border-radius: var(--ui-radius-lg);
  flex-direction: column;

  &__head {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: center;
  }

  &__user {
    gap: var(--ui-spacing-xxs);
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__bio {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__qr {
    padding: var(--ui-spacing-md);
    background: var(--ui-color-background-section);
    border-radius: var(--ui-radius-md);
  }

  &__hint {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
