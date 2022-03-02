import { Column, Entity, OneToMany } from "typeorm";
import { CorbProceso } from "./CorbProceso";

@Entity("corb_tipo_proceso", { schema: "sincyt" })
export class CorbTipoProceso {
  @Column("int", { primary: true, name: "id_tipo_proceso" })
  idTipoProceso: number;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @OneToMany(
    () => CorbProceso,
    corbProceso => corbProceso.idTipoProceso2
  )
  corbProcesos: CorbProceso[];
}
