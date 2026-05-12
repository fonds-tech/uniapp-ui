<template>
  <demo-page>
    <demo-section title="基础用法" desc="默认 4 列，居中、带细分割线，等宽撑满">
      <ui-grid>
        <ui-grid-item v-for="i in 8" :key="i" icon="image" text="格子" />
      </ui-grid>
    </demo-section>

    <demo-section title="列数 (columnNum)">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="n in [2, 3, 4, 5]" :key="n" size="small" :type="columnNum === n ? 'primary' : 'default'" @click="columnNum = n">{{ n }} 列</ui-button>
      </demo-block>
      <ui-grid :column-num="columnNum">
        <ui-grid-item v-for="i in columnNum * 2" :key="i" icon="image" :text="`${columnNum}列-${i}`" />
      </ui-grid>
    </demo-section>

    <demo-section title="间距 (gutter)" desc="数值默认 px，字符串透传单位；非 0 时自动隐藏分割线、显示圆角边框">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="g in [0, 16, 24, 32]" :key="g" size="small" :type="gutter === g ? 'primary' : 'default'" @click="gutter = g">{{ g === 0 ? "无" : `${g}rpx` }}</ui-button>
      </demo-block>
      <ui-grid :gutter="gutter">
        <ui-grid-item v-for="i in 8" :key="i" icon="image" text="格子" />
      </ui-grid>
    </demo-section>

    <demo-section title="排列方向 (direction)" desc="horizontal 模式图标在左、文字在右">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" :type="direction === 'vertical' ? 'primary' : 'default'" @click="direction = 'vertical'">vertical（默认）</ui-button>
        <ui-button size="small" :type="direction === 'horizontal' ? 'primary' : 'default'" @click="direction = 'horizontal'">horizontal</ui-button>
      </demo-block>
      <ui-grid :direction="direction" :column-num="2">
        <ui-grid-item v-for="i in 4" :key="i" icon="user" :text="`项目 ${i}`" />
      </ui-grid>
    </demo-section>

    <demo-section title="正方形格子 (square)" desc="height = width，撑成 1:1，常用于商品类宫格">
      <ui-grid square>
        <ui-grid-item v-for="i in 8" :key="i" icon="image" text="商品" />
      </ui-grid>
    </demo-section>

    <demo-section title="开关切换" desc="border 分割线 / center 内容居中 可独立控制">
      <demo-block direction="column" align="start" :gap="12">
        <demo-block align="center" :gap="20">
          <demo-block align="center" :gap="8">
            <ui-switch v-model="hasBorder" />
            <text class="switch-label">border</text>
          </demo-block>
          <demo-block align="center" :gap="8">
            <ui-switch v-model="hasCenter" />
            <text class="switch-label">center</text>
          </demo-block>
        </demo-block>
      </demo-block>
      <ui-grid :border="hasBorder" :center="hasCenter">
        <ui-grid-item v-for="i in 4" :key="i" icon="image" text="格子" />
      </ui-grid>
    </demo-section>

    <demo-section title="图标定制" desc="iconColor / iconSize 单格独立控制">
      <ui-grid>
        <ui-grid-item icon="home" text="默认" />
        <ui-grid-item icon="search" icon-color="#1989fa" text="蓝色" />
        <ui-grid-item icon="heart" icon-color="#ee0a24" text="红色" />
        <ui-grid-item icon="star" icon-color="#ff976a" text="橙色" />
        <ui-grid-item icon="setting" icon-size="72rpx" text="大图标" />
        <ui-grid-item icon="info" icon-size="40rpx" text="小图标" />
        <ui-grid-item icon="like" icon-color="#07c160" icon-size="64rpx" text="绿色大" />
        <ui-grid-item icon="bell" icon-color="#7232dd" icon-size="48rpx" text="紫色" />
      </ui-grid>
    </demo-section>

    <demo-section title="徽标 (dot / badge)" desc="dot 红点 / badge 文本徽标，由 ui-badge 渲染">
      <ui-grid>
        <ui-grid-item icon="message" text="消息" dot />
        <ui-grid-item icon="bell" text="通知" badge="5" />
        <ui-grid-item icon="cart" text="购物车" badge="99+" />
        <ui-grid-item icon="user" text="个人" badge="new" />
      </ui-grid>
    </demo-section>

    <demo-section title="可点击 (clickable)" desc="开启后整个 item 可点击 + active 反馈，emit click 事件">
      <ui-grid clickable>
        <ui-grid-item v-for="item in clickableItems" :key="item.text" :icon="item.icon" :icon-color="item.color" :text="item.text" @click="onTap(item.text)" />
      </ui-grid>
    </demo-section>

    <demo-section title="插槽" desc="icon / text / default 三个 slot 完全覆盖默认渲染">
      <ui-grid>
        <ui-grid-item text="自定义图标">
          <template #icon>
            <view class="custom-avatar">A</view>
          </template>
        </ui-grid-item>
        <ui-grid-item icon="star">
          <template #text>
            <view class="custom-text">
              <text class="custom-text__title">主标题</text>
              <text class="custom-text__desc">副描述</text>
            </view>
          </template>
        </ui-grid-item>
        <ui-grid-item>
          <template #icon>
            <ui-icon name="heart" color="#ee0a24" size="48rpx" />
          </template>
          <template #text>
            <text class="custom-text__highlight">精选</text>
          </template>
        </ui-grid-item>
        <ui-grid-item>
          <view class="custom-content">
            <ui-icon name="plus-circle" size="56rpx" color="#1989fa" />
            <text class="custom-content__text">添加</text>
          </view>
        </ui-grid-item>
      </ui-grid>
    </demo-section>

    <demo-section title="场景：应用入口" desc="square + clickable + 5 列，类微信发现页 / 支付宝首页">
      <ui-grid :column-num="5" clickable>
        <ui-grid-item v-for="app in apps" :key="app.text" :icon="app.icon" :icon-color="app.color" :text="app.text" @click="onTap(app.text)" />
      </ui-grid>
    </demo-section>

    <demo-section title="场景：分类导航" desc="带间距 + 圆角，类商城分类页">
      <ui-grid :column-num="3" :gutter="16" clickable>
        <ui-grid-item v-for="cat in categories" :key="cat.text" :icon="cat.icon" :icon-color="cat.color" :text="cat.text" @click="onTap(cat.text)" />
      </ui-grid>
    </demo-section>

    <demo-section title="场景：横向工具栏" desc="horizontal + 2 列，类设置页快捷项">
      <ui-grid direction="horizontal" :column-num="2" clickable>
        <ui-grid-item icon="user" icon-color="#1989fa" text="个人资料" @click="onTap('个人资料')" />
        <ui-grid-item icon="lock" icon-color="#07c160" text="账号安全" @click="onTap('账号安全')" />
        <ui-grid-item icon="bell" icon-color="#ff976a" text="消息通知" @click="onTap('消息通知')" />
        <ui-grid-item icon="info" icon-color="#7232dd" text="关于我们" @click="onTap('关于我们')" />
      </ui-grid>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Grid 宫格" },
})

