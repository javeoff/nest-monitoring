"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersModule = void 0;
const common_1 = require("@nestjs/common");
const ServersController_1 = require("./controllers/ServersController");
const serversCreator_1 = require("./services/serversCreator");
const serversFinder_1 = require("./services/serversFinder");
let ServersModule = class ServersModule {
};
ServersModule = __decorate([
    common_1.Module({
        providers: [
            serversCreator_1.ServersCreator,
            serversFinder_1.ServersFinder
        ],
        controllers: [
            ServersController_1.ServersController
        ]
    })
], ServersModule);
exports.ServersModule = ServersModule;
//# sourceMappingURL=ServersModule.js.map