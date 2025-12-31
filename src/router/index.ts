/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
import { createRouter } from "uni-mini-router"
import { pages, subPackages } from "virtual:uni-pages"

function generateRoutes() {
  const routes = pages.map((page) => {
    const newPath = `/${page.path}`
    return { ...page, path: newPath }
  })
  if (subPackages && subPackages.length > 0) {
    subPackages.forEach((subPackage) => {
      const subRoutes = subPackage.pages.map((page: any) => {
        const newPath = `/${subPackage.root}/${page.path}`
        return { ...page, path: newPath }
      })
      routes.push(...subRoutes)
    })
  }
  return routes
}

const router = createRouter({
  routes: generateRoutes(),
})
router.beforeEach((to, from, next) => {
  // 继续导航
  next()
})

router.afterEach((to, from) => {})

export default router
