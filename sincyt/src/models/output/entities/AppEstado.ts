import { Column, Entity, OneToMany } from "typeorm";
import { AppDetalleProceso } from "./AppDetalleProceso";
import { AppProceso } from "./AppProceso";

@Entity("app_estado", { schema: "sincyt" })
export class AppEstado {
  @Column("int", { primary: true, name: "id_estado" })
  idEstado: number;

  @Column("varchar", { name: "descripcion", length: 45 })
  descripcion: string;

  @OneToMany(
    () => AppDetalleProceso,
    appDetalleProceso => appDetalleProceso.estatus2
  )
  appDetalleProcesos: AppDetalleProceso[];

  @OneToMany(
    () => AppProceso,
    appProceso => appProceso.idEstado2
  )
  appProcesos: AppProceso[];
}
