<template>
  <demo-page>
    <demo-section title="基础用法" desc="点击触发气泡提示">
      <ui-tooltip content="这是一段提示文字">
        <ui-button type="primary">点击显示</ui-button>
      </ui-tooltip>
    </demo-section>

    <demo-section title="位置 placement" desc="切换 12 种位置">
      <demo-block direction="column" :gap="16">
        <view class="placement-row">
          <ui-tooltip :content="`位置 ${placementDemo}`" :placement="placementDemo">
            <ui-button type="primary">当前 {{ placementDemo }}</ui-button>
          </ui-tooltip>
        </view>
        <demo-block :cols="3" :gap="8">
          <ui-button v-for="p in placementPresets" :key="p" size="small" :type="placementDemo === p ? 'primary' : 'default'" @click="placementDemo = p">
            {{ p }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="触发方式 trigger" desc="hover 仅 H5 / App 生效">
      <demo-block :cols="2" :gap="12">
        <ui-tooltip content="点击触发" trigger="click">
          <ui-button>click</ui-button>
        </ui-tooltip>
        <ui-tooltip content="悬浮触发" trigger="hover">
          <ui-button>hover</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色 bgColor / textColor">
      <demo-block direction="column" :gap="16">
        <ui-tooltip :content="`bgColor=${colorDemo}`" :bg-color="colorDemo" text-color="text-inverse">
          <ui-button type="primary">当前 {{ colorDemo }}</ui-button>
        </ui-tooltip>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c" size="small" :type="colorDemo === c ? 'primary' : 'default'" @click="colorDemo = c">
            {{ c }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="箭头 showArrow">
      <demo-block :cols="2" :gap="12">
        <ui-tooltip content="带箭头" :show-arrow="true">
          <ui-button>显示</ui-button>
        </ui-tooltip>
        <ui-tooltip content="无箭头" :show-arrow="false">
          <ui-button>隐藏</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="偏移 offset" desc="切换 0 / 8 / 16 / 24 px">
      <demo-block direction="column" :gap="16">
        <ui-tooltip :content="`offset=${offsetDemo}`" :offset="offsetDemo">
          <ui-button>当前 {{ offsetDemo }}px</ui-button>
        </ui-tooltip>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="o in offsetPresets" :key="o" size="small" :type="offsetDemo === o ? 'primary' : 'default'" @click="offsetDemo = o">
            {{ o }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="最大宽度 maxWidth">
      <demo-block :cols="2" :gap="12">
        <ui-tooltip content="较长的提示内容会触发换行限制，maxWidth=200rpx" max-width="200rpx">
          <ui-button>200rpx</ui-button>
        </ui-tooltip>
        <ui-tooltip content="较长的提示内容会触发换行限制，maxWidth=400rpx 可以更宽" max-width="400rpx">
          <ui-button>400rpx</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="动画时长 duration">
      <demo-block :cols="3" :gap="12">
        <ui-tooltip content="100ms" :duration="100">
          <ui-button size="small">100ms</ui-button>
        </ui-tooltip>
        <ui-tooltip content="300ms" :duration="300">
          <ui-button size="small">300ms</ui-button>
        </ui-tooltip>
        <ui-tooltip content="600ms" :duration="600">
          <ui-button size="small">600ms</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="禁用 disabled">
      <demo-block :cols="2" :gap="12">
        <ui-tooltip content="禁用状态不显示" disabled>
          <ui-button type="warning">禁用</ui-button>
        </ui-tooltip>
        <ui-tooltip content="正常显示">
          <ui-button type="primary">正常</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="点击外部关闭 closeOnClickOutside">
      <demo-block :cols="2" :gap="12">
        <ui-tooltip content="点击外部关闭" :close-on-click-outside="true">
          <ui-button>开启</ui-button>
        </ui-tooltip>
        <ui-tooltip content="点击外部不关闭" :close-on-click-outside="false">
          <ui-button>关闭</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容 content slot">
      <ui-tooltip>
        <ui-button type="primary">带图标的提示</ui-button>
        <template #content>
          <view class="custom-tip">
            <ui-icon name="info" size="32rpx" color="text-inverse" />
            <text class="custom-tip__text">自定义内容 + 图标</text>
          </view>
        </template>
      </ui-tooltip>
    </demo-section>

    <demo-section title="受控模式 v-model:visible">
      <demo-block direction="column" :gap="12">
        <ui-tooltip v-model:visible="controlled" content="受控显示">
          <ui-button type="primary">{{ controlled ? "显示中" : "已隐藏" }}</ui-button>
        </ui-tooltip>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="controlled = true">打开</ui-button>
          <ui-button size="small" @click="controlled = false">关闭</ui-button>
          <ui-button size="small" type="primary" @click="controlled = !controlled">切换</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法" desc="open / close / toggle">
      <demo-block direction="column" :gap="12">
        <ui-tooltip ref="tooltipRef" content="实例方法演示" :close-on-click-outside="false">
          <ui-button>目标按钮</ui-button>
        </ui-tooltip>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="tooltipRef?.open()">open()</ui-button>
          <ui-button size="small" @click="tooltipRef?.close()">close()</ui-button>
          <ui-button size="small" type="primary" @click="tooltipRef?.toggle()">toggle()</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" :gap="12">
        <ui-tooltip content="点击查看事件" @open="onOpen" @close="onClose">
          <ui-button>触发</ui-button>
        </ui-tooltip>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 表单字段说明">
      <view class="form-row">
        <view class="form-row__label">
          <text>邀请码</text>
          <ui-tooltip content="邀请码可从邀请人处获取，6 位数字" placement="top" max-width="320rpx">
            <ui-icon name="question" size="28rpx" color="text-secondary" />
          </ui-tooltip>
        </view>
        <ui-input v-model="invite" placeholder="请输入 6 位邀请码" />
      </view>
    </demo-section>

    <demo-section title="综合 · 操作引导">
      <demo-block :cols="3" :gap="12">
        <ui-tooltip content="点击保存当前数据" placement="bottom">
          <ui-button type="primary">保存</ui-button>
        </ui-tooltip>
        <ui-tooltip content="撤销上次操作" placement="bottom">
          <ui-button>撤销</ui-button>
        </ui-tooltip>
        <ui-tooltip content="删除选中项（不可恢复）" placement="bottom" bg-color="danger">
          <ui-button type="danger">删除</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TooltipInstance, TooltipPlacement } from "@/uni_modules/uniapp-ui/ui-tooltip"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Tooltip 文字提示" },
})

const placementPresets: TooltipPlacement[] = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
]
const placementDemo = ref<TooltipPlacement>("top")

const colorPresets = ["primary", "success", "warning", "danger"]
const colorDemo = ref("primary")

const offsetPresets = [0, 8, 16, 24]
const offsetDemo = ref(0)

const controlled = ref(false)
const tooltipRef = ref<TooltipInstance>()

const eventLog = ref("等待事件...")
function onOpen() {
  eventLog.value = "[open]"
}
function onClose() {
  eventLog.value = "[close]"
}

const invite = ref("")
</script>

<style lang="scss" scoped>
.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.placement-row {
  display: flex;
  padding: var(--ui-spacing-xl);
  justify-content: center;
}

.custom-tip {
  gap: var(--ui-spacing-xs);
  display: flex;
  align-items: center;

  &__text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-xs);
  }
}

.form-row {
  gap: var(--ui-spacing-sm);
  display: flex;
  flex-direction: column;

  &__label {
    gap: var(--ui-spacing-xs);
    color: var(--ui-color-text);
    display: flex;
    font-size: var(--ui-font-size-sm);
    align-items: center;
    font-weight: var(--ui-font-weight-normal);
  }
}
</style>
