import { Body, Controller, Get, Headers, Param, Post, Query, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';

import { VkInitDto } from './dto/VkInitDto'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('initApp')
  initApp(@Headers() vkInitDto: VkInitDto): any {
    return this.appService.initApp(vkInitDto);
  }
}
