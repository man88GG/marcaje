import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeAreaCientifTecno } from "./RpeAreaCientifTecno";
import { DneEntidad } from "./DneEntidad";

@Index("fk_rpe_entidad_area_cientif_rpe_entidad2_idx", ["noEntidad"], {})
@Index(
  "fk_rpe_entidad_area_cientif_rp_area_cientif_tecno1_idx",
  ["noArea", "noTipoArea"],
  {}
)
@Entity("dne_entidad_area_cientif", { schema: "sincyt" })
export class DneEntidadAreaCientif {
  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @Column("int", { name: "no_area" })
  noArea: number;

  @Column("int", { name: "no_tipo_area" })
  noTipoArea: number;

  @ManyToOne(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.dneEntidadAreaCientifs,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_area", referencedColumnName: "noArea" },
    { name: "no_tipo_area", referencedColumnName: "noTipoArea" }
  ])
  rpeAreaCientifTecno: RpeAreaCientifTecno;

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneEntidadAreaCientifs,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;
}
