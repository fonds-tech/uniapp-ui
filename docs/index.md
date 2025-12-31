---
layout: home

hero:
  name: UniApp UI
  text: 跨端 UI 组件库
  tagline: 基于 Vue 3 + UniApp，支持 H5、小程序、App 多端适配
  image:
    src: /logo.svg
    alt: UniApp UI
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: 组件列表
      link: /components/
    - theme: alt
      text: 在线演示
      link: /demo/

features:
  - icon: 🚀
    title: 开箱即用
    details: 80+ 精心设计的 UI 组件，覆盖移动端常见业务场景
  - icon: 📦
    title: 按需引入
    details: 支持 easycom 自动导入，无需手动注册组件
  - icon: 🎨
    title: 主题定制
    details: 基于 CSS 变量的主题系统，轻松实现个性化定制
  - icon: 📱
    title: 多端适配
    details: 一套代码，同时支持 H5、微信小程序、App 等多端运行
  - icon: 🔧
    title: TypeScript
    details: 使用 TypeScript 编写，提供完整的类型定义
  - icon: ⚡
    title: 高性能
    details: 优化渲染性能，确保流畅的用户体验
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #667eea 30%, #764ba2);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #667eea 50%, #764ba2 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
