// https://vitepress.dev/guide/custom-theme
import type { App } from "vue"
import Theme from "vitepress/theme"
import ComponentOverview from "../components/ComponentOverview.vue"
import Layout from "./Layout.vue"
import "./custom.css"

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.component("ComponentOverview", ComponentOverview)
  },
}
