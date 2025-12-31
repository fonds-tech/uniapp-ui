import eslint from "@fonds/eslint-config"

export default eslint(
  {
    vue: true,
    jsx: true,
    markdown: false,
    typescript: true,
    formatters: true,
  },
  {
    rules: {
      "ts/ban-ts-comment": "off",
      "vue/no-unused-refs": "off",
      "style/indent": "off",
      "style/brace-style": "off",
      "style/quote-props": "off",
      "style/arrow-parens": "off",
      "style/operator-linebreak": "off",
      "style/member-delimiter-style": "off",
      "unused-imports/no-unused-vars": "off",
      "prefer-promise-reject-errors": "off",
      "unicorn/number-literal-case": "off",
    },
  },
  {
    ignores: ["dist", "node_modules", "*.d.ts"],
  },
)
