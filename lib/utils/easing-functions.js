"use strict";
/*
 * Code by https://gist.github.com/gre and adapted by https://gist.github.com/Maycon-Santos
 * See https://gist.github.com/gre/1650294
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasingFunctions = {
    linear: function (progress) {
        return progress;
    },
    // Quad
    easeInQuad: function (progress) {
        return progress * progress;
    },
    easeOutQuad: function (progress) {
        return progress * (2 - progress);
    },
    easeInOutQuad: function (progress) {
        if (progress < 0.5) {
            return 2 * progress * progress;
        }
        else {
            return -1 + (4 - 2 * progress) * progress;
        }
    },
    // Cubic
    easeInCubic: function (progress) {
        return progress * progress * progress;
    },
    easeOutCubic: function (progress) {
        return (--progress) * progress * progress + 1;
    },
    easeInOutCubic: function (progress) {
        if (progress < 0.5) {
            return 4 * progress * progress * progress;
        }
        else {
            return (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        }
    },
    // Quart
    easeInQuart: function (progress) {
        return progress * progress * progress * progress;
    },
    easeOutQuart: function (progress) {
        return 1 - (--progress) * progress * progress * progress;
    },
    easeInOutQuart: function (progress) {
        if (progress < 0.5) {
            return 8 * progress * progress * progress * progress;
        }
        else {
            return 1 - 8 * (--progress) * progress * progress * progress;
        }
    },
    // Quint
    easeInQuint: function (progress) {
        return progress * progress * progress * progress * progress;
    },
    easeOutQuint: function (progress) {
        return 1 + (--progress) * progress * progress * progress * progress;
    },
    easeInOutQuint: function (progress) {
        if (progress < 0.5) {
            return 16 * progress * progress * progress * progress * progress;
        }
        else {
            return 1 + 16 * (--progress) * progress * progress * progress * progress;
        }
    },
};
//# sourceMappingURL=easing-functions.js.map