import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Autopista } from "./autopista.entity";

@Entity({ name: "PEAJE" })
export class Peaje {

  @PrimaryColumn({ name: "id" })
  id: number;

  @Column({ name: "id_autopista" })
  idAutopista: string;

  @Column({ name: "tarifa" })
  tarifa: number;

  @ManyToOne(() => Autopista)
  @JoinColumn({ name: "id_autopista" })
  autopista: Autopista;

}