<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-select v-model="value1" :columns="cities" placeholder="请选择城市" />
      </demo-block>
    </demo-section>

    <demo-section title="多列选择">
      <demo-block>
        <ui-select v-model="value2" :columns="timeColumns" placeholder="请选择时间" />
      </demo-block>
    </demo-section>

    <demo-section title="级联选择">
      <demo-block>
        <ui-select v-model="value3" :columns="areaColumns" placeholder="请选择地区" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-select v-model="value4" :columns="cities" placeholder="禁用状态" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="只读状态">
      <demo-block>
        <ui-select v-model="value5" :columns="cities" placeholder="只读状态" readonly />
      </demo-block>
    </demo-section>

    <demo-section title="自定义分隔符">
      <demo-block>
        <ui-select v-model="value6" :columns="areaColumns" placeholder="请选择" display-separator=" - " />
      </demo-block>
    </demo-section>

    <demo-section title="带标题">
      <demo-block>
        <ui-select v-model="value7" :columns="cities" placeholder="请选择城市" title="选择城市" />
      </demo-block>
    </demo-section>

    <!-- 新增：弹窗位置 -->
    <demo-section title="弹窗位置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">mode 可设置弹窗位置</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showModeSelect('bottom')">底部</ui-button>
          <ui-button size="small" @click="showModeSelect('center')">居中</ui-button>
          <ui-button size="small" @click="showModeSelect('top')">顶部</ui-button>
        </demo-block>
        <ui-select v-model="value8" :columns="cities" placeholder="请选择城市" :mode="currentMode" />
      </demo-block>
    </demo-section>

    <!-- 新增：圆角设置 -->
    <demo-section title="圆角设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前圆角: {{ currentBorderRadius }}</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentBorderRadius = '0'">无圆角</ui-button>
          <ui-button size="small" @click="currentBorderRadius = '16rpx'">16rpx</ui-button>
          <ui-button size="small" @click="currentBorderRadius = '32rpx'">32rpx</ui-button>
        </demo-block>
        <ui-select v-model="value9" :columns="cities" placeholder="请选择城市" :border-radius="currentBorderRadius" />
      </demo-block>
    </demo-section>

    <!-- 新增：遮罩控制 -->
    <demo-section title="遮罩控制">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="showOverlay" />
          <text class="switch-label">{{ showOverlay ? "显示遮罩" : "隐藏遮罩" }}</text>
        </demo-block>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="closeOnClickOverlay" />
          <text class="switch-label">{{ closeOnClickOverlay ? "点击遮罩关闭" : "禁止点击遮罩关闭" }}</text>
        </demo-block>
        <ui-select v-model="value10" :columns="cities" placeholder="请选择城市" :overlay="showOverlay" :close-on-click-overlay="closeOnClickOverlay" />
      </demo-block>
    </demo-section>

    <!-- 新增：动画时长 -->
    <demo-section title="动画时长">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前时长: {{ currentDuration }}ms</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentDuration = 100">100ms</ui-button>
          <ui-button size="small" @click="currentDuration = 300">300ms</ui-button>
          <ui-button size="small" @click="currentDuration = 500">500ms</ui-button>
        </demo-block>
        <ui-select v-model="value11" :columns="cities" placeholder="请选择城市" :duration="currentDuration" />
      </demo-block>
    </demo-section>

    <!-- 新增：层级设置 -->
    <demo-section title="层级设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">z-index 设置弹窗层级</text>
        <ui-select v-model="value12" :columns="cities" placeholder="请选择城市" :z-index="1000" />
      </demo-block>
    </demo-section>

    <!-- 新增：背景色设置 -->
    <demo-section title="背景色设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">自定义弹窗背景色</text>
        <ui-select v-model="value13" :columns="cities" placeholder="请选择城市" background="#f7f8fa" />
      </demo-block>
    </demo-section>

    <!-- 新增：安全区适配 -->
    <demo-section title="安全区适配">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="safeAreaInsetBottom" />
          <text class="switch-label">{{ safeAreaInsetBottom ? "开启底部安全区" : "关闭底部安全区" }}</text>
        </demo-block>
        <ui-select v-model="value14" :columns="cities" placeholder="请选择城市" :safe-area-inset-bottom="safeAreaInsetBottom" />
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏头部 -->
    <demo-section title="隐藏头部">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="showSelectHeader" />
          <text class="switch-label">{{ showSelectHeader ? "显示头部" : "隐藏头部" }}</text>
        </demo-block>
        <ui-select v-model="value15" :columns="cities" placeholder="请选择城市" :show-header="showSelectHeader" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义按钮文字 -->
    <demo-section title="自定义按钮文字">
      <demo-block>
        <ui-select v-model="value16" :columns="cities" placeholder="请选择城市" cancel-text="返回" confirm-text="好的" />
      </demo-block>
    </demo-section>

    <!-- 新增：加载状态 -->
    <demo-section title="加载状态">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="selectLoading" />
          <text class="switch-label">{{ selectLoading ? "加载中" : "正常" }}</text>
        </demo-block>
        <ui-select v-model="value17" :columns="cities" placeholder="请选择城市" :loading="selectLoading" />
      </demo-block>
    </demo-section>

    <!-- 新增：选项样式 -->
    <demo-section title="选项样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">自定义选项高度和可见数量</text>
        <ui-select v-model="value18" :columns="cities" placeholder="请选择城市" column-height="100rpx" :visible-column-num="3" />
      </demo-block>
    </demo-section>

    <!-- 新增：选项文字样式 -->
    <demo-section title="选项文字样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">设置选项文字大小、颜色和粗细</text>
        <ui-select
          v-model="value19"
          :columns="cities"
          placeholder="请选择城市"
          column-size="28rpx"
          column-color="#999"
          active-column-size="32rpx"
          active-column-color="#1989fa"
          active-column-weight="600"
        />
      </demo-block>
    </demo-section>

    <!-- 新增：占位文案样式 -->
    <demo-section title="占位文案样式">
      <demo-block direction="column" align="start" :gap="16">
        <ui-select v-model="value20" :columns="cities" placeholder="点击选择城市" placeholder-color="#1989fa" />
        <ui-select v-model="value20b" :columns="cities" placeholder="请选择城市" placeholder-color="#ee0a24" />
      </demo-block>
    </demo-section>

    <!-- 新增：文字样式 -->
    <demo-section title="文字样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">设置选中值的显示样式</text>
        <ui-select v-model="value21" :columns="cities" placeholder="请选择城市" text-size="32rpx" text-color="#1989fa" text-weight="600" text-align="center" />
      </demo-block>
    </demo-section>

    <!-- 新增：右侧图标 -->
    <demo-section title="右侧图标">
      <demo-block direction="column" align="start" :gap="16">
        <ui-select v-model="value22" :columns="cities" placeholder="自定义图标" right-icon="arrow-down" right-icon-size="28rpx" right-icon-color="#1989fa" />
        <ui-select v-model="value22b" :columns="cities" placeholder="隐藏图标" right-icon="" />
      </demo-block>
    </demo-section>

    <!-- 新增：展示格式化 -->
    <demo-section title="展示格式化">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 displayFormatter 自定义展示文案</text>
        <ui-select v-model="value23" :columns="areaColumns" placeholder="请选择地区" :display-formatter="formatDisplay" />
      </demo-block>
    </demo-section>

    <!-- 新增：字段映射 -->
    <demo-section title="字段映射">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">columns-fields 自定义数据字段</text>
        <ui-select v-model="value24" :columns="customFieldColumns" :columns-fields="{ text: 'label', value: 'id', children: 'nodes' }" placeholder="请选择分类" />
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-select
          v-model="value25"
          :columns="cities"
          placeholder="请选择城市"
          title="选择城市"
          @open="onOpen"
          @opened="onOpened"
          @close="onClose"
          @closed="onClosed"
          @change="onChange"
          @cancel="onCancel"
          @confirm="onConfirm"
          @click="onClick"
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
        <ui-select v-model="value26" :columns="cities" placeholder="自定义类名" custom-class="my-select" />
        <ui-select v-model="value26b" :columns="cities" placeholder="自定义样式" :custom-style="{ background: '#f0f9ff', borderRadius: '16rpx', padding: '16rpx 24rpx' }" />
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 城市选择 -->
    <demo-section title="综合示例 - 城市选择">
      <demo-block direction="column" :gap="16">
        <view class="form-item">
          <text class="form-label">出发城市</text>
          <ui-select v-model="departCity" :columns="cities" placeholder="请选择" text-align="right" right-icon="arrow" />
        </view>
        <view class="form-item">
          <text class="form-label">到达城市</text>
          <ui-select v-model="arriveCity" :columns="cities" placeholder="请选择" text-align="right" right-icon="arrow" />
        </view>
        <view class="form-item">
          <text class="form-label">出发日期</text>
          <ui-select v-model="departDate" :columns="dateColumns" placeholder="请选择" text-align="right" right-icon="arrow" display-separator=" " />
        </view>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 地址选择 -->
    <demo-section title="综合示例 - 地址选择">
      <demo-block direction="column" :gap="16">
        <ui-select
          v-model="addressValue"
          :columns="fullAddressColumns"
          placeholder="请选择省市区"
          title="选择地址"
          display-separator=" / "
          :display-formatter="formatAddress"
          column-height="88rpx"
          :visible-column-num="5"
        />
        <view v-if="addressValue && addressValue.length" class="result-box">
          <text class="result-text">已选择: {{ formatAddressResult() }}</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 商品规格 -->
    <demo-section title="综合示例 - 商品规格">
      <demo-block direction="column" :gap="16">
        <view class="product-card">
          <image class="product-image" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" mode="aspectFill" />
          <view class="product-info">
            <text class="product-name">精选商品</text>
            <text class="product-price">¥199.00</text>
            <ui-select
              v-model="productSpec"
              :columns="specColumns"
              placeholder="选择规格"
              title="商品规格"
              display-separator=" / "
              text-color="#ee0a24"
              text-size="24rpx"
              right-icon="arrow-down"
              right-icon-size="24rpx"
              :custom-style="{ padding: '8rpx 16rpx', background: '#fff5f5', borderRadius: '8rpx', marginTop: '16rpx' }"
            />
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { PopupMode } from "@/uni_modules/uniapp-ui/ui-popup"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Select 选择器" },
})

