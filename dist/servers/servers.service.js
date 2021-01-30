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
exports.ServersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
const servers_dto_1 = require("../dto/servers-dto");
const valid_token_1 = require("../decorators/valid-token");
let ServersService = class ServersService {
    constructor(knex) {
        this.knex = knex;
    }
    async getServers(serversDto) {
        let rawWheres = [];
        if (serversDto.tags) {
            serversDto.tags.forEach(tagId => {
                rawWheres.push('FIND_IN_SET(?, tags)');
            });
        }
        return {
            response: {
                items: [
                    ...(await this.knex('servers')
                        .where('type', serversDto.type)
                        .andWhere(this.knex.raw(rawWheres.join(' AND '), serversDto.tags))
                        .select('*'))
                ],
                next_offset: 0,
                hasMore: 0
            }
        };
    }
    getMyServers() {
        return { response: { servers: [] } };
    }
    getServersmethod() {
        return { response: { servers: [] } };
    }
};
__decorate([
    valid_token_1.checkAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [servers_dto_1.ServersDto]),
    __metadata("design:returntype", Promise)
], ServersService.prototype, "getServers", null);
ServersService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_knex_1.InjectKnex()),
    __metadata("design:paramtypes", [Function])
], ServersService);
exports.ServersService = ServersService;
//# sourceMappingURL=servers.service.js.map