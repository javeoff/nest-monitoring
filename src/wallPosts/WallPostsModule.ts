import { Module } from "@nestjs/common";
import { WallPostsController } from "./controllers/WallPostsController";
import { WallPostsCreator } from "./services/WallPostsCreator";
import { WallPostsFinder } from "./services/WallPostsFinder";

@Module({
    providers: [
        WallPostsCreator,
        WallPostsFinder
    ],
    controllers: [
        WallPostsController
    ]
})
export class WallPostsModule {}