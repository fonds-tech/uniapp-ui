<template>
  <demo-page>
    <demo-section title="基础用法" desc="单列选择,modelValue 为单值">
      <ui-cell title="选择城市" :value="city || '请选择'" is-link @click="show.city = true" />
      <ui-picker v-model="city" v-model:show="show.city" title="选择城市" :columns="cityColumns" @confirm="onConfirm('城市')" @cancel="onCancel" />
    </demo-section>

    <demo-section title="多列选择" desc="columns 传二维数组,modelValue 为数组">
      <ui-cell title="选择时间" :value="timeText" is-link @click="show.time = true" />
      <ui-picker v-model="time" v-model:show="show.time" title="选择时间" :columns="timeColumns" @confirm="onConfirm('时间')" />
    </demo-section>

    <demo-section title="级联选择" desc="单列对象带 children,自动级联渲染">
      <ui-cell title="选择地区" :value="areaText" is-link @click="show.area = true" />
      <ui-picker v-model="area" v-model:show="show.area" title="选择地区" :columns="areaColumns" @confirm="onConfirm('地区')" />
    </demo-section>

    <demo-section title="加载状态" desc="loading 显示加载占位">
      <ui-cell title="加载中" value="请选择" is-link @click="show.loading = true" />
      <ui-picker v-model:show="show.loading" title="加载中" :columns="[]" loading />
    </demo-section>

    <demo-section title="字段映射" desc="columns 用自定义字段名时,通过 columnFields 映射">
      <ui-cell title="选择菜品" :value="dish || '请选择'" is-link @click="show.dish = true" />
      <ui-picker
        v-model="dish"
        v-model:show="show.dish"
        title="选择菜品"
        :columns="dishColumns"
        :column-fields="{ text: 'name', value: 'id' }"
        @confirm="onConfirm('菜品')"
      />
    </demo-section>

    <demo-section title="自定义 footer" desc="footer slot 替代默认头部按钮 (showHeader=false)">
      <ui-cell title="自定义底部按钮" :value="footerCity || '请选择'" is-link @click="show.footer = true" />
      <ui-picker v-model="footerCity" v-model:show="show.footer" :columns="cityColumns" :show-header="false">
        <template #footer="{ confirm, cancel }">
          <view class="custom-footer">
            <ui-button block @click="cancel">取消</ui-button>
            <ui-button block type="primary" @click="confirm">确定</ui-button>
          </view>
        </template>
      </ui-picker>
    </demo-section>

    <demo-section title="自定义类名 / 样式" desc="customClass + 视觉主题">
      <ui-cell title="自定义样式" :value="styledCity || '请选择'" is-link @click="show.styled = true" />
      <ui-picker
        v-model="styledCity"
        v-model:show="show.styled"
        title="选择城市"
        :columns="cityColumns"
        custom-class="demo-picker-fancy"
        active-column-color="primary"
        active-column-weight="bold"
      />
    </demo-section>

    <demo-section title="业务场景:商品规格" desc="多列规格联动,确认后写回">
      <ui-cell title="选择规格" :value="specText" is-link @click="show.spec = true" />
      <ui-picker v-model="spec" v-model:show="show.spec" title="商品规格" :columns="specColumns" @confirm="onSpecConfirm" />
    </demo-section>

    <demo-section title="业务场景:出生日期" desc="年/月/日 三列,数据外提">
      <ui-cell title="选择生日" :value="birthText" is-link @click="show.birth = true" />
      <ui-picker v-model="birth" v-model:show="show.birth" title="出生日期" :columns="birthColumns" @confirm="onConfirm('生日')" />
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Picker 选择器" },
})

const toast = useToast()

const show = reactive({
  city: false,
  time: false,
  area: false,
  loading: false,
  dish: false,
  footer: false,
  styled: false,
  spec: false,
  birth: false,
})

const city = ref("")
const time = ref<string[]>([])
const area = ref<string[]>([])
const dish = ref("")
const footerCity = ref("")
const styledCity = ref("")
const spec = ref<string[]>([])
const birth = ref<string[]>([])
const eventLog = ref("点击选择触发事件")

const cityColumns = [
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
  { text: "广州", value: "guangzhou" },
  { text: "深圳", value: "shenzhen" },
  { text: "杭州", value: "hangzhou" },
]

const timeColumns = [
  [
    { text: "上午", value: "am" },
    { text: "下午", value: "pm" },
  ],
  [
    { text: "9:00", value: "9" },
    { text: "10:00", value: "10" },
    { text: "11:00", value: "11" },
    { text: "12:00", value: "12" },
  ],
]

const areaColumns = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      { text: "杭州", value: "hangzhou" },
      { text: "宁波", value: "ningbo" },
      { text: "温州", value: "wenzhou" },
    ],
  },
  {
    text: "江苏",
    value: "jiangsu",
    children: [
      { text: "南京", value: "nanjing" },
      { text: "苏州", value: "suzhou" },
      { text: "无锡", value: "wuxi" },
    ],
  },
]

const dishColumns = [
  { name: "宫保鸡丁", id: "kungpao" },
  { name: "麻婆豆腐", id: "mapo" },
  { name: "回锅肉", id: "twice" },
  { name: "鱼香肉丝", id: "fish" },
]

const specColumns = [
  [
    { text: "黑色", value: "black" },
    { text: "白色", value: "white" },
    { text: "红色", value: "red" },
  ],
  [
    { text: "S", value: "S" },
    { text: "M", value: "M" },
    { text: "L", value: "L" },
    { text: "XL", value: "XL" },
  ],
]

const years = Array.from({ length: 50 }, (_, i) => ({ text: `${1990 + i}年`, value: `${1990 + i}` }))
const months = Array.from({ length: 12 }, (_, i) => ({ text: `${i + 1}月`, value: `${i + 1}` }))
const days = Array.from({ length: 31 }, (_, i) => ({ text: `${i + 1}日`, value: `${i + 1}` }))
const birthColumns = [years, months, days]

const timeText = computed(() => (time.value.length === 2 ? `${time.value[0] === "am" ? "上午" : "下午"} ${time.value[1]}:00` : "请选择"))
const areaText = computed(() => (area.value.length > 0 ? area.value.join(" / ") : "请选择"))
const specText = computed(() => (spec.value.length === 2 ? spec.value.join(" / ") : "请选择"))
const birthText = computed(() => (birth.value.length === 3 ? `${birth.value[0]}年${birth.value[1]}月${birth.value[2]}日` : "请选择"))

function onConfirm(label: string) {
  eventLog.value = `[${label}] 确认`
  toast.success(`已选择${label}`)
}

function onCancel() {
  eventLog.value = "[取消] 触发"
}

function onSpecConfirm() {
  eventLog.value = `[规格] ${spec.value.join("/")}`
  toast.text(`规格:${spec.value.join("/")}`)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.custom-footer {
  gap: 16rpx;
  display: flex;
  padding: 24rpx;
  border-top: 2rpx solid var(--ui-color-border-light);
}

.demo-picker-fancy {
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
}
</style>
