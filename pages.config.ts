import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages"

export default defineUniPages({
  globalStyle: {
    navigationStyle: "default",
    backgroundColor: "#f5f6fa",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "UI 组件库",
    navigationBarBackgroundColor: "#ffffff",
  },
  easycom: {
    autoscan: true,
    custom: {
      "^ui-(.*)": "@/uni_modules/uniapp-ui/ui-$1/ui-$1.vue",
    },
  },
  pages: [
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "UI 组件库",
      },
    },
    {
      path: "pages/demo/index",
      style: {
        navigationBarTitleText: "组件演示",
      },
    },
  ],
})
