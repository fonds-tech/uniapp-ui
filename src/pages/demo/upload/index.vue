<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-upload v-model="fileList1" />
      </demo-block>
    </demo-section>

    <!-- 新增：双向绑定 -->
    <demo-section title="双向绑定">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前文件数: {{ fileList2.length }}</text>
        <demo-block :gap="16">
          <ui-button size="small" @click="addDefaultImage">添加默认图</ui-button>
          <ui-button size="small" @click="fileList2 = []">清空</ui-button>
        </demo-block>
        <ui-upload v-model="fileList2" />
      </demo-block>
    </demo-section>

    <demo-section title="多选上传">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 multiple 开启多选</text>
        <ui-upload v-model="fileList3" multiple />
      </demo-block>
    </demo-section>

    <demo-section title="限制数量">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 max-count 限制最多上传数量</text>
        <ui-upload v-model="fileList4" :max-count="3" multiple />
      </demo-block>
    </demo-section>

    <demo-section title="限制大小">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 max-size 限制文件大小 (最大1MB)</text>
        <ui-upload v-model="fileList5" :max-size="1024 * 1024" @oversize="onOversize" />
      </demo-block>
    </demo-section>

    <!-- 新增：文件类型 -->
    <demo-section title="文件类型">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 accept 限制文件类型</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentAccept = ''">全部</ui-button>
          <ui-button size="small" @click="currentAccept = 'image'">仅图片</ui-button>
          <ui-button size="small" @click="currentAccept = 'video'">仅视频</ui-button>
        </demo-block>
        <ui-upload v-model="fileList6" :accept="currentAccept" />
      </demo-block>
    </demo-section>

    <!-- 新增：拍摄模式 -->
    <demo-section title="拍摄模式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 capture 设置拾取模式</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showCapture(['album', 'camera'])">相册+相机</ui-button>
          <ui-button size="small" @click="showCapture(['camera'])">仅相机</ui-button>
          <ui-button size="small" @click="showCapture(['album'])">仅相册</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="isDisabled" />
          <text class="switch-label">{{ isDisabled ? "已禁用" : "正常" }}</text>
        </demo-block>
        <ui-upload v-model="fileList7" :disabled="isDisabled" />
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏删除按钮 -->
    <demo-section title="隐藏删除按钮">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 deletable 控制删除按钮显示</text>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="currentDeletable" />
          <text class="switch-label">{{ currentDeletable ? "显示删除" : "隐藏删除" }}</text>
        </demo-block>
        <ui-upload v-model="fileList8" :deletable="currentDeletable" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 width/height 设置上传区域大小</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentSize = { width: '160rpx', height: '160rpx' }">默认</ui-button>
          <ui-button size="small" @click="currentSize = { width: '200rpx', height: '200rpx' }">大</ui-button>
          <ui-button size="small" @click="currentSize = { width: '120rpx', height: '120rpx' }">小</ui-button>
        </demo-block>
        <ui-upload v-model="fileList9" :width="currentSize.width" :height="currentSize.height" />
      </demo-block>
    </demo-section>

    <demo-section title="开启预览">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 preview 开启点击预览</text>
        <ui-upload v-model="fileList10" preview />
      </demo-block>
    </demo-section>

    <!-- 新增：预览间距 -->
    <demo-section title="预览间距">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 preview-gap 设置预览图间距</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentPreviewGap = '20rpx'">默认</ui-button>
          <ui-button size="small" @click="currentPreviewGap = '10rpx'">紧凑</ui-button>
          <ui-button size="small" @click="currentPreviewGap = '40rpx'">宽松</ui-button>
        </demo-block>
        <ui-upload v-model="fileList11" :preview-gap="currentPreviewGap" />
      </demo-block>
    </demo-section>

    <!-- 新增：图片显示模式 -->
    <demo-section title="图片显示模式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 image-mode 设置图片裁剪模式</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentImageMode = 'aspectFill'">aspectFill</ui-button>
          <ui-button size="small" @click="currentImageMode = 'aspectFit'">aspectFit</ui-button>
          <ui-button size="small" @click="currentImageMode = 'scaleToFill'">scaleToFill</ui-button>
        </demo-block>
        <ui-upload v-model="fileList12" :image-mode="currentImageMode" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义背景 -->
    <demo-section title="自定义背景">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 background 设置上传区域背景色</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentBackground = ''">默认</ui-button>
          <ui-button size="small" @click="currentBackground = '#e8f4ff'">蓝色</ui-button>
          <ui-button size="small" @click="currentBackground = '#f0fff0'">绿色</ui-button>
        </demo-block>
        <ui-upload v-model="fileList13" :background="currentBackground" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义上传图标 -->
    <demo-section title="自定义上传图标">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 icon/icon-size/icon-color 自定义上传图标</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showUploadIcon('photograph', '56rpx', '#cccccc')">默认</ui-button>
          <ui-button size="small" @click="showUploadIcon('plus', '48rpx', '#1989fa')">加号</ui-button>
          <ui-button size="small" @click="showUploadIcon('camera', '64rpx', '#07c160')">相机</ui-button>
        </demo-block>
        <ui-upload v-model="fileList14" :icon="currentIcon" :icon-size="currentIconSize" :icon-color="currentIconColor" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义预览图标 -->
    <demo-section title="自定义预览图标">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 preview-icon-size/color 自定义删除图标</text>
        <ui-upload v-model="fileList15" preview-icon-size="48rpx" preview-icon-color="#ee0a24" />
      </demo-block>
    </demo-section>

    <!-- 新增：删除前确认 -->
    <demo-section title="删除前确认">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 before-remove 在删除前进行确认</text>
        <ui-upload v-model="fileList16" :before-remove="onBeforeRemove" />
      </demo-block>
    </demo-section>

    <!-- 新增：上传前校验 -->
    <demo-section title="上传前校验">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 before-read 在上传前进行校验</text>
        <ui-upload v-model="fileList17" :before-read="onBeforeRead" />
      </demo-block>
    </demo-section>

    <!-- 新增：上传后处理 -->
    <demo-section title="上传后处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 after-read 在上传后进行处理</text>
        <ui-upload v-model="fileList18" :after-read="onAfterRead" />
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-upload v-model="fileList19" @upload="onUpload" @delete="onDelete" @oversize="onOversizeEvent" />
        <text class="demo-text">{{ eventLog }}</text>
        <view class="event-list">
          <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <text class="event-text">{{ log }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="showCustomClass = true">自定义类名</ui-button>
          <ui-button size="small" @click="showCustomStyle = true">自定义样式</ui-button>
        </demo-block>
        <ui-upload v-if="showCustomClass" v-model="fileList20" custom-class="my-upload" />
        <ui-upload v-if="showCustomStyle" v-model="fileList21" :custom-style="{ borderStyle: 'solid', borderColor: '#1989fa' }" />
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 头像上传 -->
    <demo-section title="综合示例 - 头像上传">
      <demo-block direction="column" align="center" :gap="16">
        <view class="avatar-upload">
          <ui-upload
            v-model="avatarList"
            :max-count="1"
            width="160rpx"
            height="160rpx"
            icon="camera"
            icon-size="48rpx"
            icon-color="#fff"
            background="rgba(0,0,0,0.3)"
            image-mode="aspectFill"
            :custom-style="{ borderRadius: '50%', overflow: 'hidden' }"
            preview
          />
        </view>
        <text class="demo-text">点击上传头像</text>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 证件上传 -->
    <demo-section title="综合示例 - 证件上传">
      <demo-block direction="column" :gap="24">
        <view class="id-card-box">
          <view class="id-card-item">
            <text class="id-card-label">身份证正面</text>
            <ui-upload v-model="idCardFront" :max-count="1" width="300rpx" height="200rpx" icon="photograph" icon-size="48rpx" background="#f7f8fa" preview />
          </view>
          <view class="id-card-item">
            <text class="id-card-label">身份证反面</text>
            <ui-upload v-model="idCardBack" :max-count="1" width="300rpx" height="200rpx" icon="photograph" icon-size="48rpx" background="#f7f8fa" preview />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 商品图片上传 -->
    <demo-section title="综合示例 - 商品图片上传">
      <demo-block direction="column" :gap="16">
        <view class="product-upload-header">
          <text class="product-upload-title">商品图片</text>
          <text class="product-upload-tip">最多上传5张，第一张为主图</text>
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
          icon-size="40rpx"
          icon-color="#999"
          background="#f7f8fa"
          :before-remove="onProductRemove"
        />
        <text v-if="productImages.length > 0" class="demo-text"> 已上传 {{ productImages.length }}/5 张 </text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Upload 上传" },
})

