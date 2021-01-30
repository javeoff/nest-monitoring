"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const qs = require('querystring');
const crypto = require('crypto');
const { APP_SECRET_KEY } = require('../config/common');
function validToken(urlParams) {
    urlParams = qs.parse(urlParams);
    const ordered = {};
    Object.keys(urlParams).sort().forEach((key) => {
        if (key.slice(0, 3) === 'vk_') {
            ordered[key] = urlParams[key];
        }
    });
    const stringParams = qs.stringify(ordered);
    const paramsHash = crypto
        .createHmac('sha256', APP_SECRET_KEY)
        .update(stringParams)
        .digest()
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=$/, '');
    return paramsHash === urlParams.sign;
}
function checkAuth() {
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (validToken(args[0]['vk-params'])) {
                const result = originalMethod.apply(this, args);
                return result;
            }
            return null;
        };
    };
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=valid-token.js.map