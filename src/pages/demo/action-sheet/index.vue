<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="show1 = true">基础用法</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="展示取消按钮">
      <demo-block>
        <ui-button type="primary" @click="show2 = true">展示取消按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="展示描述信息">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="show3 = true">面板描述</ui-button>
        <ui-button type="primary" @click="showItemDesc = true">选项描述</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="选项状态">
      <demo-block>
        <ui-button type="primary" @click="show4 = true">选项状态</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="带图标选项">
      <demo-block>
        <ui-button type="primary" @click="showIcon = true">带图标选项</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义标题">
      <demo-block>
        <ui-button type="primary" @click="show5 = true">自定义标题</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：样式定制 -->
    <demo-section title="标题描述样式">
      <demo-block>
        <ui-button @click="showTitleStyle = true">自定义标题样式</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：取消按钮样式 -->
    <demo-section title="取消按钮样式">
      <demo-block>
        <ui-button @click="showCancelStyle = true">自定义取消按钮</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：圆角和高度 -->
    <demo-section title="面板外观">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showBorderRadius = true">自定义圆角</ui-button>
        <ui-button @click="showMaxHeight = true">限制最大高度</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：遮罩层配置 -->
    <demo-section title="遮罩层配置">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showClickOverlay = true">点击遮罩关闭</ui-button>
        <ui-button @click="showNoOverlay = true">无遮罩层</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：异步关闭 -->
    <demo-section title="异步关闭">
      <demo-block>
        <ui-button @click="showAsync = true">异步关闭</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block>
        <ui-button type="primary" @click="showEvent = true">监听事件</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：使用插槽 -->
    <demo-section title="自定义插槽">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showHeaderSlot = true">自定义头部</ui-button>
        <ui-button type="primary" @click="showDefaultSlot = true">自定义内容</ui-button>
      </demo-block>
      <demo-block class="mt-16">
        <ui-button type="primary" @click="showFooterSlot = true">自定义底部</ui-button>
      </demo-block>
    </demo-section>

    <!-- ActionSheet Components -->
    <!-- 基础用法 -->
    <ui-action-sheet v-model:show="show1" :actions="actions1" @select="onSelect" />

    <!-- 展示取消按钮 -->
    <ui-action-sheet v-model:show="show2" :actions="actions1" cancel-text="取消" @cancel="onCancel" />

    <!-- 展示描述信息 -->
    <ui-action-sheet v-model:show="show3" :actions="actions1" description="这是一段描述信息" cancel-text="取消" />

    <!-- 选项描述 -->
    <ui-action-sheet v-model:show="showItemDesc" :actions="actionsWithDesc" cancel-text="取消" />

    <!-- 选项状态 -->
    <ui-action-sheet v-model:show="show4" :actions="actions2" cancel-text="取消" />

    <!-- 带图标选项 -->
    <ui-action-sheet v-model:show="showIcon" :actions="actionsWithIcon" cancel-text="取消" />

    <!-- 自定义标题 -->
    <ui-action-sheet v-model:show="show5" :actions="actions1" title="标题" cancel-text="取消" />

    <!-- 自定义标题样式 -->
    <ui-action-sheet
      v-model:show="showTitleStyle"
      :actions="actions1"
      title="自定义标题"
      title-color="#1989fa"
      title-size="36rpx"
      title-weight="600"
      description="自定义描述文本"
      description-color="#07c160"
      description-size="26rpx"
      cancel-text="取消"
    />

    <!-- 自定义取消按钮样式 -->
    <ui-action-sheet
      v-model:show="showCancelStyle"
      :actions="actions1"
      title="取消按钮样式"
      cancel-text="自定义取消"
      cancel-text-color="#ee0a24"
      cancel-text-size="32rpx"
      cancel-text-weight="500"
      cancel-background="#fff5f5"
    />

    <!-- 自定义圆角 -->
    <ui-action-sheet v-model:show="showBorderRadius" :actions="actions1" title="自定义圆角" :border-radius="32" cancel-text="取消" />

    <!-- 限制最大高度 -->
    <ui-action-sheet v-model:show="showMaxHeight" :actions="manyActions" title="最大高度限制" max-height="400rpx" cancel-text="取消" />

    <!-- 点击遮罩关闭 -->
    <ui-action-sheet v-model:show="showClickOverlay" :actions="actions1" title="点击遮罩关闭" :close-on-click-overlay="true" @click-overlay="onClickOverlay" />

    <!-- 无遮罩层 -->
    <ui-action-sheet v-model:show="showNoOverlay" :actions="actions1" title="无遮罩层" :overlay="false" cancel-text="取消" />

    <!-- 异步关闭 -->
    <ui-action-sheet v-model:show="showAsync" :actions="actions1" title="异步关闭" :before-close="beforeClose" cancel-text="取消" />

    <!-- 事件处理 -->
    <ui-action-sheet
      v-model:show="showEvent"
      :actions="actions1"
      title="事件监听"
      cancel-text="取消"
      @open="onOpen"
      @opened="onOpened"
      @close="onClose"
      @closed="onClosed"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 自定义头部插槽 -->
    <ui-action-sheet v-model:show="showHeaderSlot" :actions="actions1" cancel-text="取消">
      <template #header>
        <view class="custom-header">
          <ui-icon name="info" size="48rpx" color="primary" />
          <text class="custom-header__title">自定义头部</text>
          <text class="custom-header__desc">这是通过 header 插槽自定义的头部区域</text>
        </view>
      </template>
    </ui-action-sheet>

    <!-- 自定义内容插槽 -->
    <ui-action-sheet v-model:show="showDefaultSlot" title="自定义内容" cancel-text="取消">
      <view class="custom-content">
        <view v-for="item in customItems" :key="item.id" class="custom-content__item" @click="onCustomSelect(item)">
          <ui-icon :name="item.icon" size="48rpx" />
          <text class="custom-content__text">{{ item.name }}</text>
        </view>
      </view>
    </ui-action-sheet>

    <!-- 自定义底部插槽 -->
    <ui-action-sheet v-model:show="showFooterSlot" :actions="actions1" title="自定义底部">
      <template #footer>
        <view class="custom-footer">
          <ui-button type="default" size="small" @click="showFooterSlot = false">取消操作</ui-button>
          <ui-button type="primary" size="small" @click="showFooterSlot = false">确认选择</ui-button>
        </view>
      </template>
    </ui-action-sheet>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "ActionSheet 动作面板" },
})

