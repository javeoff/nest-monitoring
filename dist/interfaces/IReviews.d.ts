export default interface IReviews {
    response: {
        reviews: {
            top_reviews: Array<any>;
            my_review: Array<any>;
        };
    };
}
