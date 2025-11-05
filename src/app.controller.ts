import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { CrearAutopistaDto } from './dto/crear-autopista.dto';
import { AutopistaDto } from './dto/autopista.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello(1);
  }

  @Get("autopistas")
  async getAutopistas(): Promise<AutopistaDto[]> {
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
  @ApiBody({ type: CrearAutopistaDto })
  async crearAutopista(@Body() dto : CrearAutopistaDto): Promise<AutopistaDto> {
    return await this.appService.crearAutopista(dto);
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

  @Get("paginacion")
  async paginacion(@Query("nroPagina", new ParseIntPipe()) nroPagina: number,  @Query("cantidad", new ParseIntPipe()) cantidad: number): Promise<any> {
    return await this.appService.paginacion(nroPagina, cantidad);
  }

  @Post("transaccion/:nuevoId")
  async transaccion(@Param("nuevoId", new ParseIntPipe()) id: number): Promise<any> {
    return await this.appService.transaccion(id);
  }

  @Get("query-builder/autopista/:id")
  @ApiParam({ name: "id" })
  async buscarAutopista(@Param("id") id): Promise<any> {
    return await this.appService.consultaQueryBuilder(id);
  }

}
