import { Knex } from 'nestjs-knex';
import { VkInitDto } from '../../dto/vk-init-dto';
import IMessage from '../../interfaces/IMessage';
export declare class FloodWallPostsService {
    private readonly knex;
    constructor(knex: Knex);
    updateUserFloodPosts(posts: any): Promise<any>;
    getFloodPosts(): Promise<{
        response: {
            items: Array<any>;
        };
    }>;
    addFloodPost(vkInitDto: VkInitDto, floodWallDto: IMessage): Promise<{
        response: {
            items: Array<IMessage>;
        };
    }>;
}
