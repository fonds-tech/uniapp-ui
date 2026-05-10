<template>
  <demo-page>
    <demo-section title="基础用法" desc="单列选择">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.basic" :columns="cities" placeholder="请选择城市" />
      </demo-block>
    </demo-section>

    <demo-section title="多列选择" desc="columns 二维数组">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.multi" :columns="timeColumns" placeholder="请选择时间" />
      </demo-block>
    </demo-section>

    <demo-section title="级联选择" desc="columns 含 children 字段">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.cascade" :columns="areaColumns" placeholder="请选择地区" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用 / 只读">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.disabled" :columns="cities" placeholder="禁用状态" disabled />
        <ui-select v-model="value.readonly" :columns="cities" placeholder="只读状态" readonly />
      </demo-block>
    </demo-section>

    <demo-section title="可清除" desc="clearable 显示清除按钮 (有值时)">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.clearable" :columns="cities" placeholder="选完试试清除" clearable />
        <ui-select v-model="value.clearableArea" :columns="areaColumns" placeholder="级联也支持清除" clearable />
      </demo-block>
    </demo-section>

    <demo-section title="表单校验" desc="form 联动 + 校验失败红字反馈">
      <demo-block direction="column" :gap="12">
        <ui-form ref="formRef" :model="formData" :rules="formRules" error-message-align="right">
          <ui-form-item label="出发城市" prop="depart">
            <ui-select v-model="formData.depart" :columns="cities" placeholder="请选择城市" clearable text-align="right" />
          </ui-form-item>
          <ui-form-item label="到达地区" prop="area">
            <ui-select v-model="formData.area" :columns="areaColumns" placeholder="请选择地区" clearable text-align="right" />
          </ui-form-item>
        </ui-form>
        <demo-block :cols="2" :gap="12">
          <ui-button type="primary" @click="onSubmit">提交校验</ui-button>
          <ui-button @click="onReset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="圆角设置" desc="borderRadius 控制弹窗圆角">
      <demo-block direction="column" :gap="12">
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="value.radius = '0'">无圆角</ui-button>
          <ui-button size="small" @click="value.radius = '16rpx'">16rpx</ui-button>
          <ui-button size="small" @click="value.radius = '32rpx'">32rpx</ui-button>
        </demo-block>
        <ui-select v-model="value.radiusVal" :columns="cities" placeholder="请选择城市" :border-radius="value.radius" />
      </demo-block>
    </demo-section>

    <demo-section title="遮罩控制">
      <demo-block direction="column" :gap="12">
        <demo-block direction="row" align="center" :gap="12">
          <ui-switch v-model="value.overlay" />
          <text class="demo-text">{{ value.overlay ? "显示遮罩" : "隐藏遮罩" }}</text>
        </demo-block>
        <demo-block direction="row" align="center" :gap="12">
          <ui-switch v-model="value.closeOnClickOverlay" />
          <text class="demo-text">{{ value.closeOnClickOverlay ? "点击遮罩可关闭" : "点击遮罩不关闭" }}</text>
        </demo-block>
        <ui-select v-model="value.overlayVal" :columns="cities" placeholder="请选择城市" :overlay="value.overlay" :close-on-click-overlay="value.closeOnClickOverlay" />
      </demo-block>
    </demo-section>

    <demo-section title="头部定制" desc="title / cancelText / confirmText / showHeader">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.title" :columns="cities" placeholder="带标题" title="选择城市" />
        <ui-select v-model="value.btnText" :columns="cities" placeholder="自定义按钮文字" cancel-text="返回" confirm-text="好的" />
        <ui-select v-model="value.noHeader" :columns="cities" placeholder="隐藏头部" :show-header="false" />
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block direction="column" :gap="12">
        <demo-block direction="row" align="center" :gap="12">
          <ui-switch v-model="value.loading" />
          <text class="demo-text">{{ value.loading ? "加载中" : "正常" }}</text>
        </demo-block>
        <ui-select v-model="value.loadingVal" :columns="cities" placeholder="请选择城市" :loading="value.loading" />
      </demo-block>
    </demo-section>

    <demo-section title="选项尺寸" desc="columnHeight / visibleColumnNum">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.colSize" :columns="cities" placeholder="请选择城市" column-height="100rpx" :visible-column-num="3" />
      </demo-block>
    </demo-section>

    <demo-section title="选项文字样式" desc="columnSize / columnColor / activeColumn*">
      <demo-block direction="column" :gap="12">
        <ui-select
          v-model="value.colStyle"
          :columns="cities"
          placeholder="请选择城市"
          column-size="28rpx"
          column-color="text-tertiary"
          active-column-size="32rpx"
          active-column-color="primary"
          active-column-weight="600"
        />
      </demo-block>
    </demo-section>

    <demo-section title="占位 / 文本样式" desc="placeholderColor / textColor / textSize / textWeight / textAlign">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.phColor" :columns="cities" placeholder="点击选择" placeholder-color="primary" />
        <ui-select v-model="value.textCustom" :columns="cities" placeholder="自定义文本" text-size="32rpx" text-color="primary" text-weight="600" text-align="center" />
      </demo-block>
    </demo-section>

    <demo-section title="右侧图标" desc="rightIcon / rightIconColor / 隐藏">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.icon" :columns="cities" placeholder="自定义图标" right-icon="arrow-down" right-icon-color="primary" />
        <ui-select v-model="value.iconNone" :columns="cities" placeholder="隐藏图标" right-icon="" />
      </demo-block>
    </demo-section>

    <demo-section title="展示格式化" desc="displayFormatter 自定义文案">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.fmt" :columns="areaColumns" placeholder="请选择地区" :display-formatter="formatDisplay" />
      </demo-block>
    </demo-section>

    <demo-section title="字段映射" desc="columns-fields 改 text/value/children 字段名">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.fields" :columns="customFieldColumns" :columns-fields="{ text: 'label', value: 'id', children: 'nodes' }" placeholder="请选择分类" />
      </demo-block>
    </demo-section>

    <demo-section title="display 插槽" desc="完全接管展示区">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.slotDisplay" :columns="cities" placeholder="请选择">
          <template #display="{ text, placeholder }">
            <text class="display-tag">{{ text || placeholder }}</text>
          </template>
        </ui-select>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:出行查询" desc="form-item 风格表单">
      <demo-block direction="column" :gap="0">
        <view class="form-item">
          <text class="form-label">出发城市</text>
          <ui-select v-model="value.departCity" :columns="cities" placeholder="请选择" text-align="right" />
        </view>
        <view class="form-item">
          <text class="form-label">到达城市</text>
          <ui-select v-model="value.arriveCity" :columns="cities" placeholder="请选择" text-align="right" />
        </view>
        <view class="form-item">
          <text class="form-label">出发日期</text>
          <ui-select v-model="value.departDate" :columns="dateColumns" placeholder="请选择" text-align="right" display-separator=" " />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:省市区地址" desc="cascade + display-formatter">
      <demo-block direction="column" :gap="12">
        <ui-select v-model="value.address" :columns="fullAddressColumns" placeholder="请选择省市区" title="选择地址" display-separator=" / " :display-formatter="formatAddress" />
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="全 emit 实时打印">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-select
          v-model="value.event"
          :columns="cities"
          placeholder="触发事件查看回显"
          title="选择城市"
          @open="onEvent('open')"
          @opened="onEvent('opened')"
          @close="(a) => onEvent('close', a)"
          @closed="(a) => onEvent('closed', a)"
          @change="(d) => onEvent('change', d.values)"
          @cancel="onEvent('cancel')"
          @confirm="(d) => onEvent('confirm', d.columns.map((c) => c.text).join(','))"
          @click="onEvent('click')"
        />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SelectDisplayPayload } from "@/uni_modules/uniapp-ui/ui-select"
