type Callback = (timeFraction: number) => 'continue' | 'stop'

export function loop (callback: Callback): void {
  let start: number

  requestAnimationFrame(function tick (time) {
    if (!start) start = time

    const timeFraction = time - start
    const callbackMessage = callback(timeFraction)

    if (callbackMessage === 'continue') {
      requestAnimationFrame(tick)
    }
  })
}
