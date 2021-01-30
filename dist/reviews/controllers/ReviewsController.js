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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const app_service_1 = require("../../app.service");
const AuthGuard_1 = require("../../guards/AuthGuard");
const FormatResponse_1 = require("../../interceptors/FormatResponse");
const ReviewDto_1 = require("../dto/ReviewDto");
const SearchDto_1 = require("../dto/SearchDto");
const UpVoteDto_1 = require("../dto/UpVoteDto");
const ReviewsCreator_1 = require("../services/ReviewsCreator");
const ReviewsEditor_1 = require("../services/ReviewsEditor");
const ReviewsFinder_1 = require("../services/ReviewsFinder");
let ReviewsController = class ReviewsController {
    constructor(reviewsFinder, reviewsCreator, reviewsEditor) {
        this.reviewsFinder = reviewsFinder;
        this.reviewsCreator = reviewsCreator;
        this.reviewsEditor = reviewsEditor;
    }
    getReviews(vkInitDto, searchDto) {
        return this.reviewsFinder.findAll(vkInitDto, searchDto);
    }
    addReview(vkInitDto, reviewDto) {
        return this.reviewsCreator.create(vkInitDto, reviewDto);
    }
    editReview(vkInitDto, reviewDto) {
        return this.reviewsEditor.edit(vkInitDto, reviewDto);
    }
    upVoteReview(vkInitDto, upVoteDto) {
        return this.reviewsEditor.like(vkInitDto, upVoteDto);
    }
};
__decorate([
    common_2.Get('getReviews'),
    __param(0, common_2.Headers()), __param(1, common_2.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_service_1.VkInitDto, SearchDto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getReviews", null);
__decorate([
    common_2.Post('addReview'),
    __param(0, common_2.Headers()), __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_service_1.VkInitDto, ReviewDto_1.ReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "addReview", null);
__decorate([
    common_2.Post('editReview'),
    __param(0, common_2.Headers()), __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_service_1.VkInitDto, ReviewDto_1.ReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "editReview", null);
__decorate([
    common_2.Get('upVoteReview'),
    __param(0, common_2.Headers()), __param(1, common_2.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_service_1.VkInitDto, UpVoteDto_1.UpVoteDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "upVoteReview", null);
ReviewsController = __decorate([
    common_1.Controller(),
    common_1.UseGuards(new AuthGuard_1.AuthGuard()),
    common_1.UseInterceptors(new FormatResponse_1.FormatResponse()),
    __metadata("design:paramtypes", [ReviewsFinder_1.ReviewsFinder,
        ReviewsCreator_1.ReviewsCreator,
        ReviewsEditor_1.ReviewsEditor])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=ReviewsController.js.map