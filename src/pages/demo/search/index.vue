<template>
  <demo-page>
    <demo-section title="基础用法" desc="默认带搜索按钮 + 清除图标">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.basic" placeholder="请输入搜索关键词" />
      </demo-block>
    </demo-section>

    <demo-section title="形状" desc="round 圆角胶囊 / radius 自定义圆角">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.round" round placeholder="圆形搜索框" />
        <ui-search v-model="value.radius" :radius="8" placeholder="自定义圆角 8rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="背景 / 边框" desc="background / border 改观感">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.bg1" background="#f5f5f5" placeholder="灰底" />
        <ui-search v-model="value.bg2" background="primary" color="#fff" placeholder-color="#e6f0ff" placeholder="主色背景" />
        <ui-search v-model="value.border" border="2rpx solid var(--ui-color-primary)" background="transparent" placeholder="主色边框" />
      </demo-block>
    </demo-section>

    <demo-section title="尺寸" desc="height + fontSize 控制整体大小">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.small" height="56rpx" font-size="24rpx" placeholder="小尺寸" :action="false" />
        <ui-search v-model="value.medium" placeholder="默认尺寸" :action="false" />
        <ui-search v-model="value.large" height="96rpx" font-size="32rpx" placeholder="大尺寸" :action="false" />
      </demo-block>
    </demo-section>

    <demo-section title="对齐方式" desc="inputAlign 切换输入文字对齐">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.alignLeft" input-align="left" placeholder="居左 (默认)" :action="false" />
        <ui-search v-model="value.alignCenter" input-align="center" placeholder="居中" :action="false" />
        <ui-search v-model="value.alignRight" input-align="right" placeholder="居右" :action="false" />
      </demo-block>
    </demo-section>

    <demo-section title="字符限制 / 占位色">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.maxlen" :maxlength="10" placeholder="最多输入 10 字" :action="false" />
        <ui-search v-model="value.phColor" placeholder-color="danger" placeholder="自定义占位色" :action="false" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用 / 只读不可清除" desc="disabled 锁死 / clearable=false 隐藏清除按钮">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.disabled" disabled placeholder="禁用状态" />
        <ui-search v-model="value.noClear" :clearable="false" placeholder="无清除按钮" :action="false" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标" desc="icon prop 改图标 / icon='' 隐藏 / clearIcon 改清除图标">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.iconScan" icon="scan" icon-color="primary" placeholder="扫描图标" :action="false" />
        <ui-search v-model="value.iconNone" icon="" placeholder="隐藏左侧图标" :action="false" />
        <ui-search v-model="value.clearIcon" clear-icon="close-circle" clear-icon-color="danger" placeholder="自定义清除图标" :action="false" />
      </demo-block>
    </demo-section>

    <demo-section title="操作按钮" desc="actionText / actionColor / actionWeight 定制">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.actDefault" placeholder="默认按钮" />
        <ui-search v-model="value.actCustom" action-text="提交" action-color="success" action-weight="bold" placeholder="自定义按钮" />
        <ui-search v-model="value.actNone" :action="false" placeholder="无按钮" />
      </demo-block>
    </demo-section>

    <demo-section title="插槽" desc="left / icon / clear / action 自定义">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value.slotLeft" placeholder="左侧插入分类">
          <template #left>
            <text class="slot-tag">全部</text>
          </template>
        </ui-search>
        <ui-search v-model="value.slotIcon" placeholder="自定义搜索图标" :action="false">
          <template #icon>
            <text class="slot-emoji">🔍</text>
          </template>
        </ui-search>
        <ui-search v-model="value.slotAction" placeholder="自定义按钮">
          <template #action>
            <ui-button size="small" type="primary" @click="onSlotAction">提交</ui-button>
          </template>
        </ui-search>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:顶部导航搜索" desc="贴顶 + 灰底胶囊，跟随小程序原生搜索风格">
      <demo-block direction="column" :gap="12">
        <view class="nav-search">
          <ui-search v-model="value.nav" round background="#f0f1f3" placeholder="搜索商品、店铺" :action="false" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:扫码搜索" desc="left slot 放分类 / action slot 放扫码">
      <demo-block direction="column" :gap="12">
        <ui-search v-model="value.scan" round background="#f5f5f5" :action="true">
          <template #action>
            <ui-icon name="scan" size="44rpx" color="primary" @click="onScan" />
          </template>
        </ui-search>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:历史搜索词" desc="搜索后保存到历史，点击复用">
      <demo-block direction="column" align="start" :gap="12">
        <ui-search v-model="value.history" placeholder="输入并搜索" @search="onHistorySearch" />
        <view v-if="historyList.length" class="history">
          <text class="history__title">历史搜索</text>
          <view class="history__tags">
            <view v-for="(h, i) in historyList" :key="i" class="history__tag" @click="value.history = h">
              {{ h }}
            </view>
            <view class="history__clear" @click="historyList = []">清空</view>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="全 emit 实时打印">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-search
          v-model="value.event"
          placeholder="触发事件查看回显"
          @search="(v) => onEvent('search', v)"
          @change="(v) => onEvent('change', v)"
          @clear="() => onEvent('clear')"
          @focus="() => onEvent('focus')"
          @blur="() => onEvent('blur')"
          @action="() => onEvent('action')"
          @click="() => onEvent('click')"
        />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Search 搜索" },
})

const toast = useToast()

const value = reactive({
  basic: "",
  round: "",
  radius: "",
  bg1: "",
  bg2: "",
  border: "",
  small: "",
  medium: "",
  large: "",
  alignLeft: "",
  alignCenter: "居中文本",
  alignRight: "",
  maxlen: "",
  phColor: "",
  disabled: "禁用内容",
  noClear: "",
  iconScan: "",
  iconNone: "",
  clearIcon: "演示文本",
  actDefault: "",
  actCustom: "",
  actNone: "",
  slotLeft: "",
  slotIcon: "",
  slotAction: "",
  nav: "",
  scan: "",
  history: "",
  event: "",
})

const historyList = ref<string[]>(["UniApp", "Vue 3", "TypeScript"])
const eventLog = ref("等待事件...")

function onEvent(type: string, payload?: unknown) {
  eventLog.value = payload !== undefined ? `[${type}] ${payload}` : `[${type}]`
}

function onSlotAction() {
  toast.text("自定义按钮点击")
}

function onScan() {
  toast.text("调起扫码")
}

function onHistorySearch(v: string) {
  if (!v) return
  historyList.value = [v, ...historyList.value.filter((h) => h !== v)].slice(0, 8)
  toast.success(`搜索: ${v}`)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.slot-tag {
  color: var(--ui-color-text);
  padding: 0 var(--ui-spacing-sm);
  font-size: var(--ui-font-size-sm);
  border-right: 2rpx solid var(--ui-color-border);
  margin-right: var(--ui-spacing-sm);
}

.slot-emoji {
  font-size: 32rpx;
}

.nav-search {
  width: 100%;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-bottom: 2rpx solid var(--ui-color-border-light);
}

.history {
  width: 100%;

  &__title {
    color: var(--ui-color-text-secondary);
    display: block;
    font-size: 24rpx;
    margin-bottom: var(--ui-spacing-sm);
  }

  &__tags {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-wrap: wrap;
  }

  &__tag {
    color: var(--ui-color-text);
    padding: 6rpx 16rpx;
    font-size: 24rpx;
    background: var(--ui-color-background-section);
    border-radius: var(--ui-radius-round);
  }

  &__clear {
    color: var(--ui-color-text-tertiary);
    padding: 6rpx 16rpx;
    font-size: 24rpx;
  }
}
</style>
