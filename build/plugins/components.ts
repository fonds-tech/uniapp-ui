import components from "@uni-helper/vite-plugin-uni-components"

export default function useComponentsPlugin() {
  return components({
    deep: true,
    extensions: ["vue"],
    directoryAsNamespace: false,
    dts: "src/types/components.d.ts",
    // 添加自定义组件目录
    dirs: [
      "src/components",
      "src/uni_modules/uniapp-ui",
    ],
    // 自定义组件解析规则
    resolvers: [
      // ui-xxx 组件解析到 uni_modules/uniapp-ui/ui-xxx/ui-xxx.vue
      (name) => {
        if (name.startsWith("ui-")) {
          return {
            name: "default",
            from: `@/uni_modules/uniapp-ui/${name}/${name}.vue`,
          }
        }
      },
    ],
  })
}
