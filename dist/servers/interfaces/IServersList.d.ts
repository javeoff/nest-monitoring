export default interface ServersListDto {
    type: Number;
    offset: number;
    search: string;
    tags: Array<string>;
    versions: Array<string>;
}
