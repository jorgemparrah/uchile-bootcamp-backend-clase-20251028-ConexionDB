import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Peaje } from "./peaje.entity";
import { Ciudad } from "./ciudad.entity";

@Entity({ name: "AUTOPISTA" })
export class Autopista {

  @PrimaryColumn({ name: "id" })
  id: string;

  @Column({ name: "nombre" })
  nombre: string;

  @Column({ name: "longitud_km" })
  longitudKm: number;

  @OneToMany(() => Peaje, (p) => p.autopista)
  peajes: Peaje[];

  @ManyToMany(() => Ciudad)
  @JoinTable({ name: "AUTOPISTA_CIUDAD",
    joinColumn: {
      name: 'id_autopista',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_ciudad',
      referencedColumnName: 'id',
    },
  })
  ciudades: Ciudad[];

}