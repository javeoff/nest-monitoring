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
exports.WallPostsController = void 0;
const common_1 = require("@nestjs/common");
const VkInitDto_1 = require("../../dto/VkInitDto");
const WallPostDto_1 = require("../dto/WallPostDto");
const WallPostsCreator_1 = require("../services/WallPostsCreator");
const WallPostsFinder_1 = require("../services/WallPostsFinder");
const FormatResponse_1 = require("../../interceptors/FormatResponse");
const AuthGuard_1 = require("../../guards/AuthGuard");
let WallPostsController = class WallPostsController {
    constructor(wallPostsFinder, wallPostsCreator) {
        this.wallPostsFinder = wallPostsFinder;
        this.wallPostsCreator = wallPostsCreator;
    }
    getFloodWallPosts() {
        return this.wallPostsFinder.findAll();
    }
    addFloodWallPost(vkInitDto, floodWallDto) {
        return this.wallPostsCreator.create(vkInitDto, floodWallDto);
    }
};
__decorate([
    common_1.Get('getFloodWallPosts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WallPostsController.prototype, "getFloodWallPosts", null);
__decorate([
    common_1.Post('addFloodWallPost'),
    __param(0, common_1.Headers()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VkInitDto_1.VkInitDto, WallPostDto_1.default]),
    __metadata("design:returntype", void 0)
], WallPostsController.prototype, "addFloodWallPost", null);
WallPostsController = __decorate([
    common_1.Controller(),
    common_1.UseGuards(new AuthGuard_1.AuthGuard()),
    common_1.UseInterceptors(new FormatResponse_1.FormatResponse()),
    __metadata("design:paramtypes", [WallPostsFinder_1.WallPostsFinder,
        WallPostsCreator_1.WallPostsCreator])
], WallPostsController);
exports.WallPostsController = WallPostsController;
//# sourceMappingURL=WallPostsController.js.map