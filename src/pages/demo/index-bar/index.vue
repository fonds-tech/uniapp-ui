<template>
  <demo-page :height="`${systeminfo.screenHeight - systeminfo.windowTop}px`" padding="0">
    <ui-index-bar :indexs="indexList" :sticky="sticky" @select="onSelect">
      <view class="header">
        <view class="header__title">通讯录 ({{ totalCount }} 联系人)</view>
        <view class="header__action">
          <text class="header__label">吸顶</text>
          <ui-switch v-model="sticky" />
        </view>
      </view>
      <view v-for="letter in indexList" :key="letter">
        <ui-index-anchor :name="letter" :text="letter" sticky-background="#e8f4ff" sticky-color="#1989fa" sticky-font-weight="700" />
        <ui-cell v-for="city in cityData[letter] ?? []" :key="city" :title="city" />
        <view v-if="!(cityData[letter] ?? []).length" class="empty">暂无 {{ letter }} 开头城市</view>
      </view>
    </ui-index-bar>
  </demo-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useToast, useSystemInfo } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "IndexBar 索引栏" },
})

const toast = useToast()
const systeminfo = useSystemInfo()

const indexList = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]

const cityData: Record<string, string[]> = {
  A: ["阿坝", "安康", "安庆", "安顺", "鞍山", "安阳"],
  B: ["北京", "保定", "宝鸡", "包头", "蚌埠", "滨州", "亳州"],
  C: ["成都", "重庆", "长沙", "长春", "常州", "沧州", "潮州"],
  D: ["大连", "大庆", "东莞", "德州", "达州", "大同"],
  E: ["鄂尔多斯", "恩施"],
  F: ["福州", "佛山", "抚顺", "阜阳", "防城港"],
  G: ["广州", "贵阳", "桂林", "赣州", "广元"],
  H: ["杭州", "合肥", "哈尔滨", "海口", "惠州", "邯郸", "黄冈"],
  J: ["济南", "金华", "嘉兴", "江门", "吉林", "九江"],
  K: ["昆明", "开封"],
  L: ["兰州", "拉萨", "洛阳", "柳州", "临沂", "连云港"],
  M: ["绵阳", "茂名", "梅州"],
  N: ["南京", "南宁", "南昌", "南通", "宁波", "南阳"],
  P: ["攀枝花", "平顶山", "莆田"],
  Q: ["青岛", "泉州", "秦皇岛", "曲靖", "衢州"],
  R: ["日照"],
  S: ["上海", "深圳", "苏州", "沈阳", "石家庄", "绍兴", "汕头"],
  T: ["天津", "太原", "唐山", "台州", "泰安", "铜陵"],
  W: ["武汉", "无锡", "温州", "芜湖", "威海", "潍坊"],
  X: ["西安", "厦门", "徐州", "襄阳", "新乡", "咸阳"],
  Y: ["银川", "烟台", "扬州", "宜昌", "盐城", "岳阳"],
  Z: ["郑州", "珠海", "中山", "株洲", "张家口", "湛江"],
}

const sticky = ref(true)

const totalCount = computed(() => Object.values(cityData).reduce((sum, list) => sum + list.length, 0))

function onSelect(index: string | number) {
  toast.text(`选择了 ${index}`)
}
</script>

<style lang="scss" scoped>
.header {
  gap: 12rpx;
  display: flex;
  padding: 24rpx 32rpx;
  background: var(--ui-color-background);
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);
  justify-content: space-between;

  &__title {
    color: var(--ui-color-text);
    font-size: 30rpx;
    font-weight: 600;
  }

  &__action {
    gap: 12rpx;
    display: flex;
    align-items: center;
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 26rpx;
  }
}

.empty {
  color: var(--ui-color-text-secondary);
  padding: 16rpx 32rpx;
  font-size: 24rpx;
  background: var(--ui-color-background);
}
</style>
