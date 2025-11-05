import { ApiProperty } from "@nestjs/swagger";

export class CrearAutopistaDto {

  @ApiProperty({ example: 10 })
  id: number;

  @ApiProperty({ example: "ejemplo" })
  nombre: string;

  @ApiProperty({ example: 100 })
  longitudKm: number;

}