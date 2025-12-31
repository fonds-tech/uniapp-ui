import ui from "./ui"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import { createSSRApp } from "vue"

import "@/style/index.scss"
import "virtual:uno.css"

export function createApp() {
  const app = createSSRApp(App)

  app.use(ui, {
    components: {
      input: { placeholderColor: "#989898" },
      navbar: { homePath: "/pages/tabbar/workbench/index", homeType: "tab" },
      picker: { columnSize: "26", activeColumnSize: "30" },
      select: { textSize: "26", placeholderColor: "#989898" },
    },
  })
  app.use(store)
  app.use(router)

  return {
    app,
  }
}
