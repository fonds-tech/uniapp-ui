import uniPages from "@uni-helper/vite-plugin-uni-pages"

export default function useUniPagesPlugin() {
  return uniPages({
    exclude: ["**/demo/components/**/**.*"],
    subPackages: [],
    dts: "src/types/uni-pages.d.ts",
  })
}
