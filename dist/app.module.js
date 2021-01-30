"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_knex_1 = require("nestjs-knex");
const db_1 = require("./config/db");
const ServersModule_1 = require("./servers/ServersModule");
const WallPostsModule_1 = require("./wallPosts/WallPostsModule");
const ReviewsModule_1 = require("./reviews/ReviewsModule");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nestjs_knex_1.KnexModule.forRoot({
                config: {
                    client: "mysql",
                    useNullAsDefault: true,
                    connection: db_1.default,
                },
            }),
            ServersModule_1.ServersModule,
            WallPostsModule_1.WallPostsModule,
            ReviewsModule_1.ReviewsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map