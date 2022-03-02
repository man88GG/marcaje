import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeEstado } from "./RpeEstado";
import { RpeProyecto } from "./RpeProyecto";

@Index(
  "fk_RPE_PROYECTO_has_RPE_ESTADO_RPE_ESTADO1_idx",
  ["rpeEstadoNoEstado", "rpeEstadoNoTipoEstado"],
  {}
)
@Index(
  "fk_RPE_PROYECTO_has_RPE_ESTADO_RPE_PROYECTO1_idx",
  ["rpeProyectoNoProyecto"],
  {}
)
@Entity("rpe_proyecto_estado", { schema: "sincyt" })
export class RpeProyectoEstado {
  @Column("int", { primary: true, name: "RPE_PROYECTO_no_proyecto" })
  rpeProyectoNoProyecto: number;

  @Column("int", { primary: true, name: "RPE_ESTADO_no_estado" })
  rpeEstadoNoEstado: number;

  @Column("int", { primary: true, name: "RPE_ESTADO_no_tipo_estado" })
  rpeEstadoNoTipoEstado: number;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.rpeProyectoEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "RPE_ESTADO_no_estado", referencedColumnName: "noEstado" },
    { name: "RPE_ESTADO_no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;

  @ManyToOne(
    () => RpeProyecto,
    rpeProyecto => rpeProyecto.rpeProyectoEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "RPE_PROYECTO_no_proyecto", referencedColumnName: "noProyecto" }
  ])
  rpeProyectoNoProyecto2: RpeProyecto;
}
