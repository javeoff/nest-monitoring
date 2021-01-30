export default interface IMyServers {
    response: {
        items: Array<any>;
        has_more: Boolean;
        offset?: Number;
    };
}
