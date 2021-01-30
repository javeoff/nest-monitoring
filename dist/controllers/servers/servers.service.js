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
const qs = require('querystring');
const servers_dto_1 = require("../../dto/servers-dto");
const valid_token_1 = require("../../decorators/valid-token");
let ServersService = class ServersService {
    constructor(knex) {
        this.knex = knex;
    }
    async getServers(serversDto) {
        const rawTags = serversDto.tags.map(tagId => 'FIND_IN_SET(?, tags)').join(' AND ');
        const rawVersions = serversDto.versions.map(versionId => '(min_supported_version >= ? AND max_supported_version <= ?)').join(' OR ');
        return {
            response: {
                items: [
                    ...(await this.knex('servers')
                        .where('type', serversDto.type)
                        .andWhere(this.knex.raw(rawTags, serversDto.tags))
                        .andWhere(this.knex.raw(rawVersions, [...serversDto.versions, ...serversDto.versions]))
                        .select('*'))
                ],
                next_offset: 0,
                hasMore: 0
            }
        };
    }
    async getMyServers(vkInitDto, myServersDto) {
        const offset = (myServersDto.offset && !isNaN(myServersDto.offset) && myServersDto.offset > 0) ? myServersDto.offset : 0;
        console.log(vkInitDto['vk-params']);
        const user_id = qs.parse(vkInitDto['vk-params'])['vk_user_id'];
        console.log(offset, user_id);
        return {
            response: {
                items: [
                    ...(await this.knex('servers')
                        .where('owner_id', user_id)
                        .limit(26)
                        .offset(offset)
                        .select('*'))
                ],
                has_more: 0
            }
        };
    }
    getServersmethod() {
        return { response: { servers: [] } };
    }
};
__decorate([
    valid_token_1.checkAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ServersService.prototype, "getServersmethod", null);
ServersService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_knex_1.InjectKnex()),
    __metadata("design:paramtypes", [Function])
], ServersService);
exports.ServersService = ServersService;
//# sourceMappingURL=servers.service.js.map