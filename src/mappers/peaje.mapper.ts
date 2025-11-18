
import { PeajeDto } from "src/dto/peaje.dto";
import { Peaje } from "src/entities/peaje.entity";
import { PeajeDocument, Peaje as PeajeSchema } from "src/schemas/peaje.schema";
import { AutopistaMapper } from "./autopista.mapper";
import { Autopista } from "src/schemas/autopista.schema";
export class PeajeMapper {

  static documentToDtoGet(document: PeajeDocument): PeajeDto {
    const dto = new PeajeDto();
    dto.id = document.id;
    dto.tarifa = document.tarifa;
    if ((document.autopista as Autopista).nombre) {
      dto.autopista = AutopistaMapper.schemaToDtoGet(document.autopista as Autopista);
    }
    return dto;
  }

  static documentToDtoGetList(entities: PeajeDocument[]) : PeajeDto[] {
    return entities.map(e => this.documentToDtoGet(e));
  }

  static entityToSchema(entity: Peaje) : PeajeSchema {
    const schema = new PeajeSchema();
    schema.id = entity.id;
    schema.idAutopista = entity.idAutopista;
    schema.tarifa = entity.tarifa;
    return schema;
  }

  static entityToSchemaList(entities: Peaje[]) : PeajeSchema[] {
    return entities.map(e => this.entityToSchema(e));
  }


}