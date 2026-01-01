<template>
  <view :id="stickyId" class="ui-sticky" :style="[rootStyle]">
    <view :id="bodyId" class="ui-sticky__body" :style="[bodyStyle]" :class="[customClass]">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useRect, useColor, useStyle, useUnitToPx } from "../hooks"
import { stickyEmits, stickyProps, useStickyProps } from "./index"

defineOptions({ name: "ui-sticky" })

const props = defineProps(stickyProps)
const emits = defineEmits(stickyEmits)
const useProps = useStickyProps(props)
// Unique id for selector query
const uid = Math.random().toString(36).slice(2, 10)
const stickyId = `sticky-${uid}`
const bodyId = `sticky-body-${uid}`

// Reactive state
const isFixed = ref(false)
const contentHeight = ref(0)
const contentWidth = ref(0)
const navbarHeight = ref(0)
const instance = getCurrentInstance()!

// Throttle timer
let scrollTimer: ReturnType<typeof setTimeout> | null = null

// Computed offset top in px
const offsetTopPx = computed(() => useUnitToPx(useProps.offsetTop))

// Root container style - maintains layout space when fixed
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.zIndex) {
    style.zIndex = useProps.zIndex
  }
  // Reserve space when fixed to prevent layout jump
  if (isFixed.value && contentHeight.value > 0) {
    style.height = `${contentHeight.value}px`
  }
  return useStyle(style)
})

// Body style - applies fixed positioning
const bodyStyle = computed(() => {
  const style: CSSProperties = {}

  if (isFixed.value) {
    style.position = "fixed"
    style.top = `${offsetTopPx.value + navbarHeight.value}px`
    style.left = "0"
    style.right = "0"
    style.zIndex = useProps.zIndex || 99
  }

  if (useProps.background) {
    style.background = useColor(useProps.background)
  }

  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// Watch fixed state change
watch(
  () => isFixed.value,
  (val, oldVal) => {
    if (val !== oldVal) {
      emits("change", val)
    }
  },
)

// Watch external scrollTop prop
watch(
  () => useProps.scrollTop,
  (val) => {
    if (val !== undefined && !useProps.disabled) {
      checkStickyState()
    }
  },
)

// Get body element rect
async function getBodyRect(): Promise<UniApp.NodeInfo | null> {
  return new Promise((resolve) => {
    useRect(`#${bodyId}`, instance)
      .then((rect) => resolve(rect))
      .catch(() => resolve(null))
  })
}

// Get container element rect
async function getContainerRect(): Promise<UniApp.NodeInfo | null> {
  return new Promise((resolve) => {
    useRect(`#${stickyId}`, instance)
      .then((rect) => resolve(rect))
      .catch(() => resolve(null))
  })
}

// Update content size
async function updateContentSize() {
  const rect = await getBodyRect()
  if (rect) {
    contentHeight.value = rect.height || 0
    contentWidth.value = rect.width || 0
  }
}

// Check sticky state based on element position
async function checkStickyState() {
  if (useProps.disabled) {
    if (isFixed.value) {
      isFixed.value = false
    }
    return
  }

  const rect = await getContainerRect()
  if (!rect) return

  // Calculate threshold considering navbar height
  const threshold = offsetTopPx.value + navbarHeight.value

  // When element top goes above threshold, fix it
  const shouldFix = rect.top <= threshold

  if (shouldFix !== isFixed.value) {
    isFixed.value = shouldFix
  }

  // Emit scroll event with current state
  emits("scroll", {
    scrollTop: useProps.scrollTop !== undefined ? Number(useProps.scrollTop) : -rect.top,
    isFixed: isFixed.value,
  })
}

// Throttled scroll handler
function onScroll() {
  if (useProps.disabled) return

  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  scrollTimer = setTimeout(() => {
    checkStickyState()
    scrollTimer = null
  }, 16) // ~60fps
}

// Initialize navbar height for H5
async function initNavbarHeight() {
  await nextTick()
  // #ifdef H5
  const head = document.querySelector(".uni-page-head") as HTMLElement | null
  if (head) {
    navbarHeight.value = head.offsetHeight
  }
  // #endif
}

// Reset and recalculate
async function resize() {
  await nextTick()
  await initNavbarHeight()
  await updateContentSize()
  checkStickyState()
}

// Initialize component
async function init() {
  await nextTick()
  await initNavbarHeight()
  await updateContentSize()
  // Check initial state
  checkStickyState()
}

onMounted(() => {
  init()
})

onPageScroll(onScroll)

onUnmounted(() => {
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
})

defineExpose({
  name: "ui-sticky",
  resize,
  isFixed: () => isFixed.value,
})
</script>

<script lang="ts">
export default {
  name: "ui-sticky",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-sticky {
  width: 100%;
  position: relative;

  &__body {
    width: 100%;
  }
}
</style>
