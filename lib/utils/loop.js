"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loop(callback) {
    var start;
    var lastTime;
    requestAnimationFrame(function tick(time) {
        if (!start)
            start = time;
        if (lastTime) {
            start += time - lastTime;
        }
        var timeFraction = time - start;
        var callbackMessage = callback(timeFraction);
        if (callbackMessage === 'pause') {
            lastTime = time;
        }
        else if (lastTime) {
            lastTime = 0;
        }
        if (callbackMessage === 'restart') {
            start = 0;
        }
        if (callbackMessage !== 'stop') {
            requestAnimationFrame(tick);
        }
    });
}
exports.loop = loop;
//# sourceMappingURL=loop.js.map