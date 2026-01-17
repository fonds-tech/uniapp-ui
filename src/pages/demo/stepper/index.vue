<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-stepper v-model="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="步长设置">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value2" :step="2" />
          <text class="stepper-label">步长 2</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value2b" :step="5" />
          <text class="stepper-label">步长 5</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="限制范围">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value3" :min="5" :max="10" />
          <text class="stepper-label">5 - 10</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value3b" :min="0" :max="100" />
          <text class="stepper-label">0 - 100</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value4" disabled />
          <text class="stepper-label">禁用</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value5" disabled-input />
          <text class="stepper-label">禁用输入</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：禁用按钮 -->
    <demo-section title="禁用按钮">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value5c" disable-plus />
          <text class="stepper-label">禁用加号</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value5d" disable-minus />
          <text class="stepper-label">禁用减号</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="小数位数">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value6" :step="0.1" :decimal-length="1" />
          <text class="stepper-label">1 位小数</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value6b" :step="0.01" :decimal-length="2" />
          <text class="stepper-label">2 位小数</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：整数模式 -->
    <demo-section title="整数模式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">integer 属性限制只能输入正整数</text>
        <ui-stepper v-model="valueInteger" integer />
      </demo-block>
    </demo-section>

    <demo-section title="主题风格">
      <demo-block :cols="3" :gap="16">
        <view class="stepper-item">
          <ui-stepper v-model="value7" />
          <text class="stepper-label">button</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value7b" theme="round" />
          <text class="stepper-label">round</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value7c" theme="border" />
          <text class="stepper-label">border</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="长按快速加减">
      <demo-block direction="column" align="start" :gap="16">
        <ui-stepper v-model="value8" long-press />
        <text class="demo-text">长按按钮快速增减</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value9" height="56rpx" input-width="72rpx" />
          <text class="stepper-label">小</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value9b" height="72rpx" input-width="100rpx" />
          <text class="stepper-label">大</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：标识符 -->
    <demo-section title="标识符">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">name 属性用于标识步进器</text>
        <ui-stepper v-model="value10" name="quantity" @change="onNameChange" />
        <text class="demo-text">{{ nameLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：输入框样式 -->
    <demo-section title="输入框样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">自定义输入框颜色、文字大小和颜色</text>
        <ui-stepper v-model="value11" input-color="#f0f9ff" input-text-size="32rpx" input-text-color="#1989fa" input-text-weight="600" />
      </demo-block>
    </demo-section>

    <!-- 新增：输入框间隙 -->
    <demo-section title="输入框间隙">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value12" input-gap="8rpx" />
          <text class="stepper-label">8rpx</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value12b" input-gap="16rpx" />
          <text class="stepper-label">16rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：按钮样式 -->
    <demo-section title="按钮样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">自定义加减按钮样式</text>
        <ui-stepper v-model="value13" minus-color="#f2f3f5" minus-text-color="#ee0a24" plus-color="#1989fa" plus-text-color="#fff" />
      </demo-block>
    </demo-section>

    <!-- 新增：按钮宽度 -->
    <demo-section title="按钮宽度">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">单独设置加减按钮宽度</text>
        <ui-stepper v-model="value14" minus-width="64rpx" plus-width="80rpx" />
      </demo-block>
    </demo-section>

    <!-- 新增：边框样式 -->
    <demo-section title="边框样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">border 主题下自定义边框</text>
        <ui-stepper v-model="value15" theme="border" border-color="#1989fa" border-width="2rpx" />
        <ui-stepper v-model="value15b" theme="border" minus-border-color="#ee0a24" plus-border-color="#07c160" />
      </demo-block>
    </demo-section>

    <!-- 新增：显示控制 -->
    <demo-section title="显示控制">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="3" :gap="16">
          <view class="stepper-item">
            <ui-stepper v-model="value16" :show-minus="false" />
            <text class="stepper-label">隐藏减号</text>
          </view>
          <view class="stepper-item">
            <ui-stepper v-model="value16b" :show-plus="false" />
            <text class="stepper-label">隐藏加号</text>
          </view>
          <view class="stepper-item">
            <ui-stepper v-model="value16c" :show-input="false" />
            <text class="stepper-label">隐藏输入框</text>
          </view>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：异步变更 -->
    <demo-section title="异步变更">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">beforeChange 拦截值变更</text>
        <ui-stepper v-model="value17" :before-change="onBeforeChange" />
        <text class="demo-text">{{ asyncLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-stepper
          v-model="value18"
          :min="0"
          :max="10"
          @click="onStepperClick"
          @focus="onStepperFocus"
          @blur="onStepperBlur"
          @plus="onStepperPlus"
          @minus="onStepperMinus"
          @change="onStepperChange"
          @overlimit="onStepperOverlimit"
        />
        <text class="demo-text">{{ eventLog }}</text>
        <view class="event-list">
          <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <text class="event-text">{{ log }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="16">
        <ui-stepper v-model="value19" custom-class="my-stepper" />
        <ui-stepper v-model="value19b" :custom-style="{ background: '#f0f9ff', borderRadius: '16rpx', padding: '8rpx' }" />
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 购物车数量 -->
    <demo-section title="综合示例 - 购物车数量">
      <demo-block direction="column" :gap="16">
        <view v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <image class="cart-image" :src="item.image" mode="aspectFill" />
          <view class="cart-info">
            <text class="cart-name">{{ item.name }}</text>
            <view class="cart-bottom">
              <text class="cart-price">¥{{ item.price.toFixed(2) }}</text>
              <ui-stepper v-model="item.count" :min="1" :max="99" height="48rpx" input-width="56rpx" theme="round" @change="onCartChange(index)" />
            </view>
          </view>
        </view>
        <view class="cart-total">
          <text class="cart-total-label">合计:</text>
          <text class="cart-total-price">¥{{ cartTotal.toFixed(2) }}</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 商品规格 -->
    <demo-section title="综合示例 - 商品规格">
      <demo-block direction="column" :gap="16">
        <view class="spec-row">
          <text class="spec-label">购买数量</text>
          <ui-stepper v-model="specCount" :min="1" :max="specStock" long-press />
        </view>
        <view class="spec-tip">
          <text class="spec-stock">库存 {{ specStock }} 件</text>
          <text v-if="specCount >= specStock" class="spec-warning">已达最大库存</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 价格设置 -->
    <demo-section title="综合示例 - 价格设置">
      <demo-block direction="column" :gap="16">
        <view class="price-row">
          <text class="price-label">商品单价</text>
          <view class="price-input">
            <text class="price-symbol">¥</text>
            <ui-stepper
              v-model="productPrice"
              :min="0"
              :step="0.1"
              :decimal-length="2"
              input-width="120rpx"
              input-text-size="32rpx"
              input-text-color="#ee0a24"
              input-text-weight="600"
            />
          </view>
        </view>
        <view class="price-row">
          <text class="price-label">优惠折扣</text>
          <view class="price-input">
            <ui-stepper v-model="discountRate" :min="0.1" :max="1" :step="0.1" :decimal-length="1" input-width="80rpx" />
            <text class="discount-text">折</text>
          </view>
        </view>
        <view class="price-result">
          <text class="price-result-label">优惠价:</text>
          <text class="price-result-value">¥{{ (productPrice * discountRate).toFixed(2) }}</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Stepper 步进器" },
})

const toast = useToast()

// 基础用法
const value1 = ref(1)
const value2 = ref(0)
const value2b = ref(0)
const value3 = ref(5)
const value3b = ref(50)
const value4 = ref(1)
const value5 = ref(1)
const value5c = ref(5)
const value5d = ref(5)
const value6 = ref(0.5)
const value6b = ref(0.05)
const valueInteger = ref(1)
const value7 = ref(1)
const value7b = ref(1)
const value7c = ref(1)
const value8 = ref(1)
const value9 = ref(1)
const value9b = ref(1)

// 标识符
const value10 = ref(1)
const nameLog = ref("修改值触发 change 事件")

function onNameChange(value: number | string, name: number | string) {
  nameLog.value = `name: ${name}, value: ${value}`
}

// 输入框样式
const value11 = ref(5)

// 输入框间隙
const value12 = ref(1)
const value12b = ref(1)

// 按钮样式
const value13 = ref(1)

// 按钮宽度
const value14 = ref(1)

// 边框样式
const value15 = ref(1)
const value15b = ref(1)

// 显示控制
const value16 = ref(5)
const value16b = ref(5)
const value16c = ref(5)

// 异步变更
const value17 = ref(1)
const asyncLog = ref("值变更前会触发 beforeChange")

function onBeforeChange(value: number): Promise<boolean> {
  return new Promise((resolve) => {
    asyncLog.value = `正在验证值 ${value}...`
    setTimeout(() => {
      if (value > 5) {
        asyncLog.value = `值 ${value} 超过限制，变更被拒绝`
        toast.fail("最大只能设置 5")
        resolve(false)
      } else {
        asyncLog.value = `值 ${value} 验证通过`
        resolve(true)
      }
    }, 500)
  })
}

// 事件处理
const value18 = ref(5)
const eventLog = ref("操作步进器触发事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 6) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

function onStepperClick() {
  addEventLog("触发 click 事件")
}

function onStepperFocus() {
  addEventLog("触发 focus 事件 - 输入框聚焦")
}

function onStepperBlur() {
  addEventLog("触发 blur 事件 - 输入框失焦")
}

function onStepperPlus() {
  addEventLog("触发 plus 事件 - 点击加号")
}

function onStepperMinus() {
  addEventLog("触发 minus 事件 - 点击减号")
}

function onStepperChange(value: number | string) {
  addEventLog(`触发 change 事件，值: ${value}`)
}

function onStepperOverlimit(type: string) {
  addEventLog(`触发 overlimit 事件，类型: ${type}`)
  toast.fail(type === "plus" ? "已达最大值" : "已达最小值")
}

// 自定义样式
const value19 = ref(1)
const value19b = ref(1)

// 综合示例 - 购物车
const cartItems = ref([
  {
    name: "精选商品 A",
    price: 99.0,
    count: 1,
    image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  },
  {
    name: "精选商品 B",
    price: 199.0,
    count: 2,
    image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
  },
  {
    name: "精选商品 C",
    price: 59.0,
    count: 1,
    image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  },
])

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.count, 0)
})

function onCartChange(index: number) {
  toast.text(`商品${index + 1} 数量已更新`)
}

// 综合示例 - 商品规格
const specCount = ref(1)
const specStock = ref(20)

// 综合示例 - 价格设置
const productPrice = ref(99.0)
const discountRate = ref(0.8)
</script>

<style lang="scss" scoped>
.stepper-item {
  gap: 12rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.stepper-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.event-list {
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  max-height: 300rpx;
  overflow-y: auto;
  border-radius: 8rpx;
}

.event-item {
  padding: 8rpx 0;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}

.cart-item {
  gap: 24rpx;
  display: flex;
  padding: 24rpx;
  background: #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  border-radius: 16rpx;
}

.cart-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
}

.cart-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-name {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  font-weight: 500;
}

.cart-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-price {
  color: #ee0a24;
  font-size: 32rpx;
  font-weight: 600;
}

.cart-total {
  gap: 16rpx;
  display: flex;
  padding: 24rpx 0;
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;
  justify-content: flex-end;
}

.cart-total-label {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
}

.cart-total-price {
  color: #ee0a24;
  font-size: 40rpx;
  font-weight: 600;
}

.spec-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.spec-label {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
}

.spec-tip {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.spec-stock {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.spec-warning {
  color: #ee0a24;
  font-size: 24rpx;
}

.price-row {
  display: flex;
  padding: 16rpx 0;
  align-items: center;
  justify-content: space-between;
}

.price-label {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
}

.price-input {
  gap: 8rpx;
  display: flex;
  align-items: center;
}

.price-symbol {
  color: #ee0a24;
  font-size: 28rpx;
}

.discount-text {
  color: var(--ui-color-text-secondary);
  font-size: 28rpx;
}

.price-result {
  gap: 16rpx;
  display: flex;
  padding: 24rpx 0;
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;
  justify-content: flex-end;
}

.price-result-label {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
}

.price-result-value {
  color: #ee0a24;
  font-size: 40rpx;
  font-weight: 600;
}

:deep(.my-stepper) {
  padding: 8rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
}
</style>
