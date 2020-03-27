import { loop } from './utils/loop'
import { easingFunctions, EasingFunction } from './utils/easing-functions'

interface Params {
  from: number | number[]
  to: number | number[]
  duration: number | number[]
  iterationCount?: number
  timingFunction?: EasingFunction | EasingFunction[]
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  transition: (Object: {
    iterationProgress: number
    progress: number
    value: number
    iteration: number
  }) => void
  iterationChange?: (iteration: number) => void
  done?: () => void
}

export function animate (params: Params) {
  const {
    from: rawFrom,
    to: rawTo,
    duration: rawDuration,
    timingFunction: rawTimingFunction = easingFunctions.linear,
    iterationCount = 1,
    direction = 'normal',
    transition,
    iterationChange,
    done
  } = params

  let stopNow = false
  let paused = false
  let running = false

  const fromArr = Array.isArray(rawFrom) ? rawFrom : [rawFrom]
  const toArr = Array.isArray(rawTo) ? rawTo : [rawTo]
  const durationArr = Array.isArray(rawDuration) ? rawDuration : [rawDuration]
  const timingFunctionArr = Array.isArray(rawTimingFunction)
    ? rawTimingFunction
    : [rawTimingFunction]

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
    get paused () {
      return paused
    },
    get running () {
      return running
    },
    start (callback?: () => void) {
      let currentDirection: 1 | -1 = direction.includes('reverse') ? -1 : 1
      let iteration = 0

      let from = fromArr[0]
      let to = toArr[0]
      let duration = durationArr[0]
      let timingFunction = timingFunctionArr[0]

      stopNow = false
      running = true

      loop(timeFraction => {
        if (stopNow) return 'stop'
        if (paused) return 'pause'

        const range = to - from

        const timeProgress = timeFraction / duration
        const iterationProgress = Math.min(
          (range * timeProgress) / range || timeProgress,
          1
        )
        const valueProgress =
          from + (to - from) * timingFunction(iterationProgress)
        const value =
          currentDirection < 0 ? from + (to - valueProgress) : valueProgress

        const progress = (iterationProgress + iteration) / iterationCount

        transition({ progress, iterationProgress, value, iteration })

        if (iterationProgress >= 1) {
          if (iterationChange) iterationChange(iteration)

          iteration++

          if (direction.includes('alternate')) {
            currentDirection *= -1
          }

          if (iteration < iterationCount) {
            const fromKey = iteration % fromArr.length
            const toKey = iteration % toArr.length
            const durationKey = iteration % durationArr.length
            const timingFunctionKey = iteration % timingFunctionArr.length

            from = fromArr[fromKey]
            to = toArr[toKey]
            duration = durationArr[durationKey]
            timingFunction = timingFunctionArr[timingFunctionKey]

            return 'restart'
          }

          if (done) done()
          if (callback) callback()

          running = false

          return 'stop'
        }

        return 'continue'
      })
    }
  })
}
