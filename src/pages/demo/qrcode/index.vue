<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block justify="center">
        <ui-qrcode value="https://example.com" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block justify="center">
        <ui-qrcode value="https://example.com" size="300rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="3" :gap="24" justify="center">
        <ui-qrcode value="https://example.com" size="160rpx" foreground="#1989fa" />
        <ui-qrcode value="https://example.com" size="160rpx" foreground="#07c160" />
        <ui-qrcode value="https://example.com" size="160rpx" foreground="#ee0a24" />
      </demo-block>
    </demo-section>

    <demo-section title="带Logo">
      <demo-block justify="center">
        <ui-qrcode value="https://example.com" size="250rpx" icon="https://picsum.photos/60" icon-size="60rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="条形码">
      <demo-block justify="center">
        <ui-qrcode type="barcode" value="1234567890" barcode-width="500rpx" barcode-height="120rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="动态生成">
      <demo-block direction="column">
        <ui-input v-model="inputValue" placeholder="输入内容生成二维码" />
      </demo-block>
      <demo-block justify="center">
        <ui-qrcode :value="inputValue || 'Hello World'" size="200rpx" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "QRCode 二维码" },
})

const inputValue = ref("")
</script>
