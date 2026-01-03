import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages"

export default defineUniPages({
  globalStyle: {
    navigationStyle: "default",
    backgroundColor: "#f5f6fa",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "Fonds UI",
    navigationBarBackgroundColor: "#ffffff",
  },
  easycom: {
    autoscan: true,
    custom: {
      "^ui-(.*)": "@/uni_modules/uniapp-ui/ui-$1/ui-$1.vue",
    },
  },
  tabBar: {
    color: "#9CA3AF",
    selectedColor: "#6366F1",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/tabbar/home/index",
        text: "首页",
        iconPath: "static/tabbar/home.png",
        selectedIconPath: "static/tabbar/home-active.png",
      },
      {
        pagePath: "pages/tabbar/components/index",
        text: "组件",
        iconPath: "static/tabbar/component.png",
        selectedIconPath: "static/tabbar/component-active.png",
      },
      {
        pagePath: "pages/tabbar/templates/index",
        text: "模板",
        iconPath: "static/tabbar/template.png",
        selectedIconPath: "static/tabbar/template-active.png",
      },
      {
        pagePath: "pages/tabbar/about/index",
        text: "关于",
        iconPath: "static/tabbar/about.png",
        selectedIconPath: "static/tabbar/about-active.png",
      },
    ],
  },
})
