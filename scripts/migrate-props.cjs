/**
 * Migration script to convert buildProps to createProps pattern
 *
 * Before:
 *   export const buttonProps = buildProps("button", { ... })
 *
 * After:
 *   export const [buttonProps, useButtonProps] = createProps("button", { ... })
 *
 * Run with: node scripts/migrate-props.js
 */

const fs = require("node:fs")
const path = require("node:path")

const UI_DIR = path.join(__dirname, "../src/ui")

// Get all component directories
const components = fs.readdirSync(UI_DIR)
  .filter(name => name.startsWith("ui-") && fs.statSync(path.join(UI_DIR, name)).isDirectory())

let migratedCount = 0
let skippedCount = 0

for (const component of components) {
  const indexPath = path.join(UI_DIR, component, "index.ts")

  if (!fs.existsSync(indexPath)) {
    continue
  }

  let content = fs.readFileSync(indexPath, "utf-8")

  // Skip if already migrated
  if (content.includes("createProps")) {
    skippedCount++
    continue
  }

  // Skip if doesn't use buildProps
  if (!content.includes("buildProps")) {
    skippedCount++
    continue
  }

  // Extract component name (e.g., "button" from "ui-button")
  const shortName = component.replace("ui-", "")

  // Generate hook name (e.g., "useButtonProps" from "button")
  const hookName = `use${shortName.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("")}Props`

  // Find the props variable name (e.g., "buttonProps")
  const propsMatch = content.match(/export const (\w+Props) = buildProps\(/)
  if (!propsMatch) {
    console.log(`Skipping ${component}: Could not find props pattern`)
    skippedCount++
    continue
  }

  const propsName = propsMatch[1]

  // Replace import
  content = content.replace(
    /import \{([^}]*)\bbuildProps\b([^}]*)\} from ["']\.\.\/utils\/props["']/,
    (match, before, after) => {
      const newImports = (before + after).replace(/,\s*,/g, ",").replace(/^\s*,|,\s*$/g, "").trim()
      if (newImports) {
        return `import { ${newImports} } from "../utils/props"\nimport { createProps } from "../hooks"`
      }
      return `import { createProps } from "../hooks"`
    },
  )

  // Replace buildProps with createProps and destructuring
  content = content.replace(
    new RegExp(`export const ${propsName} = buildProps\\(`),
    `export const [${propsName}, ${hookName}] = createProps(`,
  )

  fs.writeFileSync(indexPath, content)
  console.log(`Migrated: ${component} -> ${hookName}`)
  migratedCount++
}

console.log(`\nDone! Migrated: ${migratedCount}, Skipped: ${skippedCount}`)
console.log("\nNote: You still need to update the .vue files to use the new hooks.")
