import { ServerDto } from "../dto/ServerDto";
import { MyServersDto } from "../dto/myServersDto";
import { ServersDto } from "../dto/ServersDto";
import { VkInitDto } from "../dto/VkInitDto";
import IServers from "../interfaces/IServers";
import { ServersFinder } from "../services/serversFinder";
import { ServersCreator } from '../services/serversCreator';
export declare class ServersController {
    private readonly serversFinder;
    private readonly serversCreator;
    constructor(serversFinder: ServersFinder, serversCreator: ServersCreator);
    getServers(vkInitDto: VkInitDto, serversDto: ServersDto): Promise<IServers>;
    getMyServers(vkInitDto: VkInitDto, myServersDto: MyServersDto): Promise<import("../interfaces/IMyServers").default>;
    getServersmethod(): void;
    addServer(vkInitDto: VkInitDto, serverDto: ServerDto): Promise<Boolean>;
    checkServerStatus(vkInitDto: VkInitDto, ServerIpDto: {
        ip: number;
    }): void;
}
