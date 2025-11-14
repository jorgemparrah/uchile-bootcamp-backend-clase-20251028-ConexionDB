import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "autopista" })
export class Autopista {

  @Prop({ name: "id", type: String })
  id: string;

  @Prop({ type: String })
  nombre: string;

  @Prop({ name: "longitudKm", type: Number })
  longitudKm: number;

}

export type AutopistaDocument = HydratedDocument<Autopista>;
export const AutopistaSchema = SchemaFactory.createForClass(Autopista);