const toast = useToast()

// 基础数据
const value1 = ref("")
const value2 = ref<string[]>([])
const value3 = ref<string[]>([])
const value4 = ref("")
const value5 = ref("beijing")
const value6 = ref<string[]>([])
const value7 = ref("")

const cities = [
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

// 弹窗位置
const value8 = ref("")
const currentMode = ref<PopupMode>("bottom")

function showModeSelect(mode: PopupMode) {
  currentMode.value = mode
  toast.text(`弹窗位置: ${mode}`)
}

// 圆角设置
const value9 = ref("")
const currentBorderRadius = ref("16rpx")

// 遮罩控制
const value10 = ref("")
const showOverlay = ref(true)
const closeOnClickOverlay = ref(true)

// 动画时长
const value11 = ref("")
const currentDuration = ref(300)

// 层级设置
const value12 = ref("")

// 背景色
const value13 = ref("")

// 安全区
const value14 = ref("")
const safeAreaInsetBottom = ref(true)

// 显示头部
const value15 = ref("")
const showSelectHeader = ref(true)

// 自定义按钮文字
const value16 = ref("")

// 加载状态
const value17 = ref("")
const selectLoading = ref(false)

// 选项样式
const value18 = ref("")

// 选项文字样式
const value19 = ref("")

// 占位文案样式
const value20 = ref("")
const value20b = ref("")

// 文字样式
const value21 = ref("beijing")

// 右侧图标
const value22 = ref("")
const value22b = ref("")

// 展示格式化
const value23 = ref<string[]>([])

function formatDisplay(payload: { texts: Array<string | number> }) {
  if (payload.texts.length === 0) return ""
  return `[${payload.texts.join(" → ")}]`
}

// 字段映射
const value24 = ref<string[]>([])
const customFieldColumns = [
  {
    label: "数码产品",
    id: "digital",
    nodes: [
      { label: "手机", id: "phone" },
      { label: "电脑", id: "computer" },
      { label: "平板", id: "tablet" },
    ],
  },
  {
    label: "家用电器",
    id: "appliance",
    nodes: [
      { label: "冰箱", id: "fridge" },
      { label: "洗衣机", id: "washer" },
      { label: "空调", id: "ac" },
    ],
  },
]

// 事件处理
const value25 = ref("")
const eventLog = ref("操作选择器触发事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

function onOpen() {
  addEventLog("触发 open 事件")
}

function onOpened() {
  addEventLog("触发 opened 事件 - 动画结束")
}

function onClose(action: string) {
  addEventLog(`触发 close 事件，action: ${action}`)
}

function onClosed(action: string) {
  addEventLog(`触发 closed 事件，action: ${action}`)
}

function onChange(data: any) {
  addEventLog(`触发 change 事件，值: ${JSON.stringify(data.values)}`)
}

function onCancel(data: any) {
  addEventLog(`触发 cancel 事件`)
}

function onConfirm(data: any) {
  addEventLog(`触发 confirm 事件，选中: ${data.texts?.join(",")}`)
}

function onClick() {
  addEventLog("触发 click 事件")
}

// 自定义样式
const value26 = ref("")
const value26b = ref("")

// 综合示例 - 城市选择
const departCity = ref("")
const arriveCity = ref("")
const departDate = ref<string[]>([])

const dateColumns = [
  [
    { text: "2024年", value: "2024" },
    { text: "2025年", value: "2025" },
  ],
  [
    { text: "1月", value: "01" },
    { text: "2月", value: "02" },
    { text: "3月", value: "03" },
    { text: "4月", value: "04" },
    { text: "5月", value: "05" },
    { text: "6月", value: "06" },
    { text: "7月", value: "07" },
    { text: "8月", value: "08" },
    { text: "9月", value: "09" },
    { text: "10月", value: "10" },
    { text: "11月", value: "11" },
    { text: "12月", value: "12" },
  ],
  [
    { text: "1日", value: "01" },
    { text: "5日", value: "05" },
    { text: "10日", value: "10" },
    { text: "15日", value: "15" },
    { text: "20日", value: "20" },
    { text: "25日", value: "25" },
  ],
]

// 综合示例 - 地址选择
const addressValue = ref<string[]>([])

const fullAddressColumns = [
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      {
        text: "杭州市",
        value: "hangzhou",
        children: [
          { text: "西湖区", value: "xihu" },
          { text: "滨江区", value: "binjiang" },
          { text: "余杭区", value: "yuhang" },
        ],
      },
      {
        text: "宁波市",
        value: "ningbo",
        children: [
          { text: "海曙区", value: "haishu" },
          { text: "江北区", value: "jiangbei" },
          { text: "鄞州区", value: "yinzhou" },
        ],
      },
    ],
  },
  {
    text: "江苏省",
    value: "jiangsu",
    children: [
      {
        text: "南京市",
        value: "nanjing",
        children: [
          { text: "玄武区", value: "xuanwu" },
          { text: "鼓楼区", value: "gulou" },
          { text: "建邺区", value: "jianye" },
        ],
      },
      {
        text: "苏州市",
        value: "suzhou",
        children: [
          { text: "姑苏区", value: "gusu" },
          { text: "工业园区", value: "gongyeyuan" },
          { text: "虎丘区", value: "huqiu" },
        ],
      },
    ],
  },
]

