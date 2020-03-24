import { EasingFunction } from './utils/easing-functions';
interface Params {
    from: number;
    to: number;
    duration: number;
    iterationCount?: number;
    timingFunction?: EasingFunction;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    animationFunction: (Object: {
        progress: number;
        value: number;
    }) => void;
}
export declare function Animate(params: Params): Readonly<{
    stop(): void;
    continue(): void;
    pause(): void;
    start(): void;
}>;
export {};
