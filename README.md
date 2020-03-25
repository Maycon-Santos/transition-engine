# Transition Engine

> Make animations easily (ง ° ͜ ʖ °)ง

The API was inspired by the css animate, all property accepts is like the css properties. Designed to be the bare minimum necessary to create great animations.

## Install

```sh
yarn add transition-engine
```

## Simple usage

```javascript
import animate from 'transition-engine'

const animation = animate({
  from: 0,
  to: 100,
  duration,
  transition ({ value }) {
    element.style.width = value + 'px'
  }
})

animation.start()
```

## Properties
```typescript
  from: number
  to: number
  duration: number
  iterationCount?: number
  timingFunction?: EasingFunction
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  transition: (Object: { progress: number; value: number }) => void
  done?: () => void
```

### from

Initial value parameter of the [transition function](#transition).

### to

Final value parameter of the [transition function](#transition).

### duration

Defines how long time an animation should take to complete.

### iterationCount

Number of times the animation will run after the start.

### timingFunction

It receives a function that handles the delta time to generate effects in the transition. Like it:
```javascript
progress => --progress * progress * progress + 1
```
_[Learn more about easing functions.](https://easings.net/)_  
But to facilitate our work, the project has a list of easing functions. Example:
```javascript
import animate, { easingFunctions } from 'transition-engine'

const animation = animate({
  timingFunction: easingFunctions.easeOutQuad,
  ...
})
```
**[Easing functions avaiable.](#easingFunctions)**  

### direction
- **normal:** The animation is played as normal (forwards). This is default
- **reverse:** The animation is played in reverse direction (backwards)
- **alternate:** The animation is played forwards first, then backwards
- **alternate-reverse:** The animation is played backwards first, then forwards

### transition

Function that receives an object with the value and progress keys. This function will run in a loop and these values will be increased according to the progress of the animation.

### done

Is the simple callback of the animation.

## start, stop, pause and continue

These are methods that can be called at any time during the animation, making it possible to `pause()` and `continue()` later.  
You cannot resume the animation using `continue()` if you use `stop()`.

```javascript
const animation = animate({
  from: 0,
  to: 300,
  duration: 1000,
  transition ({ progress, value }) { ... }
})

animation.start()

setTimeout(() => {
  animation.pause()
  
  setTimeout(() => {
    animation.continue()
  }, 1000)
}, 500)
```

## easingFunctions
- linear
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint
