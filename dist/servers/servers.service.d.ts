import { Knex } from 'nestjs-knex';
import { ServersDto } from 'src/dto/servers-dto';
import IServers from '../interfaces/IServers';
export declare class ServersService {
    private readonly knex;
    constructor(knex: Knex);
    getServers(serversDto: ServersDto): Promise<IServers>;
    getMyServers(): {
        response: {
            servers: Array<any>;
        };
    };
    getServersmethod(): {
        response: {
            servers: Array<any>;
        };
    };
}
