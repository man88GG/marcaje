import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { GtuUsuario } from "./GtuUsuario";
import { AppAccion } from "./AppAccion";
import { AppActividad } from "./AppActividad";
import { AppEstado } from "./AppEstado";
import { AppRequisito } from "./AppRequisito";
import { AsgpAppDocumento } from "./AsgpAppDocumento";

@Index("id_actividad_dp_idx", ["idActividad"], {})
@Index("cod_proceso_dp_idx", ["codProceso"], {})
@Index("id_accion_idx", ["idAccion"], {})
@Index("id_usuario_dp_idx", ["idUsuario"], {})
@Index("id_requisito_idx", ["idRequisito"], {})
@Index("id_estado_dp_idx", ["estatus"], {})
@Entity("app_detalle_proceso", { schema: "sincyt" })
export class AppDetalleProceso {
  @PrimaryGeneratedColumn({ type: "int", name: "id_detalle_proceso" })
  idDetalleProceso: number;

  @Column("int", { name: "cod_proceso" })
  codProceso: number;

  @Column("int", { name: "id_actividad" })
  idActividad: number;

  @Column("int", { name: "id_accion" })
  idAccion: number;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("int", { name: "id_requisito", nullable: true })
  idRequisito: number | null;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @Column("int", { name: "estatus" })
  estatus: number;

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.appDetalleProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.appDetalleProcesos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @ManyToOne(
    () => AppAccion,
    appAccion => appAccion.appDetalleProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_accion", referencedColumnName: "idAccion" }])
  idAccion2: AppAccion;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appDetalleProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;

  @ManyToOne(
    () => AppEstado,
    appEstado => appEstado.appDetalleProcesos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "estatus", referencedColumnName: "idEstado" }])
  estatus2: AppEstado;

  @ManyToOne(
    () => AppRequisito,
    appRequisito => appRequisito.appDetalleProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_requisito", referencedColumnName: "idRequisito" }])
  idRequisito2: AppRequisito;

  @OneToMany(
    () => AsgpAppDocumento,
    asgpAppDocumento => asgpAppDocumento.idDetalleProceso2
  )
  asgpAppDocumentos: AsgpAppDocumento[];
}
