import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from 'nestjs-knex';
import MathUtils from '../../utils/math'

const qs = require('querystring')

import { VkInitDto } from "src/app.service";
import { ReviewDto } from "../dto/ReviewDto";
import { ReviewsFinder } from "./ReviewsFinder";
import IReviews from "../interfaces/IReviews";
import { UpVoteDto } from "../dto/UpVoteDto";

@Injectable()
export class ReviewsEditor {
    constructor(
        @InjectKnex() private readonly knex: Knex,
    ) {}

    async edit(vkInitDto: VkInitDto, reviewDto: ReviewDto): Promise<IReviews> {
        await this.knex('reviews').update({
            review_nick: reviewDto['review_nick'],
            review_text: reviewDto['review_text'],
            stars: reviewDto['stars'],
            created: MathUtils.Now(true)
        })
        .where({
            owner_id: qs.parse(vkInitDto['vk-params'])['vk_user_id'],
            server_id: reviewDto['server_id']
        })

        const reviews: IReviews = await new ReviewsFinder(this.knex).findAll(vkInitDto, {server_id: reviewDto['server_id']})
        return reviews
    }

    async like(vkInitDto: VkInitDto, upVoteDto: UpVoteDto) {
        const likes = (await new ReviewsFinder(this.knex).findByUser(vkInitDto, upVoteDto))['my_review']['likes'] + 1
        await this.knex('reviews').update({
            likes: likes
        })
        .where({
            owner_id: qs.parse(vkInitDto['vk-params'])['vk_user_id'],
            server_id: upVoteDto['server_id']
        })

        return {items: likes}
    }
}