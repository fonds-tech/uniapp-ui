<template>
  <view class="page">
    <view class="hero">
      <text class="hero__title">收货地址</text>
      <text class="hero__sub">共 {{ addresses.length }} 个地址 · 左滑卡片编辑或删除</text>
    </view>

    <view v-if="addresses.length" class="list">
      <ui-swipe-cell v-for="(addr, idx) in addresses" :key="addr.id">
        <view class="card" :class="[addr.isDefault ? 'card--default' : '']" @click="onPick(addr)">
          <view class="card__head">
            <view class="card__type" :class="[`card__type--${addr.type || 'other'}`]">
              <ui-icon :name="typeColor(addr.type).icon" size="32rpx" :color="typeColor(addr.type).color" />
            </view>
            <view class="card__user">
              <view class="card__name-row">
                <text class="card__name">{{ addr.name }}</text>
                <text class="card__phone">{{ addr.phone }}</text>
              </view>
              <view class="card__tags">
                <ui-tag v-if="addr.isDefault" type="danger">默认</ui-tag>
                <ui-tag v-if="addr.type" :type="typeColor(addr.type).tagType" plain>{{ typeColor(addr.type).label }}</ui-tag>
              </view>
            </view>
          </view>
          <text class="card__address">{{ addr.region }} {{ addr.detail }}</text>
          <view class="card__footer">
            <view class="card__action" @click.stop="onSetDefault(addr)">
              <ui-icon :name="addr.isDefault ? 'check' : 'circle'" size="28rpx" :color="addr.isDefault ? 'primary' : 'text-tertiary'" />
              <text class="card__action-text" :class="[addr.isDefault ? 'card__action-text--active' : '']">
                {{ addr.isDefault ? "默认地址" : "设为默认" }}
              </text>
            </view>
            <view class="card__action-right">
              <view class="card__action" @click.stop="onEdit(addr)">
                <ui-icon name="edit" size="28rpx" color="primary" />
                <text class="card__action-text card__action-text--primary">编辑</text>
              </view>
              <view class="card__action" @click.stop="onCopy(addr)">
                <ui-icon name="description" size="28rpx" color="text-secondary" />
                <text class="card__action-text">复制</text>
              </view>
            </view>
          </view>
        </view>
        <template #right>
          <view class="swipe-act swipe-act--edit" @click="onEdit(addr)">
            <ui-icon name="edit" color="text-inverse" size="36rpx" />
            <text class="swipe-act__text">编辑</text>
          </view>
          <view class="swipe-act swipe-act--del" @click="onDelete(idx)">
            <ui-icon name="delete" color="text-inverse" size="36rpx" />
            <text class="swipe-act__text">删除</text>
          </view>
        </template>
      </ui-swipe-cell>
    </view>

    <ui-empty v-else description="还没有收货地址" image="default">
      <template #footer>
        <ui-button type="primary" size="small" @click="onAdd">新增地址</ui-button>
      </template>
    </ui-empty>

    <view class="footer">
      <ui-button block type="primary" size="large" radius="44rpx" icon="plus" @click="onAdd">新增收货地址</ui-button>
      <text class="footer__hint">最多可保存 20 个地址</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useToast, useDialog } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "地址管理" },
})

const toast = useToast()
const dialog = useDialog()

interface Address {
  id: number
  name: string
  phone: string
  region: string
  detail: string
  isDefault: boolean
  type?: "home" | "company" | "school" | "other"
}

const addresses = ref<Address[]>([
  { id: 1, name: "张三丰", phone: "138 **** 8888", region: "广东省 深圳市 南山区", detail: "粤海街道科技园南区虚拟大学园 R3-A 栋 1502", isDefault: true, type: "home" },
  { id: 2, name: "李翠花", phone: "139 **** 6666", region: "北京市 朝阳区", detail: "建国路 88 号 SOHO 现代城 7 号楼 1502", isDefault: false, type: "company" },
  { id: 3, name: "王五郎", phone: "136 **** 1234", region: "上海市 浦东新区", detail: "张江高科技园区博云路 2 号腾飞大厦 B 座 8F", isDefault: false, type: "company" },
  { id: 4, name: "赵敏", phone: "133 **** 5577", region: "广东省 广州市 天河区", detail: "中山大道 168 号天娱广场 3 楼", isDefault: false, type: "other" },
  { id: 5, name: "周伯通", phone: "150 **** 9999", region: "浙江省 杭州市 西湖区", detail: "文一西路 969 号阿里巴巴 1 号楼", isDefault: false, type: "company" },
  { id: 6, name: "黄蓉", phone: "182 **** 3344", region: "江苏省 南京市 鼓楼区", detail: "汉口路 22 号南京大学 鼓楼校区", isDefault: false, type: "school" },
])

