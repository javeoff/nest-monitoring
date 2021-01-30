"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersCreator = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
const qs = require('querystring');
let ServersCreator = class ServersCreator {
    constructor(knex) {
        this.knex = knex;
    }
    async create(vkInitDto, serverDto) {
        await this.knex('servers').insert(Object.assign(Object.assign({}, serverDto), { tags: JSON.parse(serverDto['tags']) && '', show_favicon: serverDto['show_favicon'] == 'true', owner_id: qs.parse(vkInitDto['vk-params'])['vk_user_id'] }));
        return true;
    }
};
ServersCreator = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_knex_1.InjectKnex()),
    __metadata("design:paramtypes", [Function])
], ServersCreator);
exports.ServersCreator = ServersCreator;
//# sourceMappingURL=serversCreator.js.map