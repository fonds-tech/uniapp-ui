import ui from "./uni_modules/uniapp-ui"
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
      button: { type: "danger" },
    },
  })
  app.use(store)
  app.use(router)

  return {
    app,
  }
}
