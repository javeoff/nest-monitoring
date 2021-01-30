import { Module } from "@nestjs/common";
import { ReviewsController } from "./controllers/ReviewsController";
import { ReviewsCreator } from "./services/ReviewsCreator";
import { ReviewsEditor } from "./services/ReviewsEditor";
import { ReviewsFinder } from "./services/ReviewsFinder";

@Module({
    providers: [
        ReviewsCreator,
        ReviewsFinder,
        ReviewsEditor
    ],
    controllers: [
        ReviewsController
    ]
})
export class ReviewsModule {}