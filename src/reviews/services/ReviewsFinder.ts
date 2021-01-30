import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from 'nestjs-knex';

import { VkInitDto } from "src/dto/VkInitDto";
import { SearchDto } from "../dto/SearchDto";
import IReviews from "../interfaces/IReviews";
import IUserReview from "../interfaces/IUserReview";

const qs = require('querystring')

@Injectable()
export class ReviewsFinder {
    constructor(
        @InjectKnex() private readonly knex: Knex,
    ) {}

    async updateUserReview(reviews) {
        reviews = await Promise.all(
            reviews.map(async r => ({
                owner: (await this.knex('users').where({vk_id: r.owner_id}).select('*'))[0],
                ...r
            }))
        )
        return reviews
    }

    async findAll(vkInitDto: VkInitDto, searchDto: SearchDto): Promise<IReviews> {
        const server_id = searchDto.server_id
        const user_id = qs.parse(vkInitDto['vk-params'])['vk_user_id']

        // const reviews = await this.knex('reviews').where('server_id', server_id).select('*')
        // const myReviews = await this.knex('reviews').where('server_id', server_id).andWhere('owner_id', user_id).select('*')

        const top_reviews = await this.updateUserReview(
            (await this.knex('reviews')
            .where('server_id', server_id)
            .select('*'))
            )
        
        const my_review = await this.updateUserReview(
            (await this.knex('reviews')
            .where('server_id', server_id)
            .andWhere('owner_id', user_id)
            .select('*'))
            )

        return {
            reviews: {
                top_reviews,
                my_review
            }
        }
    }

    async findByUser(vkInitDto: VkInitDto, searchDto: SearchDto): Promise<IUserReview> {
        const server_id = searchDto.server_id
        const user_id = qs.parse(vkInitDto['vk-params'])['vk_user_id']
        
        const my_review = (await this.updateUserReview(
            (await this.knex('reviews')
            .where('server_id', server_id)
            .andWhere('owner_id', user_id)
            .select('*'))
            ))[0]

        return {
            my_review
        }
    }
}