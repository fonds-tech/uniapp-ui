<template>
  <image
    v-if="isImage(name)"
    :class="[prefix, `${prefix}-${useProps.name}`, useProps.customClass, isHover ? useProps.hoverClass : '']"
    :style="[imageStyle]"
    :src="useProps.name"
    :mode="imageMode"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  />
  <text
    v-else
    :class="[prefix, `${prefix}-${useProps.name}`, useProps.customClass, isHover ? useProps.hoverClass : '']"
    :style="[iconStyle]"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { merge } from "../utils/utils"
import { isImage } from "../utils/check"
import { useUnit, useColor, useStyle } from "../hooks"
import { iconEmits, iconProps, useIconProps } from "./index"

defineOptions({ name: "ui-icon" })

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)
const useProps = useIconProps(props)
const isHover = ref(false)

const prefix = computed(() => {
  return useProps.customPrefix || "ui-icon"
})

const imageMode: any = computed(() => useProps.imageMode)

const iconStyle = computed(() => {
  let style: any = {}
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.size)
  style.fontWeight = useProps.weight
  style.lineHeight = useProps.lineHeight
  style.borderRadius = useUnit(useProps.radius)
  style.background = useColor(useProps.background)
  if (isHover.value) {
    style = merge(style, useStyle(useProps.hoverStyle))
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const imageStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(useProps.width || useProps.size)
  style.height = useUnit(useProps.height || useProps.size)
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.radius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

function onClick() {
  emits("click")
}

function onTouchStart() {
  isHover.value = true
}

function onTouchEnd() {
  isHover.value = false
}

defineExpose({ name: "ui-icon" })
</script>

<script lang="ts">
export default {
  name: "ui-icon",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@font-face {
  src:
    url("//at.alicdn.com/t/c/font_4498300_sg67dc3zbd.woff2?t=1741228483978") format("woff2"),
    url("//at.alicdn.com/t/c/font_4498300_sg67dc3zbd.woff?t=1741228483978") format("woff"),
    url("//at.alicdn.com/t/c/font_4498300_sg67dc3zbd.ttf?t=1741228483978") format("truetype");
  font-family: "ui-icon";
}
/*  #ifdef  APP-PLUS  */
@font-face {
  src: url("./ui-icon.ttf") format("truetype");
  font-family: "ui-icon";
}
/*  #endif  */
.ui-icon {
  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  font-style: normal;
  text-align: center;
  align-items: center;
  font-family: "ui-icon" !important;
  line-height: 1;
  font-variant: normal;
  text-rendering: auto;
  text-transform: none;
  vertical-align: middle;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ui-icon-refresh:before {
  content: "\e609";
}

.ui-icon-calendar:before {
  content: "\e628";
}

.ui-icon-amount:before {
  content: "\e60d";
}

.ui-icon-logistics:before {
  content: "\e651";
}

.ui-icon-sharp-down:before {
  content: "\e689";
}

.ui-icon-sharp-back:before {
  content: "\e68a";
}

.ui-icon-sharp-forward:before {
  content: "\e68b";
}

.ui-icon-sharp-up:before {
  content: "\e688";
}

.ui-icon-warning:before {
  content: "\e641";
}

.ui-icon-warning-o:before {
  content: "\e640";
}

.ui-icon-wechat-o:before {
  content: "\e675";
}

.ui-icon-guide:before {
  content: "\e61d";
}

.ui-icon-loading:before {
  content: "\e627";
}

.ui-icon-arrow-down:before {
  content: "\e619";
}

.ui-icon-arrow-double-down:before {
  content: "\e61a";
}

.ui-icon-arrow-left:before {
  content: "\e61e";
}

.ui-icon-arrow:before {
  content: "\e61f";
}

.ui-icon-arrow-up:before {
  content: "\e621";
}

.ui-icon-arrow-double-up:before {
  content: "\e622";
}

.ui-icon-arrow-double-left:before {
  content: "\e61b";
}

.ui-icon-arrow-double-right:before {
  content: "\e61c";
}

.ui-icon-arrow-sort:before {
  content: "\e839";
}

.ui-icon-keyboard-hide:before {
  content: "\e87a";
}

.ui-icon-backspace-o:before {
  content: "\e610";
}

.ui-icon-backspace:before {
  content: "\e611";
}

.ui-icon-time:before {
  content: "\e62d";
}

.ui-icon-check:before {
  content: "\e683";
}

.ui-icon-search:before {
  content: "\e786";
}

.ui-icon-star-circle:before {
  content: "\e738";
}

.ui-icon-star-circle-o:before {
  content: "\e67b";
}

.ui-icon-play:before {
  content: "\e785";
}

.ui-icon-service-o:before {
  content: "\e749";
}

.ui-icon-qr-invalid:before {
  content: "\e74a";
}

.ui-icon-question-o:before {
  content: "\e74b";
}

.ui-icon-records:before {
  content: "\e74c";
}

.ui-icon-setting:before {
  content: "\e74d";
}

.ui-icon-setting-o:before {
  content: "\e74e";
}

.ui-icon-shop-collect-o:before {
  content: "\e74f";
}

.ui-icon-share-o:before {
  content: "\e750";
}

.ui-icon-replay:before {
  content: "\e751";
}

.ui-icon-question:before {
  content: "\e752";
}

.ui-icon-refund-o:before {
  content: "\e753";
}

.ui-icon-shopping-cart:before {
  content: "\e754";
}

.ui-icon-shop:before {
  content: "\e755";
}

.ui-icon-shopping-cart-o:before {
  content: "\e756";
}

.ui-icon-shop-collect:before {
  content: "\e757";
}

.ui-icon-sign:before {
  content: "\e758";
}

.ui-icon-shop-o:before {
  content: "\e759";
}

.ui-icon-smile-o:before {
  content: "\e75a";
}

.ui-icon-smile-comment-o:before {
  content: "\e75b";
}

.ui-icon-stop:before {
  content: "\e75c";
}

.ui-icon-smile:before {
  content: "\e75d";
}

.ui-icon-stop-circle:before {
  content: "\e75e";
}

.ui-icon-success:before {
  content: "\e75f";
}

.ui-icon-smile-comment:before {
  content: "\e760";
}

.ui-icon-tosend:before {
  content: "\e761";
}

.ui-icon-star-o:before {
  content: "\e762";
}

.ui-icon-todo-list:before {
  content: "\e763";
}

.ui-icon-sort:before {
  content: "\e764";
}

.ui-icon-underway:before {
  content: "\e765";
}

.ui-icon-tv-o:before {
  content: "\e766";
}

.ui-icon-umbrella-circle:before {
  content: "\e767";
}

.ui-icon-video:before {
  content: "\e768";
}

.ui-icon-vip-card:before {
  content: "\e769";
}

.ui-icon-service:before {
  content: "\e76a";
}

.ui-icon-volume-o:before {
  content: "\e76b";
}

.ui-icon-user-o:before {
  content: "\e76c";
}

.ui-icon-wap-nav:before {
  content: "\e76d";
}

.ui-icon-wap-home:before {
  content: "\e76e";
}

.ui-icon-video-o:before {
  content: "\e76f";
}

.ui-icon-wap-home-o:before {
  content: "\e770";
}

.ui-icon-weapp-nav:before {
  content: "\e771";
}

.ui-icon-underway-o:before {
  content: "\e772";
}

.ui-icon-vip-card-o:before {
  content: "\e774";
}

.ui-icon-volume:before {
  content: "\e775";
}

.ui-icon-user-circle-o:before {
  content: "\e776";
}

.ui-icon-warn-o:before {
  content: "\e777";
}

.ui-icon-wechat-pay:before {
  content: "\e779";
}

.ui-icon-shrink:before {
  content: "\e77a";
}

.ui-icon-star:before {
  content: "\e77b";
}

.ui-icon-youzan-shield:before {
  content: "\e77c";
}

.ui-icon-thumb-circle:before {
  content: "\e77d";
}

.ui-icon-todo-list-o:before {
  content: "\e77e";
}

.ui-icon-thumb-circle-o:before {
  content: "\e77f";
}

.ui-icon-wechat:before {
  content: "\e780";
}

.ui-icon-upgrade:before {
  content: "\e781";
}

.ui-icon-shield-o:before {
  content: "\e782";
}

.ui-icon-invitation:before {
  content: "\e783";
}

.ui-icon-guide-o:before {
  content: "\e784";
}

.ui-icon-add-square:before {
  content: "\e693";
}

.ui-icon-add:before {
  content: "\e694";
}

.ui-icon-add-o:before {
  content: "\e695";
}

.ui-icon-aim:before {
  content: "\e697";
}

.ui-icon-alipay:before {
  content: "\e69b";
}

.ui-icon-ascending:before {
  content: "\e69c";
}

.ui-icon-after-sale:before {
  content: "\e69d";
}

.ui-icon-bag-o:before {
  content: "\e69e";
}

.ui-icon-audio:before {
  content: "\e69f";
}

.ui-icon-back-top:before {
  content: "\e6a0";
}

.ui-icon-award:before {
  content: "\e6a1";
}

.ui-icon-bag:before {
  content: "\e6a2";
}

.ui-icon-award-o:before {
  content: "\e6a3";
}

.ui-icon-balance-list:before {
  content: "\e6a4";
}

.ui-icon-balance-o:before {
  content: "\e6a5";
}

.ui-icon-bell:before {
  content: "\e6a6";
}

.ui-icon-bar-chart-o:before {
  content: "\e6a7";
}

.ui-icon-balance-list-o:before {
  content: "\e6a8";
}

.ui-icon-bars:before {
  content: "\e6a9";
}

.ui-icon-balance-pay:before {
  content: "\e6aa";
}

.ui-icon-birthday-cake-o:before {
  content: "\e6ab";
}

.ui-icon-bill-o:before {
  content: "\e6ac";
}

.ui-icon-bookmark:before {
  content: "\e6ad";
}

.ui-icon-bookmark-o:before {
  content: "\e6ae";
}

.ui-icon-browsing-history-o:before {
  content: "\e6af";
}

.ui-icon-brush-o:before {
  content: "\e6b0";
}

.ui-icon-bill:before {
  content: "\e6b1";
}

.ui-icon-bullhorn-o:before {
  content: "\e6b2";
}

.ui-icon-bulb-o:before {
  content: "\e6b3";
}

.ui-icon-calendar-o:before {
  content: "\e6b4";
}

.ui-icon-card:before {
  content: "\e6b5";
}

.ui-icon-cart:before {
  content: "\e6b6";
}

.ui-icon-browsing-history:before {
  content: "\e6b7";
}

.ui-icon-cart-o:before {
  content: "\e6b8";
}

.ui-icon-chart-trending-o:before {
  content: "\e6b9";
}

.ui-icon-cash-back-record:before {
  content: "\e6ba";
}

.ui-icon-certificate:before {
  content: "\e6bb";
}

.ui-icon-cashier-o:before {
  content: "\e6bc";
}

.ui-icon-cash-on-deliver:before {
  content: "\e6bd";
}

.ui-icon-cart-circle-o:before {
  content: "\e6be";
}

.ui-icon-chat:before {
  content: "\e6bf";
}

.ui-icon-clock:before {
  content: "\e6c0";
}

.ui-icon-circle:before {
  content: "\e6c1";
}

.ui-icon-cart-circle:before {
  content: "\e6c2";
}

.ui-icon-apps-o:before {
  content: "\e6c3";
}

.ui-icon-clear:before {
  content: "\e6c4";
}

.ui-icon-close:before {
  content: "\e6c5";
}

.ui-icon-checked:before {
  content: "\e6c6";
}

.ui-icon-comment-o:before {
  content: "\e6c7";
}

.ui-icon-comment-circle-o:before {
  content: "\e6c8";
}

.ui-icon-closed-eye:before {
  content: "\e6c9";
}

.ui-icon-clock-o:before {
  content: "\e6ca";
}

.ui-icon-cluster-o:before {
  content: "\e6cb";
}

.ui-icon-chat-o:before {
  content: "\e6cc";
}

.ui-icon-cluster:before {
  content: "\e6cd";
}

.ui-icon-column:before {
  content: "\e6ce";
}

.ui-icon-comment:before {
  content: "\e6cf";
}

.ui-icon-contact:before {
  content: "\e6d0";
}

.ui-icon-credit-pay:before {
  content: "\e6d1";
}

.ui-icon-coupon-o:before {
  content: "\e6d2";
}

.ui-icon-completed:before {
  content: "\e6d3";
}

.ui-icon-descending:before {
  content: "\e6d4";
}

.ui-icon-comment-circle:before {
  content: "\e6d5";
}

.ui-icon-cross:before {
  content: "\e6d6";
}

.ui-icon-diamond:before {
  content: "\e6d7";
}

.ui-icon-delete:before {
  content: "\e6d8";
}

.ui-icon-diamond-o:before {
  content: "\e6d9";
}

.ui-icon-envelop-o:before {
  content: "\e6da";
}

.ui-icon-desktop-o:before {
  content: "\e6db";
}

.ui-icon-ecard-pay:before {
  content: "\e6dc";
}

.ui-icon-edit:before {
  content: "\e6dd";
}

.ui-icon-coupon:before {
  content: "\e6de";
}

.ui-icon-delete-o:before {
  content: "\e6df";
}

.ui-icon-down:before {
  content: "\e6e0";
}

.ui-icon-ellipsis:before {
  content: "\e6e1";
}

.ui-icon-enlarge:before {
  content: "\e6e2";
}

.ui-icon-expand:before {
  content: "\e6e3";
}

.ui-icon-description:before {
  content: "\e6e4";
}

.ui-icon-exchange:before {
  content: "\e6e5";
}

.ui-icon-eye-o:before {
  content: "\e6e6";
}

.ui-icon-expand-o:before {
  content: "\e6e7";
}

.ui-icon-eye:before {
  content: "\e6e8";
}

.ui-icon-fail:before {
  content: "\e6e9";
}

.ui-icon-debit-pay:before {
  content: "\e6ea";
}

.ui-icon-discount:before {
  content: "\e6eb";
}

.ui-icon-filter-o:before {
  content: "\e6ec";
}

.ui-icon-failure:before {
  content: "\e6ed";
}

.ui-icon-fire:before {
  content: "\e6ee";
}

.ui-icon-font:before {
  content: "\e6ef";
}

.ui-icon-flag-o:before {
  content: "\e6f0";
}

.ui-icon-font-o:before {
  content: "\e6f1";
}

.ui-icon-fire-o:before {
  content: "\e6f2";
}

.ui-icon-free-postage:before {
  content: "\e6f3";
}

.ui-icon-friends-o:before {
  content: "\e6f4";
}

.ui-icon-gem-o:before {
  content: "\e6f5";
}

.ui-icon-gem:before {
  content: "\e6f6";
}

.ui-icon-friends:before {
  content: "\e6f7";
}

.ui-icon-gift:before {
  content: "\e6f8";
}

.ui-icon-gift-o:before {
  content: "\e6f9";
}

.ui-icon-gift-card-o:before {
  content: "\e6fa";
}

.ui-icon-good-job:before {
  content: "\e6fb";
}

.ui-icon-flower-o:before {
  content: "\e6fc";
}

.ui-icon-gold-coin-o:before {
  content: "\e6fd";
}

.ui-icon-gold-coin:before {
  content: "\e6fe";
}

.ui-icon-good-job-o:before {
  content: "\e6ff";
}

.ui-icon-home-o:before {
  content: "\e700";
}

.ui-icon-gift-card:before {
  content: "\e701";
}

.ui-icon-graphic:before {
  content: "\e702";
}

.ui-icon-hot-o:before {
  content: "\e703";
}

.ui-icon-idcard:before {
  content: "\e704";
}

.ui-icon-hot-sale-o:before {
  content: "\e705";
}

.ui-icon-info:before {
  content: "\e706";
}

.ui-icon-hot-sale:before {
  content: "\e707";
}

.ui-icon-hotel-o:before {
  content: "\e708";
}

.ui-icon-goods-collect-o:before {
  content: "\e709";
}

.ui-icon-info-o:before {
  content: "\e70a";
}

.ui-icon-label-o:before {
  content: "\e70b";
}

.ui-icon-hot:before {
  content: "\e70c";
}

.ui-icon-label:before {
  content: "\e70d";
}

.ui-icon-location-o:before {
  content: "\e70e";
}

.ui-icon-goods-collect:before {
  content: "\e70f";
}

.ui-icon-location:before {
  content: "\e711";
}

.ui-icon-lock:before {
  content: "\e712";
}

.ui-icon-like-o:before {
  content: "\e713";
}

.ui-icon-live:before {
  content: "\e714";
}

.ui-icon-manager-o:before {
  content: "\e715";
}

.ui-icon-like:before {
  content: "\e716";
}

.ui-icon-manager:before {
  content: "\e717";
}

.ui-icon-map-marked:before {
  content: "\e718";
}

.ui-icon-more:before {
  content: "\e71a";
}

.ui-icon-medal:before {
  content: "\e71b";
}

.ui-icon-more-o:before {
  content: "\e71c";
}

.ui-icon-music-o:before {
  content: "\e71d";
}

.ui-icon-music:before {
  content: "\e71e";
}

.ui-icon-newspaper-o:before {
  content: "\e71f";
}

.ui-icon-minus:before {
  content: "\e720";
}

.ui-icon-new-o:before {
  content: "\e721";
}

.ui-icon-new-arrival:before {
  content: "\e722";
}

.ui-icon-notes-o:before {
  content: "\e723";
}

.ui-icon-orders-o:before {
  content: "\e724";
}

.ui-icon-medal-o:before {
  content: "\e725";
}

.ui-icon-new:before {
  content: "\e726";
}

.ui-icon-new-arrival-o:before {
  content: "\e727";
}

.ui-icon-other-pay:before {
  content: "\e728";
}

.ui-icon-pause:before {
  content: "\e729";
}

.ui-icon-peer-pay:before {
  content: "\e72a";
}

.ui-icon-paid:before {
  content: "\e72b";
}

.ui-icon-passed:before {
  content: "\e72c";
}

.ui-icon-pause-circle:before {
  content: "\e72d";
}

.ui-icon-pause-circle-o:before {
  content: "\e72e";
}

.ui-icon-phone-o:before {
  content: "\e72f";
}

.ui-icon-pending-payment:before {
  content: "\e730";
}

.ui-icon-photograph:before {
  content: "\e731";
}

.ui-icon-phone-circle:before {
  content: "\e732";
}

.ui-icon-photo-fail:before {
  content: "\e733";
}

.ui-icon-phone:before {
  content: "\e734";
}

.ui-icon-photo:before {
  content: "\e735";
}

.ui-icon-plus:before {
  content: "\e736";
}

.ui-icon-photo-o:before {
  content: "\e737";
}

.ui-icon-play-circle:before {
  content: "\e739";
}

.ui-icon-share:before {
  content: "\e73a";
}

.ui-icon-point-gift:before {
  content: "\e73b";
}

.ui-icon-points:before {
  content: "\e73c";
}

.ui-icon-point-gift-o:before {
  content: "\e73d";
}

.ui-icon-printer:before {
  content: "\e73e";
}

.ui-icon-revoke:before {
  content: "\e73f";
}

.ui-icon-phone-circle-o:before {
  content: "\e741";
}

.ui-icon-send-gift-o:before {
  content: "\e742";
}

.ui-icon-scan:before {
  content: "\e743";
}

.ui-icon-send-gift:before {
  content: "\e744";
}

.ui-icon-qr:before {
  content: "\e745";
}

.ui-icon-play-circle-o:before {
  content: "\e747";
}

.ui-icon-stop-circle-o:before {
  content: "\e748";
}

.ui-icon-share-circle:before {
  content: "\e613";
}

.ui-icon-qrcode:before {
  content: "\e746";
}

.ui-icon-image-error:before {
  content: "\e710";
}
</style>
