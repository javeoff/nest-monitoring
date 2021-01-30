import { Knex } from 'nestjs-knex';
import { ServersDto } from 'src/dto/servers-dto';
import IServers from '../../interfaces/IServers';
import IMyServers from '../../interfaces/IMyServers';
import { VkInitDto } from '../../dto/vk-init-dto';
export declare class ServersService {
    private readonly knex;
    constructor(knex: Knex);
    getServers(serversDto: ServersDto): Promise<IServers>;
    getMyServers(vkInitDto: VkInitDto, myServersDto: {
        offset: number;
    }): Promise<IMyServers>;
    getServersmethod(): {
        response: {
            servers: Array<any>;
        };
    };
}
