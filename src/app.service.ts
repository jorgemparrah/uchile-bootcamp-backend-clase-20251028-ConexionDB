import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, LessThanOrEqual, Like, MoreThan, Not, Repository } from 'typeorm';
import { Autopista } from './entities/autopista.entity';
import { Peaje } from './entities/peaje.entity';
import { Ciudad } from './entities/ciudad.entity';
import { CrearAutopistaDto } from './dto/crear-autopista.dto';
import { AutopistaMapper } from './mappers/autopista.mapper';
import { AutopistaDto } from './dto/autopista.dto';

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

  async getAutopistas() : Promise<AutopistaDto[]> {
    const em : EntityManager = this.dataSource.manager;
    const repository = em.getRepository(Autopista);
    const datos : Autopista[] = await repository.find();
    const dto = AutopistaMapper.entityToDtoGetList(datos);
    return dto;
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


  async crearAutopista(dto : CrearAutopistaDto): Promise<AutopistaDto> {
    const entidad = AutopistaMapper.dtoCrearToEntity(dto);
    const resultado = await this.autopistaRepository.save(entidad);
    console.log(resultado);
    const dtoSalida = AutopistaMapper.entityToDtoGet(resultado);
    return dtoSalida;
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

  async paginacion(nroPagina: number, cantidadPorPagina: number): Promise<any> {
    const datos = await this.autopistaRepository.find({
      order: {
        nombre: "DESC",
        id: "ASC"
      },
      skip: (cantidadPorPagina * nroPagina) - cantidadPorPagina,
      take: cantidadPorPagina
    });
    return AutopistaMapper.entityToDtoGetList(datos);
  }

  async transaccion(id: number): Promise<any> {
    const c1 : Ciudad | null = await this.dataSource.manager.findOneBy(Ciudad, {
      id: 'C1'
    });

    const c2 : Ciudad | null = await this.dataSource.manager.findOneBy(Ciudad, {
      id: 'C2'
    });

    const autopistaEntity = new Autopista();
    autopistaEntity.id = `W${id}`;
    autopistaEntity.nombre = `Autopista de Ejemplo (${id})`;
    autopistaEntity.longitudKm = 1000;
    autopistaEntity.ciudades = [];
    if (c1) {
      autopistaEntity.ciudades.push(c1);
    }
    if (c2) {
      autopistaEntity.ciudades.push(c2);
    }

    const peajeEntity = new Peaje();
    peajeEntity.id = id;
    peajeEntity.idAutopista = `W${id}`;
    peajeEntity.tarifa = id;

    try {
      await this.dataSource.manager.transaction(async (emVirtual) => {
        console.log("Creando autopista");
        await emVirtual.save(autopistaEntity);
        console.log("Autopista guardado");
        console.log("Creando peaje");
        await emVirtual.save(peajeEntity);
        console.log("Peaje guardado");
      });
    } catch (e) {
      console.log("Excepcion", e);
      throw e;
    }
    return {};
  }

  async consultaQueryBuilder(id) {
    const em = this.dataSource.manager;
    const autopistas: Autopista | null = await em.createQueryBuilder(Autopista, "a")
      .select()
      .where("a.id = :id2", { id2: id })
      .getOne();
    return autopistas;
  }

}
