import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeEstado } from "./RpeEstado";
import { AsgpSolicitud } from "./AsgpSolicitud";

@Index("fk_estados_rpe_resultados", ["noEstado", "noTipoEstado"], {})
@Entity("asgp_resultados_solicitud", { schema: "sincyt" })
export class AsgpResultadosSolicitud {
  @Column("int", { primary: true, name: "no_solicitud" })
  noSolicitud: number;

  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.asgpResultadosSolicituds,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;

  @ManyToOne(
    () => AsgpSolicitud,
    asgpSolicitud => asgpSolicitud.asgpResultadosSolicituds,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "no_solicitud", referencedColumnName: "noSolicitud" }])
  noSolicitud2: AsgpSolicitud;
}
