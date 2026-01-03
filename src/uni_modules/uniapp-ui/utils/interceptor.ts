import { noop } from "./utils"
import { isPromise } from "./check"

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void

export function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
    error,
  }: {
    args?: unknown[]
    done: (value?: unknown) => void
    canceled?: () => void
    error?: () => void
  },
) {
  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    const returnVal = interceptor.apply(null, args)
    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done(value)
          } else if (canceled) {
            canceled()
          }
        })
        .catch(error || noop)
    } else if (returnVal) {
      done(returnVal)
    } else if (canceled) {
      canceled()
    }
  } else {
    done()
  }
}
