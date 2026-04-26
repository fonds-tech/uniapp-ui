<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-space wrap>
        <ui-button type="primary">主要按钮</ui-button>
        <ui-button type="success">成功按钮</ui-button>
        <ui-button type="warning">警告按钮</ui-button>
        <ui-button type="danger">危险按钮</ui-button>
        <ui-button type="info">信息按钮</ui-button>
        <ui-button type="default">默认按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="朴素按钮">
      <ui-space wrap>
        <ui-button type="primary" plain>主要按钮</ui-button>
        <ui-button type="success" plain>成功按钮</ui-button>
        <ui-button type="warning" plain>警告按钮</ui-button>
        <ui-button type="danger" plain>危险按钮</ui-button>
        <ui-button type="info" plain>信息按钮</ui-button>
        <ui-button type="default" plain>默认按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="文字按钮">
      <ui-space wrap>
        <ui-button type="primary" text>主要按钮</ui-button>
        <ui-button type="success" text>成功按钮</ui-button>
        <ui-button type="warning" text>警告按钮</ui-button>
        <ui-button type="danger" text>危险按钮</ui-button>
        <ui-button type="info" text>信息按钮</ui-button>
        <ui-button type="default" text>默认按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="禁用状态">
      <ui-space wrap>
        <ui-button type="primary" disabled>主要按钮</ui-button>
        <ui-button type="success" disabled>成功按钮</ui-button>
        <ui-button type="warning" disabled>警告按钮</ui-button>
        <ui-button type="danger" disabled>危险按钮</ui-button>
        <ui-button type="info" disabled>信息按钮</ui-button>
        <ui-button type="default" disabled>默认按钮</ui-button>
      </ui-space>
      <ui-space wrap size="small">
        <ui-button type="primary" text disabled>主要按钮</ui-button>
        <ui-button type="success" text disabled>成功按钮</ui-button>
        <ui-button type="warning" text disabled>警告按钮</ui-button>
        <ui-button type="danger" text disabled>危险按钮</ui-button>
        <ui-button type="info" text disabled>信息按钮</ui-button>
        <ui-button type="default" text disabled>默认按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="加载状态">
      <ui-space wrap>
        <ui-button type="primary" loading>主要按钮</ui-button>
        <ui-button type="success" loading>成功按钮</ui-button>
        <ui-button type="warning" loading>警告按钮</ui-button>
        <ui-button type="danger" loading>危险按钮</ui-button>
        <ui-button type="info" loading>信息按钮</ui-button>
        <ui-button type="default" loading>默认按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="加载配置">
      <ui-space wrap>
        <ui-button type="primary" loading loading-text="加载中...">加载文字</ui-button>
        <ui-button type="success" loading loading-icon-size="36rpx">大号图标</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="圆角按钮">
      <ui-space wrap>
        <ui-button type="primary" round>主要按钮</ui-button>
        <ui-button type="success" round>成功按钮</ui-button>
        <ui-button type="warning" round>警告按钮</ui-button>
        <ui-button type="danger" round>危险按钮</ui-button>
        <ui-button type="info" round>信息按钮</ui-button>
        <ui-button type="default" round>默认按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="按钮尺寸">
      <ui-space wrap align="end">
        <ui-button size="mini">迷你按钮</ui-button>
        <ui-button size="small">小型按钮</ui-button>
        <ui-button size="medium">中等按钮</ui-button>
        <ui-button size="normal">默认按钮</ui-button>
        <ui-button size="large">大号按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="自定义尺寸">
      <ui-space direction="vertical" fill>
        <ui-button type="primary" width="200rpx">固定宽度</ui-button>
        <ui-button type="success" height="100rpx">自定义高度</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="块级按钮">
      <ui-space direction="vertical" fill>
        <ui-button type="primary" block>主要块级按钮</ui-button>
        <ui-button type="success" block>成功块级按钮</ui-button>
        <ui-button type="warning" block>警告块级按钮</ui-button>
        <ui-button type="danger" block>危险块级按钮</ui-button>
        <ui-button type="info" block>信息块级按钮</ui-button>
        <ui-button type="default" block>默认块级按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="图标按钮">
      <ui-space wrap>
        <ui-button type="primary" icon="search">搜索按钮</ui-button>
        <ui-button type="success" icon="plus">新增按钮</ui-button>
        <ui-button type="warning" icon="edit">编辑按钮</ui-button>
        <ui-button type="danger" icon="delete">删除按钮</ui-button>
        <ui-button type="info" icon="info">详情按钮</ui-button>
        <ui-button type="default" icon="setting">设置按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="图标位置">
      <ui-space wrap>
        <ui-button type="primary" icon="arrow-left">上一步骤</ui-button>
        <ui-button type="success" icon="arrow-right" icon-position="right">下一步骤</ui-button>
        <ui-button type="warning" icon="upload">上传文件</ui-button>
        <ui-button type="danger" icon="download" icon-position="right">下载文件</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="图标样式">
      <ui-space wrap>
        <ui-button type="primary" icon="star" icon-size="36rpx">大号图标</ui-button>
        <ui-button type="success" icon="heart" icon-color="#ff6b6b">定义颜色</ui-button>
        <ui-button type="warning" icon="like" icon-weight="600">粗体图标</ui-button>
        <ui-button type="default" icon="setting" icon-color="#1989fa" icon-size="40rpx">组合配置</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="文字样式">
      <ui-space wrap>
        <ui-button type="primary" text-size="32rpx">大号文字</ui-button>
        <ui-button type="success" text-weight="700">粗体文字</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="自定义颜色">
      <ui-space wrap>
        <ui-button color="#7232dd">紫色按钮</ui-button>
        <ui-button color="#ff6b6b">珊瑚色</ui-button>
        <ui-button color="#00b894">薄荷绿</ui-button>
        <ui-button color="#2d3436" text-color="#dfe6e9">深色按钮</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="渐变色按钮">
      <ui-space direction="vertical" fill>
        <ui-button color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" block>蓝紫渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" block>粉红渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" block>天蓝渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" block>翠绿渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #fc6076 0%, #ff9a44 100%)" block>橙红渐变</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="边框样式">
      <ui-space wrap>
        <ui-button type="default" border-radius="8rpx">小号圆角</ui-button>
        <ui-button type="default" border-radius="32rpx">大号圆角</ui-button>
        <ui-button type="default" plain border-width="4rpx" border-color="primary">粗体边框</ui-button>
        <ui-button type="default" plain border-color="danger">红色边框</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="阴影效果">
      <ui-space wrap>
        <ui-button type="primary" shadow="0 4rpx 12rpx rgba(25, 137, 250, 0.4)">蓝色阴影</ui-button>
        <ui-button type="danger" shadow="0 4rpx 12rpx rgba(238, 10, 36, 0.4)">红色阴影</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="边距配置">
      <ui-space>
        <ui-button type="primary" margin-right="24rpx">右侧边距</ui-button>
        <ui-button type="success" margin-left="24rpx">左侧边距</ui-button>
      </ui-space>
    </demo-section>

    <demo-section title="节流配置">
      <ui-space direction="vertical" align="start">
        <ui-button type="primary" :throttle="1000" @click="onThrottleClick">1秒节流（点击试试）</ui-button>
        <text class="demo-text">{{ throttleLog }}</text>
      </ui-space>
    </demo-section>

    <demo-section title="事件处理">
      <ui-space direction="vertical" align="start">
        <ui-button type="primary" @click="onButtonClick">点击触发事件</ui-button>
        <text class="demo-text">{{ clickLog }}</text>
      </ui-space>
    </demo-section>

    <demo-section title="自定义样式">
      <ui-space wrap>
        <ui-button
          type="default"
          :custom-style="{
            background: 'linear-gradient(45deg, #fff 0%, #f0f0f0 100%)',
            boxShadow: '0 2rpx 8rpx rgba(0, 0, 0, 0.1)',
            border: '2rpx dashed #1989fa',
          }"
        >
          自定义样式
        </ui-button>
        <ui-button type="primary" :custom-style="{ letterSpacing: '8rpx' }">字间距</ui-button>
      </ui-space>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Button 按钮" },
})

const toast = useToast()

// 事件日志
const clickLog = ref("点击按钮查看事件")
const throttleLog = ref("快速连续点击测试节流效果")

let throttleCount = 0
function onThrottleClick() {
  throttleCount++
  throttleLog.value = `触发了点击事件，第 ${throttleCount} 次`
}

function onButtonClick(event: any) {
  clickLog.value = `触发了 click 事件，时间: ${new Date().toLocaleTimeString()}`
  toast.success({
    content: "按钮被点击",
  })
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}
</style>
