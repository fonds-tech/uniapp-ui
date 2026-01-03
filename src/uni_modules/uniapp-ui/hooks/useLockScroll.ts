import { watch, onMounted, onDeactivated, onBeforeUnmount } from "vue"

let totalLockCount = 0

const BODY_LOCK_CLASS = "ui-overflow-hidden"

/**
 * 用于锁定和解锁页面滚动的钩子函数
 * @param shouldLock 一个返回布尔值的函数，用于决定是否应该锁定滚动
 */
export function useLockScroll(shouldLock: () => boolean) {
  /**
   * 锁定页面滚动
   */
  const lock = () => {
    // #ifdef WEB
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS)
    }
    totalLockCount++
    // #endif
  }

  /**
   * 解锁页面滚动
   */
  const unlock = () => {
    // #ifdef WEB
    if (totalLockCount) {
      totalLockCount--

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS)
      }
    }
    // #endif
  }

  /**
   * 初始化函数，根据shouldLock的结果决定是否锁定滚动
   */
  const init = () => shouldLock() && lock()

  /**
   * 销毁函数，根据shouldLock的结果决定是否解锁滚动
   */
  const destroy = () => shouldLock() && unlock()

  onMounted(init)
  onDeactivated(destroy)
  onBeforeUnmount(destroy)

  watch(shouldLock, (value) => {
    value ? lock() : unlock()
  })
}
