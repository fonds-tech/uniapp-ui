import viteImagemin from "vite-plugin-imagemin"

/**
 * 图片压缩插件
 * 仅在生产环境构建时启用
 */
export default function useImageminPlugin() {
  return viteImagemin({
    // GIF 压缩
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    // PNG 无损压缩
    optipng: {
      optimizationLevel: 7,
    },
    // PNG 有损压缩（更小体积）
    pngquant: {
      quality: [0.65, 0.9],
      speed: 4,
    },
    // JPEG 压缩
    mozjpeg: {
      quality: 80,
    },
    // WebP 压缩
    webp: {
      quality: 75,
    },
    // SVG 压缩
    svgo: {
      plugins: [
        { name: "removeViewBox", active: false },
        { name: "removeEmptyAttrs", active: false },
      ],
    },
  })
}
