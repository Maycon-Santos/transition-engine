import { animate } from '../animate'

describe('Transition engine test', () => {
  it('should return the progress and value', done => {
    const toValue = 100
    let lastProgressValue = -1
    let lastValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration: 100,
      transition ({ progress, value }) {
        expect(progress).toBeGreaterThan(lastProgressValue)
        expect(value).toBeGreaterThan(lastValue)
        lastProgressValue = progress
        lastValue = value
      },
      done () {
        expect(lastProgressValue).toBe(1)
        expect(lastValue).toBe(toValue)
        done()
      }
    })

    animation.start()
  })

  it('should call callback on the end of the animation', done => {
    const doneSpy = jest.fn()
    const startCallbackSpy = jest.fn()

    const animation = animate({
      from: 0,
      to: 1,
      duration: 100,
      transition () {
        /* do it */
      },
      done: doneSpy
    })

    animation.start(startCallbackSpy)

    setTimeout(() => {
      expect(doneSpy).toBeCalled()
      expect(startCallbackSpy).toBeCalled()
      done()
    }, 200)
  })

  it('should pause and continue with last values', done => {
    const toValue = 100
    const duration = 500
    let lastProgressValue = -1
    let lastValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration,
      transition ({ progress, value }) {
        lastValue = value
        lastProgressValue = progress
      },
      done () {
        expect(lastProgressValue).toBe(1)
        expect(lastValue).toBe(toValue)
        done()
      }
    })

    animation.start()

    setTimeout(() => {
      const currentValue = lastValue
      const currentProgress = lastProgressValue
      animation.pause()
      setTimeout(() => {
        expect(currentValue).toBe(lastValue)
        expect(currentProgress).toBe(lastProgressValue)
        animation.continue()
      }, 1000)
    }, duration / 2)
  })

  it('should stop loop', done => {
    const toValue = 100
    const duration = 500
    let lastProgressValue = -1
    let lastValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration,
      transition ({ progress, value }) {
        lastValue = value
        lastProgressValue = progress
      }
    })

    animation.start()

    setTimeout(() => {
      const currentValue = lastValue
      const currentProgress = lastProgressValue
      animation.stop()
      setTimeout(() => {
        expect(currentValue).toBe(lastValue)
        expect(currentProgress).toBe(lastProgressValue)
        done()
      }, 1000)
    }, duration / 2)
  })

  it('should repeat animation with iterationCount', done => {
    const toValue = 100
    const iterationCount = 3
    let counties = 0

    const animation = animate({
      from: 0,
      to: toValue,
      duration: 100,
      iterationCount,
      transition ({ progress, value }) {
        if (progress === 1 && value === toValue) {
          counties++
        }
      },
      done () {
        expect(counties).toBe(iterationCount)
        done()
      }
    })

    animation.start()
  })

  it('should repeat animation with iterationCount with direction reverse', done => {
    const iterationCount = 3
    let counties = 0

    const animation = animate({
      from: 0,
      to: 1,
      duration: 100,
      direction: 'reverse',
      iterationCount,
      transition ({ progress, value }) {
        if (progress === 1 && value === 0) {
          counties++
        }
      },
      done () {
        expect(counties).toBe(iterationCount)
        done()
      }
    })

    animation.start()
  })

  test.each(['alternate', 'alternate-reverse'])(
    'should repeat animation with iterationCount with direction %s',
    direction => {
      const iterationCount = 3
      const toValue = 100
      let counties = 0

      function testCase () {
        return new Promise(resolve => {
          const animation = animate({
            from: 0,
            to: toValue,
            duration: 100,
            direction: direction as 'alternate' | 'alternate-reverse',
            iterationCount,
            transition ({ progress, value }) {
              if (progress === 1 && (value === 0 || value === toValue)) {
                counties++
              }
            },
            done () {
              resolve(counties)
            }
          })

          animation.start()
        })
      }

      expect(testCase()).resolves.toBe(iterationCount)
    }
  )
})
