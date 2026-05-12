<template>
  <view class="page">
    <!-- 顶部用户卡 -->
    <view class="user-card" @click="onClickItem('用户信息')">
      <ui-avatar :url="user.avatar" size="120rpx" />
      <view class="user-card__info">
        <view class="user-card__name-row">
          <text class="user-card__name">{{ user.name }}</text>
          <ui-tag type="warning">VIP</ui-tag>
        </view>
        <text class="user-card__id">ID: {{ user.id }}</text>
        <text class="user-card__phone">{{ user.phone }}</text>
      </view>
      <ui-icon name="arrow" size="32rpx" color="text-tertiary" />
    </view>

    <!-- 账户与安全 -->
    <view class="group">
      <text class="group__title">账户与安全</text>
      <ui-cell-group :custom-style="cellGroupStyle">
        <ui-cell v-for="item in security" :key="item.key" :title="item.title" :label="item.desc" :value="item.value" is-link @click="onClickItem(item.title)">
          <template #icon>
            <view class="cell-icon" :class="[`cell-icon--${item.color}`]">
              <ui-icon :name="item.icon" size="32rpx" :color="item.color" />
            </view>
          </template>
        </ui-cell>
      </ui-cell-group>
    </view>

    <!-- 通知 -->
    <view class="group">
      <text class="group__title">消息通知</text>
      <ui-cell-group :custom-style="cellGroupStyle">
        <ui-cell title="接收消息">
          <template #icon>
            <view class="cell-icon cell-icon--primary">
              <ui-icon name="bell" size="32rpx" color="primary" />
            </view>
          </template>
          <template #value>
            <ui-switch v-model="prefs.notify" />
          </template>
        </ui-cell>
        <ui-cell title="声音提醒" label="新消息播放提示音">
          <template #icon>
            <view class="cell-icon cell-icon--warning">
              <ui-icon name="bell" size="32rpx" color="warning" />
            </view>
          </template>
          <template #value>
            <ui-switch v-model="prefs.sound" />
          </template>
        </ui-cell>
        <ui-cell title="震动提醒" label="新消息震动">
          <template #icon>
            <view class="cell-icon cell-icon--danger">
              <ui-icon name="phone-o" size="32rpx" color="danger" />
            </view>
          </template>
          <template #value>
            <ui-switch v-model="prefs.vibrate" />
          </template>
        </ui-cell>
        <ui-cell title="免打扰时段" :value="prefs.dnd ? '22:00 - 08:00' : '关闭'" is-link @click="onClickItem('免打扰')">
          <template #icon>
            <view class="cell-icon cell-icon--info">
              <ui-icon name="closed-eye" size="32rpx" color="info" />
            </view>
          </template>
        </ui-cell>
      </ui-cell-group>
    </view>

    <!-- 偏好 -->
    <view class="group">
      <text class="group__title">偏好设置</text>
      <ui-cell-group :custom-style="cellGroupStyle">
        <ui-cell title="主题">
          <template #icon>
            <view class="cell-icon cell-icon--primary">
              <ui-icon name="brush-o" size="32rpx" color="primary" />
            </view>
          </template>
          <template #value>
            <ui-segmented v-model="prefs.theme" :options="themeOptions" size="small" />
          </template>
        </ui-cell>
        <ui-cell title="语言" :value="languageLabel" is-link @click="showLanguage = true">
          <template #icon>
            <view class="cell-icon cell-icon--success">
              <ui-icon name="description" size="32rpx" color="success" />
            </view>
          </template>
        </ui-cell>
        <ui-cell title="字体大小" :value="fontLabel" is-link @click="showFontSheet = true">
          <template #icon>
            <view class="cell-icon cell-icon--warning">
              <ui-icon name="font" size="32rpx" color="warning" />
            </view>
          </template>
        </ui-cell>
      </ui-cell-group>
    </view>

    <!-- 缓存与存储 -->
    <view class="group">
      <text class="group__title">缓存与存储</text>
      <ui-cell-group :custom-style="cellGroupStyle">
        <ui-cell title="清除缓存" :value="cacheSize" is-link @click="onClearCache">
          <template #icon>
            <view class="cell-icon cell-icon--danger">
              <ui-icon name="delete" size="32rpx" color="danger" />
            </view>
          </template>
        </ui-cell>
        <ui-cell title="自动清理" label="每周自动清理过期缓存">
          <template #icon>
            <view class="cell-icon cell-icon--primary">
              <ui-icon name="refresh" size="32rpx" color="primary" />
            </view>
          </template>
          <template #value>
            <ui-switch v-model="prefs.autoClean" />
          </template>
        </ui-cell>
        <ui-cell title="图片质量" :value="qualityLabel" is-link @click="showQualitySheet = true">
          <template #icon>
            <view class="cell-icon cell-icon--info">
              <ui-icon name="photo" size="32rpx" color="info" />
            </view>
          </template>
        </ui-cell>
      </ui-cell-group>
    </view>

    <!-- 帮助与关于 -->
    <view class="group">
      <text class="group__title">帮助与关于</text>
      <ui-cell-group :custom-style="cellGroupStyle">
        <ui-cell v-for="item in helps" :key="item.key" :title="item.title" :value="item.value" is-link @click="onClickItem(item.title)">
          <template #icon>
            <view class="cell-icon" :class="[`cell-icon--${item.color}`]">
              <ui-icon :name="item.icon" size="32rpx" :color="item.color" />
            </view>
          </template>
        </ui-cell>
      </ui-cell-group>
    </view>

    <view class="actions">
      <ui-button block size="large" radius="44rpx" @click="onLogout">退出登录</ui-button>
      <text class="actions__danger" @click="onDeleteAccount">注销账号</text>
    </view>

    <!-- 语言选择 -->
    <ui-popup v-model:show="showLanguage" position="bottom" round>
      <view class="sheet">
        <view class="sheet__head">
          <text class="sheet__title">选择语言</text>
          <view class="sheet__close" @click="showLanguage = false">
            <ui-icon name="cross" size="36rpx" color="text-secondary" />
          </view>
        </view>
        <view v-for="l in languages" :key="l.value" class="sheet__item" @click="onSelectLang(l)">
          <text class="sheet__item-label">{{ l.label }}</text>
          <ui-icon v-if="prefs.lang === l.value" name="check" size="36rpx" color="primary" />
        </view>
      </view>
    </ui-popup>

    <!-- 字体大小 -->
    <ui-action-sheet v-model:show="showFontSheet" title="选择字体大小" :actions="fontOptions" @select="onSelectFont" />
    <!-- 图片质量 -->
    <ui-action-sheet v-model:show="showQualitySheet" title="选择图片质量" :actions="qualityOptions" @select="onSelectQuality" />
  </view>
