type Callback = (timeFraction: number) => 'continue' | 'stop' | 'restart' | 'pause'

export function loop (callback: Callback): void {
  let start: number
  let lastTime: number

  requestAnimationFrame(function tick (time) {
    if (!start) start = time

    if (lastTime) {
      start += time - lastTime
    }

    const timeFraction = time - start
    const callbackMessage = callback(timeFraction)

    if (callbackMessage === 'pause') {
      lastTime = time
    } else if (lastTime) {
      lastTime = 0
    }

    if (callbackMessage === 'restart') {
      start = 0
    }

    if (callbackMessage !== 'stop') {
      requestAnimationFrame(tick)
    }
  })
}
