<template>
  <div v-if="showPreview" class="preview-container">
    <div class="preview-wrapper">
      <iframe ref="iframeRef" :src="demoUrl" frameborder="0" class="preview-iframe"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from "vitepress"
import { ref, watch, computed } from "vue"

const route = useRoute()
const { isDark } = useData()
const iframeRef = ref<HTMLIFrameElement | null>(null)

const componentName = computed(() => {
  const path = route.path
  const match = path.match(/\/components\/([^/]+?)(?:\.html)?$/)
  return match ? match[1] : ""
})

const demoUrl = computed(() => {
  if (!componentName.value) return ""
  const theme = isDark.value ? "dark" : "light"
  return `http://localhost:9300/#/pages/demo/${componentName.value}/index?theme=${theme}`
})

const showPreview = computed(() => {
  return componentName.value && componentName.value !== "index"
})

// 监听主题变化，通过 postMessage 通知 iframe
watch(isDark, (dark) => {
  const theme = dark ? "dark" : "light"
  iframeRef.value?.contentWindow?.postMessage({ type: "theme-change", theme }, "*")
})
</script>

<style scoped>
.preview-container {
  top: 80px;
  right: 24px;
  display: flex;
  z-index: 100;
  position: fixed;
  align-items: center;
  flex-direction: column;
  transform-origin: top right;
}

.preview-wrapper {
  width: 390px;
  height: 844px;
  overflow: hidden;
  background: var(--vp-c-bg);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 24px 48px -12px rgba(0, 0, 0, 0.15);
  border-radius: 12px; /* 柔和阴影 */
  border: 1px solid var(--vp-c-divider); /* 细微边框 */
  transition: all 0.3s ease;
}

.preview-iframe {
  width: 100%;
  border: none;
  height: 100%;
}

/* 深色模式适配 */
:global(.dark) .preview-wrapper {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 24px 48px -12px rgba(0, 0, 0, 0.5); /* 深色模式下加重阴影 */
  border-color: rgba(255, 255, 255, 0.1);
}

/* 响应式 */
@media (max-width: 1279px) {
  .preview-container {
    display: none;
  }
}
</style>