const toast = useToast()

const columnNum = ref(4)
const gutter = ref(0)
const direction = ref<"vertical" | "horizontal">("vertical")
const hasBorder = ref(true)
const hasCenter = ref(true)

const clickableItems = [
  { icon: "wechat", text: "微信", color: "#07c160" },
  { icon: "qq", text: "QQ", color: "#1989fa" },
  { icon: "weibo", text: "微博", color: "#ee0a24" },
  { icon: "alipay", text: "支付宝", color: "#1296db" },
]

const apps = [
  { icon: "shop", text: "商城", color: "#ff6b6b" },
  { icon: "video", text: "视频", color: "#1989fa" },
  { icon: "music", text: "音乐", color: "#7232dd" },
  { icon: "game", text: "游戏", color: "#07c160" },
  { icon: "book", text: "阅读", color: "#ff976a" },
  { icon: "wallet", text: "钱包", color: "#ee0a24" },
  { icon: "gift", text: "礼物", color: "#fa8c16" },
  { icon: "more", text: "更多", color: "#999" },
  { icon: "scan", text: "扫一扫", color: "#1989fa" },
  { icon: "qrcode", text: "付款码", color: "#07c160" },
]

const categories = [
  { icon: "shop", text: "百货", color: "#ff6b6b" },
  { icon: "image", text: "数码", color: "#1989fa" },
  { icon: "user", text: "服饰", color: "#ee0a24" },
  { icon: "gift", text: "美妆", color: "#ff976a" },
  { icon: "home", text: "家居", color: "#07c160" },
  { icon: "more", text: "更多", color: "#7232dd" },
]

function onTap(text: string) {
  toast.text(text)
}
</script>

<style lang="scss" scoped>
.switch-label {
  color: var(--ui-color-text);
  font-size: 26rpx;
}

.custom-avatar {
  color: var(--ui-color-text-inverse);
  width: 56rpx;
  height: 56rpx;
  display: flex;
  font-size: 28rpx;
  background: linear-gradient(135deg, #1989fa, #07c160);
  align-items: center;
  font-weight: 600;
  border-radius: var(--ui-radius-round);
  justify-content: center;
}

.custom-text {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: 4rpx;
  }

  &__highlight {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }
}

.custom-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    margin-top: 16rpx;
  }
}
</style>
