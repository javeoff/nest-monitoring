import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from 'nestjs-knex';
import MathUtils from '../../utils/math'

const qs = require('querystring')

import { VkInitDto } from "src/app.service";
import { ReviewDto } from "../dto/ReviewDto";
import IReviews from "../interfaces/IReviews";
import { ReviewsFinder } from "./ReviewsFinder";

@Injectable()
export class ReviewsCreator {
    constructor(
        @InjectKnex() private readonly knex: Knex,
    ) {}

    async create(vkInitDto: VkInitDto, reviewDto: ReviewDto): Promise<IReviews> {
        await this.knex('reviews').insert({
            owner_id: qs.parse(vkInitDto['vk-params'])['vk_user_id'],
            server_id: reviewDto['server_id'],
            review_nick: reviewDto['review_nick'],
            review_text: reviewDto['review_text'],
            stars: reviewDto['stars'],
            created: MathUtils.Now(true)
        })

        const reviews: IReviews = await new ReviewsFinder(this.knex).findAll(vkInitDto, {server_id: reviewDto['server_id']})
        return reviews
    }
}