function typeColor(type?: string) {
  const map: Record<string, { label: string; icon: string; color: string; tagType: "primary" | "success" | "warning" | "info" }> = {
    home: { label: "家", icon: "home-o", color: "danger", tagType: "info" },
    company: { label: "公司", icon: "shop", color: "primary", tagType: "primary" },
    school: { label: "学校", icon: "bookmark-o", color: "warning", tagType: "warning" },
    other: { label: "其他", icon: "location", color: "info", tagType: "info" },
  }
  return map[type || "other"] || map.other
}

function onPick(addr: Address) {
  toast.text(`选择: ${addr.name}`)
}

function onEdit(addr: Address) {
  toast.text(`编辑 ${addr.name}`)
}

function onCopy(addr: Address) {
  uni.setClipboardData({ data: `${addr.name} ${addr.phone} ${addr.region} ${addr.detail}`, success: () => toast.success("已复制") })
}

function onSetDefault(addr: Address) {
  addresses.value.forEach((a) => (a.isDefault = a.id === addr.id))
  toast.success(`${addr.name} 设为默认`)
}

async function onDelete(idx: number) {
  const ok = await dialog.confirm({ title: "确认删除", content: "删除后无法恢复" })
  if (!ok) return
  addresses.value.splice(idx, 1)
  toast.success("已删除")
}

function onAdd() {
  toast.text("新增地址")
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 220rpx;
}

.hero {
  padding: var(--ui-spacing-lg) var(--ui-spacing-lg) var(--ui-spacing-md);

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-xl);
    font-weight: var(--ui-font-weight-bold);
  }

  &__sub {
    color: var(--ui-color-text-tertiary);
    display: block;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }
}

.list {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: 0 var(--ui-spacing-md);
  flex-direction: column;
}

.card {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);
  // 透明 border 占位，避免默认卡片 border-left 引发内容偏移
  box-shadow: var(--ui-shadow-xs);
  border-left: 8rpx solid transparent;

  &--default {
    border-left-color: var(--ui-color-danger);
  }

  &__head {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
  }

  &__type {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ui-radius-md);
    justify-content: center;

    &--home {
      background: var(--ui-color-danger-light);
    }

    &--company {
      background: var(--ui-color-primary-light);
    }

    &--school {
      background: var(--ui-color-warning-light);
    }

    &--other {
      background: var(--ui-color-info-light);
    }
  }

  &__user {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__name-row {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: baseline;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__phone {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__tags {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__address {
    color: var(--ui-color-text);
    display: block;
    padding: var(--ui-spacing-sm) 0 var(--ui-spacing-md);
    font-size: var(--ui-font-size-sm);
    line-height: 1.6;
    border-bottom: 1rpx solid var(--ui-color-border-light);
  }

  &__footer {
    display: flex;
    margin-top: var(--ui-spacing-md);
    align-items: center;
    justify-content: space-between;
  }

  &__action {
    gap: var(--ui-spacing-xxs);
    display: flex;
    padding: var(--ui-spacing-xs) 0;
    align-items: center;
  }

  &__action-right {
    gap: var(--ui-spacing-lg);
    display: flex;
    align-items: center;
  }

  &__action-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);

    &--active {
      color: var(--ui-color-primary);
    }

    &--primary {
      color: var(--ui-color-primary);
    }
  }
}

.swipe-act {
  gap: var(--ui-spacing-xs);
  width: 140rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &--edit {
    background: var(--ui-color-warning);
  }

  &--del {
    background: var(--ui-color-danger);
  }

  &__text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-xs);
  }
}

.footer {
  gap: var(--ui-spacing-xs);
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-md) calc(var(--ui-spacing-md) + env(safe-area-inset-bottom));
  position: fixed;
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;
  flex-direction: column;

  &__hint {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
