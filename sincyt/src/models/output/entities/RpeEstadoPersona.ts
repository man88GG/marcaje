import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeEstado } from "./RpeEstado";
import { RpePersona } from "./RpePersona";

@Index(
  "fk_RPE_ESTADO_PERSONA_RPE_ESTADO1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Index("fk_RPE_ESTADO_PERSONA_RPE_PERSONA1_idx", ["noRegistroPersona"], {})
@Entity("rpe_estado_persona", { schema: "sincyt" })
export class RpeEstadoPersona {
  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("int", { primary: true, name: "no_registro_persona" })
  noRegistroPersona: number;

  @Column("varchar", { name: "texto_estado", nullable: true, length: 1000 })
  textoEstado: string | null;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.rpeEstadoPersonas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeEstadoPersonas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;
}
