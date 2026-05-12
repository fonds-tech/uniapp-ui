<template>
  <demo-page padding-x="0">
    <demo-section title="基础用法" desc="v-model 绑展开项；多选用数组" :card="false">
      <ui-collapse v-model="state.basic">
        <ui-collapse-item name="1" title="标题一"> 代码是写出来给人看的，附带能在机器上运行。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二"> 技术无非就是那些开发它的人的共同灵魂。 </ui-collapse-item>
        <ui-collapse-item name="3" title="标题三"> 在代码阅读过程中说脏话的频率是衡量代码质量的唯一标准。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="手风琴模式" desc="accordion；同时仅展开一项" :card="false">
      <ui-collapse v-model="state.accordion" accordion>
        <ui-collapse-item name="1" title="标题一"> 手风琴模式下，同时只能展开一个面板。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二"> 点击其他面板时，当前面板会自动收起。 </ui-collapse-item>
        <ui-collapse-item name="3" title="标题三"> 节省空间。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="默认展开" desc="v-model 初始值即默认展开项" :card="false">
      <ui-collapse v-model="state.def">
        <ui-collapse-item name="1" title="默认展开项"> 通过 v-model 绑定。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二"> 可同时设置多个默认展开。 </ui-collapse-item>
        <ui-collapse-item name="3" title="也是默认展开项"> 传入数组同时展开多个。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="左侧图标 + 描述 + 右侧值" desc="icon / label / value 三块信息位" :card="false">
      <ui-collapse v-model="state.rich">
        <ui-collapse-item name="1" icon="setting" title="账户设置" label="管理账户与个人信息" value="已开启"> 账户安全 / 隐私 / 登录设备等。 </ui-collapse-item>
        <ui-collapse-item name="2" icon="bell" title="消息通知" label="推送 / 邮件 / 短信" value="3 项"> 自定义各类通知开关。 </ui-collapse-item>
        <ui-collapse-item name="3" icon="lock" title="安全验证" label="双因素 / 生物识别" value="未开启"> 增强账户安全性。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="禁用与只读" desc="disabled 屏蔽点击 / readonly 可见不可改" :card="false">
      <ui-collapse v-model="state.locked">
        <ui-collapse-item name="1" title="正常项"> 普通可点击。 </ui-collapse-item>
        <ui-collapse-item name="2" title="禁用项" disabled> 不响应任何点击。 </ui-collapse-item>
        <ui-collapse-item name="3" title="只读项" readonly> 视觉正常但不响应点击。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="无箭头 / 无分割线" desc="isLink=false 隐箭头；border=false 隐分割线" :card="false">
      <ui-collapse v-model="state.flat">
        <ui-collapse-item name="1" title="无右侧箭头" :is-link="false"> 隐藏箭头但保留点击展开。 </ui-collapse-item>
        <ui-collapse-item name="2" title="无下分割线" :border="false"> 自定义布局时关闭分割线。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="自定义动画时长" desc="duration ms（默认 300）" :card="false">
      <ui-collapse v-model="state.duration">
        <ui-collapse-item name="1" title="快 100ms" :duration="100"> 极快折叠。 </ui-collapse-item>
        <ui-collapse-item name="2" title="默认 300ms"> 默认时长。 </ui-collapse-item>
        <ui-collapse-item name="3" title="慢 800ms" :duration="800"> 慢速感受过渡。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="自定义标题" desc="title 插槽完全自定义头部主区" :card="false">
      <ui-collapse v-model="state.slot">
        <ui-collapse-item name="1">
          <template #title>
            <view class="rich-title">
              <text class="rich-title__text">自定义标题</text>
              <ui-tag type="primary" size="small">标签</ui-tag>
            </view>
          </template>
          通过 title 插槽自定义标题内容。
        </ui-collapse-item>
        <ui-collapse-item name="2" title="普通标题"> 与插槽混用。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="样式定制" desc="一组 prop 同时覆盖 padding / 字号 / 字色 / 主色等" :card="false">
      <ui-collapse v-model="state.styled">
        <ui-collapse-item
          name="1"
          icon="star"
          title="自定义样式项"
          label="标题大字 + 主色文本"
          padding="32rpx"
          title-size="32rpx"
          title-color="#1989fa"
          :title-weight="600"
          label-size="24rpx"
          label-color="#1989fa"
          icon-color="#1989fa"
          arrow-color="#1989fa"
          background="#f0f9ff"
        >
          通过多个样式 prop 协同实现品牌主题色调。
        </ui-collapse-item>
        <ui-collapse-item name="2" icon="edit" title="另一项"> 用于对比未定制项。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="边框定制" desc="borderColor / borderWidth" :card="false">
      <ui-collapse v-model="state.border">
        <ui-collapse-item name="1" title="加粗红色分割线" border-color="#ee0a24" border-width="2rpx"> 边框颜色与宽度独立可调。 </ui-collapse-item>
        <ui-collapse-item name="2" title="默认边框"> 与上方对比。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <demo-section title="事件" desc="click 头部点击 / change 展开变更" :card="false">
      <ui-collapse v-model="state.event" @change="onChange">
        <ui-collapse-item name="1" title="点击触发事件" @click="onItemClick(1)"> 触发 click 与 change。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二" @click="onItemClick(2)"> 多次点切看 toast。 </ui-collapse-item>
      </ui-collapse>
      <view class="event-log">
        <ui-text size="small" color="secondary">{{ state.log || "尚未触发" }}</ui-text>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { CollapseModelValue } from "@/uni_modules/uniapp-ui"
import { useToast } from "@/uni_modules/uniapp-ui"
import { reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Collapse 折叠面板" },
})

const toast = useToast()

// 各 section 状态合并到 reactive 集合，避免散乱 ref
const state = reactive({
  basic: [] as CollapseModelValue,
  accordion: "" as CollapseModelValue,
  def: ["1", "3"] as CollapseModelValue,
  rich: ["1"] as CollapseModelValue,
  locked: ["1"] as CollapseModelValue,
  flat: [] as CollapseModelValue,
  duration: [] as CollapseModelValue,
  slot: [] as CollapseModelValue,
  styled: ["1"] as CollapseModelValue,
  border: ["1"] as CollapseModelValue,
  event: [] as CollapseModelValue,
  log: "",
})

function onChange(value: CollapseModelValue) {
  state.log = `change @ ${new Date().toLocaleTimeString()} → ${Array.isArray(value) ? JSON.stringify(value) : value}`
}

function onItemClick(name: number) {
  toast.success(`点击了第 ${name} 项`)
}
</script>

<style lang="scss" scoped>
.rich-title {
  gap: 16rpx;
  display: flex;
  align-items: center;

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }
}

.event-log {
  padding: 16rpx 24rpx;
}
</style>
