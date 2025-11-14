import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AutopistaDto } from './dto/autopista.dto';
import { MongoService } from './mongo.service';
import { CrearAutopistaDto } from './dto/crear-autopista.dto';
import { ActualizarAutopistaDto } from './dto/actualizar-autopista.dto';
import { CargaDatosDto } from './dto/carga-datos.dto';
import { PeajeDto } from './dto/peaje.dto';
import { CargaDatosNumberDto } from './dto/carga-datos-number.dto';

@Controller("mongo")
export class MongoController {
  constructor(private readonly appService: MongoService) {}

  @Get("autopistas")
  async getAutopistas(): Promise<AutopistaDto[]> {
    return await this.appService.getAutopistas();
  }

  @Get("filtro-autopistas")
  async getAutopistasDesdeKm(@Query("minKm") minKm : number): Promise<AutopistaDto[]> {
    return await this.appService.getAutopistaDesdeKmMin(minKm);
  }

  @Get("autopistas/:id")
  async getAutopistaById(@Param("id") id: string): Promise<AutopistaDto> {
    return await this.appService.getAutopistaById(id);
  }

  @Post("autopistas")
  async createAutopista(@Body() body: CrearAutopistaDto): Promise<AutopistaDto> {
    return await this.appService.crearAutopista(body);
  }

  @Patch("autopistas/:id")
  async actualizarAutopista(@Param("id") id: string, @Body() body: ActualizarAutopistaDto): Promise<AutopistaDto> {
    return await this.appService.actualizarAutopista(id, body);
  }

  @Delete("autopistas/:id")
  async eliminarAutopista(@Param("id") id: string): Promise<AutopistaDto> {
    return await this.appService.eliminarAutopista(id);
  }


  @Post("carga-datos-autopista")
  async cargarDatosAutopista(@Body() input : CargaDatosDto ): Promise<AutopistaDto[]> {
    return await this.appService.cargarDatosAutopista(input.ids);
  }

  @Post("carga-datos-peaje")
  async cargarDatosPeaje(@Body() input : CargaDatosNumberDto ): Promise<PeajeDto[]> {
    return await this.appService.cargarDatosPeaje(input.ids);
  }

  @Get("agregacion")
  async agregacion(): Promise<PeajeDto[]> {
    return await this.appService.reporteAgregacion();
  }

  @Get("agregacion2")
  async agregacion2(): Promise<PeajeDto[]> {
    return await this.appService.reporteAgregacion2();
  }

}
