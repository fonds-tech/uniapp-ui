<template>
  <demo-page>
    <demo-section title="基础演示" desc="展示当前 props 切换效果">
      <demo-block justify="center">
        <ui-number-roll
          :value="currentValue"
          :font-size="currentFontSize"
          :font-weight="currentFontWeight"
          :color="currentColor"
          :duration="currentDuration"
          :timing-function="currentTiming"
          :decimal-places="currentDecimal"
          :trim-zero="currentTrimZero"
          :thousands-sep="currentSep"
        />
      </demo-block>
    </demo-section>

    <demo-section title="数据控制" desc="动态修改 value，列动画自动触发">
      <demo-block :cols="4" :gap="12">
        <ui-button size="small" @click="currentValue += 100">+100</ui-button>
        <ui-button size="small" @click="currentValue = Math.max(0, currentValue - 100)">-100</ui-button>
        <ui-button size="small" @click="currentValue = Math.floor(Math.random() * 100000)">随机</ui-button>
        <ui-button size="small" @click="currentValue = 0">归零</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="字号" desc="fontSize 同时驱动行高">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="s in fontSizes" :key="s" size="small" :type="currentFontSize === s ? 'primary' : 'default'" @click="currentFontSize = s">{{ s || "默认" }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="字重" desc="fontWeight 控制粗细">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="w in fontWeights" :key="w.value" size="small" :type="currentFontWeight === w.value ? 'primary' : 'default'" @click="currentFontWeight = w.value">
          {{ w.label }}
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="颜色" desc="color 接受语义 token 或十六进制">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="c in colors" :key="c.value" size="small" :type="currentColor === c.value ? 'primary' : 'default'" @click="currentColor = c.value">
          {{ c.label }}
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="过渡时长 (ms)" desc="duration 控制单次滚动时间">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="d in durations" :key="d" size="small" :type="currentDuration === d ? 'primary' : 'default'" @click="currentDuration = d">{{ d }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="缓动函数" desc="timingFunction 控制滚动节奏曲线">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="t in timings" :key="t" size="small" :type="currentTiming === t ? 'primary' : 'default'" @click="currentTiming = t">{{ t }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="格式化" desc="decimalPlaces / trimZero / thousandsSep 组合">
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" :type="currentDecimal === 0 ? 'primary' : 'default'" @click="currentDecimal = 0">0 位小数</ui-button>
        <ui-button size="small" :type="currentDecimal === 2 ? 'primary' : 'default'" @click="currentDecimal = 2">2 位小数</ui-button>
        <ui-button size="small" :type="currentDecimal === 4 ? 'primary' : 'default'" @click="currentDecimal = 4">4 位小数</ui-button>
      </demo-block>
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" :type="currentTrimZero ? 'primary' : 'default'" @click="currentTrimZero = true">去尾零</ui-button>
        <ui-button size="small" :type="!currentTrimZero ? 'primary' : 'default'" @click="currentTrimZero = false">保留尾零</ui-button>
      </demo-block>
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" :type="currentSep === '' ? 'primary' : 'default'" @click="currentSep = ''">无分隔</ui-button>
        <ui-button size="small" :type="currentSep === ',' ? 'primary' : 'default'" @click="currentSep = ','">逗号</ui-button>
        <ui-button size="small" :type="currentSep === ' ' ? 'primary' : 'default'" @click="currentSep = ' '">空格</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义类名 / 样式" desc="customClass 加底框，customStyle 加间距">
      <demo-block direction="column" align="center" :gap="12">
        <ui-number-roll :value="88888" custom-class="demo-roll-fancy" :custom-style="{ letterSpacing: '4rpx' }" font-size="48rpx" font-weight="600" />
      </demo-block>
    </demo-section>

    <demo-section title="业务场景：销售额" desc="¥ 前缀 + 千分位 + 2 位小数">
      <demo-block direction="column" align="center" :gap="8">
        <view class="money-row">
          <text class="money-symbol">¥</text>
          <ui-number-roll :value="moneyValue" font-size="56rpx" font-weight="700" color="danger" thousands-sep="," :decimal-places="2" :trim-zero="false" />
        </view>
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="moneyValue += 1234.56">+1234.56</ui-button>
          <ui-button size="small" @click="moneyValue = +(Math.random() * 100000).toFixed(2)">刷新</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景：积分余额" desc="整数无分隔 + 主色">
      <demo-block direction="column" align="center" :gap="8">
        <ui-number-roll :value="pointsValue" font-size="48rpx" font-weight="600" color="primary" :decimal-places="0" />
        <ui-button size="small" type="primary" @click="pointsValue += 50">签到 +50</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景：实时浏览" desc="千分位 + 实时刷新">
      <demo-block direction="column" align="center" :gap="8">
        <view class="views-row">
          <ui-icon name="eye" color="text-tertiary" size="36rpx" />
          <ui-number-roll :value="viewsValue" font-size="40rpx" font-weight="500" color="text-secondary" thousands-sep="," :decimal-places="0" />
          <text class="views-suffix">次浏览</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景：温度计" desc="1 位小数 + 度数后缀">
      <demo-block direction="column" align="center" :gap="8">
        <view class="temp-row">
          <ui-number-roll :value="tempValue" font-size="64rpx" font-weight="700" color="warning" :decimal-places="1" :trim-zero="false" />
          <text class="temp-suffix">°C</text>
        </view>
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="tempValue = +(20 + Math.random() * 15).toFixed(1)">刷新天气</ui-button>
          <ui-button size="small" @click="tempValue = 0">归零</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "NumberRoll 数字滚动" },
})

const fontSizes = ["", "32rpx", "48rpx", "64rpx"]
const fontWeights = [
  { label: "默认", value: "" },
  { label: "400", value: "400" },
  { label: "500", value: "500" },
  { label: "700", value: "700" },
]
const colors = [
  { label: "默认", value: "" },
  { label: "主色", value: "primary" },
  { label: "成功", value: "success" },
  { label: "警告", value: "warning" },
]
const durations = [400, 800, 1200, 2000]
const timings = ["ease-out", "ease-in-out", "linear"]

const currentValue = ref(12345)
const currentFontSize = ref("48rpx")
const currentFontWeight = ref("600")
const currentColor = ref("")
const currentDuration = ref(1200)
const currentTiming = ref("ease-out")
const currentDecimal = ref(0)
const currentTrimZero = ref(true)
const currentSep = ref("")

const moneyValue = ref(8888.88)
const pointsValue = ref(2500)
const viewsValue = ref(123456)
const tempValue = ref(26.5)
</script>

<style lang="scss" scoped>
.money-row,
.views-row,
.temp-row {
  gap: 8rpx;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.money-symbol {
  color: var(--ui-color-danger);
  font-size: 36rpx;
  font-weight: 600;
}

.views-suffix {
  color: var(--ui-color-text-tertiary);
  font-size: 28rpx;
}

.temp-suffix {
  color: var(--ui-color-warning);
  font-size: 32rpx;
  font-weight: 500;
}

.demo-roll-fancy {
  padding: 0 24rpx;
  border-bottom: 4rpx solid var(--ui-color-primary);
}
</style>
