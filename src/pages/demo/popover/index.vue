<template>
  <demo-page>
    <demo-section title="基础用法" desc="点击触发元素弹出操作菜单">
      <demo-block>
        <ui-popover v-model:show="state.basic" :actions="baseActions" @select="onSelect">
          <ui-button type="primary">点击弹出</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="弹出位置" desc="placement 8 个方位:上下左右 + 4 个边缘对齐">
      <demo-block :cols="3" :gap="24">
        <ui-popover v-for="p in placements.slice(0, 6)" :key="p" :show="state.placement === p" :actions="baseActions" :placement="p" @update:show="onPlacementShow(p, $event)">
          <ui-button size="small">{{ placementLabel(p) }}</ui-button>
        </ui-popover>
      </demo-block>
      <demo-block :cols="2" :gap="24">
        <ui-popover v-for="p in placements.slice(6)" :key="p" :show="state.placement === p" :actions="baseActions" :placement="p" @update:show="onPlacementShow(p, $event)">
          <ui-button size="small">{{ placementLabel(p) }}</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="主题风格" desc="light 浅色 / dark 深色">
      <demo-block :cols="2" :gap="24">
        <ui-popover v-model:show="state.light" :actions="iconActions" theme="light">
          <ui-button>浅色主题</ui-button>
        </ui-popover>
        <ui-popover v-model:show="state.dark" :actions="iconActions" theme="dark">
          <ui-button>深色主题</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="带图标选项" desc="action.icon 渲染图标 + 文字">
      <demo-block>
        <ui-popover v-model:show="state.icon" :actions="iconActions" @select="onSelect">
          <ui-button type="primary">操作菜单</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项" desc="action.disabled 禁用单项,点击不触发 select">
      <demo-block>
        <ui-popover v-model:show="state.disabled" :actions="disabledActions" @select="onSelect">
          <ui-button type="primary">含禁用项</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="箭头显示" desc="showArrow 控制三角箭头">
      <demo-block :cols="2" :gap="24">
        <ui-popover v-model:show="state.arrowOn" :actions="baseActions" :show-arrow="true">
          <ui-button size="small">有箭头</ui-button>
        </ui-popover>
        <ui-popover v-model:show="state.arrowOff" :actions="baseActions" :show-arrow="false">
          <ui-button size="small">无箭头</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="偏移量" desc="offset=[x, y] 调整气泡距离触发元素">
      <demo-block direction="column" :gap="12">
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="(o, i) in offsetPresets" :key="o.label" size="small" :type="offsetIndex === i ? 'primary' : 'default'" @click="offsetIndex = i">
            {{ o.label }}
          </ui-button>
        </demo-block>
        <ui-popover :show="state.offset" :actions="baseActions" :offset="currentOffset" @update:show="state.offset = $event">
          <ui-button>当前 offset: [{{ currentOffset[0] }}, {{ currentOffset[1] }}]</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="触发方式" desc="trigger=manual 完全外部控制,点击触发元素不再切换">
      <demo-block direction="column" :gap="12">
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" type="primary" @click="state.manual = true">外部打开</ui-button>
          <ui-button size="small" @click="state.manual = false">外部关闭</ui-button>
        </demo-block>
        <ui-popover :show="state.manual" :actions="baseActions" trigger="manual" @select="onSelect">
          <ui-button>受控触发 (点击无反应)</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="动画时长" desc="duration 控制弹出/收起速度 (ms)">
      <demo-block direction="column" :gap="12">
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="d in durationPresets" :key="d" size="small" :type="durationValue === d ? 'primary' : 'default'" @click="durationValue = d">{{ d }}ms</ui-button>
        </demo-block>
        <ui-popover v-model:show="state.duration" :actions="baseActions" :duration="durationValue">
          <ui-button>当前 {{ durationValue }}ms</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="遮罩层" desc="overlay=true 显示视觉遮罩, overlayStyle 自定义颜色">
      <demo-block :cols="3" :gap="12">
        <ui-popover v-model:show="state.overlayDefault" :actions="baseActions" :overlay="true">
          <ui-button size="small">默认遮罩</ui-button>
        </ui-popover>
        <ui-popover v-model:show="state.overlayLight" :actions="baseActions" :overlay="true" :overlay-style="{ background: 'rgba(0,0,0,0.3)' }">
          <ui-button size="small">浅遮罩</ui-button>
        </ui-popover>
        <ui-popover v-model:show="state.overlayTinted" :actions="baseActions" :overlay="true" :overlay-style="{ background: 'rgba(64,158,255,0.3)' }">
          <ui-button size="small">蓝色遮罩</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="关闭行为" desc="closeOnClickAction / closeOnClickOutside 控制">
      <demo-block :cols="2" :gap="24">
        <ui-popover v-model:show="state.keepAction" :actions="baseActions" :close-on-click-action="false" @select="onKeepSelect">
          <ui-button>选项后保持</ui-button>
        </ui-popover>
        <ui-popover v-model:show="state.keepOutside" :actions="baseActions" :close-on-click-outside="false">
          <ui-button>外部点击保持</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="层级 zIndex" desc="自定义 z-index 解决叠层冲突">
      <demo-block :cols="2" :gap="24">
        <ui-popover v-model:show="state.zLow" :actions="baseActions" :z-index="100">
          <ui-button size="small">z=100</ui-button>
        </ui-popover>
        <ui-popover v-model:show="state.zHigh" :actions="baseActions" :z-index="9999">
          <ui-button size="small">z=9999</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式" desc="customClass / customStyle 覆盖 panel 外观">
      <demo-block>
        <ui-popover v-model:show="state.custom" :actions="baseActions" custom-class="my-popover" :custom-style="{ borderRadius: '20rpx' }">
          <ui-button type="primary">自定义外观</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容" desc="content slot 覆盖默认 actions 渲染">
      <demo-block>
        <ui-popover v-model:show="state.userCard" placement="bottom-start">
          <ui-button>用户名片</ui-button>
          <template #content>
            <view class="user-card">
              <view class="user-card__head">
                <ui-icon name="user-o" size="56rpx" color="primary" />
                <view class="user-card__main">
                  <text class="user-card__name">张三</text>
                  <text class="user-card__desc">前端工程师 · 5 年经验</text>
                </view>
              </view>
              <view class="user-card__foot">
                <ui-button size="small" type="primary" @click="onFollow">关注</ui-button>
                <ui-button size="small" @click="state.userCard = false">取消</ui-button>
              </view>
            </view>
          </template>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:文件操作菜单" desc="列表项右上角 ⋯ 弹出操作">
      <demo-block direction="column" :gap="0">
        <view v-for="item in fileList" :key="item.id" class="file-item">
          <ui-icon :name="item.icon" size="40rpx" color="primary" />
          <view class="file-item__main">
            <text class="file-item__title">{{ item.title }}</text>
            <text class="file-item__desc">{{ item.size }}</text>
          </view>
          <ui-popover :show="state.menu === item.id" :actions="fileActions" placement="bottom-end" @update:show="onMenuShow(item.id, $event)" @select="onFileAction(item, $event)">
            <ui-icon name="more" size="40rpx" color="text-tertiary" />
          </ui-popover>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:分享面板" desc="深色主题 + 自定义网格内容">
      <demo-block>
        <ui-popover v-model:show="state.share" theme="dark" placement="top">
          <ui-button>分享给朋友</ui-button>
          <template #content>
            <view class="share-panel">
              <view v-for="s in shareList" :key="s.text" class="share-item" @click="onShare(s)">
                <ui-icon :name="s.icon" size="48rpx" color="text-inverse" />
                <text class="share-item__text">{{ s.text }}</text>
              </view>
            </view>
          </template>
        </ui-popover>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:工具栏更多操作" desc="manual trigger 配合工具栏按钮">
      <demo-block>
        <view class="toolbar">
          <ui-button size="small" type="primary" @click="onToolbarSave">保存</ui-button>
          <ui-button size="small" @click="onToolbarPreview">预览</ui-button>
          <ui-popover :show="state.toolbar" :actions="toolbarActions" placement="bottom-end" trigger="manual" @update:show="state.toolbar = $event" @select="onToolbarAction">
            <ui-button size="small" icon="arrow-down" icon-position="right" @click="state.toolbar = !state.toolbar">更多</ui-button>
          </ui-popover>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="open / opened / close / closed / clickOutside / select">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-popover
          v-model:show="state.eventDemo"
          :actions="baseActions"
          :overlay="true"
          @open="onEvent('open')"
          @opened="onEvent('opened')"
          @close="onEvent('close')"
          @closed="onEvent('closed')"
          @click-outside="onEvent('clickOutside')"
          @select="onEventSelect"
        >
          <ui-button size="small">触发查看完整事件</ui-button>
        </ui-popover>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { PopoverAction, PopoverPlacement } from "@/uni_modules/uniapp-ui/ui-popover"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Popover 气泡弹出框" },
})

