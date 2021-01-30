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
exports.FloodWallPostsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
const qs = require('querystring');
let FloodWallPostsService = class FloodWallPostsService {
    constructor(knex) {
        this.knex = knex;
    }
    async updateUserFloodPosts(posts) {
        posts = await Promise.all(posts.map(async (r) => (Object.assign({ owner: (await this.knex('users').where({ vk_id: r.owner_id }).select('*'))[0] }, r))));
        return posts;
    }
    async getFloodPosts() {
        const posts = await this.updateUserFloodPosts(await this.knex('messages').select('*'));
        return { response: { items: posts } };
    }
    async addFloodPost(vkInitDto, floodWallDto) {
        const user_id = qs.parse(vkInitDto['vk-params'])['vk_user_id'];
        const post = {
            owner_id: user_id,
            created: floodWallDto.created,
            text: floodWallDto.text
        };
        await this.knex('messages').insert(post);
        const posts = await this.getFloodPosts();
        return posts;
    }
};
FloodWallPostsService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_knex_1.InjectKnex()),
    __metadata("design:paramtypes", [Function])
], FloodWallPostsService);
exports.FloodWallPostsService = FloodWallPostsService;
//# sourceMappingURL=flood-wall-posts.service.js.map