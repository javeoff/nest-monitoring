import { Knex } from 'nestjs-knex';
import { VkInitDto } from "src/dto/VkInitDto";
import { SearchDto } from "../dto/SearchDto";
import IReviews from "../interfaces/IReviews";
import IUserReview from "../interfaces/IUserReview";
export declare class ReviewsFinder {
    private readonly knex;
    constructor(knex: Knex);
    updateUserReview(reviews: any): Promise<any>;
    findAll(vkInitDto: VkInitDto, searchDto: SearchDto): Promise<IReviews>;
    findByUser(vkInitDto: VkInitDto, searchDto: SearchDto): Promise<IUserReview>;
}
