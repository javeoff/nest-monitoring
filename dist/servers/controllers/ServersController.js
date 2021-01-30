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
exports.ServersController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const ServerDto_1 = require("../dto/ServerDto");
const myServersDto_1 = require("../dto/myServersDto");
const ServersDto_1 = require("../dto/ServersDto");
const VkInitDto_1 = require("../dto/VkInitDto");
const serversFinder_1 = require("../services/serversFinder");
const serversCreator_1 = require("../services/serversCreator");
const FormatResponse_1 = require("../../interceptors/FormatResponse");
const AuthGuard_1 = require("../../guards/AuthGuard");
let ServersController = class ServersController {
    constructor(serversFinder, serversCreator) {
        this.serversFinder = serversFinder;
        this.serversCreator = serversCreator;
    }
    getServers(vkInitDto, serversDto) {
        return this.serversFinder.findAll(serversDto);
    }
    getMyServers(vkInitDto, myServersDto) {
        return this.serversFinder.findByUser(vkInitDto, myServersDto);
    }
    getServersmethod() {
    }
    addServer(vkInitDto, serverDto) {
        return this.serversCreator.create(vkInitDto, serverDto);
    }
    checkServerStatus(vkInitDto, ipDto) {
    }
};
__decorate([
    common_2.Post('getServers'),
    __param(0, common_2.Headers()), __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VkInitDto_1.VkInitDto, ServersDto_1.ServersDto]),
    __metadata("design:returntype", Promise)
], ServersController.prototype, "getServers", null);
__decorate([
    common_2.Post('getMyServers'),
    __param(0, common_2.Headers()), __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VkInitDto_1.VkInitDto, myServersDto_1.MyServersDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "getMyServers", null);
__decorate([
    common_2.Post('getServersmethod'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "getServersmethod", null);
__decorate([
    common_2.Post('addServer'),
    __param(0, common_2.Headers()), __param(1, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VkInitDto_1.VkInitDto, ServerDto_1.ServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "addServer", null);
__decorate([
    common_2.Get('checkServerStatus'),
    __param(0, common_2.Headers()), __param(1, common_2.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VkInitDto_1.VkInitDto, Object]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "checkServerStatus", null);
ServersController = __decorate([
    common_1.Controller(),
    common_1.UseGuards(new AuthGuard_1.AuthGuard()),
    common_1.UseInterceptors(new FormatResponse_1.FormatResponse()),
    __metadata("design:paramtypes", [serversFinder_1.ServersFinder,
        serversCreator_1.ServersCreator])
], ServersController);
exports.ServersController = ServersController;
//# sourceMappingURL=ServersController.js.map