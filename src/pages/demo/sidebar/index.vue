<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block class="sidebar-wrap">
        <ui-sidebar v-model="value.basic">
          <ui-sidebar-item title="标签一" />
          <ui-sidebar-item title="标签二" />
          <ui-sidebar-item title="标签三" />
        </ui-sidebar>
      </demo-block>
    </demo-section>

    <demo-section title="使用 name 标识符">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前选中: {{ value.byName }}</text>
        <view class="sidebar-wrap">
          <ui-sidebar v-model="value.byName">
            <ui-sidebar-item title="首页" name="home" />
            <ui-sidebar-item title="分类" name="category" />
            <ui-sidebar-item title="购物车" name="cart" />
            <ui-sidebar-item title="我的" name="mine" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block class="sidebar-wrap">
        <ui-sidebar v-model="value.disabled">
          <ui-sidebar-item title="标签一" />
          <ui-sidebar-item title="标签二" disabled />
          <ui-sidebar-item title="标签三" />
        </ui-sidebar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.size1" width="200rpx">
            <ui-sidebar-item title="窄侧栏" height="80rpx" />
            <ui-sidebar-item title="标签二" height="80rpx" />
            <ui-sidebar-item title="标签三" height="80rpx" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.size2" width="240rpx">
            <ui-sidebar-item title="正常" height="120rpx" />
            <ui-sidebar-item title="标签二" height="120rpx" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="线条样式">
      <demo-block direction="column" :gap="24">
        <view class="sidebar-row">
          <text class="sidebar-row__label">默认线条:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="value.line1">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
        <view class="sidebar-row">
          <text class="sidebar-row__label">自定义颜色:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="value.line2" line-color="danger" line-width="6rpx">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
        <view class="sidebar-row">
          <text class="sidebar-row__label">圆角线条:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="value.line3" line-color="success" line-height="60rpx" line-radius="16rpx">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
        <view class="sidebar-row">
          <text class="sidebar-row__label">隐藏线条:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="value.line4" :show-line="false">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="动画时长">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="value.duration = 0">无动画</ui-button>
          <ui-button size="small" @click="value.duration = 300">300ms</ui-button>
          <ui-button size="small" @click="value.duration = 600">600ms</ui-button>
        </demo-block>
        <text class="demo-text">当前动画时长: {{ value.duration }}ms</text>
        <view class="sidebar-wrap">
          <ui-sidebar v-model="value.durationVal" :duration="value.duration">
            <ui-sidebar-item title="标签一" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
            <ui-sidebar-item title="标签四" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.bg1" background="background">
            <ui-sidebar-item title="白底" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.bg2" background="primary-light">
            <ui-sidebar-item title="主色浅底" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="标题样式">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.title1">
            <ui-sidebar-item title="自定义颜色" title-color="text-secondary" active-title-color="primary" />
            <ui-sidebar-item title="标签二" title-color="text-secondary" active-title-color="primary" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.title2">
            <ui-sidebar-item title="大号粗体" title-size="32rpx" title-weight="600" active-title-size="36rpx" />
            <ui-sidebar-item title="标签二" title-size="32rpx" title-weight="600" active-title-size="36rpx" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="激活背景">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.activeBg1" background="background-section">
            <ui-sidebar-item title="标签一" active-background="background" />
            <ui-sidebar-item title="标签二" active-background="background" />
            <ui-sidebar-item title="标签三" active-background="background" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="value.activeBg2" background="background-section">
            <ui-sidebar-item title="标签一" active-background="primary-light" />
            <ui-sidebar-item title="标签二" active-background="primary-light" />
            <ui-sidebar-item title="标签三" active-background="primary-light" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="文字对齐">
      <demo-block :cols="3" :gap="16">
        <view class="sidebar-wrap sidebar-wrap--mini">
          <ui-sidebar v-model="value.align1" width="180rpx">
            <ui-sidebar-item title="左对齐" title-align="left" />
            <ui-sidebar-item title="标签二" title-align="left" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--mini">
          <ui-sidebar v-model="value.align2" width="180rpx">
            <ui-sidebar-item title="居中" title-align="center" />
            <ui-sidebar-item title="标签二" title-align="center" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--mini">
          <ui-sidebar v-model="value.align3" width="180rpx">
            <ui-sidebar-item title="右对齐" title-align="right" />
            <ui-sidebar-item title="标签二" title-align="right" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="徽标 / 圆点">
      <demo-block class="sidebar-wrap">
        <ui-sidebar v-model="value.badge">
          <ui-sidebar-item title="徽标 9" badge="9" />
          <ui-sidebar-item title="徽标 99+" badge="99+" />
          <ui-sidebar-item title="圆点提示" dot />
          <ui-sidebar-item title="无徽标" />
        </ui-sidebar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容">
      <demo-block class="sidebar-wrap">
        <ui-sidebar v-model="value.slot">
          <ui-sidebar-item v-for="m in slotMenus" :key="m.name" :name="m.name">
            <template #default="{ active }">
              <view class="custom-item">
                <ui-icon :name="m.icon" :color="active ? 'primary' : 'text-secondary'" />
                <text class="custom-item__text" :class="{ 'custom-item__text--active': active }">{{ m.label }}</text>
              </view>
            </template>
          </ui-sidebar-item>
        </ui-sidebar>
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <view class="sidebar-wrap">
          <ui-sidebar v-model="value.event" @change="onChange" @click-item="onClickItem">
            <ui-sidebar-item title="标签一" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合示例">
      <demo-block class="sidebar-wrap sidebar-wrap--large">
        <ui-sidebar v-model="value.complex" width="220rpx" background="background-section" line-color="primary" line-width="6rpx" line-radius="4rpx" :duration="200">
          <ui-sidebar-item
            v-for="cate in categories"
            :key="cate.name"
            :name="cate.name"
            :title="cate.title"
            :disabled="cate.disabled"
            active-background="background"
            active-title-color="primary"
            active-title-weight="600"
          />
        </ui-sidebar>
        <view class="sidebar-content">
          <text class="sidebar-content__title">{{ currentCategory?.title }}</text>
          <text class="sidebar-content__desc">当前分类: {{ value.complex }}</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Sidebar 侧边栏" },
})

