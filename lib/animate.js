"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loop_1 = require("./utils/loop");
var easing_functions_1 = require("./utils/easing-functions");
function Animate(params) {
    var from = params.from, to = params.to, duration = params.duration, _a = params.timingFunction, timingFunction = _a === void 0 ? easing_functions_1.EasingFunctions.linear : _a, _b = params.iterationCount, iterationCount = _b === void 0 ? 1 : _b, _c = params.direction, direction = _c === void 0 ? 'normal' : _c, animationFunction = params.animationFunction;
    var stopNow = false;
    var paused = false;
    return Object.freeze({
        stop: function () { stopNow = true; },
        continue: function () { paused = false; },
        pause: function () { paused = true; },
        start: function () {
            var range = to - from;
            var currentDirection = direction.includes('reverse') ? -1 : 1;
            var iteration = 0;
            stopNow = false;
            loop_1.loop(function (timeFraction) {
                if (stopNow)
                    return 'stop';
                if (paused)
                    return 'pause';
                var timeProgress = timeFraction / duration;
                var progress = Math.min((range * timeProgress) / range, 1);
                var valueProgress = from + ((to - from) * timingFunction(progress));
                var value = currentDirection < 0 ? from + (to - valueProgress) : valueProgress;
                animationFunction({ progress: progress, value: value });
                if (progress >= 1) {
                    iteration++;
                    if (direction.includes('alternate')) {
                        currentDirection *= -1;
                    }
                    return iteration < iterationCount ? 'restart' : 'stop';
                }
                return 'continue';
            });
        },
    });
}
exports.Animate = Animate;
//# sourceMappingURL=animate.js.map