function formatAddress(payload: { texts: Array<string | number> }) {
  return payload.texts.join(" ")
}

function formatAddressResult() {
  // 简单返回选中的值
  return addressValue.value.join(" → ")
}

// 综合示例 - 商品规格
const productSpec = ref<string[]>([])

const specColumns = [
  [
    { text: "白色", value: "white" },
    { text: "黑色", value: "black" },
    { text: "蓝色", value: "blue" },
  ],
  [
    { text: "S", value: "s" },
    { text: "M", value: "m" },
    { text: "L", value: "l" },
    { text: "XL", value: "xl" },
  ],
]
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.switch-label {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
}

.event-list {
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  max-height: 250rpx;
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

.form-item {
  display: flex;
  padding: 24rpx 0;
  align-items: center;
  border-bottom: 1rpx solid var(--ui-color-border-light);
  justify-content: space-between;
}

.form-label {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
}

.result-box {
  padding: 24rpx;
  background: #f0f9ff;
  border-radius: 12rpx;
}

.result-text {
  color: #1989fa;
  font-size: 26rpx;
}

.product-card {
  gap: 24rpx;
  display: flex;
  padding: 24rpx;
  background: #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border-radius: 16rpx;
}

.product-image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 12rpx;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  color: var(--ui-color-text-main);
  font-size: 30rpx;
  font-weight: 600;
}

.product-price {
  color: #ee0a24;
  font-size: 36rpx;
  margin-top: 8rpx;
  font-weight: 600;
}

:deep(.my-select) {
  color: #fff;
  padding: 16rpx 24rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
}
</style>
