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
exports.ReviewsFinder = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
const VkInitDto_1 = require("../../dto/VkInitDto");
const qs = require('querystring');
let ReviewsFinder = class ReviewsFinder {
    constructor(knex) {
        this.knex = knex;
    }
    async updateUserReview(reviews) {
        reviews = await Promise.all(reviews.map(async (r) => (Object.assign({ owner: (await this.knex('users').where({ vk_id: r.owner_id }).select('*'))[0] }, r))));
        return reviews;
    }
    async findAll(vkInitDto, searchDto) {
        const server_id = searchDto.server_id;
        const user_id = qs.parse(vkInitDto['vk-params'])['vk_user_id'];
        const top_reviews = await this.updateUserReview((await this.knex('reviews')
            .where('server_id', server_id)
            .select('*')));
        const my_review = await this.updateUserReview((await this.knex('reviews')
            .where('server_id', server_id)
            .andWhere('owner_id', user_id)
            .select('*')));
        return {
            reviews: {
                top_reviews,
                my_review
            }
        };
    }
    async findByUser(vkInitDto, searchDto) {
        const server_id = searchDto.server_id;
        const user_id = qs.parse(vkInitDto['vk-params'])['vk_user_id'];
        const my_review = (await this.updateUserReview((await this.knex('reviews')
            .where('server_id', server_id)
            .andWhere('owner_id', user_id)
            .select('*'))))[0];
        return {
            my_review
        };
    }
};
ReviewsFinder = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_knex_1.InjectKnex()),
    __metadata("design:paramtypes", [Function])
], ReviewsFinder);
exports.ReviewsFinder = ReviewsFinder;
//# sourceMappingURL=ReviewsFinder.js.map