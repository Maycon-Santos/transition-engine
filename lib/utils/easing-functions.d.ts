export declare type EasingFunction = (progress: number) => number;
export interface EasingFunctionsInterface {
    linear: EasingFunction;
    easeInQuad: EasingFunction;
    easeOutQuad: EasingFunction;
    easeInOutQuad: EasingFunction;
    easeInCubic: EasingFunction;
    easeOutCubic: EasingFunction;
    easeInOutCubic: EasingFunction;
    easeInQuart: EasingFunction;
    easeOutQuart: EasingFunction;
    easeInOutQuart: EasingFunction;
    easeInQuint: EasingFunction;
    easeOutQuint: EasingFunction;
    easeInOutQuint: EasingFunction;
}
export declare const EasingFunctions: EasingFunctionsInterface;