const toast = useToast()

// 基础示例状态
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const showItemDesc = ref(false)

// 新增示例状态
const showTitleStyle = ref(false)
const showCancelStyle = ref(false)
const showBorderRadius = ref(false)
const showMaxHeight = ref(false)
const showClickOverlay = ref(false)
const showNoOverlay = ref(false)
const showAsync = ref(false)
const showEvent = ref(false)
const showHeaderSlot = ref(false)
const showDefaultSlot = ref(false)
const showFooterSlot = ref(false)
const showIcon = ref(false)

// 基础操作项
const actions1 = [{ title: "选项一" }, { title: "选项二" }, { title: "选项三" }]

// 带状态的操作项
const actions2 = [
  { title: "着色选项", color: "#ee0a24" },
  { title: "禁用选项", disabled: true },
  { title: "加载选项", loading: true },
]

// 带描述的操作项
const actionsWithDesc = [
  { title: "选项一", description: "这是选项一的描述信息" },
  { title: "选项二", description: "这是选项二的描述信息" },
  { title: "选项三", description: "这是选项三的描述信息" },
]

// 带图标的操作项
const actionsWithIcon = [
  { title: "复制链接", icon: "link" },
  { title: "编辑内容", icon: "edit" },
  { title: "删除", icon: "delete", color: "#ee0a24" },
]

// 多个操作项（用于测试最大高度）
const manyActions = [
  { title: "选项一" },
  { title: "选项二" },
  { title: "选项三" },
  { title: "选项四" },
  { title: "选项五" },
  { title: "选项六" },
  { title: "选项七" },
  { title: "选项八" },
]

// 自定义内容项
const customItems = [
  { id: 1, name: "微信", icon: "wechat" },
  { id: 2, name: "朋友圈", icon: "friends" },
  { id: 3, name: "QQ", icon: "qq" },
  { id: 4, name: "微博", icon: "weibo" },
]

// 选择回调
function onSelect(action: { title: string }, index: number) {
  toast.success(`选择了: ${action.title}`)
}

// 取消回调
function onCancel() {
  toast.text("取消")
}

// 点击遮罩层回调
function onClickOverlay() {
  toast.text("点击了遮罩层")
}

// 异步关闭
function beforeClose(action: object, index: number): Promise<boolean> {
  return new Promise((resolve) => {
    toast.loading("处理中...")
    setTimeout(() => {
      toast.success("操作成功")
      resolve(true)
    }, 1500)
  })
}

// 事件处理
function onOpen() {
  console.log("ActionSheet open")
}

function onOpened() {
  toast.success("面板已打开")
}

function onClose() {
  console.log("ActionSheet close")
}

function onClosed() {
  toast.text("面板已关闭")
}

// 自定义内容选择
function onCustomSelect(item: { id: number; name: string }) {
  toast.success(`选择了: ${item.name}`)
  showDefaultSlot.value = false
}
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16rpx;
}

.custom-header {
  gap: 16rpx;
  display: flex;
  padding: 32rpx 24rpx;
  align-items: center;
  flex-direction: column;

  &__title {
    color: #333;
    font-size: 32rpx;
    font-weight: 600;
  }

  &__desc {
    color: #999;
    font-size: 26rpx;
  }
}

.custom-content {
  gap: 24rpx;
  display: grid;
  padding: 32rpx 24rpx;
  grid-template-columns: repeat(4, 1fr);

  &__item {
    gap: 12rpx;
    display: flex;
    padding: 16rpx;
    align-items: center;
    flex-direction: column;

    &:active {
      border-radius: 12rpx;
      background-color: #f5f5f5;
    }
  }

  &__text {
    color: #666;
    font-size: 24rpx;
  }
}

.custom-footer {
  gap: 24rpx;
  display: flex;
  padding: 24rpx;
  justify-content: space-around;
}
</style>
