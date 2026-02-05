/**
 * 复制 H5 构建产物到文档目录
 * 用于 GitHub Pages 部署时将 H5 预览集成到文档站点
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const srcRoot = path.join(__dirname, "../dist/build/h5")
const targetRoot = path.join(__dirname, "../docs/.vitepress/dist/h5")

function copyFolder(sourceDir: string, targetDir: string) {
  fs.mkdirSync(targetDir, { recursive: true })

  const fileNames = fs.readdirSync(sourceDir)

  fileNames.forEach((fileName) => {
    const sourcePath = path.join(sourceDir, fileName)
    const targetPath = path.join(targetDir, fileName)

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolder(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

console.log("Copying H5 build to docs...")
console.log(`  From: ${srcRoot}`)
console.log(`  To: ${targetRoot}`)

copyFolder(srcRoot, targetRoot)

console.log("Done!")
