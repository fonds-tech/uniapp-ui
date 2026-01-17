<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-avatar-group>
          <ui-avatar src="https://picsum.photos/200" />
          <ui-avatar src="https://picsum.photos/201" />
          <ui-avatar src="https://picsum.photos/202" />
        </ui-avatar-group>
      </demo-block>
    </demo-section>

    <demo-section title="最大显示数量">
      <demo-block>
        <view class="demo-item">
          <text class="demo-label">max=3</text>
          <ui-avatar-group :max="3">
            <ui-avatar v-for="i in 6" :key="i" :src="`https://picsum.photos/${210 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">max=5</text>
          <ui-avatar-group :max="5">
            <ui-avatar v-for="i in 8" :key="i" :src="`https://picsum.photos/${220 + i}`" />
          </ui-avatar-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="头像尺寸">
      <demo-block>
        <view class="demo-item">
          <text class="demo-label">mini</text>
          <ui-avatar-group size="mini">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${230 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">small</text>
          <ui-avatar-group size="small">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${240 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">medium</text>
          <ui-avatar-group size="medium">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${250 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">large</text>
          <ui-avatar-group size="large">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${260 + i}`" />
          </ui-avatar-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="头像形状">
      <demo-block>
        <view class="demo-item">
          <text class="demo-label">circle</text>
          <ui-avatar-group shape="circle">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${270 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">square</text>
          <ui-avatar-group shape="square">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${280 + i}`" />
          </ui-avatar-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="堆叠方向">
      <demo-block>
        <view class="demo-item">
          <text class="demo-label">right (默认)</text>
          <ui-avatar-group direction="right">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${290 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">left</text>
          <ui-avatar-group direction="left">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${300 + i}`" />
          </ui-avatar-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义间距">
      <demo-block>
        <view class="demo-item">
          <text class="demo-label">gap=-24</text>
          <ui-avatar-group :gap="-24">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${310 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">gap=-8</text>
          <ui-avatar-group :gap="-8">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${320 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">gap=8 (不重叠)</text>
          <ui-avatar-group :gap="8">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${330 + i}`" />
          </ui-avatar-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义边框">
      <demo-block>
        <view class="demo-item">
          <text class="demo-label">白色边框</text>
          <ui-avatar-group border-color="#fff" border-width="4rpx">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${340 + i}`" />
          </ui-avatar-group>
        </view>
        <view class="demo-item">
          <text class="demo-label">主题色边框</text>
          <ui-avatar-group border-color="var(--ui-color-primary)" border-width="4rpx">
            <ui-avatar v-for="i in 4" :key="i" :src="`https://picsum.photos/${350 + i}`" />
          </ui-avatar-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义超出样式">
      <demo-block>
        <view class="demo-item">
          <text class="demo-label">自定义颜色</text>
          <ui-avatar-group :max="3" excess-color="#fff" excess-background="var(--ui-color-primary)">
            <ui-avatar v-for="i in 6" :key="i" :src="`https://picsum.photos/${360 + i}`" />
          </ui-avatar-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="混合内容">
      <demo-block>
        <ui-avatar-group :max="5">
          <ui-avatar src="https://picsum.photos/370" />
          <ui-avatar text="张" background="#1890ff" text-color="#fff" />
          <ui-avatar icon="user" background="#52c41a" icon-color="#fff" />
          <ui-avatar src="https://picsum.photos/371" />
          <ui-avatar text="李" background="#faad14" text-color="#fff" />
          <ui-avatar src="https://picsum.photos/372" />
          <ui-avatar src="https://picsum.photos/373" />
        </ui-avatar-group>
      </demo-block>
    </demo-section>

    <demo-section title="点击事件">
      <demo-block>
        <ui-avatar-group :max="4" @click="handleGroupClick" @click-excess="handleExcessClick">
          <ui-avatar v-for="i in 6" :key="i" :src="`https://picsum.photos/${380 + i}`" />
        </ui-avatar-group>
        <text class="demo-text">{{ clickInfo }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "AvatarGroup 头像组" },
})

const clickInfo = ref("点击头像组或超出数量查看事件")

function handleGroupClick() {
  clickInfo.value = "点击了头像组"
  uni.showToast({
    title: "点击了头像组",
    icon: "none",
  })
}

function handleExcessClick() {
  clickInfo.value = "点击了超出数量"
  uni.showToast({
    title: "点击了超出数量 (+N)",
    icon: "none",
  })
}
</script>

<style lang="scss" scoped>
.demo-item {
  gap: 16rpx;
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  color: var(--ui-color-text-secondary);
  width: 180rpx;
  font-size: 24rpx;
  flex-shrink: 0;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 16rpx;
}
</style>
