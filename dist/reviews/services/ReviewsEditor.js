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
exports.ReviewsEditor = void 0;
const common_1 = require("@nestjs/common");
const nestjs_knex_1 = require("nestjs-knex");
const math_1 = require("../../utils/math");
const qs = require('querystring');
const app_service_1 = require("../../app.service");
const ReviewsFinder_1 = require("./ReviewsFinder");
let ReviewsEditor = class ReviewsEditor {
    constructor(knex) {
        this.knex = knex;
    }
    async edit(vkInitDto, reviewDto) {
        await this.knex('reviews').update({
            review_nick: reviewDto['review_nick'],
            review_text: reviewDto['review_text'],
            stars: reviewDto['stars'],
            created: math_1.default.Now(true)
        })
            .where({
            owner_id: qs.parse(vkInitDto['vk-params'])['vk_user_id'],
            server_id: reviewDto['server_id']
        });
        const reviews = await new ReviewsFinder_1.ReviewsFinder(this.knex).findAll(vkInitDto, { server_id: reviewDto['server_id'] });
        return reviews;
    }
    async like(vkInitDto, upVoteDto) {
        const likes = (await new ReviewsFinder_1.ReviewsFinder(this.knex).findByUser(vkInitDto, upVoteDto))['my_review']['likes'] + 1;
        await this.knex('reviews').update({
            likes: likes
        })
            .where({
            owner_id: qs.parse(vkInitDto['vk-params'])['vk_user_id'],
            server_id: upVoteDto['server_id']
        });
        return { items: likes };
    }
};
ReviewsEditor = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_knex_1.InjectKnex()),
    __metadata("design:paramtypes", [Function])
], ReviewsEditor);
exports.ReviewsEditor = ReviewsEditor;
//# sourceMappingURL=ReviewsEditor.js.map