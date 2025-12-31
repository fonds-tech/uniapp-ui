<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-tag text="标签" />
        <ui-tag type="primary" text="主要" />
        <ui-tag type="success" text="成功" />
        <ui-tag type="warning" text="警告" />
        <ui-tag type="danger" text="危险" />
        <ui-tag type="info" text="信息" />
      </demo-block>
    </demo-section>

    <demo-section title="镂空样式">
      <demo-block>
        <ui-tag type="primary" plain text="主要" />
        <ui-tag type="success" plain text="成功" />
        <ui-tag type="warning" plain text="警告" />
        <ui-tag type="danger" plain text="危险" />
        <ui-tag type="info" plain text="信息" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角样式">
      <demo-block>
        <ui-tag type="primary" round text="圆角标签" />
        <ui-tag type="success" round text="圆角标签" />
        <ui-tag type="warning" round text="圆角标签" />
      </demo-block>
    </demo-section>

    <demo-section title="可关闭标签">
      <demo-block>
        <ui-tag v-if="showTag1" type="primary" closeable text="点击关闭" @close="showTag1 = false" />
        <ui-tag v-if="showTag2" type="success" closeable text="点击关闭" @close="showTag2 = false" />
        <ui-tag v-if="showTag3" type="warning" closeable text="点击关闭" @close="showTag3 = false" />
        <ui-button v-if="!showTag1 || !showTag2 || !showTag3" type="primary" size="small" @click="resetTags">
          重置
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="带图标">
      <demo-block>
        <ui-tag type="primary" icon="star" text="收藏" />
        <ui-tag type="success" icon="check" text="已完成" />
        <ui-tag type="danger" icon="close" text="已删除" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block>
        <ui-tag background="#7232dd" text-color="#fff" text="自定义背景" />
        <ui-tag background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" text-color="#fff" text="渐变背景" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

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
