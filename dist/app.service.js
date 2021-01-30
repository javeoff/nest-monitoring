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
exports.AppService = exports.VkInitDto = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
const math_1 = require("./utils/math");
const easyvk = require('easyvk');
const qs = require('querystring');
class VkInitDto {
}
exports.VkInitDto = VkInitDto;
let AppService = class AppService {
    constructor(knex) {
        this.knex = knex;
        this.insertOrUpdate = async (table_name, rows) => {
            const fields = Object.keys(rows);
            const args = Object.values(rows);
            const values = "(" + new Array(fields.length).fill("?").join(",") + ")";
            const query = 'INSERT INTO `' + table_name + '` (' + fields.join(',') + ') VALUES ' + values +
                ' ON DUPLICATE KEY UPDATE ' + fields.map(f => f + "=VALUES(" + f + ")").join(',');
            await this.knex.raw(query, args).catch(e => {
                console.error(`${table_name} insertOrUpdate error: `, e.message);
                return null;
            });
            return true;
        };
    }
    getHello() {
        return 'Hello World!';
    }
    connectVK() {
        return easyvk({
            token: '9acc86d481266ebd34e1230032807aa81fdf5bb4df4cf27d96e69ca9dbf513e3824e8d71d34111807a1bc',
            saveSession: false,
            reauth: true
        });
    }
    async getUser(vk_id) {
        return (await this.knex('users').where({ vk_id }).select('*'))[0];
    }
    async addUser(user_info) {
        return this.insertOrUpdate('users', Object.assign(Object.assign({}, user_info), { created: math_1.default.Now(true) }));
    }
    async initApp(vkInitDto) {
        vkInitDto = qs.parse(vkInitDto['vk-params']);
        this.vk = await this.connectVK();
        let user = (await this.vk.call('users.get', {
            user_ids: vkInitDto.vk_user_id,
            fields: 'photo_200'
        }).catch(e => null))[0];
        if (!user)
            return new Error("Невалидные данные аккаунта");
        const { id, first_name, last_name, photo_200 } = user;
        await this.addUser({ vk_id: id, first_name, last_name, photo_200 });
        const minecraft_versions = await this.knex('versions').select('*');
        const minecraft_servers = await this.knex('servers').select('*');
        const tags = await this.knex('tags').select('*');
        const tag_groups = await this.knex('tags_group').select('*');
        return {
            response: {
                minecraft_servers,
                minecraft_versions,
                tags,
                tag_groups,
                vk_id: vkInitDto.vk_user_id,
                photo_200: user.photo_200
            }
        };
    }
    generateCode(vkInitDto, serverIdDto) {
        return true;
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_knex_1.InjectKnex()),
    __metadata("design:paramtypes", [Function])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map