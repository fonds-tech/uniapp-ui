<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="active1">
          <ui-step title="步骤一" />
          <ui-step title="步骤二" />
          <ui-step title="步骤三" />
          <ui-step title="步骤四" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="active1 === 0" @click="active1--">上一步</ui-button>
          <ui-button size="small" :disabled="active1 >= 3" @click="active1++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="带描述信息">
      <demo-block direction="column">
        <ui-steps :active="active2">
          <ui-step title="下单" description="2024-01-01 10:00" />
          <ui-step title="付款" description="2024-01-01 10:05" />
          <ui-step title="发货" description="2024-01-01 12:00" />
          <ui-step title="收货" description="等待收货" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="active2 === 0" @click="active2--">上一步</ui-button>
          <ui-button size="small" :disabled="active2 >= 3" @click="active2++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="垂直方向">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="active3" direction="vertical">
          <ui-step title="订单提交成功" description="2024-01-01 10:00:00" />
          <ui-step title="订单已付款" description="2024-01-01 10:05:30" />
          <ui-step title="商品已发货" description="2024-01-01 12:00:00" />
          <ui-step title="等待收货" description="预计 2024-01-03 送达" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="active3 === 0" @click="active3--">上一步</ui-button>
          <ui-button size="small" :disabled="active3 >= 3" @click="active3++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">自定义激活颜色:</text>
        <ui-steps :active="colorActive1" active-color="#07c160" inactive-color="#999">
          <ui-step title="步骤一" />
          <ui-step title="步骤二" />
          <ui-step title="步骤三" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="colorActive1 === 0" @click="colorActive1--">上一步</ui-button>
          <ui-button size="small" :disabled="colorActive1 >= 2" @click="colorActive1++">下一步</ui-button>
        </demo-block>
        <text class="demo-text">自定义其他颜色:</text>
        <ui-steps :active="colorActive2" active-color="#ee0a24" inactive-color="#c8c9cc">
          <ui-step title="步骤一" />
          <ui-step title="步骤二" />
          <ui-step title="步骤三" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="colorActive2 === 0" @click="colorActive2--">上一步</ui-button>
          <ui-button size="small" :disabled="colorActive2 >= 2" @click="colorActive2++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">统一设置图标:</text>
        <ui-steps :active="iconActive1" active-icon="check-circle" inactive-icon="time-circle" finish-icon="check-circle">
          <ui-step title="步骤一" />
          <ui-step title="步骤二" />
          <ui-step title="步骤三" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="iconActive1 === 0" @click="iconActive1--">上一步</ui-button>
          <ui-button size="small" :disabled="iconActive1 >= 2" @click="iconActive1++">下一步</ui-button>
        </demo-block>
        <text class="demo-text">单独设置图标:</text>
        <ui-steps :active="iconActive2">
          <ui-step title="购物车" icon="shopping" />
          <ui-step title="填写地址" icon="location" />
          <ui-step title="付款" icon="creditcard" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="iconActive2 === 0" @click="iconActive2--">上一步</ui-button>
          <ui-button size="small" :disabled="iconActive2 >= 2" @click="iconActive2++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="步骤状态">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">错误状态:</text>
        <ui-steps :active="statusActive1" error-color="#ee0a24">
          <ui-step title="步骤一" />
          <ui-step title="步骤二" status="error" />
          <ui-step title="步骤三" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="statusActive1 === 0" @click="statusActive1--">上一步</ui-button>
          <ui-button size="small" :disabled="statusActive1 >= 2" @click="statusActive1++">下一步</ui-button>
        </demo-block>
        <text class="demo-text">自定义状态:</text>
        <ui-steps :active="statusActive2">
          <ui-step title="步骤一" status="finish" />
          <ui-step title="步骤二" status="finish" />
          <ui-step title="步骤三" status="process" />
          <ui-step title="步骤四" status="wait" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="statusActive2 === 0" @click="statusActive2--">上一步</ui-button>
          <ui-button size="small" :disabled="statusActive2 >= 3" @click="statusActive2++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="可点击步骤">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ clickLog }}</text>
        <ui-steps :active="active4" clickable @click-step="onClickStep">
          <ui-step title="步骤一" @click="onStepClick(0)" />
          <ui-step title="步骤二" @click="onStepClick(1)" />
          <ui-step title="步骤三" @click="onStepClick(2)" />
          <ui-step title="步骤四" @click="onStepClick(3)" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="active4 === 0" @click="active4--">上一步</ui-button>
          <ui-button size="small" :disabled="active4 >= 3" @click="active4++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="简洁模式">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">只显示图标，隐藏标题和描述:</text>
        <ui-steps :active="simpleActive" simple>
          <ui-step title="步骤一" />
          <ui-step title="步骤二" />
          <ui-step title="步骤三" />
          <ui-step title="步骤四" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="simpleActive === 0" @click="simpleActive--">上一步</ui-button>
          <ui-button size="small" :disabled="simpleActive >= 3" @click="simpleActive++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="点状模式">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">用小圆点代替数字，更加简洁:</text>
        <ui-steps :active="dotActive" dot>
          <ui-step title="步骤一" />
          <ui-step title="步骤二" />
          <ui-step title="步骤三" />
          <ui-step title="步骤四" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="dotActive === 0" @click="dotActive--">上一步</ui-button>
          <ui-button size="small" :disabled="dotActive >= 3" @click="dotActive++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="垂直居中对齐">
      <demo-block direction="column">
        <ui-steps :active="centerActive" direction="vertical" center>
          <ui-step title="订单提交成功" description="2024-01-01 10:00:00" />
          <ui-step title="订单已付款" description="2024-01-01 10:05:30" />
          <ui-step title="商品已发货" description="2024-01-01 12:00:00" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="centerActive === 0" @click="centerActive--">上一步</ui-button>
          <ui-button size="small" :disabled="centerActive >= 2" @click="centerActive++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="垂直带图标">
      <demo-block direction="column">
        <ui-steps :active="verticalIconActive" direction="vertical" active-icon="check-circle-fill" inactive-icon="time-circle" finish-icon="check-circle-fill" icon-size="44rpx">
          <ui-step title="订单提交成功" description="您的订单已提交，等待系统确认">
            <template #icon="{ status }">
              <ui-icon :name="status === 'finish' ? 'check-circle-fill' : 'time-circle'" :size="44" :color="status === 'finish' ? '#07c160' : '#999'" />
            </template>
          </ui-step>
          <ui-step title="订单已付款" description="支付金额: ¥299.00" />
          <ui-step title="商品配送中" description="快递员正在配送中，请保持电话畅通" />
          <ui-step title="等待收货" description="预计明天送达" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="verticalIconActive === 0" @click="verticalIconActive--">上一步</ui-button>
          <ui-button size="small" :disabled="verticalIconActive >= 3" @click="verticalIconActive++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容">
      <demo-block direction="column">
        <ui-steps :active="customContentActive" direction="vertical">
          <ui-step>
            <template #default="{ status, index }">
              <view class="custom-content">
                <text class="custom-title">步骤 {{ index + 1 }} - {{ getStatusText(status) }}</text>
                <text class="custom-desc">这是自定义的内容区域，可以放置任意内容</text>
                <ui-button v-if="status === 'process'" size="mini" type="primary">操作按钮</ui-button>
              </view>
            </template>
          </ui-step>
          <ui-step>
            <template #default="{ status, index }">
              <view class="custom-content">
                <text class="custom-title">步骤 {{ index + 1 }} - {{ getStatusText(status) }}</text>
                <text class="custom-desc">当前进行中的步骤可以展示更多操作</text>
              </view>
            </template>
          </ui-step>
          <ui-step>
            <template #default="{ status, index }">
              <view class="custom-content">
                <text class="custom-title">步骤 {{ index + 1 }} - {{ getStatusText(status) }}</text>
                <text class="custom-desc">等待中的步骤</text>
              </view>
            </template>
          </ui-step>
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="customContentActive === 0" @click="customContentActive--">上一步</ui-button>
          <ui-button size="small" :disabled="customContentActive >= 2" @click="customContentActive++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="订单跟踪示例">
      <demo-block direction="column">
        <view class="order-track">
          <view class="order-track__header">
            <text class="order-track__title">物流信息</text>
            <text class="order-track__number">订单号: 2024010112345678</text>
          </view>
          <ui-steps :active="orderActive" direction="vertical" active-color="#1989fa">
            <ui-step v-for="(item, idx) in orderSteps" :key="idx" :title="item.title" :description="item.time" />
          </ui-steps>
        </view>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="orderActive === 0" @click="orderActive--">上一步</ui-button>
          <ui-button size="small" :disabled="orderActive >= orderSteps.length - 1" @click="orderActive++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="表单步骤示例">
      <demo-block direction="column" :gap="24">
        <ui-steps :active="formStep">
          <ui-step title="基本信息" />
          <ui-step title="详细资料" />
          <ui-step title="确认提交" />
        </ui-steps>
        <view class="form-content">
          <view v-if="formStep === 0" class="form-step">
            <text class="form-step__title">填写基本信息</text>
            <text class="form-step__desc">请输入姓名、手机号等基本信息</text>
          </view>
          <view v-else-if="formStep === 1" class="form-step">
            <text class="form-step__title">填写详细资料</text>
            <text class="form-step__desc">请完善地址、身份证等详细信息</text>
          </view>
          <view v-else class="form-step">
            <text class="form-step__title">确认提交</text>
            <text class="form-step__desc">请核对以上信息，确认无误后提交</text>
          </view>
        </view>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="formStep === 0" @click="formStep--">上一步</ui-button>
          <ui-button size="small" type="primary" @click="handleFormNext">{{ formStep === formStepMax ? "提交" : "下一步" }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { StepStatus } from "@/uni_modules/uniapp-ui/ui-steps"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Steps 步骤条" },
})

