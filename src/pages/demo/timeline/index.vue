<template>
  <demo-page>
    <!-- mode 模式 -->
    <demo-section title="模式 mode">
      <demo-block title="left（默认）">
        <ui-timeline mode="left">
          <ui-timeline-item time="10:00" title="事件一" description="内容在右侧" />
          <ui-timeline-item time="11:00" title="事件二" description="内容在右侧" />
          <ui-timeline-item time="12:00" title="事件三" description="内容在右侧" />
        </ui-timeline>
      </demo-block>

      <demo-block title="right">
        <ui-timeline mode="right">
          <ui-timeline-item time="10:00" title="事件一" description="内容在右侧" />
          <ui-timeline-item time="11:00" title="事件二" description="内容在右侧" />
          <ui-timeline-item time="12:00" title="事件三" description="内容在右侧" />
        </ui-timeline>
      </demo-block>

      <demo-block title="alternate（自动交替）">
        <ui-timeline mode="alternate">
          <ui-timeline-item time="10:00" title="事件一" description="索引0，自动在左" />
          <ui-timeline-item time="11:00" title="事件二" description="索引1，自动在右" />
          <ui-timeline-item time="12:00" title="事件三" description="索引2，自动在左" />
        </ui-timeline>
      </demo-block>

      <demo-block title="alternate + position（手动指定）">
        <ui-timeline mode="alternate">
          <ui-timeline-item position="right" time="10:00" title="强制在右" />
          <ui-timeline-item position="left" time="11:00" title="强制在左" />
          <ui-timeline-item position="right" time="12:00" title="强制在右" />
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- reverse 倒序 -->
    <demo-section title="倒序 reverse">
      <demo-block>
        <ui-timeline reverse>
          <ui-timeline-item time="昨天" title="最早事件" />
          <ui-timeline-item time="3小时前" title="较早事件" />
          <ui-timeline-item time="1小时前" title="最近事件" />
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- pending 加载中 -->
    <demo-section title="加载中 pending">
      <demo-block>
        <ui-timeline pending>
          <ui-timeline-item time="10:00" title="已完成" description="第一步" />
          <ui-timeline-item time="11:00" title="已完成" description="第二步" />
          <template #pending>
            <text>加载中...</text>
          </template>
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- lineColor 线条颜色 -->
    <demo-section title="线条颜色 lineColor">
      <demo-block>
        <ui-timeline line-color="#07c160">
          <ui-timeline-item time="10:00" title="绿色线条" />
          <ui-timeline-item time="11:00" title="绿色线条" />
          <ui-timeline-item time="12:00" title="绿色线条" />
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- 子项：icon / iconColor -->
    <demo-section title="图标 icon / iconColor">
      <demo-block title="使用图标">
        <ui-timeline>
          <ui-timeline-item icon="check" icon-color="#07c160" time="10:00" title="已完成" />
          <ui-timeline-item icon="time" icon-color="#ff976a" time="11:00" title="进行中" />
          <ui-timeline-item icon="edit" icon-color="#1989fa" time="12:00" title="待编辑" />
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- 子项：dotColor 节点颜色 -->
    <demo-section title="节点颜色 dotColor">
      <demo-block>
        <ui-timeline>
          <ui-timeline-item dot-color="#07c160" time="10:00" title="绿色节点" />
          <ui-timeline-item dot-color="#1989fa" time="11:00" title="蓝色节点" />
          <ui-timeline-item dot-color="#ff976a" time="12:00" title="橙色节点" />
          <ui-timeline-item dot-color="#ee0a24" time="13:00" title="红色节点" />
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- 子项：time / title / description -->
    <demo-section title="内容字段">
      <demo-block title="time + title + description">
        <ui-timeline>
          <ui-timeline-item time="2024-01-15 10:00" title="订单提交" description="订单已提交成功" />
          <ui-timeline-item time="2024-01-15 11:00" title="支付成功" description="订单支付完成" />
        </ui-timeline>
      </demo-block>

      <demo-block title="仅 title">
        <ui-timeline>
          <ui-timeline-item title="只有标题" />
          <ui-timeline-item title="只有标题" />
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- 自定义插槽 -->
    <demo-section title="自定义插槽">
      <demo-block title="dot 插槽">
        <ui-timeline>
          <ui-timeline-item time="10:00" title="自定义节点">
            <template #dot>
              <view class="custom-dot custom-dot--primary">
                <ui-icon name="star" size="24rpx" color="#fff" />
              </view>
            </template>
          </ui-timeline-item>
          <ui-timeline-item time="11:00" title="自定义节点">
            <template #dot>
              <view class="custom-dot custom-dot--success">
                <ui-icon name="check" size="24rpx" color="#fff" />
              </view>
            </template>
          </ui-timeline-item>
        </ui-timeline>
      </demo-block>

      <demo-block title="time / title / description 插槽">
        <ui-timeline>
          <ui-timeline-item>
            <template #time>
              <ui-tag type="primary" size="small">10:00</ui-tag>
            </template>
            <template #title>
              <text class="custom-title">自定义标题样式</text>
            </template>
            <template #description>
              <text class="custom-desc">自定义描述样式</text>
            </template>
          </ui-timeline-item>
        </ui-timeline>
      </demo-block>

      <demo-block title="default 插槽（完全自定义内容）">
        <ui-timeline>
          <ui-timeline-item time="10:00">
            <view class="custom-card">
              <text class="custom-card__title">自定义卡片</text>
              <text class="custom-card__desc">可以放置任意内容</text>
              <ui-button size="mini" type="primary">操作按钮</ui-button>
            </view>
          </ui-timeline-item>
        </ui-timeline>
      </demo-block>
    </demo-section>

    <!-- 事件 -->
    <demo-section title="事件 clickItem">
      <demo-block>
        <text class="event-text">{{ eventText }}</text>
        <ui-timeline @click-item="onClickItem">
          <ui-timeline-item time="10:00" title="点击我" description="点击触发事件" />
          <ui-timeline-item time="11:00" title="点击我" description="查看事件参数" />
        </ui-timeline>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Timeline 时间轴" },
})

const toast = useToast()
const eventText = ref("点击时间轴项触发事件")

function onClickItem(index: number) {
  eventText.value = `点击了第 ${index + 1} 个时间轴项（索引: ${index}）`
  toast.success(`点击了第 ${index + 1} 项`)
}
</script>

<style lang="scss" scoped>
.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
  text-align: center;
  margin-bottom: 24rpx;
}

// 自定义节点
.custom-dot {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;

  &--primary {
    background-color: var(--ui-color-primary);
  }

  &--success {
    background-color: var(--ui-color-success);
  }
}

// 自定义标题/描述
.custom-title {
  color: var(--ui-color-primary);
  font-size: 28rpx;
  font-weight: 500;
}

.custom-desc {
  color: var(--ui-color-warning);
  font-size: 24rpx;
}

// 自定义卡片
.custom-card {
  gap: 12rpx;
  display: flex;
  padding: 20rpx;
  background: #f7f8fa;
  border-radius: 12rpx;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: 28rpx;
    font-weight: 500;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}
</style>
