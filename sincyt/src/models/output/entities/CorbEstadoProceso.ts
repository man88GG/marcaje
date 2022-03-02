import { Column, Entity, OneToMany } from "typeorm";
import { CorbProceso } from "./CorbProceso";

@Entity("corb_estado_proceso", { schema: "sincyt" })
export class CorbEstadoProceso {
  @Column("int", { primary: true, name: "id_estado" })
  idEstado: number;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @OneToMany(
    () => CorbProceso,
    corbProceso => corbProceso.idEstado2
  )
  corbProcesos: CorbProceso[];
}
