import { Column, Entity, OneToMany } from "typeorm";
import { AppBitacora } from "./AppBitacora";
import { AppDetalleProceso } from "./AppDetalleProceso";

@Entity("app_accion", { schema: "sincyt" })
export class AppAccion {
  @Column("int", { primary: true, name: "id_accion" })
  idAccion: number;

  @Column("varchar", { name: "descripcion", length: 45 })
  descripcion: string;

  @OneToMany(
    () => AppBitacora,
    appBitacora => appBitacora.idAccion2
  )
  appBitacoras: AppBitacora[];

  @OneToMany(
    () => AppDetalleProceso,
    appDetalleProceso => appDetalleProceso.idAccion2
  )
  appDetalleProcesos: AppDetalleProceso[];
}
