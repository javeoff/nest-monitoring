import { Post, Get, Headers, Body, Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { VkInitDto } from 'src/dto/VkInitDto';
import WallPostDto from '../dto/WallPostDto';
import { WallPostsCreator } from '../services/WallPostsCreator';
import { WallPostsFinder } from '../services/WallPostsFinder';
import { FormatResponse } from "../../interceptors/FormatResponse";
import { AuthGuard } from "../../guards/AuthGuard";

@Controller()
@UseGuards(new AuthGuard())
@UseInterceptors(new FormatResponse())
export class WallPostsController {
    constructor(
        private readonly wallPostsFinder: WallPostsFinder,
        private readonly wallPostsCreator: WallPostsCreator
    ) {}

    @Get('getFloodWallPosts')
    getFloodWallPosts() {
      return this.wallPostsFinder.findAll();
    }
  
    @Post('addFloodWallPost')
    addFloodWallPost(@Headers() vkInitDto: VkInitDto, @Body() floodWallDto: WallPostDto) {
      return this.wallPostsCreator.create(vkInitDto, floodWallDto);
    }
}