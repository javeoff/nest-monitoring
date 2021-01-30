import { Knex } from 'nestjs-knex';
export declare class VkInitDto {
    vk_user_id: Number;
}
export default interface IUser {
    vk_id: Number;
    photo_200: String;
    last_update?: Number;
    sex?: Number;
    first_name: String;
    last_name: String;
    created?: Number;
}
export declare class AppService {
    protected readonly knex: Knex;
    vk: any;
    db: any;
    constructor(knex: Knex);
    getHello(): string;
    connectVK(): any;
    insertOrUpdate: (table_name: String, rows: IUser) => Promise<Boolean>;
    getUser(vk_id: Number): Promise<IUser>;
    addUser(user_info: IUser): Promise<Boolean>;
    initApp(vkInitDto: VkInitDto): Promise<Object>;
    generateCode(vkInitDto: VkInitDto, serverIdDto: {
        id: number;
    }): boolean;
}
