import { animate } from '../animate'

describe('Transition engine test', () => {
  it('should return the value', done => {
    const toValue = 100
    let lastValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration: 100,
      transition ({ value }) {
        expect(value).toBeGreaterThan(lastValue)
        lastValue = value
      },
      done () {
        expect(lastValue).toBe(toValue)
        done()
      }
    })

    animation.start()
  })

  it('should return the iterationProgress', done => {
    const toValue = 100
    let lastIterationProgressValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration: 100,
      transition ({ iterationProgress }) {
        expect(iterationProgress).toBeGreaterThan(lastIterationProgressValue)
        lastIterationProgressValue = iterationProgress
      },
      done () {
        expect(lastIterationProgressValue).toBe(1)
        done()
      }
    })

    animation.start()
  })

  it('should return the progress', done => {
    const toValue = 100
    let lastProgressValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration: 100,
      iterationCount: 3,
      transition ({ progress }) {
        expect(progress).toBeGreaterThanOrEqual(lastProgressValue)
        lastProgressValue = progress
      },
      done () {
        expect(lastProgressValue).toBe(1)
        done()
      }
    })

    animation.start()
  })

  it("should run with multiple duration's", done => {
    const durations = [100, 200, 300]

    let start = performance.now()

    const animation = animate({
      from: 0,
      to: -100,
      duration: durations,
      iterationCount: 3,
      transition () {
        /* do it */
      },
      iterationChange (iteration) {
        expect(performance.now() - start).toBeLessThanOrEqual(
          durations[iteration] + 40
        )
        start = performance.now()
      },
      done () {
        done()
      }
    })

    animation.start()
  })

  it("should returns multiple from's values", done => {
    const fromValues = [100, -200, -300]

    let lastIterationValue: number
    const passedFromValues: number[] = []

    const animation = animate({
      from: fromValues,
      to: 100,
      duration: 100,
      iterationCount: 3,
      transition ({ value, iteration }) {
        if (iteration !== lastIterationValue) {
          lastIterationValue = iteration
          passedFromValues.push(value)
        }
      },
      done () {
        expect(passedFromValues).toStrictEqual(fromValues)
        done()
      }
    })

    animation.start()
  })

  it("should returns multiple to's values", done => {
    const toValues = [100, -200, 300]

    let lastIterationValue: number
    let lastValue: number
    const passedToValues: number[] = []

    const animation = animate({
      from: 100,
      to: toValues,
      duration: 100,
      iterationCount: 3,
      transition ({ value, iteration }) {
        if (iteration !== lastIterationValue) {
          lastIterationValue = iteration
          if (lastValue) passedToValues.push(lastValue)
        }
        lastValue = value
      },
      done () {
        passedToValues.push(lastValue)
        expect(passedToValues).toStrictEqual(toValues)
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

  it('should return iteration value when change', done => {
    const iterationChangeSpy = jest.fn()
    const iterationValues: number[] = []

    const animation = animate({
      from: 0,
      to: 1,
      duration: 100,
      iterationCount: 5,
      transition ({ iteration }) {
        if (!iterationValues.includes(iteration)) {
          iterationValues.push(iteration)
        }
      },
      iterationChange: iterationChangeSpy,
      done () {
        expect(iterationValues).toStrictEqual([0, 1, 2, 3, 4])
        expect(iterationChangeSpy.mock.calls).toEqual([[0], [1], [2], [3], [4]])
        done()
      }
    })

    animation.start()
  })

  it('should pause and continue with last values', done => {
    const toValue = 100
    const duration = 500
    let lastIterationProgressValue = -1
    let lastValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration,
      transition ({ iterationProgress, value }) {
        lastValue = value
        lastIterationProgressValue = iterationProgress
      },
      done () {
        expect(lastIterationProgressValue).toBe(1)
        expect(lastValue).toBe(toValue)
        done()
      }
    })

    animation.start()

    setTimeout(() => {
      const currentValue = lastValue
      const currentProgress = lastIterationProgressValue
      animation.pause()
      setTimeout(() => {
        expect(currentValue).toBe(lastValue)
        expect(currentProgress).toBe(lastIterationProgressValue)
        animation.continue()
      }, 1000)
    }, duration / 2)
  })

  it('should paused property be true when the loop is paused', done => {
    const toValue = 100
    const duration = 500

    const animation = animate({
      from: 0,
      to: toValue,
      duration,
      transition () {
        /* do it */
      }
    })

    animation.start()

    setTimeout(() => {
      animation.pause()
      expect(animation.paused).toBe(true)
      done()
    }, duration / 2)
  })

  it('should running property be true when the loop is paused or started', done => {
    const toValue = 100
    const duration = 500

    const animation = animate({
      from: 0,
      to: toValue,
      duration,
      transition () {
        /* do it */
      }
    })

    animation.start()

    expect(animation.running).toBe(true)

    setTimeout(() => {
      animation.pause()
      expect(animation.running).toBe(true)
      done()
    }, duration / 2)
  })

  it('should stop loop', done => {
    const toValue = 100
    const duration = 500
    let lastIterationProgressValue = -1
    let lastValue = -1

    const animation = animate({
      from: 0,
      to: toValue,
      duration,
      transition ({ iterationProgress, value }) {
        lastValue = value
        lastIterationProgressValue = iterationProgress
      }
    })

    animation.start()

    setTimeout(() => {
      const currentValue = lastValue
      const currentProgress = lastIterationProgressValue
      animation.stop()
      setTimeout(() => {
        expect(currentValue).toBe(lastValue)
        expect(currentProgress).toBe(lastIterationProgressValue)
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
      transition ({ iterationProgress, value }) {
        if (iterationProgress === 1 && value === toValue) {
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
      transition ({ iterationProgress, value }) {
        if (iterationProgress === 1 && value === 0) {
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
            transition ({ iterationProgress, value }) {
              if (
                iterationProgress === 1 &&
                (value === 0 || value === toValue)
              ) {
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
