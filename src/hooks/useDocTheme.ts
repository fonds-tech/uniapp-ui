import type { ThemeMode } from "@/uni_modules/uniapp-ui"

/**
 * Hook for syncing theme with documentation site
 * Handles URL params and postMessage from parent iframe
 */
export function useDocTheme() {
  const theme = ref<ThemeMode>("light")

  /** Get theme from URL query params */
  function getThemeFromUrl(): ThemeMode {
    // #ifdef H5
    const url = new URL(window.location.href)
    const urlTheme = url.searchParams.get("theme")
    if (urlTheme === "dark" || urlTheme === "light") {
      return urlTheme
    }
    // #endif
    return "light"
  }

  /** Update native navigation bar color based on theme */
  function updateNavigationBarColor(isDark: boolean) {
    uni.setNavigationBarColor({
      backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
      frontColor: isDark ? "#ffffff" : "#000000",
    })
    // Update page background color
    uni.setBackgroundColor?.({
      backgroundColor: isDark ? "#0f0f0f" : "#f5f6fa",
    })
  }

  /** Listen for theme change messages from parent window */
  function setupMessageListener() {
    // #ifdef H5
    window.addEventListener("message", (event) => {
      if (event.data?.type === "theme-change") {
        const newTheme = event.data.theme
        if (newTheme === "dark" || newTheme === "light") {
          theme.value = newTheme
          updateNavigationBarColor(newTheme === "dark")
        }
      }
    })
    // #endif
  }

  /** Initialize theme */
  function init() {
    theme.value = getThemeFromUrl()
    updateNavigationBarColor(theme.value === "dark")
    setupMessageListener()
  }

  onMounted(init)

  return {
    theme,
  }
}