</template>

<script setup lang="ts">
import { useToast, useDialog } from "@/uni_modules/uniapp-ui"
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "设置", backgroundColor: "#F6F7F9" },
})

const toast = useToast()
const dialog = useDialog()

const user = {
  name: "Alex Chen",
  id: "uni-9527",
  phone: "138****8888",
  avatar: "https://i.pravatar.cc/240?img=68",
}

const prefs = reactive({
  notify: true,
  sound: true,
  vibrate: false,
  dnd: false,
  theme: "light",
  lang: "zh-CN",
  font: "normal",
  quality: "auto",
  autoClean: true,
})

const themeOptions = [
  { label: "浅色", value: "light" },
  { label: "深色", value: "dark" },
  { label: "自动", value: "auto" },
]

const languages = [
  { label: "简体中文", value: "zh-CN" },
  { label: "繁體中文", value: "zh-TW" },
  { label: "English", value: "en" },
  { label: "日本語", value: "ja" },
]

const fontOptions = [{ name: "标准" }, { name: "大字号" }, { name: "超大字号" }]
const qualityOptions = [{ name: "自动" }, { name: "高清" }, { name: "标准（省流量）" }]

const security = [
  { key: "phone", title: "手机绑定", icon: "phone", color: "primary", desc: "已绑定", value: "138****8888" },
  { key: "email", title: "邮箱绑定", icon: "comment", color: "warning", desc: "已绑定", value: "a***@gmail.com" },
  { key: "pwd", title: "登录密码", icon: "lock", color: "danger", desc: "上次修改 30 天前" },
  { key: "biometric", title: "生物识别", icon: "user-circle-o", color: "success", value: "已开启" },
  { key: "device", title: "登录设备管理", icon: "phone", color: "info", value: "3 台设备" },
]