import type { FormRules, FormInstance } from "@/uni_modules/uniapp-ui/ui-form"

definePage({
  style: { navigationBarTitleText: "Select 选择器" },
})

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

const dateColumns = [
  [
    { text: "2024年", value: "2024" },
    { text: "2025年", value: "2025" },
  ],
  [
    { text: "1月", value: "01" },
    { text: "6月", value: "06" },
    { text: "12月", value: "12" },
  ],
  [
    { text: "1日", value: "01" },
    { text: "15日", value: "15" },
    { text: "30日", value: "30" },
  ],
]

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
        ],
      },
    ],
  },
]

const value = reactive({
  basic: "",
  multi: [] as string[],
  cascade: [] as string[],
  disabled: "",
  readonly: "beijing",
  clearable: "beijing",
  clearableArea: ["zhejiang", "hangzhou"] as string[],
  radius: "16rpx",
  radiusVal: "",
  overlay: true,
  closeOnClickOverlay: true,
  overlayVal: "",
  title: "",
  btnText: "",
  noHeader: "",
  loading: false,
  loadingVal: "",
  colSize: "",
  colStyle: "",
  phColor: "",
  textCustom: "beijing",
  icon: "",
  iconNone: "",
  fmt: [] as string[],
  fields: [] as string[],
  slotDisplay: "",
  departCity: "",
  arriveCity: "",
  departDate: [] as string[],
  address: [] as string[],
  event: "",
})

const eventLog = ref("等待事件...")

function formatDisplay(payload: SelectDisplayPayload) {
  if (!payload.texts.length) return ""
  return `[${payload.texts.join(" → ")}]`
}

function formatAddress(payload: SelectDisplayPayload) {
  return payload.texts.join(" ")
}

function onEvent(type: string, payload?: unknown) {
  eventLog.value = payload !== undefined ? `[${type}] ${payload}` : `[${type}]`
}

// 表单校验示例
const formRef = ref<FormInstance>()
const formData = reactive({ depart: "", area: [] as string[] })
const formRules: FormRules = {
  depart: { required: true, message: "请选择出发城市", trigger: ["change", "blur"] },
  area: { required: true, message: "请选择到达地区", trigger: ["change", "blur"] },
}

async function onSubmit() {
  try {
    await formRef.value?.validate()
    eventLog.value = "[校验通过]"
  } catch {
    eventLog.value = "[校验失败]"
  }
}

function onReset() {
  formRef.value?.resetFields()
  eventLog.value = "[已重置]"
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.display-tag {
  color: var(--ui-color-text-inverse);
  padding: 8rpx 24rpx;
  font-size: 26rpx;
  background: var(--ui-color-primary);
  border-radius: var(--ui-radius-round);
}

.form-item {
  display: flex;
  padding: 24rpx 0;
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
}

.form-label {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-sm);
}
</style>
