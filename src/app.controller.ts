import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  async getHello(@Param("id") id: string): Promise<any> {
    return await this.appService.getHello(id);
  }
}
