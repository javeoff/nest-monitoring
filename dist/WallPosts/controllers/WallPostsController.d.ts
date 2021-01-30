import { VkInitDto } from 'src/dto/VkInitDto';
import WallPostDto from '../dto/WallPostDto';
import { WallPostsCreator } from '../services/WallPostsCreator';
import { WallPostsFinder } from '../services/WallPostsFinder';
export declare class WallPostsController {
    private readonly wallPostsFinder;
    private readonly wallPostsCreator;
    constructor(wallPostsFinder: WallPostsFinder, wallPostsCreator: WallPostsCreator);
    getFloodWallPosts(): Promise<import("../interfaces/IWallPosts").default>;
    addFloodWallPost(vkInitDto: VkInitDto, floodWallDto: WallPostDto): Promise<import("../interfaces/IWallPosts").default>;
}
