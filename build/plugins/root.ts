import type { Plugin } from "vite"
import type { FSWatcher } from "chokidar"
import type { SFCDescriptor } from "@vue/compiler-sfc"
import process from "node:process"
import chokidar from "chokidar"
import { readFileSync } from "node:fs"
import { join, extname, resolve } from "node:path"
import { parse as jsonParse } from "jsonc-parser"
import { createFilter, normalizePath } from "vite"
import { MagicString, parse as vueParse } from "@vue/compiler-sfc"

/** uni-root 插件配置项 */
interface UniRootOptions {
  /**
   * 是否启用虚拟节点
   * @default false
   */
  enabledVirtualHost?: boolean
  /**
   * 是否启用全局 ref
   * @default false
   */
  enabledGlobalRef?: boolean
  /**
   * 根文件名
   * @default "App.root"
   */
  rootFileName?: string
  /**
   * 需要排除根组件的页面，支持 glob 匹配
   */
  excludePages?: string | string[]
}

/**
 * 解析 SFC 并返回描述信息，失败时给出明确错误
 * @param code - Vue SFC 源码
 * @returns SFC 描述对象
 */
function parseSFC(code: string): SFCDescriptor {
  try {
    return vueParse(code, { pad: "space" }).descriptor
  } catch {
    throw new Error("[uni-root] Vue 版本必须 >= 3.2.13")
  }
}

function normalizeRootFileName(fileName?: string) {
  // 统一根文件名格式，避免重复拼接后缀
  if (!fileName) return "App.root"
  return fileName.endsWith(".vue") ? fileName.slice(0, -4) : fileName
}

function ensureVueExt(pagePath: string) {
  // 确保页面路径带 .vue 后缀
  return pagePath.endsWith(".vue") ? pagePath : `${pagePath}.vue`
}

function formatPagePath(root: string, pagePath: string) {
  // 输出跨平台一致的页面绝对路径
  const fullPath = resolve(root, ensureVueExt(pagePath))
  return normalizePath(fullPath)
}

function loadPagesJson(path: string, rootPath: string): string[] {
  // 解析 pages.json，兼容 subPackages/subpackages
  let pagesJsonRaw = ""
  try {
    pagesJsonRaw = readFileSync(path, "utf-8")
  } catch {
    return []
  }

  // pages.json 允许注释与尾随逗号，使用 jsonc-parser 解析
  const parsed = jsonParse(pagesJsonRaw) || {}
  const pages = Array.isArray(parsed.pages) ? parsed.pages : []
  const subPackages = Array.isArray(parsed.subPackages) ? parsed.subPackages : []
  const subpackages = Array.isArray(parsed.subpackages) ? parsed.subpackages : []
  // 兼容 subPackages 与 subpackages 两种写法
  const allSubPackages = subPackages.length ? subPackages : subpackages

  const pagePaths = pages.map((page: any) => (typeof page?.path === "string" ? formatPagePath(rootPath, page.path) : null)).filter(Boolean) as string[]

  const subPagePaths = allSubPackages
    .flatMap((pkg: any) => {
      const pkgRoot = typeof pkg?.root === "string" ? pkg.root : ""
      const pkgPages = Array.isArray(pkg?.pages) ? pkg.pages : []
      // 子包页面路径需拼接子包根目录
      return pkgPages.map((page: any) => (typeof page?.path === "string" ? formatPagePath(join(rootPath, pkgRoot), page.path) : null))
    })
    .filter(Boolean) as string[]

  return [...pagePaths, ...subPagePaths]
}

function toKebabCase(value: string) {
  // 统一标签名匹配：驼峰/下划线 → kebab-case
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
}

function toPascalCase(value: string) {
  // 兼容模板中可能使用的 PascalCase 写法
  return value.replace(/(^\w|-+\w)/g, (match) => match.toUpperCase().replace(/-/g, ""))
}

interface TagNode {
  loc: {
    source: string
    start: { offset: number }
    end: { offset: number }
  }
}

function findNode(sfc: SFCDescriptor, rawTagName: string): TagNode | undefined {
  const templateSource = sfc.template?.content
  if (!templateSource) return

  const kebabName = toKebabCase(rawTagName)
  const pascalName = toPascalCase(rawTagName)
  let tagName = ""
  if (templateSource.includes(`<${kebabName}`)) {
    tagName = kebabName
  } else if (templateSource.includes(`<${pascalName}`)) {
    tagName = pascalName
  }

  // 模板中不存在目标标签时直接返回
  if (!tagName) return

  const nodeAst = sfc.template?.ast
  if (!nodeAst) return

  // 遍历模板 AST 寻找目标标签
  const traverse = (nodes: any): TagNode | undefined => {
    for (const node of nodes) {
      if (node.type === 1) {
        if (node.tag === tagName) return node
        if (node.children?.length) {
          const found = traverse(node.children) as TagNode
          if (found) return found
        }
      }
    }
  }

  return traverse(nodeAst.children)
}

