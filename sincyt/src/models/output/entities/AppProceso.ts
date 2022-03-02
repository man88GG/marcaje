import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AppActividad } from "./AppActividad";
import { AppBitacora } from "./AppBitacora";
import { AppTipoProceso } from "./AppTipoProceso";
import { AppEstado } from "./AppEstado";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";

@Index("Id_proceso_UNIQUE", ["idProceso"], { unique: true })
@Index("Id_tipo_proceso_idx", ["idTipoProceso"], {})
@Index("id_proceso_padre_idx", ["idProcesoPadre"], {})
@Index("estado_p_idx", ["idEstado"], {})
@Entity("app_proceso", { schema: "sincyt" })
export class AppProceso {
  @Column("int", { primary: true, name: "id_proceso" })
  idProceso: number;

  @Column("int", { name: "id_tipo_proceso" })
  idTipoProceso: number;

  @Column("int", { name: "id_proceso_padre", nullable: true })
  idProcesoPadre: number | null;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @Column("varchar", { name: "descripcion", nullable: true, length: 250 })
  descripcion: string | null;

  @Column("int", { name: "id_estado", nullable: true })
  idEstado: number | null;

  @OneToMany(
    () => AppActividad,
    appActividad => appActividad.idProceso2
  )
  appActividads: AppActividad[];

  @OneToMany(
    () => AppBitacora,
    appBitacora => appBitacora.idProceso2
  )
  appBitacoras: AppBitacora[];

  @ManyToOne(
    () => AppProceso,
    appProceso => appProceso.appProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_proceso_padre", referencedColumnName: "idProceso" }])
  idProcesoPadre2: AppProceso;

  @OneToMany(
    () => AppProceso,
    appProceso => appProceso.idProcesoPadre2
  )
  appProcesos: AppProceso[];

  @ManyToOne(
    () => AppTipoProceso,
    appTipoProceso => appTipoProceso.appProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_tipo_proceso", referencedColumnName: "idTipoDesarrollo" }
  ])
  idTipoProceso2: AppTipoProceso;

  @ManyToOne(
    () => AppEstado,
    appEstado => appEstado.appProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "idEstado" }])
  idEstado2: AppEstado;

  @OneToMany(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.idProceso2
  )
  appProcesoEjecucions: AppProcesoEjecucion[];
}
