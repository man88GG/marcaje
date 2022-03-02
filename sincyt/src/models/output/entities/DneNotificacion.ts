import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneSolicitud } from "./DneSolicitud";

@Index("FK_solitictud_entidad_idx", ["noSolicitud"], {})
@Entity("dne_notificacion", { schema: "sincyt" })
export class DneNotificacion {
  @PrimaryGeneratedColumn({ type: "int", name: "id_notificacion" })
  idNotificacion: number;

  @Column("text", { name: "mensaje" })
  mensaje: string;

  @Column("int", { name: "no_solicitud" })
  noSolicitud: number;

  @Column("timestamp", {
    name: "fecha_notificacion",
    default: () => "CURRENT_TIMESTAMP"
  })
  fechaNotificacion: Date;

  @Column("bit", { name: "estado_leido" })
  estadoLeido: boolean;

  @Column("text", { name: "usuario_juridico" })
  usuarioJuridico: string;

  @ManyToOne(
    () => DneSolicitud,
    dneSolicitud => dneSolicitud.dneNotificacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_solicitud", referencedColumnName: "noSolicitudEntidad" }
  ])
  noSolicitud2: DneSolicitud;
}
