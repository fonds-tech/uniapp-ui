import { initializePlugin } from "./plugins/initialize"
import { createPersistedState } from "pinia-plugin-persistedstate"
import { createPinia, setActivePinia } from "pinia"

const store = createPinia()
store.use(initializePlugin)
store.use(createPersistedState({ storage: { getItem: uni.getStorageSync, setItem: uni.setStorageSync } }))

setActivePinia(store)

export default store

// 模块统一导出
export * from "./modules/app"
