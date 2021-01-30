import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const qs = require('querystring')
const crypto = require('crypto')
const { APP_SECRET_KEY } = require('../config/common')

@Injectable()
export class AuthGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        return !!this.validToken(request['headers']['vk-params'])
    }

    private validToken (urlParams: any) {
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
}