const platform = process.env.UNI_PLATFORM

function normalizePlatformPath(id: string) {
  // 统一平台后缀文件（如 xxx.h5.vue）以便页面匹配
  const idExt = extname(id)
  if (idExt !== ".vue") return id
  if (!platform) return id
  if (!id.includes(`.${platform}.`)) return id
  return id.replace(`.${platform}.`, ".")
}

function toArray<T>(value: T | T[]) {
  // 兼容单值与数组形式的配置
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

/**
 * 在入口文件中注册全局根组件，确保页面包裹能力生效
 * @param code - 入口文件源码
 * @param fileName - 根组件文件名（不含 .vue 时将自动补全）
 * @returns 变更后的 MagicString
 */
async function registerUniRoot(code: string, fileName: string = "App.root") {
  // 注入全局组件注册
  const ms = new MagicString(code)
  const normalizedName = normalizeRootFileName(fileName)
  const importCode = `import GlobalUniRoot from "./${normalizedName}.vue"`
  const registerCode = `app.component("global-uni-root", GlobalUniRoot)`

  if (!code.includes(importCode)) {
    ms.prepend(`${importCode}\n`)
  }

  if (!/app\.component\(["']global-uni-root["']/.test(code)) {
    const returnMatch = /return\s*\{\s*app/.exec(code)
    if (returnMatch) {
      // 优先插入到 return 之前，保持初始化顺序可读
      ms.appendLeft(returnMatch.index, `${registerCode}\n`)
    } else {
      // 兜底：在 app 创建语句后插入注册逻辑
      const appAssignMatch = /(?:const|let|var)\s+app\s*=\s*(?:[^\s;][^;\n]*|[\t\v\f\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[;\n]/.exec(code)
      if (appAssignMatch) {
        ms.appendLeft(appAssignMatch.index + appAssignMatch[0].length, `${registerCode}\n`)
      }
    }
  }

  return ms
}

/**
 * 重建虚拟根组件：替换 root-view 并按需注入 virtualHost
 * @param code - 根组件源码
 * @param enabledVirtualHost - 是否启用虚拟节点
 * @returns 变更后的 MagicString
 */
async function rebuildUniRoot(code: string, enabledVirtualHost: boolean = false) {
  // 重建根组件，替换 root-view
  const ms = new MagicString(code)
  const needParseForRoot = code.includes("<root-view") || code.includes("<RootView")
  const needParseForVirtualHost = enabledVirtualHost
  const needParse = needParseForRoot || needParseForVirtualHost

  // 仅在需要时解析，降低构建成本
  const sfc = needParse ? parseSFC(code) : null
  if (sfc && needParseForRoot) {
    const rootNode = findNode(sfc, "root-view")
    if (rootNode) {
      // 用 slot 替换 root-view，保留页面渲染入口
      ms.remove(rootNode.loc.start.offset, rootNode.loc.end.offset)
      ms.appendLeft(rootNode.loc.start.offset, "<slot />")
    }
  }

  if (enabledVirtualHost) {
    if (!sfc) return ms
    if (sfc.script) return ms

    // 仅在无 script 时注入，避免覆盖已有逻辑
    const langType = sfc.scriptSetup?.lang
    const langAttr = langType ? ` lang="${langType}"` : ""
    ms.append(`\n<script${langAttr}>\nexport default {\n  options: {\n    virtualHost: true,\n  },\n}\n</script>`)
  }

  return ms
}

/**
 * 包裹页面并提升 PageMeta，可选注入全局 ref
 * @param code - 页面 SFC 源码
 * @param enabledGlobalRef - 是否注入默认 ref
 * @returns 变更后的 MagicString
 */
async function transformPage(code: string, enabledGlobalRef = false) {
  // 包裹页面并提升 PageMeta
  const sfc = parseSFC(code)
  const ms = new MagicString(code)

  const pageTempStart = sfc.template?.loc.start.offset
  const pageTempEnd = sfc.template?.loc.end.offset

  if (typeof pageTempStart !== "number" || typeof pageTempEnd !== "number") {
    return ms
  }

  let pageMetaSource = ""
  const pageMetaNode = findNode(sfc, "PageMeta")

  if (pageMetaNode) {
    // 先移除 PageMeta，再插入顶部，避免重复渲染
    pageMetaSource = pageMetaNode.loc.source
    const metaTempStart = pageMetaNode.loc.start.offset
    const metaTempEnd = pageMetaNode.loc.end.offset
    ms.remove(metaTempStart, metaTempEnd)
  }

  const pageTempAttrs = sfc.template?.attrs
  // 默认注入 uniRoot，允许模板 root 属性覆盖
  let pageRootRefSource = enabledGlobalRef ? `ref="uniRoot"` : ""

  if (pageTempAttrs && "root" in pageTempAttrs) {
    const rootValue = pageTempAttrs.root
    if (typeof rootValue === "string" && rootValue.trim()) {
      pageRootRefSource = `ref="${rootValue}"`
    }
  }

  const refAttribute = pageRootRefSource ? ` ${pageRootRefSource}` : ""
  const metaPrefix = pageMetaSource ? `\n${pageMetaSource}\n` : "\n"

  // 将页面整体包裹在 global-uni-root 内
  ms.appendLeft(pageTempStart, `${metaPrefix}<global-uni-root${refAttribute}>`)
  ms.appendRight(pageTempEnd, "\n</global-uni-root>\n")

  return ms
}

/**
 * 创建 uni-root Vite 插件
 * @param options - 插件配置
 * @returns Vite 插件实例
 */
export default function useUniRootPlugin(options: UniRootOptions = {}): Plugin {
  const resolvedOptions: Required<UniRootOptions> = {
    enabledVirtualHost: false,
    enabledGlobalRef: false,
    rootFileName: normalizeRootFileName(options.rootFileName),
    excludePages: options.excludePages || [],
  }

  // 兼容不同启动方式（CLI/HBuilderX）
  const projectRoot = process.env.INIT_CWD || process.cwd()
  const srcRoot = process.env.UNI_INPUT_DIR || resolve(projectRoot, "src")
  // 根组件与 pages.json 路径固定，用于快速过滤
  const appRootPath = normalizePath(resolve(srcRoot, `${resolvedOptions.rootFileName}.vue`))
  const pagesPath = normalizePath(resolve(srcRoot, "pages.json"))
  const excludedPaths = toArray(resolvedOptions.excludePages)
    .filter(Boolean)
    .map((pagePath) => normalizePath(resolve(srcRoot, pagePath)))

  // 初始读取 pages.json，后续由 watcher 更新
  let pagesJson = loadPagesJson(pagesPath, srcRoot)
  let watcher: FSWatcher | null = null
  let hasPlatformPlugin = false
  // 入口与根组件路径固定，过滤器可复用
  const filterMain = createFilter([normalizePath(resolve(srcRoot, "main.ts")), normalizePath(resolve(srcRoot, "main.js"))])
  const filterUniRoot = createFilter(appRootPath)

  return {
    name: "vite-plugin-uni-root",
    enforce: "pre",
    configResolved({ plugins }) {
      // 判断是否启用平台插件，决定是否需要归一化平台后缀
      hasPlatformPlugin = plugins.some((plugin) => plugin.name === "vite-plugin-uni-platform")
    },
    buildStart() {
      // 监听 pages.json 变动，确保新增页面也能被包裹
      watcher = chokidar.watch(pagesPath, { ignoreInitial: true })
      watcher.on("all", (event) => {
        if (["add", "change"].includes(event)) {
          pagesJson = loadPagesJson(pagesPath, srcRoot)
        }
      })
    },
    async transform(code, id) {
      // 分别处理入口、根组件和页面
      let ms: MagicString | null = null
      const cleanId = normalizePath(id.split("?")[0])

      if (filterMain(cleanId)) {
        ms = await registerUniRoot(code, resolvedOptions.rootFileName)
      }

      if (filterUniRoot(cleanId)) {
        ms = await rebuildUniRoot(code, resolvedOptions.enabledVirtualHost)
      }

      const pageId = hasPlatformPlugin ? normalizePlatformPath(cleanId) : cleanId
      const normalizedPageId = normalizePath(pageId)

      // pages.json 会动态更新，因此过滤器需运行时生成
      const filterPage = createFilter(pagesJson, excludedPaths)
      if (filterPage(normalizedPageId)) {
        ms = await transformPage(code, resolvedOptions.enabledGlobalRef)
      }

      if (ms && ms.hasChanged()) {
        return {
          code: ms.toString(),
          map: ms.generateMap({ hires: true }),
        }
      }
    },
    buildEnd() {
      if (watcher) {
        watcher.close()
      }
    },
  }
}
