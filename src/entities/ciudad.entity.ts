import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Autopista } from "./autopista.entity";

@Entity({ name: "CIUDAD" })
export class Ciudad {

  @PrimaryColumn({ name: "id" })
  id: string;

  @Column({ name: "nombre" })
  nombre: string;

  @Column({ name: "poblacion" })
  poblacion: number;

  @ManyToMany(() => Autopista, (a) => a.ciudades)
  autopistas: Autopista[];

}