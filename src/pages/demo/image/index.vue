<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="3" :gap="24">
        <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" />
        <ui-image src="https://picsum.photos/201" width="200rpx" height="200rpx" />
        <ui-image src="https://picsum.photos/202" width="200rpx" height="200rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="填充模式">
      <demo-block :cols="3" :gap="24">
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="scaleToFill" />
          <text class="image-label">scaleToFill</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFit" />
          <text class="image-label">aspectFit</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFill" />
          <text class="image-label">aspectFill</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="widthFix" />
          <text class="image-label">widthFix</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/200/300" width="200rpx" height="200rpx" mode="heightFix" />
          <text class="image-label">heightFix</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="center" />
          <text class="image-label">center</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="圆形图片">
      <demo-block :cols="4" :gap="24">
        <ui-image src="https://picsum.photos/203" width="140rpx" height="140rpx" round />
        <ui-image src="https://picsum.photos/204" width="140rpx" height="140rpx" round />
        <ui-image src="https://picsum.photos/205" width="140rpx" height="140rpx" round />
        <ui-image src="https://picsum.photos/206" width="140rpx" height="140rpx" round />
      </demo-block>
    </demo-section>

    <demo-section title="圆角大小">
      <demo-block :cols="4" :gap="24">
        <view class="image-item">
          <ui-image src="https://picsum.photos/207" width="140rpx" height="140rpx" radius="0" />
          <text class="image-label">0</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/208" width="140rpx" height="140rpx" radius="8rpx" />
          <text class="image-label">8rpx</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/209" width="140rpx" height="140rpx" radius="16rpx" />
          <text class="image-label">16rpx</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/210" width="140rpx" height="140rpx" radius="32rpx" />
          <text class="image-label">32rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="正方形图片">
      <demo-block :cols="3" :gap="24">
        <ui-image src="https://picsum.photos/300/200" width="200rpx" square radius="8rpx" />
        <ui-image src="https://picsum.photos/200/300" width="200rpx" square radius="8rpx" />
        <ui-image src="https://picsum.photos/400/200" width="200rpx" square radius="8rpx" />
      </demo-block>
    </demo-section>

    <!-- 新增：块级元素 -->
    <demo-section title="块级元素">
      <demo-block direction="column" :gap="16">
        <ui-image src="https://picsum.photos/600/200" height="200rpx" block radius="8rpx" />
        <text class="demo-text">block 属性使图片宽度充满容器</text>
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block :cols="3" :gap="24">
        <view class="image-item">
          <ui-image src="" width="200rpx" height="200rpx" />
          <text class="image-label">加载中</text>
        </view>
        <view class="image-item">
          <ui-image src="https://invalid-url.com/404.jpg" width="200rpx" height="200rpx" />
          <text class="image-label">加载失败</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/211" width="200rpx" height="200rpx" fade />
          <text class="image-label">淡入效果</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义占位">
      <demo-block :cols="2" :gap="24">
        <view class="image-item">
          <ui-image src="" width="200rpx" height="200rpx">
            <template #loading>
              <ui-loading size="48rpx" />
            </template>
          </ui-image>
          <text class="image-label">自定义加载</text>
        </view>
        <view class="image-item">
          <ui-image src="https://invalid-url.com/404.jpg" width="200rpx" height="200rpx">
            <template #error>
              <view class="custom-error">
                <ui-icon name="warning" size="40rpx" color="#999" />
                <text class="custom-error-text">加载失败</text>
              </view>
            </template>
          </ui-image>
          <text class="image-label">自定义错误</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="背景色">
      <demo-block :cols="3" :gap="24">
        <ui-image src="https://picsum.photos/212" width="200rpx" height="200rpx" background="#f5f5f5" radius="8rpx" />
        <ui-image src="https://picsum.photos/213" width="200rpx" height="200rpx" background="#e8f4ff" radius="8rpx" />
        <ui-image src="https://picsum.photos/214" width="200rpx" height="200rpx" background="#fff0f0" radius="8rpx" />
      </demo-block>
    </demo-section>

    <!-- 新增：懒加载 -->
    <demo-section title="懒加载">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="3" :gap="24">
          <ui-image src="https://picsum.photos/220" width="200rpx" height="200rpx" lazy-load radius="8rpx" />
          <ui-image src="https://picsum.photos/221" width="200rpx" height="200rpx" lazy-load radius="8rpx" />
          <ui-image src="https://picsum.photos/222" width="200rpx" height="200rpx" lazy-load radius="8rpx" />
        </demo-block>
        <text class="demo-text">lazy-load 属性开启懒加载，仅在 page/scroll-view 中生效</text>
      </demo-block>
    </demo-section>

    <!-- 新增：拖动配置 -->
    <demo-section title="拖动配置">
      <demo-block :cols="2" :gap="24">
        <view class="image-item">
          <ui-image src="https://picsum.photos/223" width="200rpx" height="200rpx" draggable radius="8rpx" />
          <text class="image-label">可拖动</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/224" width="200rpx" height="200rpx" :draggable="false" radius="8rpx" />
          <text class="image-label">不可拖动</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：webp 格式 -->
    <demo-section title="Webp 格式">
      <demo-block direction="column" align="start" :gap="16">
        <ui-image src="https://www.gstatic.com/webp/gallery/1.webp" width="300rpx" height="200rpx" webp radius="8rpx" />
        <text class="demo-text">webp 属性在不支持 webp 的系统上单独启用 webp 格式</text>
      </demo-block>
    </demo-section>

    <!-- 新增：长按菜单 -->
    <demo-section title="长按菜单">
      <demo-block direction="column" align="start" :gap="16">
        <ui-image src="https://picsum.photos/225" width="300rpx" height="200rpx" show-menu-by-longpress radius="8rpx" />
        <text class="demo-text">长按图片可显示小程序码识别菜单（仅小程序端生效）</text>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="2" :gap="24">
          <view class="image-item">
            <ui-image src="https://picsum.photos/226" width="200rpx" height="200rpx" radius="8rpx" @load="onImageLoad" @click="onImageClick" />
            <text class="image-label">点击试试</text>
          </view>
          <view class="image-item">
            <ui-image src="https://invalid-url.com/error.jpg" width="200rpx" height="200rpx" radius="8rpx" @error="onImageError" />
            <text class="image-label">加载失败事件</text>
          </view>
        </demo-block>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block :cols="2" :gap="24">
        <view class="image-item">
          <ui-image src="https://picsum.photos/227" width="200rpx" height="200rpx" custom-class="my-image" />
          <text class="image-label">自定义类名</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/228" width="200rpx" height="200rpx" :custom-style="{ boxShadow: '0 8rpx 24rpx rgba(0,0,0,0.15)', borderRadius: '16rpx' }" />
          <text class="image-label">自定义样式</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Image 图片" },
})

const toast = useToast()

// 事件日志
const eventLog = ref("点击图片或等待加载事件触发")

// 事件处理
function onImageLoad(event: any) {
  eventLog.value = `触发 load 事件，图片加载成功`
  toast.success("图片加载成功")
}

function onImageError(event: any) {
  eventLog.value = `触发 error 事件，图片加载失败`
  toast.fail("图片加载失败")
}

function onImageClick(event: any) {
  eventLog.value = `触发 click 事件，时间: ${new Date().toLocaleTimeString()}`
  toast.text("图片被点击")
}
</script>

<style lang="scss" scoped>
.image-item {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.image-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-top: 12rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.custom-error {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.custom-error-text {
  color: #999;
  font-size: 22rpx;
}

:deep(.my-image) {
  border: 4rpx solid #1989fa;
  border-radius: 16rpx;
}
</style>
