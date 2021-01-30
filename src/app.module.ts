import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { KnexModule } from 'nestjs-knex';
import DB_CONFIG from './config/db'
import { ServersModule } from './servers/ServersModule';
import { WallPostsModule } from './wallPosts/WallPostsModule';
import { ReviewsModule } from './reviews/ReviewsModule';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: "mysql",
        useNullAsDefault: true,
        connection: DB_CONFIG,
      },
    }),
    ServersModule,
    WallPostsModule,
    ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