const toast = useToast()

// 基础用法
const active1 = ref(0)

// 带描述
const active2 = ref(0)

// 垂直方向
const active3 = ref(0)

// 自定义颜色
const colorActive1 = ref(0)
const colorActive2 = ref(0)

// 自定义图标
const iconActive1 = ref(0)
const iconActive2 = ref(0)

// 步骤状态
const statusActive1 = ref(0)
const statusActive2 = ref(0)

// 可点击
const active4 = ref(0)
const clickLog = ref("点击步骤触发事件")

// 简洁模式
const simpleActive = ref(0)

// 点状模式
const dotActive = ref(0)

// 垂直居中对齐
const centerActive = ref(0)

// 垂直带图标
const verticalIconActive = ref(0)

// 自定义内容
const customContentActive = ref(0)

// 订单跟踪
const orderActive = ref(0)
const orderSteps = [
  { title: "已签收", time: "2024-01-03 14:30:00" },
  { title: "派送中", time: "2024-01-03 09:00:00" },
  { title: "运输中", time: "2024-01-02 18:00:00" },
  { title: "已发货", time: "2024-01-01 12:00:00" },
  { title: "已付款", time: "2024-01-01 10:05:00" },
]

// 表单步骤
const formStep = ref(0)
const formStepMax = 2

