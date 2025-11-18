import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutopistaDto } from './dto/autopista.dto';
import { CrearAutopistaDto } from './dto/crear-autopista.dto';
import { Autopista, AutopistaDocument } from './schemas/autopista.schema';
import { ActualizarAutopistaDto } from './dto/actualizar-autopista.dto';
import { AutopistaMapper } from './mappers/autopista.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Autopista as AutopistaEntity } from './entities/autopista.entity';
import { Peaje as PeajeEntity } from './entities/peaje.entity';
import { In, Repository } from 'typeorm';
import { Peaje, PeajeDocument } from './schemas/peaje.schema';
import { PeajeMapper } from './mappers/peaje.mapper';
import { PeajeDto } from './dto/peaje.dto';

@Injectable()
export class MongoService {

  constructor(
    @InjectRepository(AutopistaEntity)
    private readonly autopistaRepository: Repository<AutopistaEntity>,

    @InjectModel(Autopista.name)
    private readonly autopistaModel: Model<AutopistaDocument>,


    @InjectRepository(PeajeEntity)
    private readonly peajeRepository: Repository<PeajeEntity>,

    @InjectModel(Peaje.name)
    private readonly peajeModel: Model<PeajeDocument>
  ) {}

  async getAutopistas() {
    const autopistaLista : AutopistaDocument[] = await this.autopistaModel.find({});
    return AutopistaMapper.documentToDtoGetList(autopistaLista);
  }

  async getAutopistaById(id: string) {
    const autopistaDoc : AutopistaDocument | null = await this.autopistaModel.findOne({
      id: id
    });
    if (!autopistaDoc) {
      throw new NotFoundException(`No se encontro la autopista con id: ${id}`)
    }

    return AutopistaMapper.documentToDtoGet(autopistaDoc);
  }

  async getAutopistaDesdeKmMin(longitud: number) {
    const autopistaLista : AutopistaDocument[] = await this.autopistaModel.find({
      longitudKm: {
        $gte: longitud
      }
    });
    return AutopistaMapper.documentToDtoGetList(autopistaLista);
  }

  async crearAutopista(dto : CrearAutopistaDto) : Promise<AutopistaDto> {
    /*
    const autopistaSchema : Autopista = new Autopista();
    autopistaSchema.id = "PMONGO_" + dto.id;
    autopistaSchema.nombre = dto.nombre;
    autopistaSchema.longitudKm = dto.longitudKm;

    const resultado1 = await this.autopistaModel.create(autopistaSchema);
    console.log(resultado1);

    const output = new AutopistaDto();
    output.id = resultado1.id;
    output.nombre = resultado1.nombre;
    output.longitud = `${resultado1.longitudKm} Km`;
    return output;
    */
    
    const autopistaDoc : AutopistaDocument = new this.autopistaModel({
      id: "PMONGO_" + dto.id,
      nombre: dto.nombre,
      longitudKm: dto.longitudKm
    });
    const resultado2 = await autopistaDoc.save();
    console.log(resultado2);

    const output = new AutopistaDto();
    output.id = autopistaDoc.id;
    output.nombre = autopistaDoc.nombre;
    output.longitud = `${autopistaDoc.longitudKm} Km`;
    return output;
  }

  async actualizarAutopista(id: string, dto : ActualizarAutopistaDto) : Promise<AutopistaDto> {
      /*
    const autopistaDoc : AutopistaDocument | null = await this.autopistaModel.findOne({
      id: id
    });

    if (!autopistaDoc) {
      throw new NotFoundException(`No se encontro la autopista con id: ${id}`)
    }

    if (dto.nombre && dto.nombre != autopistaDoc.nombre) {
      autopistaDoc.nombre = dto.nombre;
    }

    if (dto.longitudKm && dto.longitudKm != autopistaDoc.longitudKm) {
      autopistaDoc.longitudKm = dto.longitudKm;
    }

    const resultado2 = await autopistaDoc.save();
    console.log(resultado2);
    */

    const resultado3 = await this.autopistaModel.updateOne({ id: id },
    {
      nombre: dto.nombre,
      longitudKm: dto.longitudKm
    });
    console.log(resultado3)

    const output = new AutopistaDto();
    // output.id = resultado3.id;
    // output.nombre = resultado3.nombre;
    // output.longitud = `${resultado3.longitudKm} Km`;
    return output;
  }

