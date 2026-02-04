<template>
  <demo-page padding-x="0">
    <!-- 基础用法 -->
    <demo-section title="基础用法" :card="false">
      <ui-collapse v-model="activeBasic" @change="onChange">
        <ui-collapse-item name="1" title="标题一"> 代码是写出来给人看的，附带能在机器上运行。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二"> 技术无非就是那些开发它的人的共同灵魂。 </ui-collapse-item>
        <ui-collapse-item name="3" title="标题三"> 在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 手风琴模式 -->
    <demo-section title="手风琴模式" :card="false">
      <ui-collapse v-model="activeAccordion" accordion>
        <ui-collapse-item name="1" title="标题一"> 手风琴模式下，同时只能展开一个面板。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二"> 点击其他面板时，当前展开的面板会自动收起。 </ui-collapse-item>
        <ui-collapse-item name="3" title="标题三"> 适用于需要节省空间的场景。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 默认展开 -->
    <demo-section title="默认展开" :card="false">
      <ui-collapse v-model="activeDefault">
        <ui-collapse-item name="1" title="默认展开项"> 通过 v-model 绑定默认展开的面板。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二"> 可以设置多个默认展开项。 </ui-collapse-item>
        <ui-collapse-item name="3" title="也是默认展开项"> 传入数组可以同时展开多个面板。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 禁用状态 -->
    <demo-section title="禁用状态" :card="false">
      <ui-collapse v-model="activeDisabled">
        <ui-collapse-item name="1" title="正常项"> 这是一个正常的折叠项。 </ui-collapse-item>
        <ui-collapse-item name="2" title="禁用项" disabled> 这个折叠项已被禁用，无法点击展开。 </ui-collapse-item>
        <ui-collapse-item name="3" title="正常项"> 这是另一个正常的折叠项。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 自定义标题 -->
    <demo-section title="自定义标题" :card="false">
      <ui-collapse v-model="activeCustomTitle">
        <ui-collapse-item name="1">
          <template #title>
            <view class="custom-title">
              <text class="custom-title__text">自定义标题</text>
              <ui-tag type="primary" size="small">标签</ui-tag>
            </view>
          </template>
          通过 title 插槽自定义标题内容。
        </ui-collapse-item>
        <ui-collapse-item name="2" title="普通标题"> 这是一个普通标题的折叠项。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 事件处理 -->
    <demo-section title="事件处理" :card="false">
      <ui-collapse v-model="activeEvent" @change="onChangeWithLog">
        <ui-collapse-item name="1" title="标题一" @click="onItemClick(1)"> 点击折叠项会触发 click 事件。 </ui-collapse-item>
        <ui-collapse-item name="2" title="标题二" @click="onItemClick(2)"> 展开/收起会触发 change 事件。 </ui-collapse-item>
        <ui-collapse-item name="3" title="标题三" @click="onItemClick(3)"> 可以监听事件进行自定义处理。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { CollapseModelValue } from "@/uni_modules/uniapp-ui"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Collapse 折叠面板" },
})

const toast = useToast()

// 基础用法
const activeBasic = ref<(string | number)[]>([])

// 手风琴模式
const activeAccordion = ref<string | number>("")

// 默认展开
const activeDefault = ref<(string | number)[]>(["1", "3"])

// 禁用状态
const activeDisabled = ref<(string | number)[]>(["1"])

// 自定义标题
const activeCustomTitle = ref<(string | number)[]>([])

// 事件处理
const activeEvent = ref<(string | number)[]>([])

// change 事件处理
function onChange(value: CollapseModelValue) {
  console.log("collapse change:", value)
}

// 带日志的 change 事件处理
function onChangeWithLog(value: CollapseModelValue) {
  const displayValue = Array.isArray(value) ? JSON.stringify(value) : value
  toast.success(`展开项变更: ${displayValue}`)
}

// 折叠项点击事件
function onItemClick(name: number) {
  console.log("collapse item click:", name)
}
</script>

<style lang="scss" scoped>
.custom-title {
  gap: 16rpx;
  display: flex;
  align-items: center;

  &__text {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