const toast = useToast()

const placements: PopoverPlacement[] = ["top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end"]
function placementLabel(p: PopoverPlacement) {
  return { top: "上方", bottom: "下方", left: "左侧", right: "右侧", "top-start": "上左", "top-end": "上右", "bottom-start": "下左", "bottom-end": "下右" }[p]
}

const offsetPresets: Array<{ label: string; value: [number, number] }> = [
  { label: "默认", value: [0, 8] },
  { label: "贴近", value: [0, 0] },
  { label: "远离", value: [0, 24] },
  { label: "X 偏移", value: [40, 8] },
]
const durationPresets = [100, 200, 400, 800]

const state = reactive({
  basic: false,
  placement: "" as PopoverPlacement | "",
  light: false,
  dark: false,
  icon: false,
  disabled: false,
  arrowOn: false,
  arrowOff: false,
  offset: false,
  manual: false,
  duration: false,
  overlayDefault: false,
  overlayLight: false,
  overlayTinted: false,
  keepAction: false,
  keepOutside: false,
  zLow: false,
  zHigh: false,
  custom: false,
  userCard: false,
  share: false,
  toolbar: false,
  eventDemo: false,
  menu: "" as string,
})
const offsetIndex = ref(0)
const durationValue = ref(200)
const eventLog = ref("点击触发元素查看事件")

