import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, LessThanOrEqual, Like, MoreThan, Not, Repository } from 'typeorm';
import { Autopista } from './entities/autopista.entity';
import { Peaje } from './entities/peaje.entity';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Peaje) private readonly peajeRepository: Repository<Peaje>,
    @InjectRepository(Autopista) private readonly autopistaRepository: Repository<Autopista>
  ) {
  }

  async getHello(id) : Promise<any> {
    const instruccion = `SELECT c.rut, c.nombre, v.patente FROM VEHICULO v INNER JOIN CONDUCTOR c ON v.rut_conductor = c.rut;`;
    const resultado = await this.dataSource.query(instruccion);
    console.log(resultado);
    return resultado;
  }

  async getAutopistas() : Promise<any> {
    const em : EntityManager = this.dataSource.manager;
    const repository = em.getRepository(Autopista);
    const datos = await repository.find();
    return datos;
  }

  async getPeajes() : Promise<any> {
    const datos = await this.peajeRepository.find();
    return datos;
  }

  async getCiudades() : Promise<any> {
    const em : EntityManager = this.dataSource.manager;
    const datos = await em.find(Ciudad);
    return datos;
  }

  async getAutopistasEjemplos(): Promise<any> {
    const datos = await this.autopistaRepository.find({
      select: {
        id: true,
        nombre: true,
        longitudKm: true,
      },
      where: {
        nombre: Like("%a"),
        longitudKm: Not(In([
          433, 310
        ]))
      },
      // relations: {
      //   peajes: true,
      //   ciudades: true
      // },
      order: {
        nombre: "DESC",
        id: "ASC"
      },
      skip: 0,
      take: 5
    });
    return datos;
  }


  async crearAutopista(): Promise<any> {
    const entidad = new Autopista();
    entidad.id = "N50";
    entidad.nombre = "Autopista de Ejemplo4";
    entidad.longitudKm = 1000;
    const resultado = await this.autopistaRepository.save(entidad);
    console.log(resultado);
    return resultado;
  }


  async actualizarAutopista(id, dto): Promise<any> {
    const entidad = await this.autopistaRepository.findOneBy({ id });
    if (!entidad) {
      throw new NotFoundException("La entidad no existe");
    }
    if (dto.nombre) {
      entidad.nombre = dto.nombre;;
    }
    if (dto.longitud) {
      entidad.longitudKm = dto.longitud;
    }
    const resultado = await this.autopistaRepository.save(entidad);
    console.log(resultado);


    // OTRA MANERA
    const resultado2 = await this.autopistaRepository.update({
      id: "N51"
    }, {
      nombre: "Autopista de prueba",
      longitudKm: 8000
    });
    return resultado2;
  }

  async eliminarAutopista(id): Promise<any> {
    const entidad = await this.autopistaRepository.findOneBy({ id });
    if (!entidad) {
      throw new NotFoundException("La entidad no existe");
    }
    const resultado = await this.autopistaRepository.delete(id);
    console.log(resultado);
    return entidad;
  }
}
