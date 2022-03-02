import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppTipoProceso } from "./AppTipoProceso";

@Index("Id_desarrollo_UNIQUE", ["idDesarrollo"], { unique: true })
@Entity("app_desarrollo", { schema: "sincyt" })
export class AppDesarrollo {
  @Column("int", { primary: true, name: "id_desarrollo" })
  idDesarrollo: number;

  @Column("mediumtext", { name: "descripcion" })
  descripcion: string;

  @OneToMany(
    () => AppTipoProceso,
    appTipoProceso => appTipoProceso.idDesarrollo2
  )
  appTipoProcesos: AppTipoProceso[];
}
