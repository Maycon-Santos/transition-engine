import { loop } from './utils/loop'
import { EasingFunctions, EasingFunction } from './utils/easing-functions'

interface AnimationFunctionParams {
  progress: number
  value: number
}

interface TimingParams {
  from: number
  to: number
  duration: number
  timingFunction?: EasingFunction
  animationFunction: (Object: AnimationFunctionParams) => void
}

export function timing (params: TimingParams): void {
  const {
    from,
    to,
    duration,
    timingFunction = EasingFunctions.linear,
    animationFunction,
  } = params

  const range = to - from

  loop(timeFraction => {
    const timeProgress = timeFraction / duration
    const progress = Math.min((range * timeProgress) / range, 1)
    const value = from + ((to - from) * timingFunction(progress))

    animationFunction({ progress, value })

    return progress < 1 ? 'continue' : 'stop'
  })
}
