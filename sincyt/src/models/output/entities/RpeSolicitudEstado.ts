import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeEstado } from "./RpeEstado";
import { RpeSolicitud } from "./RpeSolicitud";

@Index(
  "fk_RPE_SOLICITUD_has_RPE_ESTADO_RPE_ESTADO1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Index(
  "fk_rpe_solicitud_estado_rpe_solicitud1_idx",
  ["noSolicitudInvestigador"],
  {}
)
@Entity("rpe_solicitud_estado", { schema: "sincyt" })
export class RpeSolicitudEstado {
  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("int", { primary: true, name: "no_solicitud_investigador" })
  noSolicitudInvestigador: number;

  @Column("longtext", { name: "comentario", nullable: true })
  comentario: string | null;

  @Column("int", { name: "estado", nullable: true, default: () => "'1'" })
  estado: number | null;

  @Column("datetime", { name: "fecha_creacion", nullable: true })
  fechaCreacion: Date | null;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.rpeSolicitudEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;

  @ManyToOne(
    () => RpeSolicitud,
    rpeSolicitud => rpeSolicitud.rpeSolicitudEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "no_solicitud_investigador",
      referencedColumnName: "noSolicitudInvestigador"
    }
  ])
  noSolicitudInvestigador2: RpeSolicitud;
}
