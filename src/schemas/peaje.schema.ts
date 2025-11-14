import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { HydratedDocument, Types } from "mongoose";
import { Autopista } from "./autopista.schema";

@Schema({ collection: "peaje" })
export class Peaje {

  @Prop({ name: "id", type: Number })
  id: number;

  @Prop({ name: "idAutopista", type: String })
  idAutopista: string;

  @Prop({ name: "autopista", type: ObjectId, ref: Autopista.name })
  autopista: Types.ObjectId | Autopista;

  @Prop({ name: "tarifa", type: Number })
  tarifa: number;

}

export type PeajeDocument = HydratedDocument<Peaje>;
export const PeajeSchema = SchemaFactory.createForClass(Peaje);
