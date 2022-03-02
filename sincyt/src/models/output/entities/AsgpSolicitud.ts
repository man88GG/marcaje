import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AsgpAsignaUsuarioSolicitud } from "./AsgpAsignaUsuarioSolicitud";
import { AsgpResultadosSolicitud } from "./AsgpResultadosSolicitud";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";
import { AppActividad } from "./AppActividad";

@Index("fk_asgp_solicitud_cod_proceso_idx", ["codProceso"], {})
@Index("fk_asgp_solicitud_id_perfil_proyecto_idx", ["idPerfilProyecto"], {})
@Index("fk_asgp_solicitud_nuevo_estado", ["nuevoEstadoTemporal"], {})
@Entity("asgp_solicitud", { schema: "sincyt" })
export class AsgpSolicitud {
  @PrimaryGeneratedColumn({ type: "int", name: "no_solicitud" })
  noSolicitud: number;

  @Column("int", { name: "cod_proceso", nullable: true })
  codProceso: number | null;

  @Column("int", { name: "id_perfil_proyecto" })
  idPerfilProyecto: number;

  @Column("datetime", {
    name: "fecha_creacion",
    default: () => "CURRENT_TIMESTAMP"
  })
  fechaCreacion: Date;

  @Column("tinyint", { name: "editable", nullable: true, width: 1 })
  editable: boolean | null;

  @Column("double", {
    name: "monto_recomendado",
    nullable: true,
    precision: 22
  })
  montoRecomendado: number | null;

  @Column("int", { name: "nuevo_estado_temporal", nullable: true })
  nuevoEstadoTemporal: number | null;

  @Column("varchar", {
    name: "comentario_temporal",
    nullable: true,
    length: 5000
  })
  comentarioTemporal: string | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("timestamp", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => AsgpAsignaUsuarioSolicitud,
    asgpAsignaUsuarioSolicitud => asgpAsignaUsuarioSolicitud.noSolicitud2
  )
  asgpAsignaUsuarioSolicituds: AsgpAsignaUsuarioSolicitud[];

  @OneToMany(
    () => AsgpResultadosSolicitud,
    asgpResultadosSolicitud => asgpResultadosSolicitud.noSolicitud2
  )
  asgpResultadosSolicituds: AsgpResultadosSolicitud[];

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.asgpSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @ManyToOne(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.asgpSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_perfil_proyecto", referencedColumnName: "idPerfilProyecto" }
  ])
  idPerfilProyecto2: SgpPerfilProyecto;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.asgpSolicituds,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "nuevo_estado_temporal", referencedColumnName: "idActividad" }
  ])
  nuevoEstadoTemporal2: AppActividad;
}
