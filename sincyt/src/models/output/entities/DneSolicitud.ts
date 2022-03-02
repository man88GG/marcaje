import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneNotificacion } from "./DneNotificacion";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { RpeTipoDocumento } from "./RpeTipoDocumento";
import { DneEntidad } from "./DneEntidad";
import { RpeEstado } from "./RpeEstado";

@Index("fk_rpe_solicitud_rpe_entidad1_idx", ["noEntidad"], {})
@Index("fk_rpe_solicitud_app_proceso_ejecucion1_idx", ["codProceso"], {})
@Index("fk_rpe_solicitud_rpe_estado1_idx", ["estadoSolicitud"], {})
@Index("fk_dne_solicitud_rpe_tipo_documento1_idx", ["idTipoDocumento"], {})
@Entity("dne_solicitud", { schema: "sincyt" })
export class DneSolicitud {
  @PrimaryGeneratedColumn({ type: "int", name: "no_solicitud_entidad" })
  noSolicitudEntidad: number;

  @Column("int", { name: "no_entidad", nullable: true })
  noEntidad: number | null;

  @Column("int", { name: "cod_proceso", nullable: true })
  codProceso: number | null;

  @Column("varchar", { name: "token_seguridad", length: 250 })
  tokenSeguridad: string;

  @Column("timestamp", {
    name: "fecha_hora_creacion",
    default: () => "CURRENT_TIMESTAMP"
  })
  fechaHoraCreacion: Date;

  @Column("int", { name: "estado_confirmacion_correo", default: () => "'0'" })
  estadoConfirmacionCorreo: number;

  @Column("varchar", { name: "nombre_entidad", length: 250 })
  nombreEntidad: string;

  @Column("text", { name: "direccion_entidad" })
  direccionEntidad: string;

  @Column("text", { name: "nombre_responsable" })
  nombreResponsable: string;

  @Column("text", { name: "correo_electronico_responsable" })
  correoElectronicoResponsable: string;

  @Column("text", { name: "telefono_responsable", nullable: true })
  telefonoResponsable: string | null;

  @Column("text", { name: "telefono_institucion", nullable: true })
  telefonoInstitucion: string | null;

  @Column("int", { name: "estado_solicitud" })
  estadoSolicitud: number;

  @Column("int", { name: "id_tipo_documento" })
  idTipoDocumento: number;

  @Column("varchar", { name: "no_documento", length: 200 })
  noDocumento: string;

  @OneToMany(
    () => DneNotificacion,
    dneNotificacion => dneNotificacion.noSolicitud2
  )
  dneNotificacions: DneNotificacion[];

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.dneSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @ManyToOne(
    () => RpeTipoDocumento,
    rpeTipoDocumento => rpeTipoDocumento.dneSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_tipo_documento", referencedColumnName: "noTipoDocumento" }
  ])
  idTipoDocumento2: RpeTipoDocumento;

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.dneSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "estado_solicitud", referencedColumnName: "noEstado" }])
  estadoSolicitud2: RpeEstado;
}
