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
      link: ./h5/

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
  /* Hero 渐变标题 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);

  /* Hero 图片背景光晕 */
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #667eea 30%, #764ba2 50%, #f093fb 70%);
  --vp-home-hero-image-filter: blur(44px);
}

/* 暗色模式 Hero 调整 */
.dark {
  --vp-home-hero-name-background: linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #f0abfc 100%);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #a78bfa 30%, #c084fc 50%, #f0abfc 70%);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}

/* 首页动态背景 */
.VPHome {
  position: relative;
  overflow: hidden;
}

.VPHome::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(102, 126, 234, 0.12), transparent),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(118, 75, 162, 0.08), transparent),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(240, 147, 251, 0.06), transparent);
  pointer-events: none;
  z-index: -1;
}

.dark .VPHome::before {
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(167, 139, 250, 0.1), transparent),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(192, 132, 252, 0.06), transparent),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(240, 171, 252, 0.04), transparent);
}

/* 特性卡片容器间距 */
.VPFeatures {
  padding: 0 24px !important;
}

/* 首页容器宽度优化 */
.VPHome .container {
  max-width: 1280px;
}

/* Hero 按钮组间距 */
.VPHero .actions {
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Hero 图片动画 */
.VPHero .image-container {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
