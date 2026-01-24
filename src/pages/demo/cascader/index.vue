<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-cell title="选择地区" :value="areaText1 || '请选择'" is-link @click="show1 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：双向绑定 -->
    <demo-section title="双向绑定">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前值: {{ value2 || "未选择" }}</text>
        <demo-block :gap="16">
          <ui-button size="small" @click="value2 = '330106'">设为西湖区</ui-button>
          <ui-button size="small" @click="value2 = '320102'">设为玄武区</ui-button>
          <ui-button size="small" @click="value2 = ''">清空</ui-button>
        </demo-block>
        <ui-cell title="选择地区" :value="areaText2 || '请选择'" is-link @click="show2 = true" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 active-color 设置选中项颜色</text>
        <text class="demo-text">通过 color 设置未选中项颜色</text>
        <ui-cell title="选择地区" :value="areaText3 || '请选择'" is-link @click="show3 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义占位符 -->
    <demo-section title="自定义占位符">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 placeholder 设置未选中时的提示文案</text>
        <ui-cell title="选择地区" :value="areaText4 || '请选择'" is-link @click="show4 = true" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过选项的 disabled 属性禁用该选项</text>
        <ui-cell title="选择地区" :value="areaText5 || '请选择'" is-link @click="show5 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：关闭图标 -->
    <demo-section title="关闭图标">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">closeable 控制是否显示关闭图标</text>
        <demo-block :gap="16">
          <ui-button size="small" @click="showCloseable(true)">显示关闭图标</ui-button>
          <ui-button size="small" @click="showCloseable(false)">隐藏关闭图标</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义关闭图标 -->
    <demo-section title="自定义关闭图标">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 close-icon 系列属性自定义关闭图标</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showCloseIcon('cross')">cross</ui-button>
          <ui-button size="small" @click="showCloseIcon('close')">close</ui-button>
          <ui-button size="small" @click="showCloseIcon('arrow-down')">arrow-down</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏头部栏 -->
    <demo-section title="隐藏头部栏">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 show-header 控制头部栏显示</text>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="currentShowHeader" />
          <text class="switch-label">{{ currentShowHeader ? "显示头部" : "隐藏头部" }}</text>
        </demo-block>
        <ui-cell title="选择地区" :value="areaText7 || '请选择'" is-link @click="show7 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：标题样式 -->
    <demo-section title="标题样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 title-size/color/weight 自定义标题样式</text>
        <ui-cell title="选择地区" :value="areaText8 || '请选择'" is-link @click="show8 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：手势滑动 -->
    <demo-section title="手势滑动">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 swipeable 控制是否支持左右滑动切换</text>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="currentSwipeable" />
          <text class="switch-label">{{ currentSwipeable ? "开启滑动" : "关闭滑动" }}</text>
        </demo-block>
        <ui-cell title="选择地区" :value="areaText9 || '请选择'" is-link @click="show9 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：异步选项加载 -->
    <demo-section title="异步选项加载">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 beforeChange 拦截选项变化，实现异步加载</text>
        <ui-cell title="选择地区" :value="areaText10 || '请选择'" is-link @click="show10 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义字段名 -->
    <demo-section title="自定义字段名">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 field-keys 自定义 text/value/children/disabled 字段名</text>
        <ui-cell title="选择分类" :value="areaText11 || '请选择'" is-link @click="show11 = true" />
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-cell title="选择地区" :value="areaText12 || '请选择'" is-link @click="show12 = true" />
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
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="show13 = true">自定义类名</ui-button>
          <ui-button size="small" @click="show14 = true">自定义样式</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 省市区选择 -->
    <demo-section title="综合示例 - 省市区选择">
      <demo-block direction="column" :gap="16">
        <ui-cell-group>
          <ui-cell title="省份" :value="selectedProvince || '请选择'" is-link @click="show15 = true" />
          <ui-cell title="城市" :value="selectedCity || '请选择'" is-link @click="show16 = true" />
          <ui-cell title="区县" :value="selectedDistrict || '请选择'" is-link @click="show17 = true" />
        </ui-cell-group>
        <view v-if="fullAddress" class="address-result">
          <text class="address-label">完整地址：</text>
          <text class="address-text">{{ fullAddress }}</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 商品分类选择 -->
    <demo-section title="综合示例 - 商品分类选择">
      <demo-block direction="column" :gap="16">
        <ui-cell title="商品分类" :value="categoryText || '请选择'" is-link @click="show18 = true" />
      </demo-block>
    </demo-section>

    <!-- Cascader 弹出层 -->
    <!-- 基础用法 -->
    <ui-cascader v-model="value1" v-model:show="show1" title="请选择地区" :options="options" @close="show1 = false" @finish="onFinish1" />

    <!-- 双向绑定 -->
    <ui-cascader v-model="value2" v-model:show="show2" title="请选择地区" :options="options" @close="show2 = false" @finish="onFinish2" />

    <!-- 自定义颜色 -->
    <ui-cascader v-model="value3" v-model:show="show3" title="请选择地区" :options="options" color="#666666" active-color="#07c160" @close="show3 = false" @finish="onFinish3" />

    <!-- 自定义占位符 -->
    <ui-cascader v-model="value4" v-model:show="show4" title="请选择地区" :options="options" placeholder="请点击选择" @close="show4 = false" @finish="onFinish4" />

    <!-- 禁用选项 -->
    <ui-cascader v-model="value5" v-model:show="show5" title="请选择地区" :options="optionsWithDisabled" @close="show5 = false" @finish="onFinish5" />

    <!-- 关闭图标显示控制 -->
    <ui-cascader v-model="value6" v-model:show="show6" title="请选择地区" :options="options" :closeable="currentCloseable" @close="show6 = false" @finish="onFinish6" />

    <!-- 自定义关闭图标 -->
    <ui-cascader
      v-model="valueCloseIcon"
      v-model:show="showCloseIconPopup"
      title="请选择地区"
      :options="options"
      :close-icon="currentCloseIcon"
      close-icon-size="40rpx"
      close-icon-color="#1989fa"
      @close="showCloseIconPopup = false"
      @finish="onFinishCloseIcon"
    />

    <!-- 隐藏头部栏 -->
    <ui-cascader v-model="value7" v-model:show="show7" title="请选择地区" :options="options" :show-header="currentShowHeader" @close="show7 = false" @finish="onFinish7" />

    <!-- 标题样式 -->
    <ui-cascader
      v-model="value8"
      v-model:show="show8"
      title="选择您的地区"
      :options="options"
      title-size="36rpx"
      title-color="#1989fa"
      title-weight="700"
      @close="show8 = false"
      @finish="onFinish8"
    />

    <!-- 手势滑动 -->
    <ui-cascader v-model="value9" v-model:show="show9" title="请选择地区" :options="options" :swipeable="currentSwipeable" @close="show9 = false" @finish="onFinish9" />

    <!-- 异步选项加载 -->
    <ui-cascader v-model="value10" v-model:show="show10" title="请选择地区" :options="asyncOptions" :before-change="onBeforeChange" @close="show10 = false" @finish="onFinish10" />

    <!-- 自定义字段名 -->
    <ui-cascader
      v-model="value11"
      v-model:show="show11"
      title="请选择分类"
      :options="customFieldOptions"
      :field-keys="{ text: 'name', value: 'id', children: 'items' }"
      @close="show11 = false"
      @finish="onFinish11"
    />

    <!-- 事件处理 -->
    <ui-cascader
      v-model="value12"
      v-model:show="show12"
      title="请选择地区"
      :options="options"
      @close="onCascaderClose"
      @change="onCascaderChange"
      @finish="onCascaderFinish"
      @click-tab="onCascaderClickTab"
    />

    <!-- 自定义类名 -->
    <ui-cascader v-model="value13" v-model:show="show13" title="请选择地区" :options="options" custom-class="my-cascader" @close="show13 = false" @finish="onFinish13" />

    <!-- 自定义样式 -->
    <ui-cascader
      v-model="value14"
      v-model:show="show14"
      title="请选择地区"
      :options="options"
      :custom-style="{ background: 'linear-gradient(180deg, #f7f8fa 0%, #fff 100%)' }"
      @close="show14 = false"
      @finish="onFinish14"
    />

    <!-- 综合示例 - 省市区选择 -->
    <ui-cascader v-model="provinceValue" v-model:show="show15" title="请选择省份" :options="provinceOptions" active-color="#1989fa" @close="show15 = false" @finish="onFinishProvince" />

    <ui-cascader v-model="cityValue" v-model:show="show16" title="请选择城市" :options="cityOptions" active-color="#1989fa" @close="show16 = false" @finish="onFinishCity" />

    <ui-cascader v-model="districtValue" v-model:show="show17" title="请选择区县" :options="districtOptions" active-color="#1989fa" @close="show17 = false" @finish="onFinishDistrict" />

    <!-- 综合示例 - 商品分类选择 -->
    <ui-cascader
      v-model="categoryValue"
      v-model:show="show18"
      title="选择商品分类"
      :options="categoryOptions"
      active-color="#ee0a24"
      title-size="32rpx"
      title-weight="600"
      close-icon="arrow-down"
      close-icon-size="36rpx"
      @close="show18 = false"
      @finish="onFinishCategory"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import type { CascaderOption } from "@/uni_modules/uniapp-ui/ui-cascader"

