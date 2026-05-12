<template>
  <view class="min-h-screen bg-white flex flex-col">
    <!-- 顶部 -->
    <view class="fixed left-0 top-0 z-50 w-full" :style="{ paddingTop: `${safeAreaInsets?.top}px`, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }">
      <view class="flex h-[100rpx] items-center justify-between px-[32rpx]" :style="{ paddingRight: `${menuPadding}px` }">
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
          :class="[index % 5 === 0 ? 'col-span-2 h-[320rpx]' : 'col-span-1 h-[320rpx]', template.bgClass]"
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
// MP 端右侧让出胶囊宽度
function getMenuPadding(): number {
  // #ifdef MP
  const sysInfo = uni.getSystemInfoSync()
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  return sysInfo.windowWidth - menuButtonInfo.left + 8
  // #endif
  // #ifndef MP
  return 16
  // #endif
}
const menuPadding = getMenuPadding()
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

const templateCategories: TemplateCategory[] = [
  {
    name: "登录注册",
    templates: [
      { name: "账号登录", desc: "ui-form + ui-input + ui-button，含校验规则", icon: "i-lucide-log-in", bgClass: "bg-[#EEF2FF]", textClass: "text-indigo-600", path: "login-form", tags: ["表单", "验证"] },
      { name: "验证码登录", desc: "手机号 + 验证码组合，倒计时重发", icon: "i-lucide-smartphone", bgClass: "bg-[#F0FDF4]", textClass: "text-emerald-600", path: "login-sms", tags: ["倒计时", "安全"] },
      { name: "注册新号", desc: "ui-form 多字段校验 + 协议勾选", icon: "i-lucide-user-plus", bgClass: "bg-[#FAF5FF]", textClass: "text-purple-600", path: "register", tags: ["表单", "协议"] },
      { name: "找回密码", desc: "三段式重置流程，密码校验", icon: "i-lucide-key-round", bgClass: "bg-[#FFF7ED]", textClass: "text-orange-600", path: "forget-pwd", tags: ["重置", "安全"] },
    ],
  },
  {
    name: "个人中心",
    templates: [
      { name: "用户资料", desc: "ui-cell + ui-avatar + ui-number-roll 统计", icon: "i-lucide-user-circle", bgClass: "bg-[#F0F9FF]", textClass: "text-cyan-600", path: "profile", tags: ["卡片", "统计"] },
      { name: "我的钱包", desc: "余额卡 + ui-grid + ui-segmented 账单", icon: "i-lucide-wallet", bgClass: "bg-[#FEF2F2]", textClass: "text-rose-600", path: "wallet", tags: ["资产", "图表"] },
      { name: "地址管理", desc: "ui-swipe-cell 滑删 + ui-empty 空态", icon: "i-lucide-map-pin", bgClass: "bg-[#FFFBEB]", textClass: "text-amber-600", path: "address-list", tags: ["CRUD", "列表"] },
      { name: "系统设置", desc: "ui-cell-group + ui-switch + ui-dialog 确认", icon: "i-lucide-settings", bgClass: "bg-[#F8FAFC]", textClass: "text-slate-600", path: "settings", tags: ["选项", "开关"] },
    ],
  },
  {
    name: "电商交易",
    templates: [
      { name: "商品列表", desc: "ui-search + ui-grid + ui-pull-refresh", icon: "i-lucide-shopping-bag", bgClass: "bg-[#FDF2F8]", textClass: "text-pink-600", path: "goods-list", tags: ["搜索", "瀑布流"] },
      { name: "商品详情", desc: "ui-swiper + ui-rate + ui-action-sheet SKU", icon: "i-lucide-package", bgClass: "bg-[#FFF1F2]", textClass: "text-rose-600", path: "goods-detail", tags: ["轮播", "SKU"] },
      { name: "购物车", desc: "ui-checkbox + ui-stepper + ui-swipe-cell", icon: "i-lucide-shopping-cart", bgClass: "bg-[#FEFCE8]", textClass: "text-yellow-600", path: "shopping-cart", tags: ["多选", "数量"], isNew: true },
      { name: "结算支付", desc: "ui-radio-group 支付 + ui-popup 优惠券", icon: "i-lucide-credit-card", bgClass: "bg-[#FFF7ED]", textClass: "text-orange-600", path: "checkout", tags: ["支付", "弹窗"], isNew: true },
      { name: "订单列表", desc: "ui-tabs 状态 + ui-tag + ui-empty", icon: "i-lucide-clipboard-list", bgClass: "bg-[#EFF6FF]", textClass: "text-blue-600", path: "order-list", tags: ["Tabs", "状态"] },
      { name: "订单详情", desc: "ui-timeline 物流 + ui-count-down 倒计时", icon: "i-lucide-file-text", bgClass: "bg-[#ECFEFF]", textClass: "text-cyan-600", path: "order-detail", tags: ["时间轴", "倒计时"] },
    ],
  },
  {
    name: "内容资讯",
    templates: [
      { name: "资讯列表", desc: "ui-notice-bar + ui-tabs + ui-text-ellipsis", icon: "i-lucide-newspaper", bgClass: "bg-[#FAFAFA]", textClass: "text-neutral-600", path: "article-list", tags: ["排版", "公告"] },
      { name: "文章详情", desc: "评论 + ui-badge + ui-divider 长文阅读", icon: "i-lucide-book-open", bgClass: "bg-[#F0FDF4]", textClass: "text-green-600", path: "article-detail", tags: ["阅读", "评论"] },
      { name: "消息通知", desc: "ui-search + ui-swipe-cell + ui-badge 红点", icon: "i-lucide-bell", bgClass: "bg-[#F3E8FF]", textClass: "text-violet-600", path: "message-list", tags: ["交互", "红点"] },
      { name: "通讯录", desc: "ui-index-bar + ui-sticky + ui-back-top", icon: "i-lucide-contact", bgClass: "bg-[#FDF4FF]", textClass: "text-fuchsia-600", path: "contact-list", tags: ["索引", "搜索"], isNew: true },
    ],
  },
  {
    name: "数据工具",
    templates: [
      { name: "数据看板", desc: "ui-circle + ui-progress + ui-number-roll", icon: "i-lucide-bar-chart-3", bgClass: "bg-[#EFF6FF]", textClass: "text-blue-600", path: "dashboard", tags: ["可视化", "实时"], isNew: true },
      { name: "项目看板", desc: "ui-collapse + ui-avatar-group + ui-pagination", icon: "i-lucide-kanban", bgClass: "bg-[#F0FDFA]", textClass: "text-teal-600", path: "task-board", tags: ["任务", "协作"], isNew: true },
      { name: "多步表单", desc: "ui-steps + ui-cascader + ui-date-picker + ui-upload", icon: "i-lucide-list-checks", bgClass: "bg-[#FAF5FF]", textClass: "text-purple-600", path: "multistep-form", tags: ["步骤", "校验"], isNew: true },
      { name: "日历日程", desc: "ui-calendar-panel + ui-timeline + ui-popup", icon: "i-lucide-calendar", bgClass: "bg-[#FFF7ED]", textClass: "text-orange-600", path: "calendar-schedule", tags: ["日历", "日程"], isNew: true },
      { name: "主题定制", desc: "ui-color-picker + ui-sidebar + ui-config-provider", icon: "i-lucide-palette", bgClass: "bg-[#FDF2F8]", textClass: "text-pink-600", path: "theme-customizer", tags: ["主题", "Side Bar"], isNew: true },
    ],
  },
  {
    name: "互动场景",
    templates: [
      { name: "聊天窗口", desc: "ui-popover 表情 + ui-action-sheet 工具栏", icon: "i-lucide-message-circle", bgClass: "bg-[#E0E7FF]", textClass: "text-indigo-600", path: "chat", tags: ["IM", "气泡"] },
      { name: "意见反馈", desc: "ui-radio-group + ui-textarea + ui-upload + ui-slider", icon: "i-lucide-help-circle", bgClass: "bg-[#FFEDD5]", textClass: "text-orange-600", path: "feedback", tags: ["表单", "上传"] },
      { name: "相册管理", desc: "ui-upload + ui-grid + ui-watermark + ui-poster", icon: "i-lucide-image", bgClass: "bg-[#ECFDF5]", textClass: "text-emerald-600", path: "photo-gallery", tags: ["上传", "海报"], isNew: true },
      { name: "二维码分享", desc: "ui-qrcode + ui-poster + ui-popup 海报", icon: "i-lucide-qr-code", bgClass: "bg-[#FEF3C7]", textClass: "text-amber-600", path: "qrcode-share", tags: ["二维码", "分享"], isNew: true },
      { name: "迷你应用", desc: "ui-navbar + ui-tabbar + ui-header/footer 完整框架", icon: "i-lucide-layout-dashboard", bgClass: "bg-[#E0F2FE]", textClass: "text-sky-600", path: "mini-app", tags: ["框架", "navbar"], isNew: true },
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
