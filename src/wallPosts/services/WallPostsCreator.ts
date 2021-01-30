import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from 'nestjs-knex';
import { VkInitDto } from "src/dto/VkInitDto";
import WallPostDto from "../dto/WallPostDto";
import IWallPosts from "../interfaces/IWallPosts";
import IWallPost from "../interfaces/IWallPost";
import { WallPostsFinder } from "./WallPostsFinder";

const qs = require('querystring')

@Injectable()
export class WallPostsCreator {
    constructor(
        @InjectKnex() private readonly knex: Knex,
    ) {}

    public async create(vkInitDto: VkInitDto, floodWallDto: WallPostDto) : Promise<IWallPosts> {
        const user_id: Number = qs.parse(vkInitDto['vk-params'])['vk_user_id']
        const post: IWallPost = {
            owner_id: user_id,
            created: floodWallDto.created,
            text: floodWallDto.text
        }

        await this.knex('messages').insert(post)
        return new WallPostsFinder(this.knex).findAll()
    }
}