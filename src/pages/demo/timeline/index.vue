<template>
  <demo-page>
    <demo-section title="模式 mode" desc="left / right / alternate 切换">
      <demo-block direction="column" :gap="16">
        <ui-timeline :mode="modeDemo">
          <ui-timeline-item time="10:00" title="事件一" description="第一条" />
          <ui-timeline-item time="11:00" title="事件二" description="第二条" />
          <ui-timeline-item time="12:00" title="事件三" description="第三条" />
        </ui-timeline>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="m in modePresets" :key="m" size="small" :type="modeDemo === m ? 'primary' : 'default'" @click="modeDemo = m">
            {{ m }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="倒序 reverse" desc="时间倒序排列">
      <ui-timeline reverse>
        <ui-timeline-item time="昨天" title="最早事件" />
        <ui-timeline-item time="3 小时前" title="较早事件" />
        <ui-timeline-item time="1 小时前" title="最近事件" />
      </ui-timeline>
    </demo-section>

    <demo-section title="alternate + position" desc="手动指定单项轴位置">
      <ui-timeline mode="alternate">
        <ui-timeline-item position="right" time="10:00" title="强制右" />
        <ui-timeline-item position="left" time="11:00" title="强制左" />
        <ui-timeline-item position="right" time="12:00" title="强制右" />
      </ui-timeline>
    </demo-section>

    <demo-section title="线条颜色 lineColor" desc="切换语义色">
      <demo-block direction="column" :gap="16">
        <ui-timeline :line-color="lineColorDemo">
          <ui-timeline-item time="10:00" title="节点一" />
          <ui-timeline-item time="11:00" title="节点二" />
          <ui-timeline-item time="12:00" title="节点三" />
        </ui-timeline>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c" size="small" :type="lineColorDemo === c ? 'primary' : 'default'" @click="lineColorDemo = c">
            {{ c }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="线条样式 lineStyle" desc="solid / dashed / dotted 切换">
      <demo-block direction="column" :gap="16">
        <ui-timeline :line-style="lineStyleDemo">
          <ui-timeline-item time="10:00" title="节点一" />
          <ui-timeline-item time="11:00" title="节点二" />
          <ui-timeline-item time="12:00" title="节点三" />
        </ui-timeline>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in lineStylePresets" :key="s" size="small" :type="lineStyleDemo === s ? 'primary' : 'default'" @click="lineStyleDemo = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="线条宽度 lineWidth" desc="切换 2/4/6rpx">
      <demo-block direction="column" :gap="16">
        <ui-timeline :line-width="lineWidthDemo" line-color="primary">
          <ui-timeline-item time="10:00" title="节点一" />
          <ui-timeline-item time="11:00" title="节点二" />
          <ui-timeline-item time="12:00" title="节点三" />
        </ui-timeline>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="w in lineWidthPresets" :key="w" size="small" :type="lineWidthDemo === w ? 'primary' : 'default'" @click="lineWidthDemo = w">
            {{ w }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="节点尺寸 dotSize" desc="切换 16/24/32rpx">
      <demo-block direction="column" :gap="16">
        <ui-timeline :dot-size="dotSizeDemo">
          <ui-timeline-item time="10:00" title="节点一" />
          <ui-timeline-item time="11:00" title="节点二" />
          <ui-timeline-item time="12:00" title="节点三" />
        </ui-timeline>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in dotSizePresets" :key="s" size="small" :type="dotSizeDemo === s ? 'primary' : 'default'" @click="dotSizeDemo = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="图标尺寸 iconSize" desc="切换 20/28/36rpx">
      <demo-block direction="column" :gap="16">
        <ui-timeline :icon-size="iconSizeDemo" :dot-size="48">
          <ui-timeline-item icon="check" type="success" time="10:00" title="已完成" />
          <ui-timeline-item icon="clock" type="warning" time="11:00" title="进行中" />
          <ui-timeline-item icon="edit" type="primary" time="12:00" title="待编辑" />
        </ui-timeline>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in iconSizePresets" :key="s" size="small" :type="iconSizeDemo === s ? 'primary' : 'default'" @click="iconSizeDemo = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="轴列宽度 axisWidth" desc="切换 32/48/80rpx">
      <demo-block direction="column" :gap="16">
        <ui-timeline :axis-width="axisWidthDemo">
          <ui-timeline-item time="10:00" title="节点一" />
          <ui-timeline-item time="11:00" title="节点二" />
        </ui-timeline>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="w in axisWidthPresets" :key="w" size="small" :type="axisWidthDemo === w ? 'primary' : 'default'" @click="axisWidthDemo = w">
            {{ w }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="项目间距 itemGap" desc="切换 8/24/48rpx">
      <demo-block direction="column" :gap="16">
        <ui-timeline :item-gap="itemGapDemo">
          <ui-timeline-item time="10:00" title="节点一" description="说明" />
          <ui-timeline-item time="11:00" title="节点二" description="说明" />
          <ui-timeline-item time="12:00" title="节点三" description="说明" />
        </ui-timeline>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="g in itemGapPresets" :key="g" size="small" :type="itemGapDemo === g ? 'primary' : 'default'" @click="itemGapDemo = g">
            {{ g }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="节点状态 type" desc="primary / success / warning / danger / info">
      <ui-timeline>
        <ui-timeline-item type="primary" time="10:00" title="主色" />
        <ui-timeline-item type="success" time="11:00" title="成功" />
        <ui-timeline-item type="warning" time="12:00" title="警告" />
        <ui-timeline-item type="danger" time="13:00" title="危险" />
        <ui-timeline-item type="info" time="14:00" title="信息" />
      </ui-timeline>
    </demo-section>

    <demo-section title="空心节点 hollow" desc="hollow + type 组合">
      <ui-timeline>
        <ui-timeline-item type="primary" hollow time="10:00" title="空心 primary" />
        <ui-timeline-item type="success" hollow time="11:00" title="空心 success" />
        <ui-timeline-item type="warning" hollow time="12:00" title="空心 warning" />
        <ui-timeline-item type="danger" hollow time="13:00" title="空心 danger" />
      </ui-timeline>
    </demo-section>

    <demo-section title="图标节点 icon" desc="icon + type 组合">
      <ui-timeline>
        <ui-timeline-item icon="check" type="success" time="10:00" title="已完成" />
        <ui-timeline-item icon="clock" type="warning" time="11:00" title="进行中" />
        <ui-timeline-item icon="edit" type="primary" time="12:00" title="待编辑" />
        <ui-timeline-item icon="close" type="danger" time="13:00" title="已取消" />
      </ui-timeline>
    </demo-section>

    <demo-section title="自定义节点颜色 dotColor / iconColor" desc="单项级覆盖">
      <ui-timeline>
        <ui-timeline-item dot-color="#9b59b6" time="10:00" title="紫色节点" />
        <ui-timeline-item dot-color="#1abc9c" time="11:00" title="青绿节点" />
        <ui-timeline-item icon="star" icon-color="#fff" dot-color="#e67e22" time="12:00" title="橙色 + 星标" />
      </ui-timeline>
    </demo-section>

    <demo-section title="自定义插槽" desc="dot / time / title / description / default">
      <ui-timeline>
        <ui-timeline-item time="10:00" title="自定义节点">
          <template #dot>
            <view class="custom-dot custom-dot--primary">
              <ui-icon name="star" size="24rpx" color="text-inverse" />
            </view>
          </template>
        </ui-timeline-item>
        <ui-timeline-item>
          <template #time>
            <ui-tag type="primary" size="small">10:30</ui-tag>
          </template>
          <template #title>
            <text class="custom-title">自定义标题</text>
          </template>
          <template #description>
            <text class="custom-desc">自定义描述</text>
          </template>
        </ui-timeline-item>
        <ui-timeline-item time="11:00">
          <view class="custom-card">
            <text class="custom-card__title">完全自定义内容</text>
            <text class="custom-card__desc">default slot 可放任意内容</text>
            <ui-button size="small" type="primary">操作</ui-button>
          </view>
        </ui-timeline-item>
      </ui-timeline>
    </demo-section>

    <demo-section title="事件回显" desc="click-item 触发">
      <demo-block direction="column" :gap="12">
        <ui-timeline @click-item="onClickItem">
          <ui-timeline-item time="10:00" title="点我" description="第 1 项" />
          <ui-timeline-item time="11:00" title="点我" description="第 2 项" />
          <ui-timeline-item time="12:00" title="点我" description="第 3 项" />
        </ui-timeline>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 物流轨迹">
      <ui-timeline line-color="border">
        <ui-timeline-item type="success" icon="check" time="2026-05-12 14:32" title="已签收" description="本人签收，感谢使用" />
        <ui-timeline-item type="primary" time="2026-05-12 09:10" title="派送中" description="快递员正在派送" />
        <ui-timeline-item time="2026-05-11 18:45" title="到达派送站" description="到达【上海闸北区站】" />
        <ui-timeline-item time="2026-05-10 22:00" title="运输中" description="离开【杭州中转站】" />
        <ui-timeline-item hollow time="2026-05-10 10:00" title="已下单" description="订单创建成功" />
      </ui-timeline>
    </demo-section>

    <demo-section title="综合 · 订单流程">
      <ui-timeline>
        <ui-timeline-item type="success" icon="check" time="第 1 步" title="提交订单" description="选择商品并下单" />
        <ui-timeline-item type="success" icon="check" time="第 2 步" title="完成支付" description="使用微信支付" />
        <ui-timeline-item type="primary" icon="clock" time="第 3 步" title="商家发货" description="正在打包配送" />
        <ui-timeline-item hollow time="第 4 步" title="确认收货" description="待收货" />
        <ui-timeline-item hollow time="第 5 步" title="评价订单" description="待评价" />
      </ui-timeline>
    </demo-section>

    <demo-section title="综合 · 审批流程">
      <ui-timeline mode="alternate">
        <ui-timeline-item type="success" icon="check" time="2026-05-10 09:00" title="申请提交" description="张三 · 项目负责人" />
        <ui-timeline-item type="success" icon="check" time="2026-05-10 14:30" title="部门审批通过" description="李四 · 部门主管" />
        <ui-timeline-item type="primary" icon="clock" time="2026-05-11 10:15" title="财务审核中" description="王五 · 财务" />
        <ui-timeline-item hollow time="待处理" title="总经理审批" description="赵六 · 总经理" />
      </ui-timeline>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TimelineMode, TimelineLineStyle } from "@/uni_modules/uniapp-ui/ui-timeline"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Timeline 时间轴" },
})

const modePresets: TimelineMode[] = ["left", "right", "alternate"]
const modeDemo = ref<TimelineMode>("left")

const colorPresets = ["primary", "success", "warning", "danger"]
const lineColorDemo = ref("primary")

const lineStylePresets: TimelineLineStyle[] = ["solid", "dashed", "dotted"]
const lineStyleDemo = ref<TimelineLineStyle>("solid")

const lineWidthPresets = ["2rpx", "4rpx", "6rpx"]
const lineWidthDemo = ref("2rpx")

const dotSizePresets = ["16rpx", "24rpx", "32rpx"]
const dotSizeDemo = ref("24rpx")

const iconSizePresets = ["20rpx", "28rpx", "36rpx"]
const iconSizeDemo = ref("28rpx")

const axisWidthPresets = ["32rpx", "48rpx", "80rpx"]
const axisWidthDemo = ref("48rpx")

const itemGapPresets = ["8rpx", "24rpx", "48rpx"]
const itemGapDemo = ref("24rpx")

const eventLog = ref("等待点击...")
function onClickItem(index: number) {
  eventLog.value = `[click-item] index=${index}`
}
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

.custom-dot {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;

  &--primary {
    background: var(--ui-color-primary);
  }
}

.custom-title {
  color: var(--ui-color-primary);
  font-size: var(--ui-font-size-sm);
  font-weight: var(--ui-font-weight-normal);
}

.custom-desc {
  color: var(--ui-color-warning);
  font-size: var(--ui-font-size-xs);
}

.custom-card {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
