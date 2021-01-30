import { Injectable } from "@nestjs/common";
import { ServerDto } from "../dto/ServerDto";
import { VkInitDto } from "../dto/VkInitDto";
import { InjectKnex, Knex } from 'nestjs-knex';

const qs = require('querystring')

@Injectable()
export class ServersCreator {
    constructor(
        @InjectKnex() private readonly knex: Knex,
    ) {}

    public async create(vkInitDto: VkInitDto, serverDto: ServerDto): Promise<Boolean> {
        delete serverDto['u']

        // 123

        await this.knex('servers').insert({
            ...serverDto,
            tags: JSON.parse(serverDto['tags']) && '',
            show_favicon: serverDto['show_favicon'] == 'true',
            owner_id: qs.parse(vkInitDto['vk-params'])['vk_user_id']
        })

        return true
    }
}