definePage({
  style: { navigationBarTitleText: "Cascader 级联选择" },
})

const toast = useToast()

// 显示状态
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const show9 = ref(false)
const show10 = ref(false)
const show11 = ref(false)
const show12 = ref(false)
const show13 = ref(false)
const show14 = ref(false)
const show15 = ref(false)
const show16 = ref(false)
const show17 = ref(false)
const show18 = ref(false)
const showCloseIconPopup = ref(false)

// 选中值
const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")
const value12 = ref("")
const value13 = ref("")
const value14 = ref("")
const valueCloseIcon = ref("")

// 显示文本
const areaText1 = ref("")
const areaText2 = ref("")
const areaText3 = ref("")
const areaText4 = ref("")
const areaText5 = ref("")
const areaText6 = ref("")
const areaText7 = ref("")
const areaText8 = ref("")
const areaText9 = ref("")
const areaText10 = ref("")
const areaText11 = ref("")
const areaText12 = ref("")

// 配置选项
const currentCloseable = ref(true)
const currentCloseIcon = ref("cross")
const currentShowHeader = ref(true)
const currentSwipeable = ref(true)

// 基础选项数据
const options = [
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [
          { text: "西湖区", value: "330106" },
          { text: "余杭区", value: "330110" },
          { text: "萧山区", value: "330109" },
        ],
      },
      {
        text: "宁波市",
        value: "330200",
        children: [
          { text: "海曙区", value: "330203" },
          { text: "江北区", value: "330205" },
          { text: "鄞州区", value: "330212" },
        ],
      },
      {
        text: "温州市",
        value: "330300",
        children: [
          { text: "鹿城区", value: "330302" },
          { text: "龙湾区", value: "330303" },
          { text: "瓯海区", value: "330304" },
        ],
      },
    ],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [
      {
        text: "南京市",
        value: "320100",
        children: [
          { text: "玄武区", value: "320102" },
          { text: "秦淮区", value: "320104" },
          { text: "建邺区", value: "320105" },
        ],
      },
      {
        text: "苏州市",
        value: "320500",
        children: [
          { text: "虎丘区", value: "320505" },
          { text: "吴中区", value: "320506" },
          { text: "相城区", value: "320507" },
        ],
      },
    ],
  },
  {
    text: "广东省",
    value: "440000",
    children: [
      {
        text: "广州市",
        value: "440100",
        children: [
          { text: "天河区", value: "440106" },
          { text: "越秀区", value: "440104" },
          { text: "海珠区", value: "440105" },
        ],
      },
      {
        text: "深圳市",
        value: "440300",
        children: [
          { text: "福田区", value: "440304" },
          { text: "南山区", value: "440305" },
          { text: "宝安区", value: "440306" },
        ],
      },
    ],
  },
]

