/**
 * Migration script to replace props.xxx with useProps.xxx in .vue files
 *
 * Run with: node scripts/migrate-props-usage.cjs
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
  const vuePath = path.join(UI_DIR, component, `${component}.vue`)

  if (!fs.existsSync(vuePath)) {
    skippedCount++
    continue
  }

  let content = fs.readFileSync(vuePath, "utf-8")

  // Skip if doesn't have useProps
  if (!content.includes("const useProps = ")) {
    skippedCount++
    continue
  }

  // Skip ui-switch (already done manually)
  if (component === "ui-switch") {
    skippedCount++
    continue
  }

  const originalContent = content

  // Replace props. with useProps. but avoid certain patterns:
  // - const props = defineProps (keep as is)
  // - ...props (spread operator - keep as is for now, may need manual review)
  // - props) or props, or props} (passing props as argument - keep as is)

  // In template: replace props.xxx with useProps.xxx
  // In script: replace props.xxx with useProps.xxx

  // Pattern to match props.something (property access)
  // But not match:
  // - const props
  // - defineProps
  // - ...props
  // - (props) or ,props or {props

  // Simple replacement: props. -> useProps.
  // This should work for most cases like props.size, props.disabled, etc.

  // First, let's protect certain patterns
  const protectedPatterns = [
    { pattern: /const props = defineProps/g, placeholder: "___CONST_PROPS_DEFINEPROPS___" },
    { pattern: /\.\.\.props/g, placeholder: "___SPREAD_PROPS___" },
    { pattern: /\(props\)/g, placeholder: "___PAREN_PROPS___" },
    { pattern: /\(props,/g, placeholder: "___PAREN_PROPS_COMMA___" },
    { pattern: /, props\)/g, placeholder: "___COMMA_PROPS_PAREN___" },
    { pattern: /, props,/g, placeholder: "___COMMA_PROPS_COMMA___" },
    { pattern: /\{ props \}/g, placeholder: "___BRACE_PROPS___" },
    { pattern: /\{ props,/g, placeholder: "___BRACE_PROPS_COMMA___" },
    { pattern: /:props="/g, placeholder: "___COLON_PROPS_QUOTE___" },
    { pattern: /="props"/g, placeholder: "___EQUALS_PROPS_QUOTE___" },
  ]

  // Apply protection
  for (const { pattern, placeholder } of protectedPatterns) {
    content = content.replace(pattern, placeholder)
  }

  // Replace props. with useProps.
  content = content.replace(/\bprops\./g, "useProps.")

  // Restore protected patterns
  for (const { pattern, placeholder } of protectedPatterns) {
    const original = placeholder
      .replace("___CONST_PROPS_DEFINEPROPS___", "const props = defineProps")
      .replace("___SPREAD_PROPS___", "...props")
      .replace("___PAREN_PROPS___", "(props)")
      .replace("___PAREN_PROPS_COMMA___", "(props,")
      .replace("___COMMA_PROPS_PAREN___", ", props)")
      .replace("___COMMA_PROPS_COMMA___", ", props,")
      .replace("___BRACE_PROPS___", "{ props }")
      .replace("___BRACE_PROPS_COMMA___", "{ props,")
      .replace("___COLON_PROPS_QUOTE___", ":props=\"")
      .replace("___EQUALS_PROPS_QUOTE___", "=\"props\"")
    content = content.replace(new RegExp(placeholder, "g"), original)
  }

  if (content !== originalContent) {
    fs.writeFileSync(vuePath, content)
    console.log(`Migrated: ${component}`)
    migratedCount++
  } else {
    console.log(`No changes: ${component}`)
    skippedCount++
  }
}

console.log(`\nDone! Migrated: ${migratedCount}, Skipped: ${skippedCount}`)
