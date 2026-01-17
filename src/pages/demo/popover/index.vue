<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-popover v-model:show="show1" :actions="actions1" placement="bottom">
          <ui-button type="primary">浅色风格</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="深色风格">
      <demo-block>
        <ui-popover v-model:show="show2" :actions="actions1" placement="bottom" theme="dark">
          <ui-button type="primary">深色风格</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="弹出位置">
      <demo-block direction="column" :gap="24">
        <view class="placement-row">
          <ui-popover v-model:show="show3" :actions="actions2" placement="top">
            <ui-button size="small">上方</ui-button>
          </ui-popover>
          <ui-popover v-model:show="show4" :actions="actions2" placement="top-start">
            <ui-button size="small">上左</ui-button>
          </ui-popover>
          <ui-popover v-model:show="show5" :actions="actions2" placement="top-end">
            <ui-button size="small">上右</ui-button>
          </ui-popover>
        </view>
        <view class="placement-row">
          <ui-popover v-model:show="show6" :actions="actions2" placement="left">
            <ui-button size="small">左侧</ui-button>
          </ui-popover>
          <ui-popover v-model:show="show7" :actions="actions2" placement="right">
            <ui-button size="small">右侧</ui-button>
          </ui-popover>
        </view>
        <view class="placement-row">
          <ui-popover v-model:show="show8" :actions="actions2" placement="bottom">
            <ui-button size="small">下方</ui-button>
          </ui-popover>
          <ui-popover v-model:show="show9" :actions="actions2" placement="bottom-start">
            <ui-button size="small">下左</ui-button>
          </ui-popover>
          <ui-popover v-model:show="show10" :actions="actions2" placement="bottom-end">
            <ui-button size="small">下右</ui-button>
          </ui-popover>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="带图标的选项">
      <demo-block>
        <ui-popover v-model:show="show11" :actions="actionsWithIcon" placement="bottom">
          <ui-button type="primary">带图标选项</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block>
        <ui-popover v-model:show="show12" :actions="actionsWithDisabled" placement="bottom">
          <ui-button type="primary">禁用选项</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容">
      <demo-block>
        <ui-popover v-model:show="show13" placement="bottom">
          <ui-button type="primary">自定义内容</ui-button>
          <template #content>
            <view class="custom-content">
              <view class="custom-content__header">提示信息</view>
              <view class="custom-content__body">这是自定义的气泡内容，可以放置任意元素。</view>
              <view class="custom-content__footer">
                <ui-button size="small" type="primary" @click="show13 = false">知道了</ui-button>
              </view>
            </view>
          </template>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="隐藏箭头">
      <demo-block>
        <ui-popover v-model:show="show14" :actions="actions1" placement="bottom" :show-arrow="false">
          <ui-button type="primary">隐藏箭头</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="选项事件">
      <demo-block>
        <view class="event-demo">
          <ui-popover v-model:show="show15" :actions="actions1" placement="bottom" @select="onSelect">
            <ui-button type="primary">点击选项</ui-button>
          </ui-popover>
          <text class="event-text">{{ selectedText }}</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { PopoverAction } from "@/uni_modules/uniapp-ui/ui-popover"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Popover 气泡弹框" },
})

// 基础用法
const show1 = ref(false)
const show2 = ref(false)

// 弹出位置
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const show9 = ref(false)
const show10 = ref(false)

// 其他示例
const show11 = ref(false)
const show12 = ref(false)
const show13 = ref(false)
const show14 = ref(false)
const show15 = ref(false)

// 选项数据
const actions1: PopoverAction[] = [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }]

const actions2: PopoverAction[] = [{ text: "选项一" }, { text: "选项二" }]

const actionsWithIcon: PopoverAction[] = [
  { text: "选项一", icon: "add-circle" },
  { text: "选项二", icon: "edit" },
  { text: "选项三", icon: "delete", color: "var(--ui-color-danger)" },
]

const actionsWithDisabled: PopoverAction[] = [{ text: "选项一" }, { text: "选项二", disabled: true }, { text: "选项三" }]

// 事件处理
const selectedText = ref("请点击选项")

function onSelect(action: PopoverAction, index: number) {
  selectedText.value = `选中了: ${action.text} (索引: ${index})`
}
</script>

<style lang="scss" scoped>
.placement-row {
  gap: 24rpx;
  display: flex;
  justify-content: center;
}

.custom-content {
  padding: 24rpx;
  min-width: 300rpx;

  &__header {
    color: var(--ui-color-text-primary);
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
  }

  &__body {
    color: var(--ui-color-text-secondary);
    font-size: 28rpx;
    line-height: 1.5;
    margin-bottom: 24rpx;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}

.event-demo {
  gap: 24rpx;
  display: flex;
  align-items: center;
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 28rpx;
}
</style>