const toast = useToast()

// 基础文件列表
const fileList1 = ref<string[]>([])
const fileList2 = ref<string[]>([])
const fileList3 = ref<string[]>([])
const fileList4 = ref<string[]>([])
const fileList5 = ref<string[]>([])
const fileList6 = ref<string[]>([])
const fileList7 = ref<string[]>(["https://picsum.photos/200"])
const fileList8 = ref<string[]>(["https://picsum.photos/200?random=1"])
const fileList9 = ref<string[]>([])
const fileList10 = ref<string[]>(["https://picsum.photos/200?random=2"])
const fileList11 = ref<string[]>(["https://picsum.photos/200?random=3", "https://picsum.photos/200?random=4"])
const fileList12 = ref<string[]>(["https://picsum.photos/200?random=5"])
const fileList13 = ref<string[]>([])
const fileList14 = ref<string[]>([])
const fileList15 = ref<string[]>(["https://picsum.photos/200?random=6"])
const fileList16 = ref<string[]>(["https://picsum.photos/200?random=7"])
const fileList17 = ref<string[]>([])
const fileList18 = ref<string[]>([])
const fileList19 = ref<string[]>([])
const fileList20 = ref<string[]>([])
const fileList21 = ref<string[]>([])

// 综合示例
const avatarList = ref<string[]>([])
const idCardFront = ref<string[]>([])
const idCardBack = ref<string[]>([])
const productImages = ref<string[]>([])

