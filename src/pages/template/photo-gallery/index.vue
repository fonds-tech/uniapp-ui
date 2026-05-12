<template>
  <view class="page">
    <view class="head">
      <view class="head__row">
        <text class="head__title">我的相册</text>
        <text class="head__count">共 {{ photos.length }} 张</text>
      </view>
      <ui-tabs v-model="album" type="card">
        <ui-tab v-for="a in albums" :key="a.value" :name="a.value" :title="a.label" />
      </ui-tabs>
    </view>

    <view class="upload-zone">
      <text class="upload-zone__hint">添加照片</text>
      <ui-upload v-model="newPhotos" multiple :max-count="9" :preview-gap="12" @oversize="onOversize" />
    </view>

    <view class="photos">
      <ui-grid :column="3" :gap="8" :border="false">
        <ui-grid-item v-for="(p, idx) in filteredPhotos" :key="idx" @click="onPreview(idx)">
          <view class="photo">
            <ui-image :src="p.url" width="100%" height="220rpx" mode="aspectFill" radius="12rpx" />
            <ui-watermark :content="watermarkText" :font-size="12" :gap-x="20" :gap-y="20" :full-page="false" font-color="rgba(255,255,255,0.5)" />
            <view class="photo__like" @click.stop="p.liked = !p.liked">
              <ui-icon name="like" size="32rpx" :color="p.liked ? 'danger' : 'text-inverse'" />
            </view>
          </view>
        </ui-grid-item>
      </ui-grid>
    </view>

    <ui-action-sheet v-model:show="showActions" title="操作" :actions="actions" @select="onSelectAction" />

    <ui-popup v-model:show="showPoster" position="center" round>
      <view class="poster-wrap">
        <ui-poster ref="posterRef" :options="posterOptions" :width="600" :height="900" />
        <ui-button block type="primary" :custom-style="{ marginTop: 'var(--ui-spacing-md)' }" @click="onDownload">保存到相册</ui-button>
      </view>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useToast, useDialog } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "相册管理" },
})

const toast = useToast()
const dialog = useDialog()

const albums = [
  { label: "全部", value: "all" },
  { label: "旅行", value: "travel" },
  { label: "美食", value: "food" },
  { label: "人物", value: "people" },
]
const album = ref("all")

const newPhotos = ref<string[]>([])

const photos = ref([
  { id: 1, url: "https://picsum.photos/400/400?random=91", album: "travel", liked: true },
  { id: 2, url: "https://picsum.photos/400/400?random=92", album: "food", liked: false },
  { id: 3, url: "https://picsum.photos/400/400?random=93", album: "people", liked: false },
  { id: 4, url: "https://picsum.photos/400/400?random=94", album: "travel", liked: true },
  { id: 5, url: "https://picsum.photos/400/400?random=95", album: "food", liked: false },
  { id: 6, url: "https://picsum.photos/400/400?random=96", album: "people", liked: true },
  { id: 7, url: "https://picsum.photos/400/400?random=97", album: "travel", liked: false },
  { id: 8, url: "https://picsum.photos/400/400?random=98", album: "food", liked: false },
  { id: 9, url: "https://picsum.photos/400/400?random=99", album: "people", liked: true },
])

const filteredPhotos = computed(() => (album.value === "all" ? photos.value : photos.value.filter((p) => p.album === album.value)))
const watermarkText = ref("uniapp-ui")

const showActions = ref(false)
const showPoster = ref(false)
const currentIdx = ref(0)

const actions = [
  { name: "查看大图" },
  { name: "生成分享海报" },
  { name: "删除照片", color: "var(--ui-color-danger)" },
]

const posterOptions = computed(() => [
  { type: "image" as const, x: 0, y: 0, width: 600, height: 600, src: photos.value[currentIdx.value]?.url || "" },
  { type: "text" as const, x: 30, y: 640, text: "我的精彩瞬间", fontSize: 36, fontWeight: "bold" },
  { type: "text" as const, x: 30, y: 700, text: "由 uniapp-ui 生成", fontSize: 22, color: "#888888" },
])

function onPreview(idx: number) {
  currentIdx.value = idx
  showActions.value = true
}

async function onSelectAction(action: { name: string }) {
  if (action.name === "查看大图") {
    uni.previewImage({ urls: filteredPhotos.value.map((p) => p.url), current: filteredPhotos.value[currentIdx.value].url })
  } else if (action.name === "生成分享海报") {
    showPoster.value = true
  } else if (action.name === "删除照片") {
    const ok = await dialog.confirm({ title: "删除照片", content: "确认删除这张照片？" })
    if (!ok) return
    const id = filteredPhotos.value[currentIdx.value].id
    photos.value = photos.value.filter((p) => p.id !== id)
    toast.success("已删除")
  }
}

function onOversize() {
  toast.fail("文件过大")
}

function onDownload() {
  toast.success("已保存")
  showPoster.value = false
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.head {
  padding: var(--ui-spacing-lg) var(--ui-spacing-md);
  background: var(--ui-color-background);

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__count {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.upload-zone {
  margin: var(--ui-spacing-md);
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);

  &__hint {
    color: var(--ui-color-text-secondary);
    display: block;
    font-size: var(--ui-font-size-sm);
    margin-bottom: var(--ui-spacing-sm);
  }
}

.photos {
  padding: var(--ui-spacing-md);
}

.photo {
  overflow: hidden;
  position: relative;
  border-radius: var(--ui-radius-md);

  &__like {
    right: var(--ui-spacing-xs);
    width: 56rpx;
    bottom: var(--ui-spacing-xs);
    height: 56rpx;
    display: flex;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }
}

.poster-wrap {
  width: 600rpx;
  padding: var(--ui-spacing-lg);
}
</style>
