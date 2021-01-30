export default interface IWallPosts {
    items: Array<{
        owner_id?: Number;
        created: Number;
        text: String;
    }>
}