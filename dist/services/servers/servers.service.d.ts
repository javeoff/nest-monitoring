import { Knex } from 'nestjs-knex';
import { VkInitDto } from '../../dto/vk-init-dto';
export declare class ServersService {
    private readonly knex;
    constructor(knex: Knex);
    checkServerStatus(vkInitDto: VkInitDto, ipDto: {
        ip: number;
    }): {
        response: boolean;
    };
    getServersmethod(): {
        response: {
            servers: Array<any>;
        };
    };
}
