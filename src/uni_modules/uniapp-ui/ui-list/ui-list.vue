<template>
  <scroll-view class="ui-list" :class="[props.customClass]" :style="[rootStyle]" scroll-y :scroll-top="scrollTop" :lower-threshold="props.offset" @scrolltolower="check">
    <slot />
    <view v-if="showPlaceholder" class="ui-list__placeholder">
      <view v-if="props.loading" class="ui-list__loading">
        <slot name="loading">
          <ui-loading size="36rpx" />
          <text class="ui-list__loading-text">{{ props.loadingText }}</text>
        </slot>
      </view>
      <view v-else-if="props.finished" class="ui-list__finished">
        <slot name="finished">
          <text class="ui-list__finished-text">{{ props.finishedText }}</text>
        </slot>
      </view>
      <view v-else-if="props.error" class="ui-list__error" @click="onErrorClick">
        <slot name="error">
          <text class="ui-list__error-text">{{ props.errorText }}</text>
        </slot>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { useStyle } from "../hooks"
import { listEmits, listProps } from "./index"
import { ref, watch, computed, nextTick, onMounted } from "vue"

defineOptions({ name: "ui-list" })

const props = defineProps(listProps)
const emits = defineEmits(listEmits)

const scrollTop = ref(0)

const rootStyle = computed(() => useStyle(props.customStyle))
const showPlaceholder = computed(() => props.loading || props.finished || props.error)

watch(
  () => props.loading,
  (val, old) => {
    // loading 由 true 转 false 后，列表可能仍未填满可视区，重新检查触发下一页
    if (old && !val && !props.finished && !props.error) nextTick(check)
  },
)

function check() {
  if (props.loading || props.finished || props.error) return
  emits("update:loading", true)
  emits("load")
}

function onErrorClick() {
  emits("update:error", false)
  check()
}

function scrollTo(top: number) {
  scrollTop.value = top
}

onMounted(() => {
  if (props.immediateCheck) nextTick(check)
})

defineExpose({ check, scrollTo })
</script>

<script lang="ts">
export default {
  name: "ui-list",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-list {
  width: 100%;
  height: 100%;

  &__placeholder {
    width: 100%;
  }

  &__loading,
  &__finished,
  &__error {
    display: flex;
    padding: var(--ui-spacing-md) 0;
    align-items: center;
    justify-content: center;
  }

  &__loading-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
    margin-left: var(--ui-spacing-sm);
  }

  &__finished-text {
    color: var(--ui-color-text-placeholder);
    font-size: var(--ui-font-size-sm);
  }

  &__error-text {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
