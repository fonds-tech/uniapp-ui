<template>
  <demo-page>
    <demo-section title="基础用法" desc="水平步骤条 + active 切换">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="basic">
          <ui-step v-for="i in 4" :key="i" :title="`步骤${i}`" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="basic === 0" @click="basic--">上一步</ui-button>
          <ui-button size="small" :disabled="basic >= 3" @click="basic++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="带描述" desc="title + description 双行">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="withDesc">
          <ui-step title="下单" description="10:00" />
          <ui-step title="付款" description="10:05" />
          <ui-step title="发货" description="12:00" />
          <ui-step title="收货" description="等待中" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="withDesc === 0" @click="withDesc--">上一步</ui-button>
          <ui-button size="small" :disabled="withDesc >= 3" @click="withDesc++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="方向" desc="horizontal / vertical 切换">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="dirActive" :direction="dir">
          <ui-step title="订单提交" description="2024-01-01 10:00" />
          <ui-step title="商品付款" description="2024-01-01 10:05" />
          <ui-step title="商品发货" description="2024-01-01 12:00" />
          <ui-step title="等待收货" description="预计 2024-01-03" />
        </ui-steps>
        <demo-block :cols="2" :gap="12">
          <ui-button v-for="d in directions" :key="d" size="small" :type="dir === d ? 'primary' : 'default'" @click="dir = d">
            {{ d }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="颜色切换" desc="active / inactive / error 颜色独立">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="colorActive" :active-color="colorActiveVal" :inactive-color="colorInactiveVal" :error-color="colorErrorVal">
          <ui-step title="步骤1" />
          <ui-step title="步骤2" />
          <ui-step title="出错" status="error" />
          <ui-step title="步骤4" />
        </ui-steps>
        <text class="demo-label">激活色</text>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c.label" size="small" :type="colorActiveVal === c.value ? 'primary' : 'default'" @click="colorActiveVal = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="图标切换" desc="父级 active/inactive/finish/errorIcon 继承 + 单步 icon 覆盖">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="iconActive" active-icon="time" finish-icon="checked" inactive-icon="circle">
          <ui-step title="下单" />
          <ui-step title="付款" />
          <ui-step title="发货" icon="truck" />
          <ui-step title="收货" />
        </ui-steps>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="iconActive === 0" @click="iconActive--">上一步</ui-button>
          <ui-button size="small" :disabled="iconActive >= 3" @click="iconActive++">下一步</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="状态显式覆盖" desc="单 step 通过 status 强制状态">
      <demo-block>
        <ui-steps :active="3">
          <ui-step title="完成" status="finish" />
          <ui-step title="完成" status="finish" />
          <ui-step title="出错" status="error" />
          <ui-step title="进行中" status="process" />
          <ui-step title="等待" status="wait" />
        </ui-steps>
      </demo-block>
    </demo-section>

    <demo-section title="模式" desc="default / simple / dot 切换">
      <demo-block direction="column" :gap="16">
        <ui-steps :active="2" :simple="mode === 'simple'" :dot="mode === 'dot'">
          <ui-step v-for="i in 5" :key="i" :title="`步骤${i}`" />
        </ui-steps>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="m in modes" :key="m" size="small" :type="mode === m ? 'primary' : 'default'" @click="mode = m">
            {{ m }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="可点击" desc="clickable + 事件回显">
      <demo-block direction="column" :gap="12">
        <text class="demo-text">{{ clickLog }}</text>
        <ui-steps :active="clickActive" clickable @click-step="onClickStep">
          <ui-step v-for="i in 4" :key="i" :title="`步骤${i}`" />
        </ui-steps>
      </demo-block>
    </demo-section>

    <demo-section title="自定义 icon slot" desc="完全替代默认圆圈">
      <demo-block>
        <ui-steps :active="2" direction="vertical">
          <ui-step v-for="(item, i) in slotSteps" :key="i" :title="item.title" :description="item.desc">
            <template #icon="{ status }">
              <view class="custom-icon" :class="`custom-icon--${status}`">
                <text>{{ i + 1 }}</text>
              </view>
            </template>
          </ui-step>
        </ui-steps>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容 slot" desc="default slot 完全替代标题描述">
      <demo-block>
        <ui-steps :active="2" direction="vertical">
          <ui-step v-for="(item, i) in slotSteps" :key="i">
            <template #default="{ status, index }">
              <view class="custom-content">
                <text class="custom-content__title">步骤 {{ index + 1 }} · {{ statusText(status) }}</text>
                <text class="custom-content__desc">{{ item.desc }}</text>
                <ui-button v-if="status === 'process'" size="mini" type="primary">立即操作</ui-button>
              </view>
            </template>
          </ui-step>
        </ui-steps>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 物流跟踪" desc="垂直 + 真实物流数据样式">
      <demo-block>
        <view class="track-card">
          <view class="track-card__header">
            <text class="track-card__title">物流信息</text>
            <text class="track-card__no">运单号 2024010112345678</text>
          </view>
          <ui-steps :active="0" direction="vertical">
            <ui-step v-for="(item, i) in trackSteps" :key="i" :title="item.title" :description="item.time" />
          </ui-steps>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 表单分步" desc="水平进度 + 内容切换 + 上下一步">
      <demo-block direction="column" :gap="20">
        <ui-steps :active="formStep">
          <ui-step title="基本信息" />
          <ui-step title="详细资料" />
          <ui-step title="确认提交" />
        </ui-steps>
        <view class="form-panel">
          <text class="form-panel__title">{{ formPanels[formStep].title }}</text>
          <text class="form-panel__desc">{{ formPanels[formStep].desc }}</text>
        </view>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" :disabled="formStep === 0" @click="formStep--">上一步</ui-button>
          <ui-button size="small" type="primary" @click="onFormNext">{{ formStep === 2 ? "提交" : "下一步" }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { StepStatus, StepDirection } from "@/uni_modules/uniapp-ui/ui-steps"
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Steps 步骤条" },
})

const toast = useToast()

const basic = ref(1)
const withDesc = ref(2)

const directions: StepDirection[] = ["horizontal", "vertical"]
const dir = ref<StepDirection>("horizontal")
const dirActive = ref(2)

const colorActive = ref(1)
const colorActiveVal = ref("primary")
const colorInactiveVal = ref("")
const colorErrorVal = ref("")
const colorPresets = [
  { label: "primary", value: "primary" },
  { label: "success", value: "success" },
  { label: "warning", value: "warning" },
  { label: "danger", value: "danger" },
]

const iconActive = ref(2)

const modes = ["default", "simple", "dot"] as const
const mode = ref<(typeof modes)[number]>("default")

const clickActive = ref(0)
const clickLog = ref("点击任意步骤触发事件")
function onClickStep(index: number) {
  clickActive.value = index
  clickLog.value = `[click-step] index=${index}`
  toast.success(`切换到第 ${index + 1} 步`)
}

const slotSteps = [
  { title: "节点 A", desc: "已完成" },
  { title: "节点 B", desc: "已完成" },
  { title: "节点 C", desc: "进行中" },
  { title: "节点 D", desc: "未开始" },
]

function statusText(s: StepStatus) {
  return { wait: "等待", process: "进行中", finish: "完成", error: "错误" }[s] || s
}

const trackSteps = [
  { title: "已签收", time: "2024-01-03 14:30" },
  { title: "派送中", time: "2024-01-03 09:00" },
  { title: "运输中", time: "2024-01-02 18:00" },
  { title: "已发货", time: "2024-01-01 12:00" },
  { title: "已付款", time: "2024-01-01 10:05" },
]

const formStep = ref(0)
const formPanels = [
  { title: "填写基本信息", desc: "姓名 / 手机号 / 邮箱" },
  { title: "填写详细资料", desc: "地址 / 身份证 / 紧急联系人" },
  { title: "确认提交", desc: "核对所有信息后提交" },
]
function onFormNext() {
  if (formStep.value === 2) {
    toast.success("提交成功")
    formStep.value = 0
  } else {
    formStep.value++
  }
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.demo-label {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-sm);
}

.custom-icon {
  color: var(--ui-color-text-inverse);
  width: 48rpx;
  height: 48rpx;
  display: flex;
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-text-placeholder);
  align-items: center;
  font-weight: var(--ui-font-weight-bold);
  border-radius: 50%;
  justify-content: center;

  &--finish,
  &--process {
    background: var(--ui-color-primary);
  }

  &--error {
    background: var(--ui-color-danger);
  }
}

.custom-content {
  gap: var(--ui-spacing-xs);
  display: flex;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-medium);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.track-card {
  width: 100%;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-sm);
  border-radius: var(--ui-radius-md);

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__no {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.form-panel {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background-section);
  align-items: center;
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