/**
 * 点击步骤事件（通过 clickable 触发）
 */
function onClickStep(index: number) {
  clickLog.value = `触发 click-step 事件，点击了第 ${index + 1} 步`
  active4.value = index
  toast.success(`切换到第 ${index + 1} 步`)
}

/**
 * 点击单个步骤事件
 */
function onStepClick(index: number) {
  clickLog.value = `触发 step 的 click 事件，索引: ${index}`
}

/**
 * 获取状态文本
 */
function getStatusText(status: StepStatus): string {
  const map: Record<StepStatus, string> = {
    wait: "等待中",
    process: "进行中",
    finish: "已完成",
    error: "错误",
  }
  return map[status] || status
}

/**
 * 表单下一步处理
 */
function handleFormNext() {
  if (formStep.value === formStepMax) {
    toast.success("提交成功！")
    formStep.value = 0
  } else {
    formStep.value++
  }
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

// 自定义内容样式
.custom-content {
  gap: 8rpx;
  display: flex;
  flex-direction: column;
}

.custom-title {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  font-weight: 500;
}

.custom-desc {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

// 订单跟踪样式
.order-track {
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text-primary);
    font-size: 32rpx;
    font-weight: 600;
  }

  &__number {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}

// 表单步骤样式
.form-content {
  padding: 32rpx;
  background: #f7f8fa;
  border-radius: 12rpx;
}

.form-step {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text-primary);
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 12rpx;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 26rpx;
  }
}
</style>
