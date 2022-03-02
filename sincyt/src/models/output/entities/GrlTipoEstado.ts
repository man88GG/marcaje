import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GrlEstado } from "./GrlEstado";

@Entity("grl_tipo_estado", { schema: "sincyt" })
export class GrlTipoEstado {
  @PrimaryGeneratedColumn({ type: "int", name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("text", { name: "nombre_tipo_estado" })
  nombreTipoEstado: string;

  @OneToMany(
    () => GrlEstado,
    grlEstado => grlEstado.noTipoEstado2
  )
  grlEstados: GrlEstado[];
}
