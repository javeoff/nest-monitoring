"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Now = (inSeconds = false) => {
    if (inSeconds) {
        return Math.floor(new Date().getTime() / 1000);
    }
    return new Date().getTime();
};
exports.default = { Now };
//# sourceMappingURL=math.js.map