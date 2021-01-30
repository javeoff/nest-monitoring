import { Knex } from 'nestjs-knex';
import { VkInitDto } from "src/app.service";
import { ReviewDto } from "../dto/ReviewDto";
import IReviews from "../interfaces/IReviews";
import { UpVoteDto } from "../dto/UpVoteDto";
export declare class ReviewsEditor {
    private readonly knex;
    constructor(knex: Knex);
    edit(vkInitDto: VkInitDto, reviewDto: ReviewDto): Promise<IReviews>;
    like(vkInitDto: VkInitDto, upVoteDto: UpVoteDto): Promise<{
        items: any;
    }>;
}
