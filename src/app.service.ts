import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import MathUtils from './utils/math'

const easyvk = require('easyvk')
const qs = require('querystring')

export class VkInitDto {
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

@Injectable()
export class AppService {
  vk: any;
  db: any;

  constructor(
      @InjectKnex() protected readonly knex: Knex,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  connectVK() {
    return easyvk({
      token: '9acc86d481266ebd34e1230032807aa81fdf5bb4df4cf27d96e69ca9dbf513e3824e8d71d34111807a1bc',
      saveSession: false,
      reauth: true
    })
  }

  insertOrUpdate = async (table_name: String, rows: IUser): Promise<Boolean> => {
    const fields: Array<any> = Object.keys(rows);
    const args: Array<any> = Object.values(rows);
    const values: String = "(" + new Array(fields.length).fill("?").join(",") + ")";

    const query = 'INSERT INTO `'+ table_name +'` (' + fields.join(',') +') VALUES '+ values + 
    ' ON DUPLICATE KEY UPDATE ' + fields.map(f => f + "=VALUES(" + f + ")").join(',');

    await this.knex.raw(query, args).catch(e => {
      console.error(`${table_name} insertOrUpdate error: `, e.message)
      return null
    });
    
    return true;
  }

  async getUser(vk_id: Number): Promise<IUser> {
    return (await this.knex('users').where({vk_id}).select('*'))[0]
  }

  async addUser(user_info: IUser) {
    return this.insertOrUpdate('users', {
      ...user_info,
      created: MathUtils.Now(true)
    })
  }

  async initApp(vkInitDto: VkInitDto): Promise<Object> {
    vkInitDto = qs.parse(vkInitDto['vk-params'])

    this.vk = await this.connectVK()
    let user = (await this.vk.call('users.get', {
      user_ids: vkInitDto.vk_user_id,
      fields: 'photo_200'
    }).catch(e => null))[0];

    if (!user) return new Error("Невалидные данные аккаунта");

    const {id, first_name, last_name, photo_200} = user
    await this.addUser({vk_id: id, first_name, last_name, photo_200});

    const minecraft_versions = await this.knex('versions').select('*')
    const minecraft_servers = await this.knex('servers').select('*')
    const tags = await this.knex('tags').select('*')
    const tag_groups = await this.knex('tags_group').select('*')

    return {
      response: {
        minecraft_servers,
        minecraft_versions,
        tags,
        tag_groups,
        vk_id: vkInitDto.vk_user_id,
        photo_200: user.photo_200
      }
    }
  }
}
