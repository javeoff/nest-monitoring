import { Knex } from 'nestjs-knex';
import { MyServersDto } from "../dto/myServersDto";
import { ServersDto } from '../dto/ServersDto';
import { VkInitDto } from "../dto/VkInitDto";
import IMyServers from "../interfaces/IMyServers";
import IServers from '../interfaces/IServers';
export declare class ServersFinder {
    private readonly knex;
    constructor(knex: Knex);
    findAll(serversDto: ServersDto): Promise<IServers>;
    findByUser(vkInitDto: VkInitDto, myServersDto: MyServersDto): Promise<IMyServers>;
}