const slotMenus = [
  { name: "home", label: "首页", icon: "home" },
  { name: "category", label: "分类", icon: "grid" },
  { name: "cart", label: "购物车", icon: "cart" },
  { name: "mine", label: "我的", icon: "user" },
]

const categories = [
  { name: "fruits", title: "水果" },
  { name: "vegetables", title: "蔬菜" },
  { name: "meat", title: "肉禽蛋" },
  { name: "seafood", title: "海鲜水产" },
  { name: "snacks", title: "休闲零食", disabled: true },
  { name: "drinks", title: "酒水饮料" },
  { name: "dairy", title: "乳品烘焙" },
] as Array<{ name: string; title: string; disabled?: boolean }>

const value = reactive({
  basic: 0 as number | string,
  byName: "home",
  disabled: 0,
  size1: 0,
  size2: 0,
  line1: 0,
  line2: 0,
  line3: 0,
  line4: 0,
  duration: 300,
  durationVal: 0,
  bg1: 0,
  bg2: 0,
  title1: 0,
  title2: 0,
  activeBg1: 0,
  activeBg2: 0,
  align1: 0,
  align2: 0,
  align3: 0,
  badge: 0,
  slot: "home",
  event: 0,
  complex: "fruits",
})

const eventLog = ref("等待事件...")
const currentCategory = computed(() => categories.find((c) => c.name === value.complex))

function onChange(name: number | string) {
  eventLog.value = `[change] ${name}`
}

function onClickItem(name: number | string, index: number) {
  eventLog.value = `[click-item] ${name}@${index}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.sidebar-wrap {
  height: 300rpx;
  overflow: hidden;
  border: 2rpx solid var(--ui-color-border-light);
  border-radius: var(--ui-radius-md);

  &--small {
    height: 240rpx;
  }

  &--mini {
    height: 200rpx;
  }

  &--large {
    height: 400rpx;
    display: flex;
  }
}

.sidebar-row {
  gap: var(--ui-spacing-md);
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text);
    width: 160rpx;
    font-size: var(--ui-font-size-sm);
  }
}

.custom-item {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-md);
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;

    &--active {
      color: var(--ui-color-primary);
      font-weight: 600;
    }
  }
}

.sidebar-content {
  gap: var(--ui-spacing-md);
  flex: 1;
  display: flex;
  background: var(--ui-color-background);
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__title {
    color: var(--ui-color-text);
    font-size: 36rpx;
    font-weight: 600;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}
</style>
