import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AsgpSolicitud } from "./AsgpSolicitud";
import { GtuUsuario } from "./GtuUsuario";
import { AsgpTipoUsuarioAsignacion } from "./AsgpTipoUsuarioAsignacion";

@Index("fk_asgp_asigna_usuario_solicitud_id_usuario_idx", ["idUsuario"], {})
@Index("fk_asgp_asigna_usuario_solicitud_idx", ["noSolicitud"], {})
@Index(
  "fk_asgp_asigna_usuario_tipo_usuario_asignacion",
  ["idTipoUsuarioAsignacion"],
  {}
)
@Entity("asgp_asigna_usuario_solicitud", { schema: "sincyt" })
export class AsgpAsignaUsuarioSolicitud {
  @Column("int", { primary: true, name: "id_usuario" })
  idUsuario: number;

  @Column("int", { primary: true, name: "no_solicitud" })
  noSolicitud: number;

  @Column("datetime", {
    name: "fecha_asignacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  fechaAsignacion: Date | null;

  @Column("int", { name: "id_tipo_usuario_asignacion", default: () => "'1'" })
  idTipoUsuarioAsignacion: number;

  @ManyToOne(
    () => AsgpSolicitud,
    asgpSolicitud => asgpSolicitud.asgpAsignaUsuarioSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_solicitud", referencedColumnName: "noSolicitud" }])
  noSolicitud2: AsgpSolicitud;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.asgpAsignaUsuarioSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @ManyToOne(
    () => AsgpTipoUsuarioAsignacion,
    asgpTipoUsuarioAsignacion =>
      asgpTipoUsuarioAsignacion.asgpAsignaUsuarioSolicituds,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    {
      name: "id_tipo_usuario_asignacion",
      referencedColumnName: "idTipoUsuarioAsignacion"
    }
  ])
  idTipoUsuarioAsignacion2: AsgpTipoUsuarioAsignacion;
}
