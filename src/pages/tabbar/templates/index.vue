<template>
  <view class="min-h-screen bg-white flex flex-col">
    <!-- 顶部 -->
    <view class="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
      <view class="flex h-[100rpx] items-center justify-between px-[32rpx]">
        <view>
          <text class="text-[40rpx] font-900 text-slate-900 leading-none">Templates</text>
          <view class="flex items-center mt-[6rpx]">
            <view class="h-[8rpx] w-[8rpx] rounded-full bg-indigo-500 mr-[8rpx]" />
            <text class="text-[22rpx] text-slate-400 font-medium tracking-wider uppercase">Collection</text>
          </view>
        </view>
        <view class="h-[80rpx] w-[80rpx] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center active:bg-slate-100 transition-colors">
          <view class="i-lucide-grid text-[40rpx] text-slate-900" />
        </view>
      </view>

      <!-- 分类胶囊 -->
      <view class="px-[24rpx] pb-[24rpx] pt-[12rpx]">
        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="flex space-x-[16rpx] pr-[24rpx]">
            <view
              class="px-[28rpx] py-[12rpx] rounded-[20rpx] flex items-center transition-all duration-300 border"
              :class="activeTab === 'all' ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'"
              @click="activeTab = 'all'"
            >
              <text class="text-[26rpx] font-bold" :class="activeTab === 'all' ? 'text-white' : 'text-slate-600'">全部</text>
            </view>
            <view
              v-for="category in templateCategories"
              :key="category.name"
              class="px-[28rpx] py-[12rpx] rounded-[20rpx] flex items-center transition-all duration-300 border"
              :class="activeTab === category.name ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'"
              @click="activeTab = category.name"
            >
              <text class="text-[26rpx] font-bold" :class="activeTab === category.name ? 'text-white' : 'text-slate-600'">{{ category.name }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 占位 -->
    <view :style="{ height: `${(safeAreaInsets?.top || 0) + 104}px` }" />

    <!-- Bento Grid 内容 -->
    <view class="p-[24rpx] pb-[180rpx]">
      <view class="grid grid-cols-2 gap-[20rpx] auto-rows-min">
        <view
          v-for="(template, index) in displayTemplates"
          :key="template.name"
          class="group relative overflow-hidden rounded-[32rpx] transition-all duration-300 active:scale-[0.98]"
          :class="[
            index % 5 === 0 ? 'col-span-2 h-[320rpx]' : 'col-span-1 h-[320rpx]',
            template.bgClass,
          ]"
          @click="previewTemplate(template)"
        >
          <!-- 内容布局 -->
          <view class="relative z-10 h-full flex flex-col justify-between p-[32rpx]">
            <view>
              <view class="flex items-center justify-between mb-[12rpx]">
                <view class="h-[64rpx] w-[64rpx] rounded-[16rpx] flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm">
                  <view :class="`${template.icon} text-[32rpx] ${template.textClass}`" />
                </view>
                <view v-if="template.isNew" class="px-[12rpx] py-[6rpx] bg-slate-900 rounded-[10rpx]">
                  <text class="text-[18rpx] font-bold text-white leading-none">NEW</text>
                </view>
              </view>

              <text class="block text-[34rpx] font-bold text-slate-900 leading-tight mb-[8rpx]">{{ template.name }}</text>
              <text class="text-[24rpx] text-slate-500 line-clamp-2 leading-relaxed opacity-80">{{ template.desc }}</text>
            </view>

            <view class="flex flex-wrap gap-[8rpx]">
              <view v-for="tag in template.tags.slice(0, 2)" :key="tag" class="px-[12rpx] py-[6rpx] rounded-[8rpx] bg-white/60 backdrop-blur-sm border border-black/5">
                <text class="text-[20rpx] font-medium text-slate-600">{{ tag }}</text>
              </view>
            </view>
          </view>

          <!-- 装饰大图标 (右下角水印) -->
          <view class="absolute right-[-20%] bottom-[-20%] opacity-[0.08] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
            <view :class="`${template.icon} text-[280rpx] text-slate-900`" />
          </view>

          <!-- 装饰光效 -->
          <view class="absolute top-0 right-0 w-[200rpx] h-[200rpx] bg-white/20 blur-[60rpx] rounded-full pointer-events-none" />
        </view>
      </view>

      <!-- 底部 Logo -->
      <view class="mt-[60rpx] flex justify-center opacity-20">
        <view class="flex items-center space-x-[12rpx]">
          <view class="h-[12rpx] w-[12rpx] rounded-full bg-slate-900" />
          <view class="h-[12rpx] w-[12rpx] rounded-full bg-slate-900" />
          <view class="h-[12rpx] w-[12rpx] rounded-full bg-slate-900" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

definePage({
  style: {
    navigationBarTitleText: "模板",
    navigationStyle: "custom",
  },
})

const safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets
const activeTab = ref("all")

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

