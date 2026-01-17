<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-tabbar v-model="active1" :fixed="false" :safe-area-inset-bottom="false">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="user" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="徽标提示">
      <demo-block direction="column">
        <ui-tabbar v-model="active2" :fixed="false" :safe-area-inset-bottom="false">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" dot />
          <ui-tabbar-item icon="message" text="消息" badge="5" />
          <ui-tabbar-item icon="user" text="我的" badge="99+" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column">
        <ui-tabbar v-model="active3" :fixed="false" :safe-area-inset-bottom="false" active-color="#07c160" inactive-color="#969799">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="user" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="切换事件">
      <demo-block direction="column">
        <ui-tabbar v-model="active4" :fixed="false" :safe-area-inset-bottom="false" @change="onChange">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="user" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block direction="column">
        <ui-tabbar v-model="active5" :fixed="false" :safe-area-inset-bottom="false">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" disabled />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="user" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="切换拦截">
      <demo-block direction="column">
        <ui-tabbar v-model="active6" :fixed="false" :safe-area-inset-bottom="false" :before-change="beforeChange">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="user" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="图片图标">
      <demo-block direction="column">
        <ui-tabbar v-model="active7" :fixed="false" :safe-area-inset-bottom="false">
          <ui-tabbar-item icon="/static/tabbar/demo/home-inactive.png" active-icon="/static/tabbar/demo/home-active.png" text="首页" />
          <ui-tabbar-item icon="/static/tabbar/demo/category-inactive.png" active-icon="/static/tabbar/demo/category-active.png" text="分类" />
          <ui-tabbar-item icon="/static/tabbar/demo/cart-inactive.png" active-icon="/static/tabbar/demo/cart-active.png" text="购物车" />
          <ui-tabbar-item icon="/static/tabbar/demo/user-inactive.png" active-icon="/static/tabbar/demo/user-active.png" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Tabbar 标签栏" },
})

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active6 = ref(0)
const active7 = ref(0)

function onChange(index: number) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}

function beforeChange(name: number | string) {
  return new Promise<boolean>((resolve) => {
    uni.showModal({
      title: "提示",
      content: `确定切换到第 ${+name + 1} 项吗？`,
      success: (res) => {
        resolve(res.confirm)
      },
      fail: () => {
        resolve(false)
      },
    })
  })
}
</script>

<style lang="scss" scoped></style>
