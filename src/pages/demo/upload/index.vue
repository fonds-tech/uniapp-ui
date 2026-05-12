<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-upload v-model="basicList" />
    </demo-section>

    <demo-section title="多选 + 数量上限" desc="multiple + max-count">
      <ui-upload v-model="multiList" multiple :max-count="5" />
    </demo-section>

    <demo-section title="大小限制" desc="max-size 单文件 1MB；超限触发 oversize">
      <demo-block direction="column" :gap="12">
        <ui-upload v-model="sizeList" :max-size="1024 * 1024" @oversize="onOversize" />
        <text class="event-log">{{ sizeLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="文件类型 accept" desc="切换 image / video / 默认">
      <demo-block direction="column" :gap="16">
        <ui-upload v-model="acceptList" :accept="acceptDemo" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="a in acceptPresets" :key="a.value" size="small" :type="acceptDemo === a.value ? 'primary' : 'default'" @click="acceptDemo = a.value">
            {{ a.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="禁用 disabled">
      <ui-upload v-model="disabledList" disabled />
    </demo-section>

    <demo-section title="隐藏删除按钮 deletable=false">
      <ui-upload v-model="noDeleteList" :deletable="false" />
    </demo-section>

    <demo-section title="尺寸 width / height">
      <demo-block direction="column" :gap="16">
        <ui-upload v-model="sizeWHList" :width="sizeDemo" :height="sizeDemo" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in sizePresets" :key="s" size="small" :type="sizeDemo === s ? 'primary' : 'default'" @click="sizeDemo = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="预览 preview" desc="点击图片预览大图">
      <ui-upload v-model="previewList" preview />
    </demo-section>

    <demo-section title="预览间距 previewGap">
      <demo-block direction="column" :gap="16">
        <ui-upload v-model="gapList" :preview-gap="gapDemo" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="g in gapPresets" :key="g" size="small" :type="gapDemo === g ? 'primary' : 'default'" @click="gapDemo = g">
            {{ g }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="图片显示模式 imageMode">
      <demo-block direction="column" :gap="16">
        <ui-upload v-model="modeList" :image-mode="modeDemo" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="m in modePresets" :key="m" size="small" :type="modeDemo === m ? 'primary' : 'default'" @click="modeDemo = m">
            {{ m }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="背景色 background">
      <demo-block direction="column" :gap="16">
        <ui-upload v-model="bgList" :background="bgDemo" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="b in bgPresets" :key="b.value" size="small" :type="bgDemo === b.value ? 'primary' : 'default'" @click="bgDemo = b.value">
            {{ b.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义上传图标 icon">
      <demo-block direction="column" :gap="16">
        <ui-upload v-model="iconList" :icon="iconDemo" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="i in iconPresets" :key="i" size="small" :type="iconDemo === i ? 'primary' : 'default'" @click="iconDemo = i">
            {{ i }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="删除前确认 beforeRemove">
      <ui-upload v-model="confirmList" :before-remove="onBeforeRemove" />
    </demo-section>

    <demo-section title="上传前校验 beforeRead">
      <ui-upload v-model="validateList" :before-read="onBeforeRead" />
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" :gap="12">
        <ui-upload v-model="eventList" :max-size="1024 * 1024" @delete="onDelete" @oversize="onOversizeEvent" />
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 头像上传" desc="圆形 + 单图 + 相机">
      <view class="avatar-wrap">
        <view class="avatar-clip">
          <ui-upload
            v-model="avatarList"
            :max-count="1"
            width="160rpx"
            height="160rpx"
            icon="photograph"
            icon-color="text-inverse"
            background="rgba(0, 0, 0, 0.3)"
            image-mode="aspectFill"
            preview
          />
        </view>
      </view>
    </demo-section>

    <demo-section title="综合 · 证件上传" desc="正反面 + 长方形">
      <demo-block :cols="2" :gap="16">
        <view class="id-card">
          <text class="id-card__label">身份证正面</text>
          <ui-upload v-model="idCardFront" :max-count="1" width="280rpx" height="180rpx" background="background-section" preview />
        </view>
        <view class="id-card">
          <text class="id-card__label">身份证反面</text>
          <ui-upload v-model="idCardBack" :max-count="1" width="280rpx" height="180rpx" background="background-section" preview />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 商品图片" desc="多图 + 主图标识">
      <demo-block direction="column" :gap="12">
        <view class="product-hdr">
          <text class="product-hdr__title">商品图片</text>
          <text class="product-hdr__tip">最多 5 张，第 1 张为主图</text>
        </view>
        <ui-upload
          v-model="productImages"
          :max-count="5"
          multiple
          preview
          preview-gap="16rpx"
          width="140rpx"
          height="140rpx"
          icon="plus"
          background="background-section"
        />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { UploadFile, UploadAccept } from "@/uni_modules/uniapp-ui/ui-upload"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Upload 上传" },
})

const basicList = ref<string[]>([])
const multiList = ref<string[]>([])
const sizeList = ref<string[]>([])
const acceptList = ref<string[]>([])
const disabledList = ref<string[]>(["https://picsum.photos/200"])
const noDeleteList = ref<string[]>(["https://picsum.photos/200?random=1"])
const sizeWHList = ref<string[]>([])
const previewList = ref<string[]>(["https://picsum.photos/200?random=2"])
const gapList = ref<string[]>(["https://picsum.photos/200?random=3", "https://picsum.photos/200?random=4"])
const modeList = ref<string[]>(["https://picsum.photos/200?random=5"])
const bgList = ref<string[]>([])
const iconList = ref<string[]>([])
const confirmList = ref<string[]>(["https://picsum.photos/200?random=6"])
const validateList = ref<string[]>([])
const eventList = ref<string[]>([])
const avatarList = ref<string[]>([])
const idCardFront = ref<string[]>([])
const idCardBack = ref<string[]>([])
const productImages = ref<string[]>([])

const acceptPresets: { label: string; value: UploadAccept }[] = [
  { label: "默认", value: "" },
  { label: "image", value: "image" },
  { label: "video", value: "video" },
]
const acceptDemo = ref<UploadAccept>("")

const sizePresets = ["120rpx", "160rpx", "200rpx"]
const sizeDemo = ref("160rpx")

const gapPresets = ["10rpx", "20rpx", "40rpx"]
const gapDemo = ref("20rpx")

const modePresets = ["aspectFill", "aspectFit", "scaleToFill"]
const modeDemo = ref<UniHelper.ImageProps["mode"]>("aspectFill")

const bgPresets = [
  { label: "默认", value: "" },
  { label: "区块", value: "background-section" },
  { label: "主色", value: "primary" },
]
const bgDemo = ref("")

const iconPresets = ["photograph", "plus", "photo"]
const iconDemo = ref("photograph")

const sizeLog = ref("超大文件会被拦截")
function onOversize(files: UploadFile[]) {
  sizeLog.value = `[oversize] 拦截 ${files.length} 个超大文件`
}

const eventLog = ref("等待事件...")
function onDelete(event: { index: number; file: UploadFile }) {
  eventLog.value = `[delete] index=${event.index}`
}
function onOversizeEvent(files: UploadFile[]) {
  eventLog.value = `[oversize] ${files.length} 个超大`
}

function onBeforeRemove(): Promise<boolean> {
  return new Promise((resolve) => {
    uni.showModal({
      title: "提示",
      content: "确定删除这张图片？",
      success: (res) => resolve(res.confirm),
    })
  })
}

function onBeforeRead(files: UploadFile[]): UploadFile[] | false {
  const valid = files.filter((f) => !f.size || f.size <= 5 * 1024 * 1024)
  if (valid.length === 0) {
    uni.showToast({ title: "全部文件超过 5MB", icon: "none" })
    return false
  }
  return valid
}
</script>

<style lang="scss" scoped>
.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.avatar-wrap {
  display: flex;
  justify-content: center;
}

.avatar-clip {
  width: 160rpx;
  height: 160rpx;
  overflow: hidden;
  border-radius: 50%;
}

.id-card {
  gap: var(--ui-spacing-sm);
  display: flex;
  align-items: center;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.product-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__tip {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
