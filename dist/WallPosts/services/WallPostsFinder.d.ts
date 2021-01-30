import { Knex } from 'nestjs-knex';
import IWallPosts from "../interfaces/IWallPosts";
export declare class WallPostsFinder {
    private readonly knex;
    constructor(knex: Knex);
    findAll(): Promise<IWallPosts>;
    updateUserFloodPosts(posts: any): Promise<any>;
}
