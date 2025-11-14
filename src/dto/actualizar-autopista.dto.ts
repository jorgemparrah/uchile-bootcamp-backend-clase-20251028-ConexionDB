import { ApiProperty } from "@nestjs/swagger";

export class ActualizarAutopistaDto {

  @ApiProperty({ example: "ejemplo" })
  nombre: string;

  @ApiProperty({ example: 100 })
  longitudKm: number;

}