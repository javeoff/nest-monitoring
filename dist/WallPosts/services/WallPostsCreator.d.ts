import { Knex } from 'nestjs-knex';
import { VkInitDto } from "src/dto/VkInitDto";
import WallPostDto from "../dto/WallPostDto";
import IWallPosts from "../interfaces/IWallPosts";
export declare class WallPostsCreator {
    private readonly knex;
    constructor(knex: Knex);
    create(vkInitDto: VkInitDto, floodWallDto: WallPostDto): Promise<IWallPosts>;
}
