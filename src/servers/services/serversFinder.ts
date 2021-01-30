import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from 'nestjs-knex';
import { MyServersDto } from "../dto/myServersDto";
import { ServersDto } from '../dto/ServersDto'
import { VkInitDto } from "../dto/VkInitDto";
import IMyServers from "../interfaces/IMyServers";
import IServers from '../interfaces/IServers'

const qs = require('querystring')

@Injectable()
export class ServersFinder {
    constructor(
        @InjectKnex() private readonly knex: Knex,
    ) {}

    public async findAll(serversDto: ServersDto): Promise<IServers> {
        const offset: number =  serversDto.offset || 0;
        const rawTags = serversDto.tags.map(tagId => 'FIND_IN_SET(?, tags)').join(' AND ')
        const rawVersions = serversDto.versions.map(versionId => '(min_supported_version >= ? AND max_supported_version <= ?)').join(' OR ')

        const items = await this.knex('servers')
        .where('type', serversDto.type)
        .andWhere(this.knex.raw(rawTags, serversDto.tags))
        .andWhere(this.knex.raw(rawVersions, [...serversDto.versions, ...serversDto.versions]))
        .offset(offset)
        .limit(26)
        .select('*')

        const next_offset = offset + 26

        const hasMore = ((await this.knex('servers')
        .where('type', serversDto.type)
        .andWhere(this.knex.raw(rawTags, serversDto.tags))
        .andWhere(this.knex.raw(rawVersions, [...serversDto.versions, ...serversDto.versions]))
        .offset(offset + 26)
        .limit(26)
        .select('*')).length > 0) ? true : false
        
        return {
            items,
            next_offset,
            hasMore
        }
    }
    
    public async findByUser(vkInitDto: VkInitDto, myServersDto: MyServersDto): Promise<IMyServers> {
        const offset: number = (myServersDto.offset && !isNaN(myServersDto.offset) && myServersDto.offset > 0) ? myServersDto.offset : 0;
        const user_id = qs.parse(vkInitDto['vk-params'])['vk_user_id']

        const items = await this.knex('servers')
        .where('owner_id', user_id)
        .limit(26)
        .offset(offset)
        .select('*')

        const has_more = (await this.knex('servers')
        .where('owner_id', user_id)
        .offset(offset + 26)
        .select('*')).length > 0

        return {
            items,
            has_more
        }
    }
}