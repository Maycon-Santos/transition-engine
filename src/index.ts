import { timing } from './timing'
import { EasingFunctions } from './utils/easing-functions'

const $ball = document.getElementById('ball')

setTimeout(() => {
  timing({
    from: 1,
    to: 2,
    duration: 500,
    timingFunction: EasingFunctions.easeOutQuad,
    animationFunction ({ value }) {
      if ($ball) {
        $ball.style.transform = `scale(${value}, ${value})`
      }
    }
  })
}, 2000)

export default {
  timing,
  EasingFunctions,
}
