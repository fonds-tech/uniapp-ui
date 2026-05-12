<template>
  <view class="page">
    <view class="steps">
      <ui-steps :active="step" align-center>
        <ui-step v-for="s in stepLabels" :key="s" :title="s" />
      </ui-steps>
    </view>

    <view class="content">
      <!-- 步骤 1：基础信息 -->
      <view v-if="step === 0">
        <ui-form :model="form" label-position="top">
          <ui-form-item label="性别">
            <ui-radio-group v-model="form.gender" direction="horizontal">
              <ui-radio name="male" shape="button">男</ui-radio>
              <ui-radio name="female" shape="button">女</ui-radio>
              <ui-radio name="other" shape="button">其他</ui-radio>
            </ui-radio-group>
          </ui-form-item>
          <ui-form-item label="出生日期">
            <ui-date-picker v-model="form.birthday" mode="date" placeholder="选择日期" />
          </ui-form-item>
          <ui-form-item label="计划日期">
            <ui-date-select v-model="form.planDate" />
          </ui-form-item>
          <ui-form-item label="计划起止">
            <ui-date-range-select v-model="form.planRange" />
          </ui-form-item>
          <ui-form-item label="职业">
            <ui-picker v-model="form.profession" :columns="professions" placeholder="选择职业" />
          </ui-form-item>
          <ui-form-item label="所在地区">
            <ui-cascader v-model="form.region" :options="regions" placeholder="选择省 / 市 / 区" />
          </ui-form-item>
          <ui-form-item label="个人简介">
            <ui-textarea v-model="form.bio" placeholder="一句话介绍自己" :maxlength="100" show-count background="background-section" radius="16rpx" />
          </ui-form-item>
        </ui-form>
      </view>

      <!-- 步骤 2：兴趣偏好 -->
      <view v-if="step === 1">
        <ui-form :model="form" label-position="top">
          <ui-form-item label="兴趣爱好">
            <ui-checkbox-group v-model="form.hobbies" direction="horizontal">
              <ui-checkbox v-for="h in hobbies" :key="h" :name="h" shape="button">{{ h }}</ui-checkbox>
            </ui-checkbox-group>
          </ui-form-item>
          <ui-form-item label="活跃时段">
            <ui-segmented v-model="form.activeTime" :options="activeTimeOptions" />
          </ui-form-item>
          <ui-form-item label="期望频率">
            <view class="slider-row">
              <ui-slider v-model="form.frequency" :min="1" :max="7" :step="1" :custom-style="{ flex: 1 }" />
              <text class="slider-row__label">{{ form.frequency }} 次/周</text>
            </view>
          </ui-form-item>
          <ui-form-item label="满意度">
            <ui-rate v-model="form.satisfaction" />
          </ui-form-item>
        </ui-form>
      </view>

      <!-- 步骤 3：身份验证 -->
      <view v-if="step === 2">
        <ui-form :model="form" label-position="top">
          <ui-form-item label="身份证号">
            <ui-input v-model="form.idCard" placeholder="请输入身份证号" background="background-section" radius="16rpx" />
          </ui-form-item>
          <ui-form-item label="证件照">
            <ui-upload v-model="form.idImages" multiple :max-count="2" />
          </ui-form-item>
          <ui-form-item label="手机验证">
            <ui-code-input v-model="form.verifyCode" :length="6" />
          </ui-form-item>
          <ui-form-item label="安全密码 (自定义键盘)">
            <ui-keyboard v-model="form.payPwd" mode="number" :max-length="6" />
          </ui-form-item>
        </ui-form>
      </view>

      <!-- 步骤 4：确认提交 -->
      <view v-if="step === 3">
        <view class="summary">
          <text class="summary__title">请确认信息</text>
          <ui-cell-group>
            <ui-cell title="性别" :value="genderLabel" />
            <ui-cell title="出生日期" :value="form.birthday || '-'" />
            <ui-cell title="所在地区" :value="regionLabel" />
            <ui-cell title="兴趣爱好" :value="form.hobbies.join('、') || '-'" />
            <ui-cell title="活跃时段" :value="activeTimeLabel" />
            <ui-cell title="期望频率" :value="`${form.frequency} 次/周`" />
            <ui-cell title="满意度">
              <template #value>
                <ui-rate :model-value="form.satisfaction" readonly />
              </template>
            </ui-cell>
            <ui-cell title="身份证号" :value="form.idCard || '-'" />
          </ui-cell-group>
        </view>
      </view>
    </view>

    <view class="footer">
      <ui-button v-if="step > 0" size="large" plain @click="step--">上一步</ui-button>
      <ui-button v-if="step < stepLabels.length - 1" type="primary" size="large" :custom-style="{ flex: 1 }" @click="step++">下一步</ui-button>
      <ui-button v-else type="primary" size="large" :custom-style="{ flex: 1 }" :loading="submitting" @click="onSubmit">提交</ui-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "完善信息" },
})

const toast = useToast()

const stepLabels = ["基础", "偏好", "验证", "确认"]
const step = ref(0)
const submitting = ref(false)

const hobbies = ["阅读", "音乐", "运动", "旅行", "美食", "摄影", "游戏", "编程"]

const activeTimeOptions = [
  { label: "早晨", value: "morning" },
  { label: "下午", value: "afternoon" },
  { label: "晚上", value: "evening" },
  { label: "深夜", value: "night" },
]

const regions = [
  {
    label: "广东省",
    value: "gd",
    children: [
      { label: "深圳市", value: "sz", children: [{ label: "南山区", value: "nsq" }, { label: "福田区", value: "ftq" }] },
      { label: "广州市", value: "gz", children: [{ label: "天河区", value: "thq" }, { label: "越秀区", value: "yxq" }] },
    ],
  },
  {
    label: "北京市",
    value: "bj",
    children: [{ label: "北京市", value: "bjs", children: [{ label: "朝阳区", value: "cyq" }, { label: "海淀区", value: "hdq" }] }],
  },
]

const professions = [["学生", "工程师", "设计师", "产品经理", "运营", "教师", "医生", "自由职业"]]

const form = reactive({
  gender: "male",
  birthday: "",
  planDate: "",
  planRange: ["", ""] as [string, string],
  profession: "",
  region: [] as string[],
  bio: "",
  hobbies: [] as string[],
  activeTime: "afternoon",
  frequency: 3,
  satisfaction: 4,
  idCard: "",
  idImages: [] as string[],
  verifyCode: "",
  payPwd: "",
})

const genderLabel = computed(() => ({ male: "男", female: "女", other: "其他" })[form.gender] || "")
const regionLabel = computed(() => form.region.join(" / ") || "-")
const activeTimeLabel = computed(() => activeTimeOptions.find((o) => o.value === form.activeTime)?.label || "-")

function onSubmit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    toast.success("提交成功")
  }, 800)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 160rpx;
}

.steps {
  padding: var(--ui-spacing-lg) var(--ui-spacing-md);
  background: var(--ui-color-background);
}

.content {
  padding: var(--ui-spacing-lg);
}

.slider-row {
  gap: var(--ui-spacing-md);
  flex: 1;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    min-width: 120rpx;
    text-align: right;
  }
}

.summary {
  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
    margin-bottom: var(--ui-spacing-md);
  }
}

.footer {
  gap: var(--ui-spacing-md);
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md) calc(var(--ui-spacing-sm) + env(safe-area-inset-bottom));
  position: fixed;
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
}
</style>
