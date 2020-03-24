/*
 * Code by https://gist.github.com/gre and adapted by https://gist.github.com/Maycon-Santos
 * See https://gist.github.com/gre/1650294
 */

export type EasingFunction = (progress: number) => number

export interface EasingFunctionsInterface {
  linear: EasingFunction
  easeInQuad: EasingFunction
  easeOutQuad: EasingFunction
  easeInOutQuad: EasingFunction
  easeInCubic: EasingFunction
  easeOutCubic: EasingFunction
  easeInOutCubic: EasingFunction,
  easeInQuart: EasingFunction
  easeOutQuart: EasingFunction
  easeInOutQuart: EasingFunction
  easeInQuint: EasingFunction
  easeOutQuint: EasingFunction
  easeInOutQuint: EasingFunction
}

export const easingFunctions: EasingFunctionsInterface = {
  linear (progress: number): number {
    return progress
  },
  // Quad
  easeInQuad (progress: number): number {
    return progress * progress
  },
  easeOutQuad (progress: number): number {
    return progress * (2 - progress)
  },
  easeInOutQuad (progress: number): number {
    if (progress < 0.5) {
      return 2 * progress * progress
    } else {
      return -1 + (4 - 2 * progress) * progress
    }
  },
  // Cubic
  easeInCubic (progress: number): number {
    return progress * progress * progress
  },
  easeOutCubic (progress: number): number {
    return (--progress) * progress * progress + 1
  },
  easeInOutCubic (progress: number): number {
    if (progress < 0.5) {
      return 4 * progress * progress * progress
    } else {
      return (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1
    }
  },
  // Quart
  easeInQuart (progress: number): number {
    return progress * progress * progress * progress
  },
  easeOutQuart (progress: number): number {
    return 1 - (--progress) * progress * progress * progress
  },
  easeInOutQuart (progress: number): number {
    if (progress < 0.5) {
      return 8 * progress * progress * progress * progress
    } else {
      return 1 - 8 * (--progress) * progress * progress * progress
    }
  },
  // Quint
  easeInQuint (progress: number): number {
    return progress * progress * progress * progress * progress
  },
  easeOutQuint (progress: number): number {
    return 1 + (--progress) * progress * progress * progress * progress
  },
  easeInOutQuint (progress: number): number {
    if (progress < 0.5) {
      return 16 * progress * progress * progress * progress * progress
    } else {
      return 1 + 16 * (--progress) * progress * progress * progress * progress
    }
  },
}
