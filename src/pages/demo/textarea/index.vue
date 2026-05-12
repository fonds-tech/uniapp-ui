<template>
  <demo-page>
    <demo-section title="基础用法" desc="多行文本输入">
      <ui-textarea v-model="basic" placeholder="请输入留言内容" background="background-section" radius="12rpx" />
    </demo-section>

    <demo-section title="字数统计" desc="show-count + maxlength">
      <ui-textarea v-model="count" placeholder="请输入个人简介" :maxlength="100" show-count background="background-section" radius="12rpx" />
    </demo-section>

    <demo-section title="自动高度" desc="auto-height 随内容增高">
      <ui-textarea v-model="auto" placeholder="输入内容时自动撑高" auto-height background="background-section" radius="12rpx" />
    </demo-section>

    <demo-section title="对齐方式 inputAlign" desc="left / center / right 切换">
      <demo-block direction="column" :gap="16">
        <ui-textarea v-model="alignText" :input-align="alignDemo" background="background-section" radius="12rpx" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="a in alignPresets" :key="a" size="small" :type="alignDemo === a ? 'primary' : 'default'" @click="alignDemo = a">
            {{ a }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="最小高度 minHeight" desc="切换 100/200/300rpx">
      <demo-block direction="column" :gap="16">
        <ui-textarea v-model="heightText" :min-height="heightDemo" background="background-section" radius="12rpx" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="h in heightPresets" :key="h" size="small" :type="heightDemo === h ? 'primary' : 'default'" @click="heightDemo = h">
            {{ h }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色" desc="background / color / radius / border">
      <demo-block direction="column" :gap="16">
        <ui-textarea
          v-model="styleText"
          :background="bgDemo"
          color="text-inverse"
          radius="16rpx"
          border="2rpx solid var(--ui-color-border)"
        />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="b in bgPresets" :key="b.value" size="small" :type="bgDemo === b.value ? 'primary' : 'default'" @click="bgDemo = b.value">
            {{ b.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="清除按钮" desc="聚焦且有值时显示">
      <ui-textarea v-model="clearText" placeholder="请输入反馈意见" clearable background="background-section" radius="12rpx" />
    </demo-section>

    <demo-section title="禁用 / 只读" desc="disabled 置灰 + 阻输入；readonly 仅阻输入">
      <demo-block direction="column" :gap="12">
        <ui-textarea model-value="禁用状态：置灰且不可输入" disabled background="background-section" radius="12rpx" />
        <ui-textarea model-value="只读状态：可选中文本，仅阻止编辑" readonly background="background-section" radius="12rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="focus / blur / confirm / linechange / clear">
      <demo-block direction="column" :gap="12">
        <ui-textarea
          v-model="eventText"
          placeholder="操作以查看事件"
          clearable
          show-count
          :maxlength="50"
          background="background-section"
          radius="12rpx"
          @focus="onFocus"
          @blur="onBlur"
          @confirm="onConfirm"
          @linechange="onLinechange"
          @clear="onClear"
        />
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法" desc="reset(value)">
      <demo-block direction="column" :gap="16">
        <ui-textarea ref="textareaRef" v-model="methodText" placeholder="点击下方按钮重置" background="background-section" radius="12rpx" />
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="textareaRef?.reset('')">reset 空</ui-button>
          <ui-button size="small" type="primary" @click="textareaRef?.reset('已重置内容')">reset 默认</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 反馈表单" desc="标题 + 内容 + 字数 + 提交">
      <view class="feedback">
        <view class="feedback__label">反馈内容</view>
        <ui-textarea
          v-model="feedback"
          placeholder="请描述您遇到的问题，我们会尽快处理"
          show-count
          :maxlength="200"
          :min-height="200"
          background="background-section"
          radius="16rpx"
        />
        <view class="feedback__footer">
          <ui-button block type="primary" :disabled="!feedback" @click="onSubmit">提交反馈</ui-button>
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TextareaInstance, TextareaInputAlign } from "@/uni_modules/uniapp-ui/ui-textarea"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Textarea 文本域" },
})

const basic = ref("")
const count = ref("")
const auto = ref("")
const clearText = ref("点击右侧图标清除")
const methodText = ref("初始内容")

const alignPresets: TextareaInputAlign[] = ["left", "center", "right"]
const alignDemo = ref<TextareaInputAlign>("left")
const alignText = ref("切换对齐方式查看效果")

const heightPresets = ["100rpx", "200rpx", "300rpx"]
const heightDemo = ref("200rpx")
const heightText = ref("")

const bgPresets = [
  { label: "默认", value: "" },
  { label: "区块", value: "background-section" },
  { label: "主色", value: "primary" },
  { label: "危险", value: "danger" },
]
const bgDemo = ref("background-section")
const styleText = ref("自定义样式演示")

const textareaRef = ref<TextareaInstance>()

const eventText = ref("")
const eventLog = ref("等待事件...")
function onFocus() {
  eventLog.value = "[focus]"
}
function onBlur(val: string) {
  eventLog.value = `[blur] ${val}`
}
function onConfirm(val: string) {
  eventLog.value = `[confirm] ${val}`
}
function onLinechange() {
  eventLog.value = "[linechange]"
}
function onClear() {
  eventLog.value = "[clear]"
}

const feedback = ref("")
function onSubmit() {
  uni.showToast({ title: "已提交", icon: "success" })
  feedback.value = ""
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

.feedback {
  gap: var(--ui-spacing-md);
  display: flex;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-medium);
  }

  &__footer {
    margin-top: var(--ui-spacing-md);
  }
}
</style>