const currentOffset = computed(() => offsetPresets[offsetIndex.value].value)

const baseActions: PopoverAction[] = [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }]

const iconActions: PopoverAction[] = [
  { text: "复制", icon: "notes-o" },
  { text: "编辑", icon: "edit" },
  { text: "分享", icon: "share" },
  { text: "删除", icon: "delete" },
]

const disabledActions: PopoverAction[] = [{ text: "可用项" }, { text: "禁用项", disabled: true }, { text: "可用项" }]

const fileList = [
  { id: "f1", icon: "newspaper-o", title: "项目报告.pdf", size: "2.3 MB" },
  { id: "f2", icon: "newspaper-o", title: "设计稿.sketch", size: "12.5 MB" },
  { id: "f3", icon: "newspaper-o", title: "会议记录.docx", size: "456 KB" },
]
const fileActions: PopoverAction[] = [
  { text: "打开", icon: "eye" },
  { text: "重命名", icon: "edit" },
  { text: "下载", icon: "down" },
  { text: "删除", icon: "delete", className: "danger-action" },
]

const shareList = [
  { icon: "wechat", text: "微信" },
  { icon: "share-circle", text: "朋友圈" },
  { icon: "chat-o", text: "QQ" },
  { icon: "bullhorn-o", text: "微博" },
]

const toolbarActions: PopoverAction[] = [
  { text: "导出 PDF", icon: "down" },
  { text: "复制链接", icon: "notes-o" },
  { text: "归档", icon: "cluster-o" },
  { text: "删除", icon: "delete", className: "danger-action" },
]

function onPlacementShow(p: PopoverPlacement, val: boolean) {
  state.placement = val ? p : ""
}

function onMenuShow(id: string, val: boolean) {
  state.menu = val ? id : ""
}

function onSelect(action: PopoverAction) {
  eventLog.value = `[select] ${action.text}`
  toast.success(`选择了 ${action.text}`)
}

function onKeepSelect(action: PopoverAction) {
  eventLog.value = `[保持] 选中 ${action.text}`
  toast.text(`选中 ${action.text} (需手动关闭)`)
}

function onFileAction(file: { id: string; title: string }, action: PopoverAction) {
  eventLog.value = `[文件] ${file.title} → ${action.text}`
  toast.text(`${action.text}: ${file.title}`)
}

function onShare(s: { icon: string; text: string }) {
  state.share = false
  eventLog.value = `[分享] ${s.text}`
  toast.success(`分享到${s.text}`)
}

function onFollow() {
  state.userCard = false
  eventLog.value = `[关注] 张三`
  toast.success("已关注")
}

function onToolbarSave() {
  eventLog.value = `[工具栏] 保存`
  toast.success("已保存")
}

function onToolbarPreview() {
  eventLog.value = `[工具栏] 预览`
  toast.text("打开预览")
}

function onToolbarAction(action: PopoverAction) {
  eventLog.value = `[工具栏] ${action.text}`
  toast.text(action.text)
}

function onEvent(name: string) {
  eventLog.value = `[event] ${name} @ ${Date.now() % 100000}`
}

function onEventSelect(action: PopoverAction, index: number) {
  eventLog.value = `[event] select #${index} ${action.text}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

// 自定义 panel 外观演示
.my-popover {
  border: 2rpx solid var(--ui-color-primary);
}

.user-card {
  gap: 20rpx;
  width: 440rpx;
  display: flex;
  padding: 24rpx;
  flex-direction: column;

  &__head {
    gap: 16rpx;
    display: flex;
    align-items: center;
  }

  &__main {
    gap: 4rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: 30rpx;
    font-weight: bold;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__foot {
    gap: 12rpx;
    display: flex;
  }
}

.file-item {
  gap: 16rpx;
  display: flex;
  padding: 24rpx;
  background: var(--ui-color-background);
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }

  &__main {
    gap: 4rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 28rpx;
  }

  &__desc {
    color: var(--ui-color-text-tertiary);
    font-size: 22rpx;
  }
}

.share-panel {
  gap: 16rpx;
  display: grid;
  padding: 24rpx;
  grid-template-columns: repeat(4, 1fr);
}

.share-item {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__text {
    color: var(--ui-color-text-inverse);
    font-size: 22rpx;
    white-space: nowrap;
  }
}

.toolbar {
  gap: 12rpx;
  display: flex;
  align-items: center;
}
</style>
