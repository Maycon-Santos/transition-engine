import { loop } from './utils/loop'
import { easingFunctions, EasingFunction } from './utils/easing-functions'

interface Params {
  from: number
  to: number
  duration: number
  iterationCount?: number
  timingFunction?: EasingFunction | EasingFunction[]
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  transition: (Object: { progress: number; value: number }) => void
  done?: () => void
}

export function animate (params: Params) {
  const {
    from,
    to,
    duration,
    timingFunction = easingFunctions.linear,
    iterationCount = 1,
    direction = 'normal',
    transition,
    done
  } = params

  let stopNow = false
  let paused = false

  return Object.freeze({
    stop () {
      stopNow = true
    },
    continue () {
      paused = false
    },
    pause () {
      paused = true
    },
    start (callback?: () => void) {
      const range = to - from
      let currentDirection: 1 | -1 = direction.includes('reverse') ? -1 : 1
      let iteration = 0
      let currentTimingFunctionKey = 0

      stopNow = false

      loop(timeFraction => {
        if (stopNow) return 'stop'
        if (paused) return 'pause'

        const currentTimingFunction = Array.isArray(timingFunction)
          ? timingFunction[currentTimingFunctionKey]
          : timingFunction
        const timeProgress = timeFraction / duration
        const progress = Math.min((range * timeProgress) / range, 1)
        const valueProgress =
          from + (to - from) * currentTimingFunction(progress)
        const value =
          currentDirection < 0 ? from + (to - valueProgress) : valueProgress

        transition({ progress, value })

        if (progress >= 1) {
          iteration++

          if (currentTimingFunctionKey + 1 < iterationCount) {
            currentTimingFunctionKey++
          } else {
            currentTimingFunctionKey = 0
          }

          if (direction.includes('alternate')) {
            currentDirection *= -1
          }

          if (iteration < iterationCount) {
            return 'restart'
          }

          if (done) done()
          if (callback) callback()
          return 'stop'
        }

        return 'continue'
      })
    }
  })
}
