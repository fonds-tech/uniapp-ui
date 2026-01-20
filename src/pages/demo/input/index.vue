<template>
  <demo-page padding-x="0">
    <demo-section title="基础用法" :card="false">
      <ui-cell-group>
        <ui-cell title="文本">
          <ui-input v-model="value1" placeholder="请输入内容" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="输入类型" :card="false">
      <ui-cell-group>
        <ui-cell title="文本">
          <ui-input v-model="value2" type="text" placeholder="请输入文本" />
        </ui-cell>
        <ui-cell title="数字">
          <ui-input v-model="value3" type="number" placeholder="请输入数字" />
        </ui-cell>
        <ui-cell title="小数">
          <ui-input v-model="value4" type="digit" placeholder="请输入小数" />
        </ui-cell>
        <ui-cell title="密码">
          <ui-input v-model="value5" type="password" placeholder="请输入密码" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="禁用与只读" :card="false">
      <ui-cell-group>
        <ui-cell title="禁用">
          <ui-input model-value="禁用状态" disabled />
        </ui-cell>
        <ui-cell title="只读">
          <ui-input model-value="只读状态" readonly />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="清除按钮" :card="false">
      <ui-cell-group>
        <ui-cell title="可清除">
          <ui-input v-model="value6" clearable placeholder="点击清除" @clear="onClear" />
        </ui-cell>
        <ui-cell title="自定义图标">
          <ui-input v-model="value7" clearable clear-icon="close" clear-icon-size="28rpx" clear-icon-color="#fff" clear-icon-background="#1989fa" placeholder="自定义清除图标" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="对齐方式" :card="false">
      <ui-cell-group>
        <ui-cell title="左对齐">
          <ui-input v-model="value8" input-align="left" placeholder="左对齐" />
        </ui-cell>
        <ui-cell title="居中">
          <ui-input v-model="value9" input-align="center" placeholder="居中对齐" />
        </ui-cell>
        <ui-cell title="右对齐">
          <ui-input v-model="value10" input-align="right" placeholder="右对齐" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="自定义样式" :card="false">
      <ui-cell-group>
        <ui-cell title="字体颜色">
          <ui-input v-model="valueColor" color="#1989fa" placeholder="蓝色字体" />
        </ui-cell>
        <ui-cell title="占位符颜色">
          <ui-input v-model="valuePlaceholder" placeholder-color="#ee0a24" placeholder="红色占位符" />
        </ui-cell>
        <ui-cell title="光标颜色">
          <ui-input v-model="valueCursor" cursor-color="#07c160" placeholder="绿色光标" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="前缀后缀" :card="false">
      <ui-cell-group>
        <ui-cell title="前缀图标">
          <ui-input v-model="valuePrefix" prefix-icon="search" placeholder="搜索内容" />
        </ui-cell>
        <ui-cell title="后缀图标">
          <ui-input v-model="valueSuffix" suffix-icon="scan" placeholder="扫描输入" />
        </ui-cell>
        <ui-cell title="前后缀插槽">
          <ui-input v-model="valueSlot" placeholder="金额">
            <template #prefix>
              <text class="prefix-text">¥</text>
            </template>
            <template #suffix>
              <text class="suffix-text">元</text>
            </template>
          </ui-input>
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="边框样式" :card="false">
      <ui-cell-group>
        <ui-cell title="默认边框">
          <ui-input v-model="valueBorder1" border="1px solid #ebedf0" radius="8rpx" padding="16rpx" placeholder="带边框输入框" />
        </ui-cell>
        <ui-cell title="圆角边框">
          <ui-input v-model="valueBorder2" border="1px solid #1989fa" radius="999rpx" padding="16rpx" placeholder="圆角边框" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="限制与键盘" :card="false">
      <ui-cell-group>
        <ui-cell title="最大长度">
          <ui-input v-model="valueMaxlength" :maxlength="10" placeholder="最多10个字符" />
        </ui-cell>
        <ui-cell title="搜索键盘">
          <ui-input v-model="valueConfirm" confirm-type="search" placeholder="按回车搜索" @confirm="onConfirm" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Input 输入框" },
})

const toast = useToast()

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("可以清除的内容")
const value7 = ref("清除图标示例")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const valueColor = ref("蓝色文字")
const valuePlaceholder = ref("")
const valueCursor = ref("")
const valuePrefix = ref("")
const valueSuffix = ref("")
const valueSlot = ref("")
const valueBorder1 = ref("")
const valueBorder2 = ref("")
const valueMaxlength = ref("")
const valueConfirm = ref("")

function onClear() {
  toast.text("已清除内容")
}

function onConfirm(value: string) {
  toast.success(`搜索: ${value}`)
}
</script>

<style lang="scss" scoped>
.prefix-text,
.suffix-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-sm);
}
</style>
