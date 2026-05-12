<template>
  <view class="page">
    <view class="head">
      <text class="head__title">深度解析：为什么 Uniapp 是跨端开发的最佳选择？</text>

      <view class="head__author">
        <view class="head__user">
          <ui-avatar size="72rpx" text="技" background="primary" />
          <view class="head__meta">
            <text class="head__name">技术小哥</text>
            <text class="head__time">2024-05-20 14:30 · 阅读 1.2w</text>
          </view>
        </view>
        <ui-button size="small" :type="followed ? 'default' : 'primary'" :plain="!followed" :loading="followLoading" @click="onFollow">
          {{ followed ? "已关注" : "+ 关注" }}
        </ui-button>
      </view>
    </view>

    <view class="body">
      <text class="body__p">在移动应用开发领域，跨平台技术一直是一个热门话题。开发者希望能够通过一套代码，同时构建 iOS、Android、Web 以及各种小程序平台的应用。</text>

      <ui-image src="https://picsum.photos/750/400?random=61" width="100%" height="400rpx" mode="aspectFill" radius="16rpx" />

      <text class="body__p">Uniapp 正是解决这一痛点的佼佼者。它基于 Vue.js 框架，继承了 Vue 优秀的开发体验，同时通过强大的编译器将代码转换为各平台的原生代码。</text>
      <text class="body__h">核心优势</text>
      <view class="body__list">
        <text class="body__li">1. 学习成本低：只要会 Vue 就能上手。</text>
        <text class="body__li">2. 生态丰富：拥有庞大的插件市场。</text>
        <text class="body__li">3. 性能优秀：底层优化保证了接近原生的体验。</text>
      </view>

      <ui-divider :content="`评论 ${comments.length} 条`" />

      <view class="comments">
        <view v-for="c in comments" :key="c.id" class="comment">
          <ui-avatar size="72rpx" :text="c.name.slice(0, 1)" background="info" />
          <view class="comment__body">
            <view class="comment__head">
              <text class="comment__name">{{ c.name }}</text>
              <text class="comment__time">{{ c.time }}</text>
            </view>
            <text class="comment__content">{{ c.content }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="footer__input" @click="onComment">
        <ui-icon name="edit" size="32rpx" color="text-tertiary" />
        <text class="footer__placeholder">写评论...</text>
      </view>
      <view class="footer__actions">
        <view class="footer__action" @click="onComment">
          <ui-badge :value="comments.length">
            <ui-icon name="chat" size="44rpx" color="text-secondary" />
          </ui-badge>
        </view>
        <view class="footer__action" @click="starred = !starred">
          <ui-icon :name="starred ? 'star-fill' : 'star'" size="44rpx" :color="starred ? 'warning' : 'text-secondary'" />
        </view>
        <view class="footer__action" @click="onShare">
          <ui-icon name="share" size="44rpx" color="text-secondary" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "文章详情" },
})

const toast = useToast()

const followed = ref(false)
const followLoading = ref(false)
const starred = ref(false)

function onFollow() {
  followLoading.value = true
  setTimeout(() => {
    followLoading.value = false
    followed.value = !followed.value
    toast.success(followed.value ? "已关注" : "已取消")
  }, 400)
}

function onComment() {
  toast.text("展开评论框")
}

function onShare() {
  toast.text("分享")
}

const comments = [
  { id: 1, name: "前端开发者", time: "2 小时前", content: "干货满满，已收藏，学习中。" },
  { id: 2, name: "小程序设计师", time: "5 小时前", content: "跨端方案确实是趋势，期待后续教程。" },
  { id: 3, name: "技术 leader", time: "1 天前", content: "团队正在用 uniapp，效率提升明显。" },
]
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background);
  min-height: 100vh;
  padding-bottom: 160rpx;
}

.head {
  padding: var(--ui-spacing-lg);
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-xxl);
    font-weight: var(--ui-font-weight-bold);
    line-height: 1.4;
  }

  &__author {
    display: flex;
    margin-top: var(--ui-spacing-lg);
    align-items: center;
    justify-content: space-between;
  }

  &__user {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
  }

  &__meta {
    gap: var(--ui-spacing-xxs);
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__time {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.body {
  gap: var(--ui-spacing-lg);
  display: flex;
  padding: var(--ui-spacing-lg);
  flex-direction: column;

  &__p {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    line-height: 1.8;
  }

  &__h {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    margin-top: var(--ui-spacing-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__list {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-direction: column;
  }

  &__li {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    line-height: 1.8;
  }
}

.comments {
  gap: var(--ui-spacing-lg);
  display: flex;
  flex-direction: column;
}

.comment {
  gap: var(--ui-spacing-md);
  display: flex;

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__head {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: baseline;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__time {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__content {
    color: var(--ui-color-text-secondary);
    display: block;
    font-size: var(--ui-font-size-sm);
    margin-top: var(--ui-spacing-xs);
    line-height: 1.6;
  }
}

.footer {
  gap: var(--ui-spacing-md);
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md) calc(var(--ui-spacing-sm) + env(safe-area-inset-bottom));
  position: fixed;
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;

  &__input {
    gap: var(--ui-spacing-xs);
    flex: 1;
    height: 72rpx;
    display: flex;
    padding: 0 var(--ui-spacing-lg);
    background: var(--ui-color-background-section);
    align-items: center;
    border-radius: var(--ui-radius-round);
  }

  &__placeholder {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-sm);
  }

  &__actions {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: center;
  }

  &__action {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