// 配置项
const currentAccept = ref<UniApp.ChooseMessageFileOption["type"] | "media" | "">("")
const currentCapture = ref<string[]>(["album", "camera"])
const isDisabled = ref(false)
const currentDeletable = ref(true)
const currentSize = ref({ width: "160rpx", height: "160rpx" })
const currentPreviewGap = ref("20rpx")
const currentImageMode = ref<UniHelper.ImageProps["mode"]>("aspectFill")
const currentBackground = ref("")
const currentIcon = ref("photograph")
const currentIconSize = ref("56rpx")
const currentIconColor = ref("#cccccc")

// 自定义样式
const showCustomClass = ref(false)
const showCustomStyle = ref(false)

// 事件日志
const eventLog = ref("操作上传组件查看事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

// 添加默认图片
function addDefaultImage() {
  fileList2.value.push(`https://picsum.photos/200?random=${Date.now()}`)
}

// 设置拍摄模式
function showCapture(capture: string[]) {
  currentCapture.value = capture
  toast.text(`拍摄模式: ${capture.join(", ")}`)
}

// 设置上传图标
function showUploadIcon(icon: string, size: string, color: string) {
  currentIcon.value = icon
  currentIconSize.value = size
  currentIconColor.value = color
}

// 文件超过大小限制
function onOversize() {
  toast.fail("文件大小超过1MB限制")
}

// 删除前确认
function onBeforeRemove(): Promise<boolean> {
  return new Promise((resolve) => {
    uni.showModal({
      title: "提示",
      content: "确定要删除这张图片吗？",
      success: (res) => {
        if (res.confirm) {
          toast.success("删除成功")
          resolve(true)
        } else {
          resolve(false)
        }
      },
    })
  })
}

// 上传前校验
function onBeforeRead(file: any): Promise<boolean> {
  return new Promise((resolve) => {
    toast.loading("正在校验文件...")
    setTimeout(() => {
      // 模拟校验逻辑
      if (file && file.size && file.size > 5 * 1024 * 1024) {
        toast.fail("文件不能超过5MB")
        resolve(false)
      } else {
        toast.success("校验通过")
        resolve(true)
      }
    }, 500)
  })
}

// 上传后处理
function onAfterRead(file: any) {
  toast.text("文件已读取，可以进行上传处理")
  console.log("After read:", file)
}

// 事件处理
function onUpload(event: { files: any }) {
  addEventLog(`触发 upload 事件，文件数: ${event.files?.length || 1}`)
}

function onDelete(event: { index: number; file: any }) {
  addEventLog(`触发 delete 事件，索引: ${event.index}`)
}

function onOversizeEvent(files: any[]) {
  addEventLog(`触发 oversize 事件，文件数: ${files.length}`)
  toast.fail("文件大小超过限制")
}

// 商品图片删除确认
function onProductRemove(): Promise<boolean> {
  return new Promise((resolve) => {
    uni.showModal({
      title: "删除图片",
      content: "确定要删除这张商品图片吗？",
      success: (res) => {
        resolve(res.confirm)
      },
    })
  })
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.switch-label {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
}

.event-list {
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  max-height: 250rpx;
  overflow-y: auto;
  border-radius: 8rpx;
}

.event-item {
  padding: 8rpx 0;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}

.avatar-upload {
  display: flex;
  justify-content: center;
}

.id-card-box {
  gap: 32rpx;
  display: flex;
  justify-content: center;
}

.id-card-item {
  gap: 16rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.id-card-label {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
}

.product-upload-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-upload-title {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
  font-weight: 600;
}

.product-upload-tip {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

:deep(.my-upload) {
  border: 4rpx dashed #1989fa !important;
  border-radius: 16rpx;
}
</style>
