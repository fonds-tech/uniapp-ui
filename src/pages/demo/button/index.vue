<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="3">
        <ui-button type="primary">主要按钮</ui-button>
        <ui-button type="success">成功按钮</ui-button>
        <ui-button type="warning">警告按钮</ui-button>
        <ui-button type="danger">危险按钮</ui-button>
        <ui-button type="info">信息按钮</ui-button>
        <ui-button type="default">默认按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="朴素按钮">
      <demo-block :cols="3">
        <ui-button type="primary" plain>主要</ui-button>
        <ui-button type="success" plain>成功</ui-button>
        <ui-button type="warning" plain>警告</ui-button>
        <ui-button type="danger" plain>危险</ui-button>
        <ui-button type="info" plain>信息</ui-button>
        <ui-button type="default" plain>默认</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="文字按钮">
      <demo-block :cols="3">
        <ui-button type="primary" text>主要</ui-button>
        <ui-button type="success" text>成功</ui-button>
        <ui-button type="warning" text>警告</ui-button>
        <ui-button type="danger" text>危险</ui-button>
        <ui-button type="info" text>信息</ui-button>
        <ui-button type="default" text>默认</ui-button>
        <ui-button type="primary" text disabled>禁用</ui-button>
        <ui-button type="success" text disabled>禁用</ui-button>
        <ui-button type="warning" text disabled>禁用</ui-button>
        <ui-button type="danger" text disabled>禁用</ui-button>
        <ui-button type="info" text disabled>禁用</ui-button>
        <ui-button type="default" text disabled>禁用</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block :cols="3">
        <ui-button type="primary" disabled>主要</ui-button>
        <ui-button type="success" disabled>成功</ui-button>
        <ui-button type="warning" disabled>警告</ui-button>
        <ui-button type="danger" disabled>危险</ui-button>
        <ui-button type="info" disabled>信息</ui-button>
        <ui-button type="default" disabled>默认</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block :cols="3">
        <ui-button type="primary" loading>主要</ui-button>
        <ui-button type="success" loading>成功</ui-button>
        <ui-button type="warning" loading>警告</ui-button>
        <ui-button type="danger" loading>危险</ui-button>
        <ui-button type="info" loading>信息</ui-button>
        <ui-button type="default" loading>默认</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="圆角按钮">
      <demo-block :cols="3">
        <ui-button type="primary" round>主要</ui-button>
        <ui-button type="success" round>成功</ui-button>
        <ui-button type="warning" round>警告</ui-button>
        <ui-button type="danger" round>危险</ui-button>
        <ui-button type="info" round>信息</ui-button>
        <ui-button type="default" round>默认</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="按钮尺寸">
      <demo-block align="end" :cols="5">
        <ui-button type="primary" size="large">大号</ui-button>
        <ui-button type="success" size="medium">中号</ui-button>
        <ui-button type="warning" size="normal">普通</ui-button>
        <ui-button type="danger" size="small">小型</ui-button>
        <ui-button type="info" size="mini">迷你</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="块级按钮">
      <demo-block direction="column">
        <ui-button type="primary" block>主要块级按钮</ui-button>
        <ui-button type="success" block>成功块级按钮</ui-button>
        <ui-button type="warning" block>警告块级按钮</ui-button>
        <ui-button type="danger" block>危险块级按钮</ui-button>
        <ui-button type="info" block>信息块级按钮</ui-button>
        <ui-button type="default" block>默认块级按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="图标按钮">
      <demo-block :cols="3">
        <ui-button type="primary" icon="search">搜索</ui-button>
        <ui-button type="success" icon="plus">新增</ui-button>
        <ui-button type="warning" icon="edit">编辑</ui-button>
        <ui-button type="danger" icon="delete">删除</ui-button>
        <ui-button type="info" icon="info">详情</ui-button>
        <ui-button type="default" icon="setting">设置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="图标位置">
      <demo-block :cols="2">
        <ui-button type="primary" icon="arrow-left">上一步</ui-button>
        <ui-button type="success" icon="arrow-right" icon-position="right">下一步</ui-button>
        <ui-button type="warning" icon="upload">上传</ui-button>
        <ui-button type="danger" icon="download" icon-position="right">下载</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="2">
        <ui-button color="#7232dd">紫色按钮</ui-button>
        <ui-button color="#ff6b6b">珊瑚色</ui-button>
        <ui-button color="#00b894">薄荷绿</ui-button>
        <ui-button color="#2d3436" text-color="#dfe6e9">深色按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="渐变色按钮">
      <demo-block direction="column">
        <ui-button color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" block>蓝紫渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" block>粉红渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" block>天蓝渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" block>翠绿渐变</ui-button>
        <ui-button color="linear-gradient(135deg, #fc6076 0%, #ff9a44 100%)" block>橙红渐变</ui-button>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Button 按钮" },
})
</script>
