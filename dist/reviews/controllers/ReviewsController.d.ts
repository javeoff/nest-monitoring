import { VkInitDto } from "src/app.service";
import { ReviewDto } from "../dto/ReviewDto";
import { SearchDto } from "../dto/SearchDto";
import { UpVoteDto } from "../dto/UpVoteDto";
import { ReviewsCreator } from "../services/ReviewsCreator";
import { ReviewsEditor } from "../services/ReviewsEditor";
import { ReviewsFinder } from "../services/ReviewsFinder";
export declare class ReviewsController {
    private readonly reviewsFinder;
    private readonly reviewsCreator;
    private readonly reviewsEditor;
    constructor(reviewsFinder: ReviewsFinder, reviewsCreator: ReviewsCreator, reviewsEditor: ReviewsEditor);
    getReviews(vkInitDto: VkInitDto, searchDto: SearchDto): Promise<import("../interfaces/IReviews").default>;
    addReview(vkInitDto: VkInitDto, reviewDto: ReviewDto): Promise<import("../interfaces/IReviews").default>;
    editReview(vkInitDto: VkInitDto, reviewDto: ReviewDto): Promise<import("../interfaces/IReviews").default>;
    upVoteReview(vkInitDto: VkInitDto, upVoteDto: UpVoteDto): Promise<{
        items: any;
    }>;
}
