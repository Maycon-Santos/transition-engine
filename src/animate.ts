import { loop } from './utils/loop'
import { EasingFunctions, EasingFunction } from './utils/easing-functions'

interface AnimationFunctionParams {
  progress: number
  value: number
}

interface AnimateParams {
  from: number
  to: number
  duration: number
  iterationCount?: number
  timingFunction?: EasingFunction
  direction?: 'normal' | 'reverse' | 'alternate' |'alternate-reverse'
  animationFunction: (Object: AnimationFunctionParams) => void
}

interface AnimateReturn {
  start: () => void
  stop: () => void
  continue: () => void
  pause: () => void
}

export function Animate (params: AnimateParams): AnimateReturn {
  const {
    from,
    to,
    duration,
    timingFunction = EasingFunctions.linear,
    iterationCount = 1,
    direction = 'normal',
    animationFunction,
  } = params

  let stopNow = false
  let paused = false

  return Object.freeze({
    stop () { stopNow = true },
    continue () { paused = false },
    pause () { paused = true },
    start () {
      const range = to - from
      let currentDirection: (1 | -1) = direction.includes('reverse') ? -1 : 1
      let iteration = 0

      stopNow = false

      loop(timeFraction => {
        if (stopNow) return 'stop'
        if (paused) return 'pause'

        const timeProgress = timeFraction / duration
        const progress = Math.min((range * timeProgress) / range, 1)
        const valueProgress = from + ((to - from) * timingFunction(progress))
        const value = currentDirection < 0 ? from + (to - valueProgress) : valueProgress

        animationFunction({ progress, value })

        if (progress >= 1) {
          iteration++

          if (direction.includes('alternate')) {
            currentDirection *= -1
          }

          return iteration < iterationCount ? 'restart' : 'stop'
        }

        return 'continue'
      })
    },
  })
}
