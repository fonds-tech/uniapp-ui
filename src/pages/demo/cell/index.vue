<template>
  <demo-page>
    <demo-section title="基础用法" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" />
        <ui-cell title="单元格" value="内容" label="描述信息" />
      </ui-cell-group>
    </demo-section>

    <demo-section title="展示箭头" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" is-link />
        <ui-cell title="单元格" value="内容" is-link />
        <ui-cell title="单元格" value="内容" is-link arrow-direction="down" />
      </ui-cell-group>
    </demo-section>

    <demo-section title="带图标" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" icon="location" />
        <ui-cell title="单元格" icon="phone" value="内容" />
      </ui-cell-group>
    </demo-section>

    <demo-section title="分组标题" :card="false">
      <ui-cell-group title="分组1">
        <ui-cell title="单元格" value="内容" />
        <ui-cell title="单元格" value="内容" />
      </ui-cell-group>
      <ui-cell-group title="分组2">
        <ui-cell title="单元格" value="内容" />
        <ui-cell title="单元格" value="内容" />
      </ui-cell-group>
    </demo-section>

    <demo-section title="垂直居中" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" label="描述信息" center />
      </ui-cell-group>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Cell 单元格" },
})
</script>
