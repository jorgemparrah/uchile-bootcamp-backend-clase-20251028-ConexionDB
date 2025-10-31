import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello(1);
  }

  @Get("autopistas")
  async getAutopistas(): Promise<any> {
    return await this.appService.getAutopistas();
  }

  @Get("peajes")
  async getPeajes(): Promise<any> {
    return await this.appService.getPeajes();
  }

  @Get("ciudades")
  async getCiudades(): Promise<any> {
    return await this.appService.getCiudades();
  }

  @Get("ejemplos")
  async getEjemplos(): Promise<any> {
    return await this.appService.getAutopistasEjemplos();
  }

  @Post("autopista")
  async crearAutopista(): Promise<any> {
    return await this.appService.crearAutopista();
  }

  @Patch("autopista")
  async actualizarAutopista(): Promise<any> {
    const idAActualzar = "N50";
    const dto = {
      nombre: null,
      longitud: 600
    }
    return await this.appService.actualizarAutopista(idAActualzar, dto);
  }

  @Delete("autopista/:id")
  @ApiParam({ name: "id" })
  async eliminarAutopista(@Param("id") id): Promise<any> {
    return await this.appService.eliminarAutopista(id);
  }

}
