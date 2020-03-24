declare type TCallback = (timeFraction: number) => 'continue' | 'stop' | 'restart' | 'pause';
export declare function loop(callback: TCallback): void;
export {};