// 禁用选项数据
const optionsWithDisabled = [
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [
          { text: "西湖区", value: "330106" },
          { text: "余杭区", value: "330110", disabled: true },
          { text: "萧山区", value: "330109" },
        ],
      },
      {
        text: "宁波市",
        value: "330200",
        disabled: true,
        children: [],
      },
    ],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [
      {
        text: "南京市",
        value: "320100",
        children: [
          { text: "玄武区", value: "320102" },
          { text: "秦淮区", value: "320104" },
        ],
      },
    ],
  },
]

// 异步加载选项数据
const asyncOptions = ref([
  {
    text: "浙江省",
    value: "330000",
    children: [],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [],
  },
])

// 自定义字段名选项数据
const customFieldOptions: any = [
  {
    name: "电子产品",
    id: "1",
    items: [
      {
        name: "手机",
        id: "1-1",
        items: [
          { name: "苹果", id: "1-1-1" },
          { name: "华为", id: "1-1-2" },
          { name: "小米", id: "1-1-3" },
        ],
      },
      {
        name: "电脑",
        id: "1-2",
        items: [
          { name: "笔记本", id: "1-2-1" },
          { name: "台式机", id: "1-2-2" },
        ],
      },
    ],
  },
  {
    name: "服装鞋帽",
    id: "2",
    items: [
      {
        name: "男装",
        id: "2-1",
        items: [
          { name: "上衣", id: "2-1-1" },
          { name: "裤子", id: "2-1-2" },
        ],
      },
      {
        name: "女装",
        id: "2-2",
        items: [
          { name: "连衣裙", id: "2-2-1" },
          { name: "外套", id: "2-2-2" },
        ],
      },
    ],
  },
]

