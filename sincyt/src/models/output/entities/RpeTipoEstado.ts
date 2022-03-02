import { Column, Entity, OneToMany } from "typeorm";
import { RpeEstado } from "./RpeEstado";

@Entity("rpe_tipo_estado", { schema: "sincyt" })
export class RpeTipoEstado {
  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("varchar", { name: "nombre_tipo_estado", length: 250 })
  nombreTipoEstado: string;

  @OneToMany(
    () => RpeEstado,
    rpeEstado => rpeEstado.noTipoEstado2
  )
  rpeEstados: RpeEstado[];
}