  async eliminarAutopista(id: string) : Promise<AutopistaDto> {
    const resultado = await this.autopistaModel.deleteOne({ id: id });
    console.log(resultado);

    const output = new AutopistaDto();
    // output.id = resultado3.id;
    // output.nombre = resultado3.nombre;
    // output.longitud = `${resultado3.longitudKm} Km`;
    return output;
  }

  async cargarDatosAutopista(ids: string[]): Promise<AutopistaDto[]> {
    const listaEntities : AutopistaEntity[] = await this.autopistaRepository.findBy({
      id: In(ids)
    })

    const listaSchema : Autopista[] = AutopistaMapper.entityToSchemaList(listaEntities);

    for (const schema of listaSchema) {
        const autopistaDoc : AutopistaDocument | null = await this.autopistaModel.findOne({
          id: schema.id
        });
        if (!autopistaDoc) {
          const resultado = await this.autopistaModel.create(schema);
          console.log(resultado);
        }
    }

    const autopistaDoc : AutopistaDocument[] = await this.autopistaModel.find({
      id: {
        $in: ids
      }
    });

    return AutopistaMapper.documentToDtoGetList(autopistaDoc);
  }

  async cargarDatosPeaje(ids: number[]): Promise<PeajeDto[]> {
    const listaEntities : PeajeEntity[] = await this.peajeRepository.findBy({
      id: In(ids)
    })

    const listaSchema : Peaje[] = PeajeMapper.entityToSchemaList(listaEntities);

    for (const schema of listaSchema) {
        const peajeDoc : PeajeDocument | null = await this.peajeModel.findOne({
          id: schema.id
        });
        const autopistaDoc : AutopistaDocument | null = await this.autopistaModel.findOne({
          id: schema.idAutopista
        });
        if (autopistaDoc) {
          schema.autopista = autopistaDoc._id;
        }

        if (!peajeDoc) {
          const resultado = await this.peajeModel.create(schema);
          console.log(resultado);
        }
    }

    const peajeDoc : PeajeDocument[] = await this.peajeModel.find({
      id: {
        $in: ids
      }
    }).populate("autopista");
    console.log(peajeDoc)
    return PeajeMapper.documentToDtoGetList(peajeDoc);
  }

  async reporteAgregacion() {
    const resultado = await this.peajeModel.aggregate([
      {
        $match: {
          tarifa: {
            $gt: 1000
          }
        }
      },{
        $lookup: {
          from: "autopista",
          localField: "idAutopista",
          foreignField: "id",
          as: "autopista"
        }
      },{
        $unwind: {
          path: "$autopista"
        }
      },{
        $project: {
          _id: 0,
          id: 1,
          tarifa: 1,
          autopista: {
              $concat: ["$autopista.nombre", " (", "$autopista.id" , ")"]
          },
          tipo: {
            $first: {
              $split: [ "$autopista.nombre", " " ]
            }
          }
        }
      },{
        $group: {
          _id: "$tipo",
          autopistas: {
            $addToSet: "$autopista"
          },
          promedioTarifas: {
            $avg: "$tarifa"
          }
        }
      },{
        $project: {
          _id: 0,
          tipo: "$_id",
          autopistas: 1,
          promedioTarifas: 1
        }
      },{
        $sort: {
          promedioTarifas: -1,
          tipo: 1,
        }
      }
    ])
    return resultado;
  }

    async reporteAgregacion2() {
    const resultado = await this.peajeModel.aggregate()
    .match({
      tarifa: {
        $gt: 1000
      }
    }).lookup({
      from: "autopista",
      localField: "idAutopista",
      foreignField: "id",
      as: "autopista"
    }).unwind({
      path: "$autopista"
    }).project({
      _id: 0,
      id: 1,
      tarifa: 1,
      autopista: {
          $concat: ["$autopista.nombre", " (", "$autopista.id" , ")"]
      },
      tipo: {
        $first: {
          $split: [ "$autopista.nombre", " " ]
        }
      }
    }).group({
      _id: "$tipo",
      autopistas: {
        $addToSet: "$autopista"
      },
      promedioTarifas: {
        $avg: "$tarifa"
      }
    }).project({
      _id: 0,
      tipo: "$_id",
      autopistas: 1,
      promedioTarifas: 1
    }).sort({
      promedioTarifas: -1,
      tipo: 1,
    })
    return resultado;
  }

}
