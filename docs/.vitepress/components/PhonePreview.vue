<template>
  <div v-if="showPreview && isLargeScreen" class="preview-container" :class="{ collapsed: !expanded }">
    <div class="preview-header">
      <a v-if="expanded" :href="demoUrl" target="_blank" class="preview-link" title="新窗口打开">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
      <button class="preview-toggle" type="button" :title="expanded ? '收起预览' : '展开预览'" @click="toggleExpanded">
        <svg
          v-if="expanded"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="4 14 10 14 10 20" />
          <polyline points="20 10 14 10 14 4" />
          <line x1="14" y1="10" x2="21" y2="3" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
    </div>
    <div class="preview-body">
      <iframe v-if="expanded" ref="iframeRef" :src="demoUrl" class="preview-iframe" frameborder="0" />
    </div>
  </div>

  <button v-if="showPreview && isMediumScreen" class="preview-trigger" type="button" title="打开预览" @click="openDrawer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  </button>

  <Teleport to="body">
    <Transition name="preview-fade">
      <div v-if="drawerVisible" class="drawer-overlay" @click="closeDrawer" />
    </Transition>
    <Transition name="preview-slide">
      <div v-if="drawerVisible" class="drawer-container" role="dialog" aria-label="组件预览">
        <div class="drawer-header">
          <span class="drawer-title">组件预览</span>
          <div class="drawer-actions">
            <a :href="demoUrl" target="_blank" class="drawer-link" title="新窗口打开">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button class="drawer-close" type="button" title="关闭" @click="closeDrawer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div class="drawer-content">
          <iframe ref="drawerIframeRef" :src="demoUrl" class="drawer-iframe" frameborder="0" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useData, useRoute } from "vitepress"
import { ref, watch, computed, onMounted, onUnmounted } from "vue"

const route = useRoute()
const { isDark } = useData()

const iframeRef = ref<HTMLIFrameElement | null>(null)
const drawerIframeRef = ref<HTMLIFrameElement | null>(null)

const expanded = ref(true)
const drawerVisible = ref(false)
const isLargeScreen = ref(false)
const isMediumScreen = ref(false)

// 组件名称到 demo 路径的映射（当文档名与 demo 路径不一致时使用）
const demoPathMap: Record<string, string> = {
  "safe-area-top": "safe-area",
  "safe-area-bottom": "safe-area",
  "skeleton-avatar": "skeleton-components",
  "skeleton-image": "skeleton-components",
  "skeleton-paragraph": "skeleton-components",
  "skeleton-title": "skeleton-components",
  grid: "layout",
}

const componentName = computed(() => {
  const match = route.path.match(/\/components\/([^/]+?)(?:\.html)?$/)
  if (!match) return ""
  const name = match[1]
  // 如果存在映射，使用映射后的路径
  return demoPathMap[name] || name
})

const showPreview = computed(() => componentName.value && componentName.value !== "index")

const demoUrl = computed(() => {
  if (!componentName.value) return ""
  const theme = isDark.value ? "dark" : "light"
  // 生产环境使用 /uniapp-ui/h5/，本地开发使用 localhost:9200
  const baseUrl = typeof window !== "undefined" && window.location.hostname !== "localhost" ? `${window.location.origin}/uniapp-ui/h5/#/` : "http://localhost:9200/#/"
  return `${baseUrl}pages/demo/${componentName.value}/index?theme=${theme}`
})

function updateScreen() {
  if (typeof window === "undefined") return
  const width = window.innerWidth
  isLargeScreen.value = width >= 1430
  isMediumScreen.value = width >= 960 && width < 1430
  if (!isMediumScreen.value) {
    closeDrawer()
  }
}

function toggleExpanded() {
  expanded.value = !expanded.value
}

function openDrawer() {
  drawerVisible.value = true
  document.body.style.overflow = "hidden"
}

function closeDrawer() {
  drawerVisible.value = false
  document.body.style.overflow = ""
}

