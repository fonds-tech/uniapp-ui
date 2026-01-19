<template>
  <demo-page>
    <!-- title -->
    <demo-section title="title 标题" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格标题" />
      </ui-cell-group>
    </demo-section>

    <!-- value -->
    <demo-section title="value 内容" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="右侧内容" />
      </ui-cell-group>
    </demo-section>

    <!-- label -->
    <demo-section title="label 描述" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" label="描述信息" />
      </ui-cell-group>
    </demo-section>

    <!-- icon -->
    <demo-section title="icon 图标" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" icon="setting" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- iconColor -->
    <demo-section title="iconColor 图标颜色" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" icon="setting" icon-color="#1989fa" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- isLink -->
    <demo-section title="isLink 展示箭头" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" is-link />
      </ui-cell-group>
    </demo-section>

    <!-- rightIcon -->
    <demo-section title="rightIcon 右侧图标" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" is-link right-icon="plus" />
      </ui-cell-group>
    </demo-section>

    <!-- rightIconColor -->
    <demo-section title="rightIconColor 右侧图标颜色" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" is-link right-icon-color="#1989fa" />
      </ui-cell-group>
    </demo-section>

    <!-- url -->
    <demo-section title="url 页面跳转" :card="false">
      <ui-cell-group>
        <ui-cell title="跳转到按钮页" is-link url="/pages/demo/button/index" />
      </ui-cell-group>
    </demo-section>

    <!-- center -->
    <demo-section title="center 垂直居中" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" label="描述信息" center />
      </ui-cell-group>
    </demo-section>

    <!-- titleColor -->
    <demo-section title="titleColor 标题颜色" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" title-color="#1989fa" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- titleSize -->
    <demo-section title="titleSize 标题大小" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" title-size="18" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- labelColor -->
    <demo-section title="labelColor 描述颜色" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" label="红色描述" label-color="#ee0a24" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- labelSize -->
    <demo-section title="labelSize 描述大小" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" label="大号描述" label-size="14" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- contentColor -->
    <demo-section title="contentColor 内容颜色" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="绿色内容" content-color="#07c160" />
      </ui-cell-group>
    </demo-section>

    <!-- contentSize -->
    <demo-section title="contentSize 内容大小" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="大号内容" content-size="16" />
      </ui-cell-group>
    </demo-section>

    <!-- height -->
    <demo-section title="height 高度" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="60px高度" height="60" />
      </ui-cell-group>
    </demo-section>

    <!-- padding -->
    <demo-section title="padding 内边距" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="24px内边距" padding="24" />
      </ui-cell-group>
    </demo-section>

    <!-- background -->
    <demo-section title="background 背景色" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="浅蓝色背景" background="#e6f7ff" />
      </ui-cell-group>
    </demo-section>

    <!-- border -->
    <demo-section title="border 边框" :card="false">
      <ui-cell-group>
        <ui-cell title="无边框" value="内容" :border="false" />
        <ui-cell title="有边框" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- borderColor -->
    <demo-section title="borderColor 边框颜色" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="蓝色边框" border-color="#1989fa" />
        <ui-cell title="单元格" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- clickable -->
    <demo-section title="clickable 点击反馈" :card="false">
      <ui-cell-group>
        <ui-cell title="可点击" value="有点击效果" clickable @click="onCellClick" />
      </ui-cell-group>
    </demo-section>

    <!-- CellGroup radius -->
    <demo-section title="CellGroup radius 圆角" :card="false">
      <ui-cell-group radius="16">
        <ui-cell title="单元格" value="16px圆角" />
      </ui-cell-group>
    </demo-section>

    <!-- CellGroup background -->
    <demo-section title="CellGroup background 背景" :card="false">
      <ui-cell-group background="#f5f5f5">
        <ui-cell title="单元格" value="灰色背景" />
      </ui-cell-group>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Cell 单元格" },
})

function onCellClick() {
  uni.showToast({ title: "点击了单元格", icon: "none" })
}
</script>
