import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AppProceso } from "./AppProceso";
import { AppDesarrollo } from "./AppDesarrollo";

@Index("Id_tipo_desarrollo_UNIQUE", ["idTipoDesarrollo"], { unique: true })
@Index("Id_desarrollo_idx", ["idDesarrollo"], {})
@Entity("app_tipo_proceso", { schema: "sincyt" })
export class AppTipoProceso {
  @Column("int", { primary: true, name: "id_tipo_desarrollo" })
  idTipoDesarrollo: number;

  @Column("int", { name: "id_desarrollo" })
  idDesarrollo: number;

  @Column("varchar", { name: "descripcion", length: 45 })
  descripcion: string;

  @OneToMany(
    () => AppProceso,
    appProceso => appProceso.idTipoProceso2
  )
  appProcesos: AppProceso[];

  @ManyToOne(
    () => AppDesarrollo,
    appDesarrollo => appDesarrollo.appTipoProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_desarrollo", referencedColumnName: "idDesarrollo" }])
  idDesarrollo2: AppDesarrollo;
}
