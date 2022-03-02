import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DneProyecto } from "./DneProyecto";
import { RpeEstado } from "./RpeEstado";

@Index("fk_dne_proyecto_estado_dne_proyecto1_idx", ["noProyecto"], {})
@Index(
  "fk_dne_proyecto_estado_rpe_estado1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Entity("dne_proyecto_estado", { schema: "sincyt" })
export class DneProyectoEstado {
  @Column("int", { name: "no_proyecto" })
  noProyecto: number;

  @Column("int", { name: "no_estado" })
  noEstado: number;

  @Column("int", { name: "no_tipo_estado" })
  noTipoEstado: number;

  @ManyToOne(
    () => DneProyecto,
    dneProyecto => dneProyecto.dneProyectoEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_proyecto", referencedColumnName: "noProyecto" }])
  noProyecto2: DneProyecto;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.dneProyectoEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
