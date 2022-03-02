import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { AppEstadoBitacora } from "./AppEstadoBitacora";
import { AppAccion } from "./AppAccion";
import { AppActividad } from "./AppActividad";
import { AppProceso } from "./AppProceso";
import { AppRequisito } from "./AppRequisito";

@Index("id_proceso_b_idx", ["idProceso"], {})
@Index("id_actividad_b_idx", ["idActividad"], {})
@Index("id_usuario_b_idx", ["idUsuario"], {})
@Index("id_accion_b_idx", ["idAccion"], {})
@Index("cod_proceso_b_idx", ["codProceso"], {})
@Index("id_estatus_bitacora_b_idx", ["estadoBitacora"], {})
@Index("id_requisito_b_idx", ["idRequisito"], {})
@Entity("app_bitacora", { schema: "sincyt" })
export class AppBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id_bitacora" })
  idBitacora: number;

  @Column("int", { name: "id_proceso", nullable: true })
  idProceso: number | null;

  @Column("int", { name: "id_actividad", nullable: true })
  idActividad: number | null;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("int", { name: "id_accion", nullable: true })
  idAccion: number | null;

  @Column("int", { name: "cod_proceso", nullable: true })
  codProceso: number | null;

  @Column("int", { name: "estado_bitacora", nullable: true })
  estadoBitacora: number | null;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;

  @Column("int", { name: "id_requisito", nullable: true })
  idRequisito: number | null;

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.appBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @ManyToOne(
    () => AppEstadoBitacora,
    appEstadoBitacora => appEstadoBitacora.appBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "estado_bitacora", referencedColumnName: "idEstadoBitacora" }
  ])
  estadoBitacora2: AppEstadoBitacora;

  @ManyToOne(
    () => AppAccion,
    appAccion => appAccion.appBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_accion", referencedColumnName: "idAccion" }])
  idAccion2: AppAccion;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;

  @ManyToOne(
    () => AppProceso,
    appProceso => appProceso.appBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: AppProceso;

  @ManyToOne(
    () => AppRequisito,
    appRequisito => appRequisito.appBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_requisito", referencedColumnName: "idRequisito" }])
  idRequisito2: AppRequisito;
}
