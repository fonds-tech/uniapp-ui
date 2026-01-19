<template>
  <demo-page>
    <!-- 基础用法：title, value, label -->
    <demo-section title="基础用法" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" />
        <ui-cell title="单元格" value="内容" label="描述信息" />
      </ui-cell-group>
    </demo-section>

    <!-- icon 图标相关 -->
    <demo-section title="左侧图标" :card="false">
      <ui-cell-group>
        <ui-cell title="默认图标" icon="setting" value="内容" />
        <ui-cell title="图标大小" icon="setting" icon-size="24" value="内容" />
        <ui-cell title="图标颜色" icon="setting" icon-color="#1989fa" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- isLink 链接箭头 -->
    <demo-section title="展示箭头" :card="false">
      <ui-cell-group>
        <ui-cell title="链接单元格" is-link />
        <ui-cell title="链接单元格" value="内容" is-link />
      </ui-cell-group>
    </demo-section>

    <!-- rightIcon 右侧图标 -->
    <demo-section title="右侧图标" :card="false">
      <ui-cell-group>
        <ui-cell title="自定义图标" is-link right-icon="plus" />
        <ui-cell title="图标颜色" is-link right-icon="arrow" right-icon-color="#1989fa" />
      </ui-cell-group>
    </demo-section>

    <!-- url 跳转链接 -->
    <demo-section title="页面跳转" :card="false">
      <ui-cell-group>
        <ui-cell title="跳转到按钮页" is-link url="/pages/demo/button/index" />
      </ui-cell-group>
    </demo-section>

    <!-- center 垂直居中 -->
    <demo-section title="垂直居中" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" label="描述信息" center />
      </ui-cell-group>
    </demo-section>

    <!-- titleSize, titleColor, titleWeight -->
    <demo-section title="标题样式" :card="false">
      <ui-cell-group>
        <ui-cell title="字体大小" title-size="18" value="内容" />
        <ui-cell title="字体颜色" title-color="#1989fa" value="内容" />
        <ui-cell title="字体加粗" title-weight="bold" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- labelSize, labelColor, labelGap -->
    <demo-section title="描述样式" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" label="字体大小" label-size="14" value="内容" />
        <ui-cell title="单元格" label="字体颜色" label-color="#ee0a24" value="内容" />
        <ui-cell title="单元格" label="顶部间距" label-gap="12" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- contentSize, contentColor -->
    <demo-section title="内容样式" :card="false">
      <ui-cell-group>
        <ui-cell title="单元格" value="字体大小" content-size="16" />
        <ui-cell title="单元格" value="字体颜色" content-color="#07c160" />
      </ui-cell-group>
    </demo-section>

    <!-- height, padding, background -->
    <demo-section title="尺寸与背景" :card="false">
      <ui-cell-group>
        <ui-cell title="自定义高度" value="60px" height="60" />
        <ui-cell title="自定义内边距" value="24px" padding="24" />
        <ui-cell title="自定义背景" value="浅蓝色" background="#e6f7ff" />
      </ui-cell-group>
    </demo-section>

    <!-- border, borderColor, borderLeft -->
    <demo-section title="边框样式" :card="false">
      <ui-cell-group>
        <ui-cell title="无边框" value="内容" :border="false" />
        <ui-cell title="边框颜色" value="内容" border-color="#1989fa" />
        <ui-cell title="边框位置" value="内容" border-left="0" />
      </ui-cell-group>
    </demo-section>

    <!-- clickable 点击反馈 -->
    <demo-section title="点击反馈" :card="false">
      <ui-cell-group>
        <ui-cell title="可点击" value="有点击效果" clickable @click="onCellClick" />
        <ui-cell title="不可点击" value="无点击效果" :clickable="false" />
      </ui-cell-group>
    </demo-section>

    <!-- CellGroup: radius, background -->
    <demo-section title="分组样式" :card="false">
      <ui-cell-group radius="16" background="#f5f5f5">
        <ui-cell title="自定义圆角" value="16px" />
        <ui-cell title="自定义背景" value="灰色" />
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
