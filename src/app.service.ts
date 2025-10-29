import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource
  ) {
  }

  async getHello(id) : Promise<any> {
    const instruccion = `SELECT * FROM AUTOPISTA WHERE id = ${id};`;
    const resultado = await this.dataSource.query(instruccion);
    console.log(resultado);
    return resultado;
  }
}