// 调整配色为柔和的背景色，而非原来的白色背景
const templateCategories: TemplateCategory[] = [
  {
    name: "登录注册",
    templates: [
      {
        name: "账号登录",
        desc: "极简风格的登录页面，包含账号密码输入与验证逻辑。",
        icon: "i-lucide-log-in",
        bgClass: "bg-[#EEF2FF]", // 浅蓝
        textClass: "text-indigo-600",
        path: "login-form",
        tags: ["表单", "验证"],
      },
      {
        name: "验证码登录",
        desc: "手机号 + 验证码组合，支持倒计时与重发功能。",
        icon: "i-lucide-smartphone",
        bgClass: "bg-[#F0FDF4]", // 浅绿
        textClass: "text-emerald-600",
        path: "login-sms",
        tags: ["倒计时", "安全"],
        isNew: true,
      },
      {
        name: "注册新号",
        desc: "新用户注册流程，包含协议勾选与步骤引导。",
        icon: "i-lucide-user-plus",
        bgClass: "bg-[#FAF5FF]", // 浅紫
        textClass: "text-purple-600",
        path: "register",
        tags: ["步骤", "协议"],
      },
      {
        name: "找回密码",
        desc: "安全验证流程，帮助用户快速重置账户密码。",
        icon: "i-lucide-key-round",
        bgClass: "bg-[#FFF7ED]", // 浅橙
        textClass: "text-orange-600",
        path: "forget-pwd",
        tags: ["重置", "安全"],
      },
    ],
  },
  {
    name: "个人中心",
    templates: [
      {
        name: "用户资料",
        desc: "展示个人信息、数据统计及常用功能入口。",
        icon: "i-lucide-user-circle",
        bgClass: "bg-[#F0F9FF]", // 浅青
        textClass: "text-cyan-600",
        path: "profile",
        tags: ["卡片", "统计"],
      },
      {
        name: "我的钱包",
        desc: "资产卡片设计，包含余额展示与账单明细。",
        icon: "i-lucide-wallet",
        bgClass: "bg-[#FEF2F2]", // 浅红
        textClass: "text-rose-600",
        path: "wallet",
        tags: ["资产", "图表"],
        isNew: true,
      },
      {
        name: "地址管理",
        desc: "收货地址列表，支持新增、编辑与设为默认。",
        icon: "i-lucide-map-pin",
        bgClass: "bg-[#FFFBEB]", // 浅黄
        textClass: "text-amber-600",
        path: "address-list",
        tags: ["CRUD", "列表"],
      },
      {
        name: "系统设置",
        desc: "标准的设置选项列表，包含开关与跳转操作。",
        icon: "i-lucide-settings",
        bgClass: "bg-[#F8FAFC]", // 浅灰
        textClass: "text-slate-600",
        path: "settings",
        tags: ["选项", "开关"],
      },
    ],
  },
  {
    name: "列表展示",
    templates: [
      {
        name: "订单列表",
        desc: "多状态 Tabs 切换，清晰展示订单流转状态。",
        icon: "i-lucide-clipboard-list",
        bgClass: "bg-[#EFF6FF]", // 浅蓝
        textClass: "text-blue-600",
        path: "order-list",
        tags: ["Tabs", "状态"],
        isNew: true,
      },
      {
        name: "商品列表",
        desc: "电商瀑布流布局，支持筛选与价格排序。",
        icon: "i-lucide-shopping-bag",
        bgClass: "bg-[#FDF2F8]", // 浅粉
        textClass: "text-pink-600",
        path: "goods-list",
        tags: ["瀑布流", "筛选"],
      },
      {
        name: "文章资讯",
        desc: "左图右文或大图模式，适合内容类应用。",
        icon: "i-lucide-newspaper",
        bgClass: "bg-[#FAFAFA]", // 浅灰白
        textClass: "text-neutral-600",
        path: "article-list",
        tags: ["排版", "阅读"],
      },
      {
        name: "消息通知",
        desc: "仿微信消息列表，支持红点提醒与滑动操作。",
        icon: "i-lucide-bell",
        bgClass: "bg-[#F3E8FF]", // 浅紫
        textClass: "text-violet-600",
        path: "message-list",
        tags: ["交互", "红点"],
      },
    ],
  },
  {
    name: "详情展示",
    templates: [
      {
        name: "订单详情",
        desc: "物流进度时间轴与订单信息综合展示。",
        icon: "i-lucide-file-text",
        bgClass: "bg-[#ECFEFF]", // 浅青
        textClass: "text-cyan-600",
        path: "order-detail",
        tags: ["时间轴", "信息"],
      },
      {
        name: "商品详情",
        desc: "电商详情页标配，轮播图+SKU选择+底部栏。",
        icon: "i-lucide-package",
        bgClass: "bg-[#FFF1F2]", // 浅红
        textClass: "text-rose-600",
        path: "goods-detail",
        tags: ["电商", "交互"],
      },
      {
        name: "文章详情",
        desc: "沉浸式阅读体验，包含评论区与互动栏。",
        icon: "i-lucide-book-open",
        bgClass: "bg-[#F0FDF4]", // 浅绿
        textClass: "text-green-600",
        path: "article-detail",
        tags: ["富文本", "评论"],
      },
    ],
  },
  {
    name: "常用功能",
    templates: [
      {
        name: "聊天窗口",
        desc: "气泡式对话界面，处理了各种消息类型。",
        icon: "i-lucide-message-circle",
        bgClass: "bg-[#E0E7FF]", // 靛蓝
        textClass: "text-indigo-600",
        path: "chat",
        tags: ["IM", "气泡"],
        isNew: true,
      },
      {
        name: "意见反馈",
        desc: "包含多行文本输入与图片上传功能的表单。",
        icon: "i-lucide-help-circle",
        bgClass: "bg-[#FFEDD5]", // 橙色
        textClass: "text-orange-600",
        path: "feedback",
        tags: ["上传", "表单"],
      },
    ],
  },
]

const displayTemplates = computed(() => {
  if (activeTab.value === "all") {
    // 平铺所有，Bento Grid 靠 index 控制大小
    return templateCategories.flatMap((category) => category.templates)
  }
  const category = templateCategories.find((c) => c.name === activeTab.value)
  return category ? category.templates : []
})

function previewTemplate(template: Template) {
  uni.navigateTo({
    url: `/pages/template/${template.path}/index`,
  })
}
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
