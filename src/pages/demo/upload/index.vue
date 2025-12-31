<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-upload v-model="fileList1" />
      </demo-block>
    </demo-section>

    <demo-section title="多选上传">
      <demo-block>
        <ui-upload v-model="fileList2" multiple />
      </demo-block>
    </demo-section>

    <demo-section title="限制数量 (最多3张)">
      <demo-block>
        <ui-upload v-model="fileList3" :max-count="3" multiple />
      </demo-block>
    </demo-section>

    <demo-section title="限制大小 (最大1MB)">
      <demo-block>
        <ui-upload v-model="fileList4" :max-size="1024 * 1024" @oversize="onOversize" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-upload v-model="fileList5" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸">
      <demo-block>
        <ui-upload v-model="fileList6" width="200rpx" height="200rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="开启预览">
      <demo-block>
        <ui-upload v-model="fileList7" preview />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Upload 上传" },
})

const fileList1 = ref<string[]>([])
const fileList2 = ref<string[]>([])
const fileList3 = ref<string[]>([])
const fileList4 = ref<string[]>([])
const fileList5 = ref<string[]>(["https://picsum.photos/200"])
const fileList6 = ref<string[]>([])
const fileList7 = ref<string[]>([])

function onOversize() {
  uni.showToast({ title: "文件大小超过限制", icon: "none" })
}
</script>