// 商品分类选项
const categoryOptions = [
  {
    text: "食品饮料",
    value: "food",
    children: [
      {
        text: "休闲零食",
        value: "snacks",
        children: [
          { text: "饼干糕点", value: "biscuits" },
          { text: "坚果炒货", value: "nuts" },
          { text: "糖果巧克力", value: "candy" },
        ],
      },
      {
        text: "饮料冲调",
        value: "drinks",
        children: [
          { text: "咖啡", value: "coffee" },
          { text: "茶叶", value: "tea" },
          { text: "果汁", value: "juice" },
        ],
      },
    ],
  },
  {
    text: "家居用品",
    value: "home",
    children: [
      {
        text: "厨房用品",
        value: "kitchen",
        children: [
          { text: "锅具", value: "pots" },
          { text: "餐具", value: "tableware" },
          { text: "收纳", value: "storage" },
        ],
      },
      {
        text: "清洁用品",
        value: "cleaning",
        children: [
          { text: "洗衣液", value: "detergent" },
          { text: "纸巾", value: "tissue" },
        ],
      },
    ],
  },
]

// 综合示例 - 省市区选择
const provinceValue = ref("")
const cityValue = ref("")
const districtValue = ref("")
const selectedProvince = ref("")
const selectedCity = ref("")
const selectedDistrict = ref("")

const provinceOptions = [
  { text: "浙江省", value: "330000" },
  { text: "江苏省", value: "320000" },
  { text: "广东省", value: "440000" },
]

const cityOptions = computed(() => {
  if (!selectedProvince.value) return []
  const province = options.find((p) => p.text === selectedProvince.value)
  return province?.children?.map((c) => ({ text: c.text, value: c.value })) || []
})

const districtOptions = computed(() => {
  if (!selectedCity.value) return []
  for (const province of options) {
    const city = province.children?.find((c) => c.text === selectedCity.value)
    if (city) {
      return city.children?.map((d) => ({ text: d.text, value: d.value })) || []
    }
  }
  return []
})

const fullAddress = computed(() => {
  if (selectedProvince.value && selectedCity.value && selectedDistrict.value) {
    return `${selectedProvince.value} ${selectedCity.value} ${selectedDistrict.value}`
  }
  return ""
})

// 商品分类
const categoryValue = ref("")
const categoryText = ref("")

