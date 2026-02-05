<template>
  <demo-page :height="`${systeminfo.screenHeight - systeminfo.windowTop}px`" padding="0">
    <ui-index-bar :indexs="indexList" @select="onSelect">
      <view v-for="letter in indexList" :key="letter">
        <ui-index-anchor :name="letter" :text="letter" />
        <ui-cell v-for="item in getItemsByLetter(letter)" :key="item" :title="item" />
      </view>
    </ui-index-bar>
  </demo-page>
</template>

<script setup lang="ts">
import { useSystemInfo } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "IndexBar 索引栏" },
})

const systeminfo = useSystemInfo()

const indexList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const cityData: Record<string, string[]> = {
  A: ["阿坝", "安康", "安庆", "安顺", "鞍山", "安阳"],
  B: ["北京", "保定", "宝鸡", "包头", "蚌埠", "滨州", "亳州"],
  C: ["成都", "重庆", "长沙", "长春", "常州", "沧州", "潮州"],
  D: ["大连", "大庆", "东莞", "德州", "达州", "大同"],
  E: ["鄂尔多斯", "恩施"],
  F: ["福州", "佛山", "抚顺", "阜阳", "防城港"],
  G: ["广州", "贵阳", "桂林", "赣州", "广元"],
  H: ["杭州", "合肥", "哈尔滨", "海口", "惠州", "邯郸", "黄冈"],
  I: [],
  J: ["济南", "金华", "嘉兴", "江门", "吉林", "九江"],
  K: ["昆明", "开封"],
  L: ["兰州", "拉萨", "洛阳", "柳州", "临沂", "连云港"],
  M: ["绵阳", "茂名", "梅州"],
  N: ["南京", "南宁", "南昌", "南通", "宁波", "南阳"],
  O: [],
  P: ["攀枝花", "平顶山", "莆田"],
  Q: ["青岛", "泉州", "秦皇岛", "曲靖", "衢州"],
  R: ["日照"],
  S: ["上海", "深圳", "苏州", "沈阳", "石家庄", "绍兴", "汕头"],
  T: ["天津", "太原", "唐山", "台州", "泰安", "铜陵"],
  U: ["乌鲁木齐"],
  V: [],
  W: ["武汉", "无锡", "温州", "芜湖", "威海", "潍坊"],
  X: ["西安", "厦门", "徐州", "襄阳", "新乡", "咸阳"],
  Y: ["银川", "烟台", "扬州", "宜昌", "盐城", "岳阳"],
  Z: ["郑州", "珠海", "中山", "株洲", "张家口", "湛江"],
}

function getItemsByLetter(letter: string): string[] {
  return cityData[letter] || []
}

function onSelect(index: string | number) {
  uni.showToast({ title: `选择了 ${index}`, icon: "none" })
}
</script>

<style lang="scss" scoped>
.index-bar-page {
  height: 100vh;
}
</style>
