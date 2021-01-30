import { Controller, UseGuards, UseInterceptors } from "@nestjs/common";

import { Post, Get, Headers, Body, Query } from '@nestjs/common';
import { ServerDto } from "../dto/ServerDto";
import { MyServersDto } from "../dto/myServersDto";
import { ServersDto } from "../dto/ServersDto";
import { VkInitDto } from "../dto/VkInitDto";
import IServers from "../interfaces/IServers";
import { ServersFinder } from "../services/serversFinder";
import { ServersCreator } from '../services/serversCreator'
import { FormatResponse } from "../../interceptors/FormatResponse";
import { AuthGuard } from "../../guards/AuthGuard";

@Controller()
@UseGuards(new AuthGuard())
@UseInterceptors(new FormatResponse())
export class ServersController {
    constructor(
        private readonly serversFinder: ServersFinder,
        private readonly serversCreator: ServersCreator,
    ) {}

    @Post('getServers')
    getServers(@Headers() vkInitDto: VkInitDto, @Body() serversDto: ServersDto): Promise<IServers> {
        return this.serversFinder.findAll(serversDto)
    }

    @Post('getMyServers')
    getMyServers(@Headers() vkInitDto: VkInitDto, @Body() myServersDto: MyServersDto) {
      return this.serversFinder.findByUser(vkInitDto, myServersDto);
    }
  
    @Post('getServersmethod')
    getServersmethod() {
    }
  
    @Post('addServer')
    addServer(@Headers() vkInitDto: VkInitDto, @Body() serverDto: ServerDto) { 
      return this.serversCreator.create(vkInitDto, serverDto);
    }
  
    @Get('checkServerStatus')
    checkServerStatus(@Headers() vkInitDto: VkInitDto, @Query() ipDto: {ip: number}) {
    }
}
