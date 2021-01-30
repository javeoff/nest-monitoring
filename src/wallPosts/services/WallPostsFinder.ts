import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from 'nestjs-knex';
import IWallPosts from "../interfaces/IWallPosts";

@Injectable()
export class WallPostsFinder {
    constructor(
        @InjectKnex() private readonly knex: Knex,
    ) {}

    public async findAll(): Promise<IWallPosts> {
        const items = await this.updateUserFloodPosts(await this.knex('messages').select('*'))

        return {
            items
        }
    }

    async updateUserFloodPosts(posts) {
        posts = await Promise.all(
            posts.map(async r => ({
                owner: (await this.knex('users').where({vk_id: r.owner_id}).select('*'))[0],
                ...r
            }))
        )
        return posts
    }
}