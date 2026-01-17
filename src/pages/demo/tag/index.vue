<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :gap="16">
        <ui-tag text="标签" />
        <ui-tag type="primary" text="主要" />
        <ui-tag type="success" text="成功" />
        <ui-tag type="warning" text="警告" />
        <ui-tag type="danger" text="危险" />
        <ui-tag type="info" text="信息" />
      </demo-block>
    </demo-section>

    <demo-section title="镂空样式">
      <demo-block :gap="16">
        <ui-tag type="primary" plain text="主要" />
        <ui-tag type="success" plain text="成功" />
        <ui-tag type="warning" plain text="警告" />
        <ui-tag type="danger" plain text="危险" />
        <ui-tag type="info" plain text="信息" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角样式">
      <demo-block :gap="16">
        <ui-tag type="primary" round text="圆角标签" />
        <ui-tag type="success" round text="圆角标签" />
        <ui-tag type="warning" round text="圆角标签" />
      </demo-block>
    </demo-section>

    <demo-section title="标签尺寸">
      <demo-block :gap="16" align="center">
        <ui-tag type="primary" text-size="20rpx" padding="4rpx 8rpx" text="小号" />
        <ui-tag type="primary" text-size="24rpx" padding="6rpx 12rpx" text="默认" />
        <ui-tag type="primary" text-size="28rpx" padding="8rpx 16rpx" text="大号" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义边框">
      <demo-block :gap="16">
        <ui-tag plain border-color="primary" text="主题边框" />
        <ui-tag plain border-color="#ff6b6b" text-color="#ff6b6b" text="红色边框" />
        <ui-tag type="primary" border-radius="0" text="直角标签" />
        <ui-tag type="success" border-radius="16rpx" text="大圆角" />
      </demo-block>
    </demo-section>

    <demo-section title="可关闭标签">
      <demo-block :gap="16">
        <ui-tag v-if="showTag1" type="primary" closeable text="点击关闭" @close="showTag1 = false" />
        <ui-tag v-if="showTag2" type="success" closeable text="点击关闭" @close="showTag2 = false" />
        <ui-tag v-if="showTag3" type="warning" closeable text="点击关闭" @close="showTag3 = false" />
        <ui-button v-if="!showTag1 || !showTag2 || !showTag3" type="primary" size="small" @click="resetTags"> 重置 </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="带图标">
      <demo-block :gap="16">
        <ui-tag type="primary" icon="star" text="收藏" />
        <ui-tag type="success" icon="check" text="已完成" />
        <ui-tag type="danger" icon="close" text="已删除" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :gap="16">
        <ui-tag background="#7232dd" text-color="#fff" text="自定义背景" />
        <ui-tag background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" text-color="#fff" text="渐变背景" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Tag 标签" },
})

const showTag1 = ref(true)
const showTag2 = ref(true)
const showTag3 = ref(true)

function resetTags() {
  showTag1.value = true
  showTag2.value = true
  showTag3.value = true
}
</script>
