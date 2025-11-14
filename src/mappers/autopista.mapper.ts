import { AutopistaDto } from "src/dto/autopista.dto";
import { CrearAutopistaDto } from "src/dto/crear-autopista.dto";
import { Autopista } from "src/entities/autopista.entity";
import { AutopistaDocument, Autopista as AutopistaSchema } from "src/schemas/autopista.schema";
export class AutopistaMapper {

  static dtoCrearToEntity(dto: CrearAutopistaDto): Autopista {
    const entidad = new Autopista();
    entidad.id = "PREFIJO_" + dto.id;
    entidad.nombre = dto.nombre;
    entidad.longitudKm = dto.longitudKm;
    return entidad;
  }

  static entityToDtoGet(entity: Autopista): AutopistaDto {
    const dto = new AutopistaDto();
    dto.id = entity.id;
    dto.nombre = entity.nombre;
    dto.longitud = `${entity.longitudKm} Km`;
    return dto;
  }

  static entityToDtoGetList(entities: Autopista[]) : AutopistaDto[] {
    return entities.map(e => this.entityToDtoGet(e));
  }

  static documentToDtoGet(document: AutopistaDocument): AutopistaDto {
    const dto = new AutopistaDto();
    dto.id = document.id;
    dto.nombre = document.nombre;
    dto.longitud = `${document.longitudKm} Km`;
    return dto;
  }

    static schemaToDtoGet(document: AutopistaSchema): AutopistaDto {
    const dto = new AutopistaDto();
    dto.id = document.id;
    dto.nombre = document.nombre;
    dto.longitud = `${document.longitudKm} Km`;
    return dto;
  }

  static documentToDtoGetList(entities: AutopistaDocument[]) : AutopistaDto[] {
    return entities.map(e => this.documentToDtoGet(e));
  }

  static entityToSchema(entity: Autopista) : AutopistaSchema {
    const schema = new AutopistaSchema();
    schema.id = entity.id;
    schema.nombre = entity.nombre;
    schema.longitudKm = entity.longitudKm;
    return schema;
  }

  static entityToSchemaList(entities: Autopista[]) : AutopistaSchema[] {
    return entities.map(e => this.entityToSchema(e));
  }


}