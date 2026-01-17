<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block justify="center">
        <ui-number-roll :value="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block justify="center">
        <ui-number-roll :value="value2" color="#ee0a24" :font-size="48" font-weight="600" />
      </demo-block>
    </demo-section>

    <demo-section title="千位分隔符">
      <demo-block justify="center">
        <ui-number-roll :value="value3" thousands-sep="," :font-size="36" />
      </demo-block>
    </demo-section>

    <demo-section title="小数位数">
      <demo-block justify="center">
        <ui-number-roll :value="value4" :decimal-places="2" :trim-zero="false" :font-size="36" />
      </demo-block>
    </demo-section>

    <demo-section title="动态更新">
      <demo-block direction="column">
        <demo-block justify="center">
          <ui-number-roll :value="dynamicValue" :font-size="48" color="#1989fa" font-weight="600" />
        </demo-block>
        <demo-block :cols="3" :gap="24" justify="center">
          <ui-button size="small" @click="addValue">+100</ui-button>
          <ui-button size="small" @click="subtractValue">-100</ui-button>
          <ui-button size="small" type="primary" @click="randomValue">随机</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="金额展示">
      <demo-block justify="center" align="end" class="money-display">
        <text class="money-symbol">¥</text>
        <ui-number-roll :value="moneyValue" thousands-sep="," :decimal-places="2" :trim-zero="false" :font-size="56" color="#ee0a24" font-weight="600" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "NumberRoll 数字滚动" },
})

const value1 = ref(12345)
const value2 = ref(99999)
const value3 = ref(1234567)
const value4 = ref(123.5)
const dynamicValue = ref(1000)
const moneyValue = ref(88888.88)

function addValue() {
  dynamicValue.value += 100
}

function subtractValue() {
  dynamicValue.value = Math.max(0, dynamicValue.value - 100)
}

function randomValue() {
  dynamicValue.value = Math.floor(Math.random() * 100000)
}
</script>

<style lang="scss" scoped>
.money-symbol {
  color: #ee0a24;
  font-size: 36rpx;
  font-weight: 600;
  margin-right: 8rpx;
}
</style>
