import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DneEntidad } from "./DneEntidad";
import { RpeEstado } from "./RpeEstado";

@Index(
  "fk_dne_entidad_sector_pertenencia_rpe_estado1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Entity("dne_entidad_sector_pertenencia", { schema: "sincyt" })
export class DneEntidadSectorPertenencia {
  @Column("int", { primary: true, name: "no_entidad" })
  noEntidad: number;

  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", {
    primary: true,
    name: "no_tipo_estado",
    default: () => "'25'"
  })
  noTipoEstado: number;

  @Column("timestamp", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  fechaRegistro: Date | null;

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneEntidadSectorPertenencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.dneEntidadSectorPertenencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
