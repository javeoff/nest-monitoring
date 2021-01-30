"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const qs = require('querystring');
const crypto = require('crypto');
const { APP_SECRET_KEY } = require('../config/common');
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return !!this.validToken(request['headers']['vk-params']);
    }
    validToken(urlParams) {
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
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=AuthGuard.js.map