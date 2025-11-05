import { AutopistaDto } from "src/dto/autopista.dto";
import { CrearAutopistaDto } from "src/dto/crear-autopista.dto";
import { Autopista } from "src/entities/autopista.entity";

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

}