import { ServerDto } from "../dto/ServerDto";
import { VkInitDto } from "../dto/VkInitDto";
import { Knex } from 'nestjs-knex';
export declare class ServersCreator {
    private readonly knex;
    constructor(knex: Knex);
    create(vkInitDto: VkInitDto, serverDto: ServerDto): Promise<Boolean>;
}
