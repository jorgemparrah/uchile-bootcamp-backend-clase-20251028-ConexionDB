import { ApiProperty } from "@nestjs/swagger";

export class CargaDatosNumberDto {

  @ApiProperty({ example: [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 ] })
  ids: number[];

}