// 事件日志
const eventLog = ref("操作级联选择器查看事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

// 完成回调类型
interface FinishData {
  value: string | number
  selectedOptions: CascaderOption[]
}

// 基础用法完成
function onFinish1(data: FinishData) {
  areaText1.value = data.selectedOptions.map((item) => item.text).join("/")
  show1.value = false
}

// 双向绑定完成
function onFinish2(data: FinishData) {
  areaText2.value = data.selectedOptions.map((item) => item.text).join("/")
  show2.value = false
}

// 自定义颜色完成
function onFinish3(data: FinishData) {
  areaText3.value = data.selectedOptions.map((item) => item.text).join("/")
  show3.value = false
}

// 自定义占位符完成
function onFinish4(data: FinishData) {
  areaText4.value = data.selectedOptions.map((item) => item.text).join("/")
  show4.value = false
}

// 禁用选项完成
function onFinish5(data: FinishData) {
  areaText5.value = data.selectedOptions.map((item) => item.text).join("/")
  show5.value = false
}

// 关闭图标控制完成
function onFinish6(data: FinishData) {
  areaText6.value = data.selectedOptions.map((item) => item.text).join("/")
  show6.value = false
}

// 自定义关闭图标完成
function onFinishCloseIcon(data: FinishData) {
  toast.text(data.selectedOptions.map((item) => item.text).join("/"))
  showCloseIconPopup.value = false
}

// 隐藏头部栏完成
function onFinish7(data: FinishData) {
  areaText7.value = data.selectedOptions.map((item) => item.text).join("/")
  show7.value = false
}

// 标题样式完成
function onFinish8(data: FinishData) {
  areaText8.value = data.selectedOptions.map((item) => item.text).join("/")
  show8.value = false
}

// 手势滑动完成
function onFinish9(data: FinishData) {
  areaText9.value = data.selectedOptions.map((item) => item.text).join("/")
  show9.value = false
}

// 异步加载完成
function onFinish10(data: FinishData) {
  areaText10.value = data.selectedOptions.map((item) => item.text).join("/")
  show10.value = false
}

// 自定义字段名完成
function onFinish11(data: FinishData) {
  areaText11.value = data.selectedOptions.map((item) => item.text).join("/")
  show11.value = false
}

// 自定义类名完成
function onFinish13(data: FinishData) {
  toast.text(data.selectedOptions.map((item) => item.text).join("/"))
  show13.value = false
}

// 自定义样式完成
function onFinish14(data: FinishData) {
  toast.text(data.selectedOptions.map((item) => item.text).join("/"))
  show14.value = false
}

// 显示关闭图标控制
function showCloseable(closeable: boolean) {
  currentCloseable.value = closeable
  show6.value = true
}

// 显示自定义关闭图标
function showCloseIcon(icon: string) {
  currentCloseIcon.value = icon
  showCloseIconPopup.value = true
}

// 异步加载拦截器
async function onBeforeChange(value: string | number): Promise<boolean> {
  toast.loading("加载中...")

  // 模拟异步加载
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 动态加载子选项
  if (value === "330000") {
    asyncOptions.value[0].children = [
      { text: "杭州市", value: "330100", children: [{ text: "西湖区", value: "330106" }] },
      { text: "宁波市", value: "330200", children: [{ text: "海曙区", value: "330203" }] },
    ]
  } else if (value === "320000") {
    asyncOptions.value[1].children = [
      { text: "南京市", value: "320100", children: [{ text: "玄武区", value: "320102" }] },
      { text: "苏州市", value: "320500", children: [{ text: "虎丘区", value: "320505" }] },
    ]
  }

  return true
}

// 事件处理
function onCascaderClose() {
  addEventLog("触发 close 事件")
  show12.value = false
}

function onCascaderChange(data: { value: string | number; selectedOptions: CascaderOption[]; index: number }) {
  addEventLog(`触发 change 事件，索引: ${data.index}，值: ${data.value}`)
}

function onCascaderFinish(data: FinishData) {
  addEventLog(`触发 finish 事件，完成选择: ${data.selectedOptions.map((item) => item.text).join("/")}`)
  areaText12.value = data.selectedOptions.map((item) => item.text).join("/")
  show12.value = false
}

function onCascaderClickTab(data: { index: number }) {
  addEventLog(`触发 click-tab 事件，索引: ${data.index}`)
}

// 省市区选择
function onFinishProvince(data: FinishData) {
  selectedProvince.value = data.selectedOptions[0]?.text || ""
  selectedCity.value = ""
  selectedDistrict.value = ""
  cityValue.value = ""
  districtValue.value = ""
  show15.value = false
}

function onFinishCity(data: FinishData) {
  selectedCity.value = data.selectedOptions[0]?.text || ""
  selectedDistrict.value = ""
  districtValue.value = ""
  show16.value = false
}

function onFinishDistrict(data: FinishData) {
  selectedDistrict.value = data.selectedOptions[0]?.text || ""
  show17.value = false
  toast.success("地址选择完成")
}

// 商品分类选择
function onFinishCategory(data: FinishData) {
  categoryText.value = data.selectedOptions.map((item) => item.text).join(" > ")
  show18.value = false
  toast.success(`已选择: ${categoryText.value}`)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.switch-label {
  color: var(--ui-color-text-primary);
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

.address-result {
  display: flex;
  padding: 24rpx;
  background: var(--ui-color-background-light);
  align-items: center;
  border-radius: 12rpx;
}

.address-label {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
  margin-right: 12rpx;
}

.address-text {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  font-weight: 600;
}

:deep(.my-cascader) {
  .ui-cascader__header {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }

  .ui-cascader__title {
    color: #fff !important;
  }
}
</style>