function sendThemeMessage() {
  const theme = isDark.value ? "dark" : "light"
  const message = { type: "theme-change", theme }
  iframeRef.value?.contentWindow?.postMessage(message, "*")
  drawerIframeRef.value?.contentWindow?.postMessage(message, "*")
}

watch(isDark, sendThemeMessage)
watch(drawerIframeRef, (el) => {
  if (el) {
    el.addEventListener("load", sendThemeMessage)
  }
})
watch(
  () => route.path,
  () => {
    expanded.value = true
    closeDrawer()
  },
)

onMounted(() => {
  updateScreen()
  window.addEventListener("resize", updateScreen)
  iframeRef.value?.addEventListener("load", sendThemeMessage)
})

onUnmounted(() => {
  window.removeEventListener("resize", updateScreen)
  document.body.style.overflow = ""
})
</script>

<style scoped>
.preview-container {
  top: calc(var(--vp-nav-height, 64px) + 24px);
  right: 24px;
  width: 360px;
  border: 1px solid var(--vp-c-divider);
  height: calc(360px * 844 / 390);
  z-index: 50;
  overflow: hidden;
  position: fixed;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-3);
  border-radius: 14px;
}

.preview-container.collapsed {
  width: 48px;
  height: 48px;
}

.preview-header {
  height: 44px;
  display: flex;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  justify-content: space-between;
}

.preview-link {
  color: var(--vp-c-text-2);
  display: inline-flex;
  transition: color 0.2s ease;
  align-items: center;
  justify-content: center;
}

.preview-link:hover {
  color: var(--vp-c-brand-1);
}

.preview-toggle {
  color: var(--vp-c-text-2);
  border: none;
  cursor: pointer;
  padding: 4px;
  background: transparent;
  border-radius: 6px;
}

.preview-toggle:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.preview-body {
  height: calc(100% - 44px);
}

.preview-iframe {
  width: 100%;
  border: none;
  height: 100%;
  background: var(--vp-c-bg);
}

.preview-trigger {
  color: var(--vp-c-text-1);
  right: 16px;
  width: 48px;
  border: 1px solid var(--vp-c-divider);
  bottom: 24px;
  cursor: pointer;
  height: 48px;
  display: inline-flex;
  z-index: 50;
  position: fixed;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  align-items: center;
  border-radius: 12px;
  justify-content: center;
}

.preview-trigger:hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-3);
}

.drawer-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  position: fixed;
  background: rgba(0, 0, 0, 0.45);
}

.drawer-container {
  top: 0;
  right: 0;
  width: min(360px, 90vw);
  bottom: 0;
  display: flex;
  z-index: 101;
  position: fixed;
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  flex-direction: column;
}

.drawer-header {
  display: flex;
  padding: 14px 16px;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  justify-content: space-between;
}

.drawer-title {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
}

.drawer-actions {
  gap: 8px;
  display: inline-flex;
  align-items: center;
}

.drawer-link {
  color: var(--vp-c-text-2);
  display: inline-flex;
  transition: color 0.2s ease;
  align-items: center;
  justify-content: center;
}

.drawer-link:hover {
  color: var(--vp-c-brand-1);
}

.drawer-close {
  color: var(--vp-c-text-2);
  border: none;
  cursor: pointer;
  padding: 4px;
  background: transparent;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  border-radius: 6px;
}

.drawer-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.drawer-content {
  flex: 1;
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: center;
}

.drawer-iframe {
  width: 320px;
  border: none;
  height: calc(320px * 844 / 390);
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-2);
  max-height: calc(100vh - 120px);
  border-radius: 14px;
}

.preview-fade-enter-active,
.preview-fade-leave-active {
  transition: opacity 0.2s ease;
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;
}

.preview-slide-enter-active,
.preview-slide-leave-active {
  transition: transform 0.25s ease;
}

.preview-slide-enter-from,
.preview-slide-leave-to {
  transform: translateX(100%);
}
</style>
