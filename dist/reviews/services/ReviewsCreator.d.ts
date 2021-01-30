import { Knex } from 'nestjs-knex';
import { VkInitDto } from "src/app.service";
import { ReviewDto } from "../dto/ReviewDto";
import IReviews from "../interfaces/IReviews";
export declare class ReviewsCreator {
    private readonly knex;
    constructor(knex: Knex);
    create(vkInitDto: VkInitDto, reviewDto: ReviewDto): Promise<IReviews>;
}
