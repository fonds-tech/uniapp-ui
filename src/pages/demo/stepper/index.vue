<template>
  <demo-page>
    <demo-section title="基础用法" desc="点击加减按钮或直接输入">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="basic" />
        <text class="demo-text">当前值：{{ basic }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="尺寸 size" desc="small / medium / large 切换">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="sizeDemo.value" :size="sizeDemo.size" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in sizes" :key="s" size="small" :type="sizeDemo.size === s ? 'primary' : 'default'" @click="sizeDemo.size = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="主题 theme" desc="button / round / border 切换">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="themeDemo.value" :theme="themeDemo.theme" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="t in themes" :key="t" size="small" :type="themeDemo.theme === t ? 'primary' : 'default'" @click="themeDemo.theme = t">
            {{ t }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="范围 / 步长" desc="min/max/step 切换按钮组">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="rangeDemo.value" :min="rangeDemo.min" :max="rangeDemo.max" :step="rangeDemo.step" />
        <text class="demo-text">{{ rangeDemo.value }}（{{ rangeDemo.min }} ~ {{ rangeDemo.max }}，步长 {{ rangeDemo.step }}）</text>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="p in rangePresets" :key="p.label" size="small" :type="rangeDemo.min === p.min && rangeDemo.max === p.max ? 'primary' : 'default'" @click="applyRange(p)">
            {{ p.label }}
          </ui-button>
        </demo-block>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="s in stepPresets" :key="s" size="small" :type="rangeDemo.step === s ? 'primary' : 'default'" @click="rangeDemo.step = s">
            步 {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="小数 decimal-length" desc="step + decimal-length 联动">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="decimalDemo.value" :step="decimalDemo.step" :decimal-length="decimalDemo.len" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="d in decimalPresets" :key="d.label" size="small" :type="decimalDemo.len === d.len ? 'primary' : 'default'" @click="applyDecimal(d)">
            {{ d.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="显示控制" desc="showPlus / showMinus / showInput 独立切换">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="showDemo.value" :show-plus="showDemo.plus" :show-minus="showDemo.minus" :show-input="showDemo.input" />
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="showDemo.plus ? 'primary' : 'default'" @click="showDemo.plus = !showDemo.plus">加号</ui-button>
          <ui-button size="small" :type="showDemo.minus ? 'primary' : 'default'" @click="showDemo.minus = !showDemo.minus">减号</ui-button>
          <ui-button size="small" :type="showDemo.input ? 'primary' : 'default'" @click="showDemo.input = !showDemo.input">输入</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态" desc="normal / disabled / disabledInput / disablePlus / disableMinus 切换">
      <demo-block direction="column" :gap="16">
        <ui-stepper
          v-model="stateDemo.value"
          :disabled="stateDemo.state === 'disabled'"
          :disabled-input="stateDemo.state === 'disabledInput'"
          :disable-plus="stateDemo.state === 'disablePlus'"
          :disable-minus="stateDemo.state === 'disableMinus'"
        />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in states" :key="s" size="small" :type="stateDemo.state === s ? 'primary' : 'default'" @click="stateDemo.state = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="长按 long-press" desc="按住 500ms 后每 200ms 触发一次">
      <demo-block direction="column" :gap="12">
        <ui-stepper v-model="longPressValue" long-press :max="999" />
        <text class="demo-text">按住加号或减号试试，当前 {{ longPressValue }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="异步拦截 before-change" desc="超过 5 拦截，返回 Promise<false>">
      <demo-block direction="column" :gap="12">
        <ui-stepper v-model="asyncValue" :before-change="onBeforeChange" />
        <text class="demo-text">{{ asyncLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义按钮 slot" desc="#minus / #plus 完全替代默认图标">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="slotValue">
          <template #minus="{ disabled }">
            <view class="custom-btn" :class="{ 'custom-btn--off': disabled }">−</view>
          </template>
          <template #plus="{ disabled }">
            <view class="custom-btn custom-btn--primary" :class="{ 'custom-btn--off': disabled }">+</view>
          </template>
        </ui-stepper>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式 var 注入" desc="height / inputWidth / minusColor / plusColor 直传">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="customStyle" height="96rpx" input-width="120rpx" minus-color="warning" plus-color="success" input-text-color="text" />
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="plus / minus / change / overlimit / focus / blur 实时日志">
      <demo-block direction="column" :gap="12">
        <ui-stepper v-model="eventValue" :max="5" :min="0" @plus="logEvent('plus')" @minus="logEvent('minus')" @change="onChange" @overlimit="onOverlimit" @focus="logEvent('focus')" @blur="logEvent('blur')" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 购物车" desc="商品 + 数量增减 + 小计">
      <demo-block direction="column" :gap="16">
        <view v-for="item in cart" :key="item.name" class="cart-row">
          <view class="cart-row__info">
            <text class="cart-row__name">{{ item.name }}</text>
            <text class="cart-row__price">¥{{ item.price.toFixed(2) }}</text>
          </view>
          <ui-stepper v-model="item.count" :min="0" :max="99" size="small" />
        </view>
        <view class="cart-total">
          <text class="cart-total__label">合计</text>
          <text class="cart-total__price">¥{{ cartTotal.toFixed(2) }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 酒店预订" desc="成人 / 儿童 / 房间数（带 disabled 约束）">
      <demo-block direction="column" :gap="16">
        <view class="hotel-row">
          <text class="hotel-row__label">成人</text>
          <ui-stepper v-model="hotel.adult" :min="1" :max="6" size="small" />
        </view>
        <view class="hotel-row">
          <text class="hotel-row__label">儿童（0-12 岁）</text>
          <ui-stepper v-model="hotel.child" :min="0" :max="4" size="small" />
        </view>
        <view class="hotel-row">
          <text class="hotel-row__label">房间数</text>
          <ui-stepper v-model="hotel.rooms" :min="1" :max="3" size="small" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 礼品定制" desc="单价 + 数量 + 小数总价">
      <demo-block direction="column" :gap="16">
        <view class="gift-card">
          <text class="gift-card__title">定制蛋糕</text>
          <text class="gift-card__price">单价 ¥{{ gift.price.toFixed(2) }}</text>
          <view class="gift-card__row">
            <text>份数</text>
            <ui-stepper v-model="gift.count" :min="1" :max="10" theme="round" />
          </view>
          <view class="gift-card__row">
            <text>小计</text>
            <text class="gift-card__total">¥{{ (gift.price * gift.count).toFixed(2) }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { StepperSize, StepperTheme } from "@/uni_modules/uniapp-ui/ui-stepper"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Stepper 步进器" },
})

const toast = useToast()

const basic = ref(1)

const sizes: StepperSize[] = ["small", "medium", "large"]
const sizeDemo = reactive<{ value: number; size: StepperSize }>({ value: 1, size: "medium" })

const themes: StepperTheme[] = ["button", "round", "border"]
const themeDemo = reactive<{ value: number; theme: StepperTheme }>({ value: 1, theme: "button" })

const rangeDemo = reactive({ value: 5, min: 0, max: 100, step: 1 })
const rangePresets = [
  { label: "0 ~ 100", min: 0, max: 100 },
  { label: "1 ~ 10", min: 1, max: 10 },
  { label: "-10 ~ 10", min: -10, max: 10 },
]
const stepPresets = [1, 2, 5, 10]
function applyRange(p: { min: number; max: number }) {
  rangeDemo.min = p.min
  rangeDemo.max = p.max
  rangeDemo.value = Math.min(Math.max(rangeDemo.value, p.min), p.max)
}

const decimalDemo = reactive({ value: 0.5, step: 0.1, len: 1 })
const decimalPresets = [
  { label: "整数 (×1)", step: 1, len: 0 },
  { label: "1 位 (×0.1)", step: 0.1, len: 1 },
  { label: "2 位 (×0.01)", step: 0.01, len: 2 },
]
function applyDecimal(d: { step: number; len: number }) {
  decimalDemo.step = d.step
  decimalDemo.len = d.len
}

const showDemo = reactive({ value: 1, plus: true, minus: true, input: true })

const states = ["normal", "disabled", "disabledInput", "disablePlus", "disableMinus"] as const
const stateDemo = reactive<{ value: number; state: (typeof states)[number] }>({ value: 1, state: "normal" })

const longPressValue = ref(0)

const asyncValue = ref(1)
const asyncLog = ref("最大值 5；超过会被拦截")
function onBeforeChange(value: number | string): Promise<boolean> {
  return new Promise((resolve) => {
    asyncLog.value = `正在验证 ${value}...`
    setTimeout(() => {
      if (+value > 5) {
        asyncLog.value = `${value} 超过限制，已拒绝`
        toast.fail("最大只能 5")
        resolve(false)
      } else {
        asyncLog.value = `${value} 验证通过`
        resolve(true)
      }
    }, 300)
  })
}

const slotValue = ref(1)
const customStyle = ref(1)

const eventValue = ref(1)
const eventLog = ref("等待事件...")
function logEvent(name: string) {
  eventLog.value = `[${name}]`
}
function onChange(value: number | string, name: number | string | undefined) {
  eventLog.value = `[change] value=${value}, name=${name ?? "-"}`
}
function onOverlimit(type: "plus" | "minus") {
  eventLog.value = `[overlimit] ${type}`
  toast.fail(type === "plus" ? "已到最大值" : "已到最小值")
}

const cart = reactive([
  { name: "拿铁咖啡", price: 28, count: 1 },
  { name: "提拉米苏", price: 38, count: 2 },
  { name: "气泡水", price: 12, count: 0 },
])
const cartTotal = computed(() => cart.reduce((s, it) => s + it.price * it.count, 0))

const hotel = reactive({ adult: 2, child: 1, rooms: 1 })

const gift = reactive({ price: 158, count: 1 })
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.custom-btn {
  color: var(--ui-color-text);
  width: 72rpx;
  height: 72rpx;
  display: flex;
  font-size: 36rpx;
  background: var(--ui-color-background-section);
  align-items: center;
  font-weight: var(--ui-font-weight-bold);
  border-radius: 50%;
  justify-content: center;

  &--primary {
    color: var(--ui-color-text-inverse);
    background: var(--ui-color-primary);
  }

  &--off {
    opacity: var(--ui-opacity-disabled);
  }
}

.cart-row {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-sm) 0;
  align-items: center;

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }
}

.cart-total {
  display: flex;
  padding: var(--ui-spacing-md) 0;
  border-top: var(--ui-border-width-thin) solid var(--ui-color-border-light);
  align-items: center;
  justify-content: space-between;

  &__label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-normal);
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }
}

.hotel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
  }
}

.gift-card {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__price {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__total {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }
}
</style>
