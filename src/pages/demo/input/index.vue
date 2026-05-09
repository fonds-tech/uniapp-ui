<template>
  <demo-page padding-x="0">
    <demo-section title="基础用法" :card="false">
      <ui-cell-group>
        <ui-cell title="文本">
          <ui-input v-model="state.basic" placeholder="请输入内容" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="输入类型 (type)" :card="false">
      <demo-block :cols="3" :gap="12" custom-style="padding: 0 24rpx 16rpx">
        <ui-button v-for="t in types" :key="t" size="small" :type="state.type === t ? 'primary' : 'default'" @click="state.type = t">{{ t }}</ui-button>
      </demo-block>
      <ui-cell-group>
        <ui-cell :title="`type=${state.type}`">
          <ui-input v-model="state.typed" :type="state.type" :placeholder="`输入 ${state.type}`" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="对齐方式 (inputAlign)" :card="false">
      <demo-block :cols="3" :gap="12" custom-style="padding: 0 24rpx 16rpx">
        <ui-button v-for="a in aligns" :key="a" size="small" :type="state.align === a ? 'primary' : 'default'" @click="state.align = a">{{ a }}</ui-button>
      </demo-block>
      <ui-cell-group>
        <ui-cell :title="state.align">
          <ui-input v-model="state.aligned" :input-align="state.align" placeholder="对齐方式" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="状态" :card="false">
      <ui-cell-group>
        <ui-cell title="禁用">
          <ui-input model-value="禁用状态" disabled />
        </ui-cell>
        <ui-cell title="只读">
          <ui-input model-value="只读状态" readonly />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="清除按钮 (clearable)" :card="false">
      <ui-cell-group>
        <ui-cell title="默认">
          <ui-input v-model="state.clear1" placeholder="聚焦时显示清除" @clear="onClear" />
        </ui-cell>
        <ui-cell title="自定义图标">
          <ui-input v-model="state.clear2" clear-icon="close-fill" clear-icon-size="32rpx" clear-icon-color="#1989fa" placeholder="蓝色清除图标" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="前缀 / 后缀" :card="false">
      <ui-cell-group>
        <ui-cell title="prefix-icon">
          <ui-input v-model="state.prefix" prefix-icon="search" placeholder="搜索内容" />
        </ui-cell>
        <ui-cell title="suffix-icon">
          <ui-input v-model="state.suffix" suffix-icon="scan" placeholder="扫描输入" />
        </ui-cell>
        <ui-cell title="插槽">
          <ui-input v-model="state.amount" type="digit" placeholder="0.00">
            <template #prefix>
              <text class="affix">¥</text>
            </template>
            <template #suffix>
              <text class="affix">元</text>
            </template>
          </ui-input>
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="自定义颜色" :card="false">
      <ui-cell-group>
        <ui-cell title="字体颜色">
          <ui-input v-model="state.color" color="#1989fa" placeholder="蓝色字体" />
        </ui-cell>
        <ui-cell title="占位符颜色">
          <ui-input v-model="state.placeholderColor" placeholder-color="#ee0a24" placeholder="红色占位符" />
        </ui-cell>
        <ui-cell title="光标颜色">
          <ui-input v-model="state.cursor" cursor-color="#07c160" placeholder="绿色光标" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="限制 / 键盘" :card="false">
      <ui-cell-group>
        <ui-cell title="最大长度 10">
          <ui-input v-model="state.max" :maxlength="10" placeholder="最多 10 字符" />
        </ui-cell>
        <ui-cell title="搜索键盘">
          <ui-input v-model="state.search" confirm-type="search" placeholder="按回车搜索" @confirm="onConfirm" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="事件 (focus / blur / confirm / clear / click)" :card="false">
      <ui-cell-group>
        <ui-cell title="操作">
          <ui-input
            v-model="state.event"
            placeholder="操作并查看日志"
            @focus="log('focus')"
            @blur="log('blur')"
            @confirm="log('confirm')"
            @clear="log('clear')"
            @click="log('click')"
          />
        </ui-cell>
        <ui-cell :title="eventLog" />
      </ui-cell-group>
    </demo-section>

    <demo-section title="场景：登录表单" desc="form 级 disabled 自动透传到 input" :card="false">
      <ui-form ref="loginForm" :model="login" :rules="loginRules" label-width="120rpx" :disabled="formDisabled">
        <ui-form-item label="账号" prop="account">
          <ui-input v-model="login.account" prefix-icon="user" placeholder="请输入账号" />
        </ui-form-item>
        <ui-form-item label="密码" prop="password">
          <ui-input v-model="login.password" type="password" prefix-icon="lock" placeholder="请输入密码" />
        </ui-form-item>
      </ui-form>
      <demo-block :gap="12" custom-style="padding: 16rpx 24rpx">
        <ui-button size="small" @click="formDisabled = !formDisabled">{{ formDisabled ? "解除禁用" : "form 级禁用" }}</ui-button>
        <ui-button size="small" type="primary" @click="onLogin">登录</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="场景：搜索栏" desc="圆角 + prefix + clearable" :card="false">
      <view class="search-wrap">
        <ui-input
          v-model="state.searchBar"
          prefix-icon="search"
          radius="999rpx"
          padding="16rpx 24rpx"
          background="#f5f5f5"
          confirm-type="search"
          placeholder="搜索商品 / 店铺 / 用户"
          @confirm="onConfirm"
        />
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Input 输入框" },
})

const toast = useToast()

const types = ["text", "number", "digit", "idcard", "tel", "password"] as const
const aligns = ["left", "center", "right"] as const

const state = reactive({
  basic: "",
  typed: "",
  type: "text" as (typeof types)[number],
  aligned: "",
  align: "left" as (typeof aligns)[number],
  clear1: "可以清除的内容",
  clear2: "",
  prefix: "",
  suffix: "",
  amount: "",
  color: "蓝色文字",
  placeholderColor: "",
  cursor: "",
  max: "",
  search: "",
  event: "",
  searchBar: "",
})

const eventLog = ref("操作输入框查看事件")
const formDisabled = ref(false)

const loginForm = ref<FormInstance>()
const login = reactive({ account: "", password: "" })
const loginRules: FormRules = {
  account: [{ required: true, message: "请输入账号" }],
  password: [
    { required: true, message: "请输入密码" },
    { min: 6, message: "密码至少 6 位" },
  ],
}

function log(name: string) {
  eventLog.value = `${name}: ${new Date().toLocaleTimeString()}`
}

function onClear() {
  toast.text("已清除")
}

function onConfirm(value: string) {
  toast.success(`搜索: ${value || "(空)"}`)
}

function onLogin() {
  loginForm.value?.validate((valid, errors) => {
    if (valid) toast.success("登录成功")
    else toast.error(errors?.[0]?.message || "校验失败")
  })
}
</script>

<style lang="scss" scoped>
.affix {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-sm);
}

.search-wrap {
  padding: 16rpx 24rpx;
  background: var(--ui-color-background);
}
</style>
