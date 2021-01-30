"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const ReviewsController_1 = require("./controllers/ReviewsController");
const ReviewsCreator_1 = require("./services/ReviewsCreator");
const ReviewsEditor_1 = require("./services/ReviewsEditor");
const ReviewsFinder_1 = require("./services/ReviewsFinder");
let ReviewsModule = class ReviewsModule {
};
ReviewsModule = __decorate([
    common_1.Module({
        providers: [
            ReviewsCreator_1.ReviewsCreator,
            ReviewsFinder_1.ReviewsFinder,
            ReviewsEditor_1.ReviewsEditor
        ],
        controllers: [
            ReviewsController_1.ReviewsController
        ]
    })
], ReviewsModule);
exports.ReviewsModule = ReviewsModule;
//# sourceMappingURL=ReviewsModule.js.map