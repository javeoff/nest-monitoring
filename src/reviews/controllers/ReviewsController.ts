import { Controller, UseGuards, UseInterceptors } from "@nestjs/common";
import { Post, Get, Headers, Body, Query } from '@nestjs/common';
import { VkInitDto } from "src/app.service";
import { AuthGuard } from "src/guards/AuthGuard";
import { FormatResponse } from "src/interceptors/FormatResponse";
import { ReviewDto } from "../dto/ReviewDto";
import { SearchDto } from "../dto/SearchDto";
import { UpVoteDto } from "../dto/UpVoteDto";
import { ReviewsCreator } from "../services/ReviewsCreator";
import { ReviewsEditor } from "../services/ReviewsEditor";
import { ReviewsFinder } from "../services/ReviewsFinder";

@Controller()
@UseGuards(new AuthGuard())
@UseInterceptors(new FormatResponse())
export class ReviewsController {
    constructor(
        private readonly reviewsFinder: ReviewsFinder,
        private readonly reviewsCreator: ReviewsCreator,
        private readonly reviewsEditor: ReviewsEditor,
    ) {}

    @Get('getReviews')
    getReviews(@Headers() vkInitDto: VkInitDto, @Query() searchDto: SearchDto) {
      return this.reviewsFinder.findAll(vkInitDto, searchDto);
    }
  
    @Post('addReview')
    addReview(@Headers() vkInitDto: VkInitDto, @Body() reviewDto: ReviewDto) {
      return this.reviewsCreator.create(vkInitDto, reviewDto)
    }
  
    @Post('editReview')
    editReview(@Headers() vkInitDto: VkInitDto, @Body() reviewDto: ReviewDto) {
      return this.reviewsEditor.edit(vkInitDto, reviewDto)
    }

    @Get('upVoteReview')
    upVoteReview(@Headers() vkInitDto: VkInitDto, @Query() upVoteDto: UpVoteDto) {
        return this.reviewsEditor.like(vkInitDto, upVoteDto)
    }
}