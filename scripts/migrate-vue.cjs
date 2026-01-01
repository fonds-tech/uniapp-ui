/**
 * Migration script to update .vue files to use new useXxxProps hooks
 *
 * Before:
 *   const props = defineProps(buttonProps)
 *
 * After:
 *   const props = defineProps(buttonProps)
 *   const useProps = useButtonProps(props)
 *
 * Run with: node scripts/migrate-vue.cjs
 */

const fs = require("node:fs")
const path = require("node:path")

const UI_DIR = path.join(__dirname, "../src/ui")

// Get all component directories
const components = fs.readdirSync(UI_DIR)
  .filter(name => name.startsWith("ui-") && fs.statSync(path.join(UI_DIR, name)).isDirectory())

let migratedCount = 0
let skippedCount = 0
let errorCount = 0

for (const component of components) {
  const vuePath = path.join(UI_DIR, component, `${component}.vue`)
  const indexPath = path.join(UI_DIR, component, "index.ts")

  if (!fs.existsSync(vuePath) || !fs.existsSync(indexPath)) {
    skippedCount++
    continue
  }

  // Check if index.ts has createProps
  const indexContent = fs.readFileSync(indexPath, "utf-8")
  if (!indexContent.includes("createProps")) {
    skippedCount++
    continue
  }

  // Extract hook name from index.ts
  const hookMatch = indexContent.match(/export const \[(\w+Props), (use\w+Props)\]/)
  if (!hookMatch) {
    console.log(`Skipping ${component}: Could not find hook pattern in index.ts`)
    skippedCount++
    continue
  }

  const propsName = hookMatch[1]
  const hookName = hookMatch[2]

  let vueContent = fs.readFileSync(vuePath, "utf-8")

  // Skip if already migrated
  if (vueContent.includes(hookName)) {
    skippedCount++
    continue
  }

  // Skip ui-switch (already done manually)
  if (component === "ui-switch") {
    skippedCount++
    continue
  }

  // Add hook to import
  const importPattern = new RegExp(`import \\{([^}]*)\\} from ["']\\.\/index["']`)
  const importMatch = vueContent.match(importPattern)

  if (importMatch) {
    const existingImports = importMatch[1]
    if (!existingImports.includes(hookName)) {
      const newImports = `${existingImports.trim()}, ${hookName}`
      vueContent = vueContent.replace(importPattern, `import { ${newImports} } from "./index"`)
    }
  }

  // Find the defineProps line and add useProps after it
  // Pattern: const props = defineProps(xxxProps) or const xxx = defineProps(xxxProps)
  const definePropsPattern = /const (\w+) = defineProps\((\w+Props)\)/
  const definePropsMatch = vueContent.match(definePropsPattern)

  if (definePropsMatch) {
    const varName = definePropsMatch[1]
    const usedPropsName = definePropsMatch[2]

    // Add useProps line after defineProps
    vueContent = vueContent.replace(
      definePropsPattern,
      `const ${varName} = defineProps(${usedPropsName})\nconst useProps = ${hookName}(${varName})`,
    )

    fs.writeFileSync(vuePath, vueContent)
    console.log(`Migrated: ${component}`)
    migratedCount++
  } else {
    console.log(`Warning: ${component} - Could not find defineProps pattern`)
    errorCount++
  }
}

console.log(`\nDone! Migrated: ${migratedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`)
console.log("\nNote: You need to manually replace props.xxx with useProps.xxx in templates and scripts.")
