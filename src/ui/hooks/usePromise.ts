/**
 * 自定义 Promise 钩子函数，用于封装 Promise 对象
 * @param executor Promise 执行函数
 * @returns 包含自定义 Promise 对象及相关方法的对象
 */
export function usePromise<T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
  let _reject: ((res?: any) => void) | null = null

  const _promise = new Promise<T>((resolve, reject) => {
    executor(resolve, reject)
    _reject = reject
  })

  const _then = <TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ) => {
    return _promise.then(onfulfilled, onrejected)
  }

  const _abort = (error?: any) => {
    if (_reject) _reject(error)
  }

  const _catch = <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null) => _promise.catch(onrejected)

  return { promise: _promise, then: _then, abort: _abort, catch: _catch }
}
