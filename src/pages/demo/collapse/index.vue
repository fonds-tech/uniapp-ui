<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法" :card="false">
      <ui-collapse v-model="activeNames1">
        <ui-collapse-item title="标题1" name="1"> 代码是写出来给人看的，附带能在机器上运行。 </ui-collapse-item>
        <ui-collapse-item title="标题2" name="2"> 任何足够先进的技术都和魔法无异。 </ui-collapse-item>
        <ui-collapse-item title="标题3" name="3"> 好的代码本身就是最好的文档。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 手风琴模式 -->
    <demo-section title="手风琴模式" :card="false">
      <ui-collapse v-model="activeNames2" accordion>
        <ui-collapse-item title="标题1" name="1"> 手风琴模式下，同时只能展开一个面板。 </ui-collapse-item>
        <ui-collapse-item title="标题2" name="2"> 点击其他面板时，当前面板会自动收起。 </ui-collapse-item>
        <ui-collapse-item title="标题3" name="3"> 适用于需要节省空间的场景。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 禁用状态 -->
    <demo-section title="禁用状态" :card="false">
      <ui-collapse v-model="activeNames3">
        <ui-collapse-item title="正常状态" name="1"> 这是一个正常的折叠面板项。 </ui-collapse-item>
        <ui-collapse-item title="禁用状态" name="2" disabled> 禁用状态下无法展开或收起。 </ui-collapse-item>
        <ui-collapse-item title="正常状态" name="3"> 这是另一个正常的折叠面板项。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 带图标 -->
    <demo-section title="带图标" :card="false">
      <ui-collapse v-model="activeNames4">
        <ui-collapse-item title="个人信息" name="1" icon="user"> 用户的个人信息展示区域。 </ui-collapse-item>
        <ui-collapse-item title="系统设置" name="2" icon="setting"> 系统相关的设置选项。 </ui-collapse-item>
        <ui-collapse-item title="消息通知" name="3" icon="bell"> 消息通知的配置和查看。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 自定义标题内容 -->
    <demo-section title="自定义标题内容" :card="false">
      <ui-collapse v-model="activeNames5">
        <ui-collapse-item name="1">
          <template #title>
            <view class="custom-title">
              <text class="custom-title-text">自定义标题</text>
              <ui-tag type="primary" size="mini">HOT</ui-tag>
            </view>
          </template>
          通过 title 插槽可以自定义标题区域的内容。
        </ui-collapse-item>
        <ui-collapse-item title="带标签的标题" name="2" label="这是一段描述信息"> 使用 label 属性可以添加标题下方的描述信息。 </ui-collapse-item>
        <ui-collapse-item title="带右侧内容" name="3" value="更多"> 使用 value 属性可以在标题右侧显示额外内容。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 无边框 -->
    <demo-section title="无边框" :card="false">
      <ui-collapse v-model="activeNames6" :border="false">
        <ui-collapse-item title="标题1" name="1" :border="false"> 无边框模式下的折叠面板。 </ui-collapse-item>
        <ui-collapse-item title="标题2" name="2" :border="false"> 适用于特定的设计风格。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 隐藏箭头 -->
    <demo-section title="隐藏箭头" :card="false">
      <ui-collapse v-model="activeNames7">
        <ui-collapse-item title="隐藏箭头" name="1" :is-link="false"> 通过设置 is-link 为 false 可以隐藏右侧箭头。 </ui-collapse-item>
        <ui-collapse-item title="显示箭头" name="2"> 默认显示右侧箭头。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>

    <!-- 事件监听 -->
    <demo-section title="事件监听" :card="false">
      <view class="event-info-block">
        <text class="event-label">当前展开：</text>
        <text class="event-value">{{ JSON.stringify(activeNames8) }}</text>
      </view>
      <ui-collapse v-model="activeNames8" @change="onCollapseChange">
        <ui-collapse-item title="点击触发事件" name="1" @change="onItemChange"> 点击标题区域会触发 change 事件。 </ui-collapse-item>
        <ui-collapse-item title="点击触发事件" name="2" @change="onItemChange"> 可以监听折叠面板的展开/收起状态变化。 </ui-collapse-item>
      </ui-collapse>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { DemoPage, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Collapse 折叠面板" },
})

// 基础用法
const activeNames1 = ref<(string | number)[]>(["1"])

// 手风琴模式
const activeNames2 = ref<string | number>("1")

// 禁用状态
const activeNames3 = ref<(string | number)[]>(["1"])

// 带图标
const activeNames4 = ref<(string | number)[]>(["1"])

// 自定义标题内容
const activeNames5 = ref<(string | number)[]>(["1"])

// 无边框
const activeNames6 = ref<(string | number)[]>(["1"])

// 隐藏箭头
const activeNames7 = ref<(string | number)[]>(["1"])

// 事件监听
const activeNames8 = ref<(string | number)[]>([])

/**
 * 折叠面板变化事件
 */
function onCollapseChange(activeNames: (string | number)[] | string | number) {
  console.log("[Collapse] change:", activeNames)
  uni.showToast({
    title: `当前展开: ${JSON.stringify(activeNames)}`,
    icon: "none",
  })
}

/**
 * 面板项变化事件
 */
function onItemChange(expanded: boolean) {
  console.log("[CollapseItem] change:", expanded)
}
</script>

<style lang="scss" scoped>
.custom-title {
  gap: 16rpx;
  display: flex;
  align-items: center;

  &-text {
    color: var(--ui-color-text-main);
    font-size: 28rpx;
  }
}

.event-info-block {
  display: flex;
  padding: 20rpx 32rpx;
  background: var(--ui-color-background-light);
  align-items: center;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.event-label {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
}

.event-value {
  color: var(--ui-color-primary);
  font-size: 26rpx;
  font-family: monospace;
}
</style>
