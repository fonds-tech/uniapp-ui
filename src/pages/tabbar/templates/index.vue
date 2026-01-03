<template>
  <view class="min-h-screen bg-[#F6F7F9]">
    <!-- 顶部导航栏 -->
    <view
      class="fixed left-0 top-0 z-50 w-full bg-white/95 backdrop-blur-md"
      :style="{ paddingTop: `${safeAreaInsets?.top}px` }"
    >
      <view class="flex h-[88rpx] items-center px-[32rpx]">
        <text class="text-[36rpx] font-bold text-slate-800">业务模板</text>
      </view>
    </view>

    <!-- 占位区域 -->
    <view :style="{ height: `${safeAreaInsets?.top + 44}px` }" />

    <!-- 模板列表 -->
    <view class="px-[32rpx] py-[32rpx] pb-[180rpx]">
      <!-- 介绍卡片 -->
      <view class="mb-[40rpx] rounded-[32rpx] bg-gradient-to-br from-amber-500 to-orange-600 p-[40rpx] text-white">
        <view class="flex items-center mb-[20rpx]">
          <view class="i-lucide-sparkles text-[48rpx] mr-[16rpx]" />
          <text class="text-[36rpx] font-bold">快速开发模板</text>
        </view>
        <text class="text-[28rpx] opacity-90 leading-relaxed">
          精选常用业务场景模板，助你快速搭建页面，提升开发效率
        </text>
      </view>

      <!-- 模板分类 -->
      <view v-for="category in templateCategories" :key="category.name" class="mb-[48rpx]">
        <view class="flex items-center mb-[24rpx]">
          <view class="h-[28rpx] w-[6rpx] rounded-full bg-amber-500 mr-[16rpx]" />
          <text class="text-[32rpx] font-bold text-slate-800">{{ category.name }}</text>
          <text class="text-[24rpx] text-gray-400 ml-[16rpx]">{{ category.templates.length }} 个模板</text>
        </view>

        <view class="flex flex-col space-y-[20rpx]">
          <view
            v-for="template in category.templates"
            :key="template.name"
            class="relative overflow-hidden rounded-[28rpx] bg-white p-[32rpx] shadow-sm active:bg-gray-50 transition-all"
            @click="previewTemplate(template)"
          >
            <view class="flex items-start">
              <view
                :class="`flex h-[96rpx] w-[96rpx] items-center justify-center rounded-[24rpx] ${template.bgClass} mr-[28rpx]`"
              >
                <view :class="`${template.icon} text-[44rpx] ${template.textClass}`" />
              </view>
              <view class="flex-1">
                <view class="flex items-center mb-[8rpx]">
                  <text class="text-[30rpx] font-bold text-slate-800">{{ template.name }}</text>
                  <view
                    v-if="template.isNew"
                    class="ml-[12rpx] px-[12rpx] py-[4rpx] rounded-full bg-rose-500 text-white text-[20rpx]"
                  >
                    NEW
                  </view>
                </view>
                <text class="text-[26rpx] text-gray-500 leading-relaxed">{{ template.desc }}</text>
                <view class="flex flex-wrap gap-[12rpx] mt-[16rpx]">
                  <view
                    v-for="tag in template.tags"
                    :key="tag"
                    class="px-[16rpx] py-[6rpx] rounded-full bg-gray-100 text-[22rpx] text-gray-500"
                  >
                    {{ tag }}
                  </view>
                </view>
              </view>
              <view class="i-lucide-chevron-right text-[36rpx] text-gray-300 mt-[28rpx]" />
            </view>
          </view>
        </view>
      </view>

      <!-- 更多模板提示 -->
      <view class="flex flex-col items-center py-[60rpx]">
        <view class="i-lucide-package text-[64rpx] text-gray-300 mb-[20rpx]" />
        <text class="text-[28rpx] text-gray-400 mb-[8rpx]">更多模板持续更新中</text>
        <text class="text-[24rpx] text-gray-300">敬请期待</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: "模板",
    navigationStyle: "custom",
  },
})

const safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets

interface Template {
  name: string
  desc: string
  icon: string
  bgClass: string
  textClass: string
  path: string
  tags: string[]
  isNew?: boolean
}

interface TemplateCategory {
  name: string
  templates: Template[]
}

const templateCategories: TemplateCategory[] = [
  {
    name: "登录注册",
    templates: [
      {
        name: "账号密码登录",
        desc: "经典的账号密码登录表单，支持记住密码和快捷登录",
        icon: "i-lucide-log-in",
        bgClass: "bg-blue-50",
        textClass: "text-blue-500",
        path: "login-form",
        tags: ["表单", "验证"],
      },
      {
        name: "手机验证码登录",
        desc: "手机号 + 验证码登录，支持倒计时重发",
        icon: "i-lucide-smartphone",
        bgClass: "bg-indigo-50",
        textClass: "text-indigo-500",
        path: "login-sms",
        tags: ["验证码", "倒计时"],
        isNew: true,
      },
    ],
  },
  {
    name: "个人中心",
    templates: [
      {
        name: "用户资料页",
        desc: "完整的用户信息展示与编辑页面",
        icon: "i-lucide-user-circle",
        bgClass: "bg-emerald-50",
        textClass: "text-emerald-500",
        path: "profile",
        tags: ["头像", "信息卡片"],
      },
      {
        name: "设置页面",
        desc: "通用设置页面模板，包含开关、列表等常用配置项",
        icon: "i-lucide-settings",
        bgClass: "bg-gray-100",
        textClass: "text-gray-500",
        path: "settings",
        tags: ["设置项", "开关"],
      },
    ],
  },
  {
    name: "列表展示",
    templates: [
      {
        name: "商品列表",
        desc: "电商风格商品列表，支持网格/列表切换",
        icon: "i-lucide-shopping-bag",
        bgClass: "bg-amber-50",
        textClass: "text-amber-500",
        path: "goods-list",
        tags: ["商品卡片", "筛选"],
        isNew: true,
      },
      {
        name: "文章列表",
        desc: "资讯文章列表，支持图文混排和纯文字模式",
        icon: "i-lucide-newspaper",
        bgClass: "bg-rose-50",
        textClass: "text-rose-500",
        path: "article-list",
        tags: ["图文", "时间线"],
      },
      {
        name: "消息列表",
        desc: "消息通知列表，支持未读标记和滑动操作",
        icon: "i-lucide-bell",
        bgClass: "bg-violet-50",
        textClass: "text-violet-500",
        path: "message-list",
        tags: ["未读", "滑动删除"],
      },
    ],
  },
  {
    name: "详情展示",
    templates: [
      {
        name: "商品详情",
        desc: "完整的商品详情页，包含轮播、规格选择、购买栏",
        icon: "i-lucide-package",
        bgClass: "bg-cyan-50",
        textClass: "text-cyan-500",
        path: "goods-detail",
        tags: ["轮播", "SKU", "底部栏"],
      },
      {
        name: "文章详情",
        desc: "富文本文章详情页，支持评论和分享",
        icon: "i-lucide-file-text",
        bgClass: "bg-teal-50",
        textClass: "text-teal-500",
        path: "article-detail",
        tags: ["富文本", "评论"],
      },
    ],
  },
]

function previewTemplate(template: Template) {
  uni.showToast({
    title: `${template.name} 开发中`,
    icon: "none",
  })
}
</script>

<style>
page {
  background-color: #f6f7f9;
}
</style>