const helps = [
  { key: "help", title: "帮助中心", icon: "info-o", color: "primary" },
  { key: "feedback", title: "意见反馈", icon: "edit", color: "warning" },
  { key: "service", title: "在线客服", icon: "service", color: "success", value: "9:00-22:00" },
  { key: "agreement", title: "用户协议", icon: "description", color: "info" },
  { key: "privacy", title: "隐私政策", icon: "award-o", color: "primary" },
  { key: "about", title: "关于", icon: "info", color: "info", value: "v1.0.0" },
]

const cellGroupStyle = {
  overflow: "hidden",
  background: "var(--ui-color-background)",
  boxShadow: "var(--ui-shadow-xs)",
  borderRadius: "var(--ui-radius-lg)",
}

const cacheSize = ref("12.8 MB")
const showLanguage = ref(false)
const showFontSheet = ref(false)
const showQualitySheet = ref(false)

const languageLabel = computed(() => languages.find((l) => l.value === prefs.lang)?.label || "")
const fontLabel = computed(() => ({ normal: "标准", large: "大字号", xlarge: "超大字号" })[prefs.font] || "标准")
const qualityLabel = computed(() => ({ auto: "自动", high: "高清", normal: "省流量" })[prefs.quality] || "")

function onClickItem(name: string) {
  toast.text(`进入: ${name}`)
}

async function onClearCache() {
  const ok = await dialog.confirm({ title: "清除缓存", content: `当前缓存 ${cacheSize.value}，确认清除？` })
  if (!ok) return
  cacheSize.value = "0 KB"
  toast.success("缓存已清除")
}

async function onLogout() {
  const ok = await dialog.confirm({ title: "退出登录", content: "确定退出当前账号？" })
  if (!ok) return
  toast.text("已退出")
}

async function onDeleteAccount() {
  const ok = await dialog.confirm({
    title: "注销账号",
    content: "账号注销后将无法恢复，所有数据将被永久删除。确认注销？",
    confirmButtonColor: "danger",
  })
  if (!ok) return
  toast.text("已提交注销申请")
}

function onSelectLang(l: { value: string; label: string }) {
  prefs.lang = l.value
  showLanguage.value = false
  toast.success(`已切换至 ${l.label}`)
}

function onSelectFont(action: { name: string }) {
  prefs.font = { 标准: "normal", 大字号: "large", 超大字号: "xlarge" }[action.name] || "normal"
  toast.success(`字号: ${action.name}`)
}

function onSelectQuality(action: { name: string }) {
  prefs.quality = { 自动: "auto", 高清: "high", "标准（省流量）": "normal" }[action.name] || "auto"
  toast.success(`质量: ${action.name}`)
}
</script>

<style lang="scss" scoped>
.page {
  padding: var(--ui-spacing-md) var(--ui-spacing-md) var(--ui-spacing-xl);
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.user-card {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  align-items: center;
  border-radius: var(--ui-radius-lg);
  margin-bottom: var(--ui-spacing-xl);

  &__info {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__name-row {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__id {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__phone {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.group {
  margin-bottom: var(--ui-spacing-xl);

  &__title {
    color: var(--ui-color-text-tertiary);
    display: block;
    padding: 0 var(--ui-spacing-md);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
    margin-bottom: var(--ui-spacing-sm);
  }
}

.cell-icon {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  margin-right: var(--ui-spacing-md);
  border-radius: var(--ui-radius-md);
  justify-content: center;

  &--primary {
    background: var(--ui-color-primary-light);
  }

  &--success {
    background: var(--ui-color-success-light);
  }

  &--warning {
    background: var(--ui-color-warning-light);
  }

  &--danger {
    background: var(--ui-color-danger-light);
  }

  &--info {
    background: var(--ui-color-info-light);
  }
}

.actions {
  gap: var(--ui-spacing-md);
  display: flex;
  margin-top: var(--ui-spacing-xl);
  align-items: center;
  flex-direction: column;

  &__danger {
    color: var(--ui-color-danger);
    padding: var(--ui-spacing-sm);
    font-size: var(--ui-font-size-xs);
  }
}

.sheet {
  padding: var(--ui-spacing-lg);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-lg);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__close {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item {
    display: flex;
    padding: var(--ui-spacing-md) 0;
    align-items: center;
    border-bottom: 1rpx solid var(--ui-color-border-light);
    justify-content: space-between;
  }

  &__item-label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
