import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeAreaCientifTecno } from "./RpeAreaCientifTecno";
import { RpeEntidad } from "./RpeEntidad";

@Index(
  "fk_RPE_ENTIDAD_has_RPE_AREA_CIENTIF_TECNO_RPE_AREA_CIENTIF__idx",
  ["noArea", "noTipoArea"],
  {}
)
@Index("fk_rpe_entidad_area_cientif_no_entidad", ["noEntidad"], {})
@Entity("rpe_entidad_area_cientif", { schema: "sincyt" })
export class RpeEntidadAreaCientif {
  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @Column("int", { name: "no_area" })
  noArea: number;

  @Column("int", { name: "no_tipo_area" })
  noTipoArea: number;

  @ManyToOne(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.rpeEntidadAreaCientifs,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_area", referencedColumnName: "noArea" },
    { name: "no_tipo_area", referencedColumnName: "noTipoArea" }
  ])
  rpeAreaCientifTecno: RpeAreaCientifTecno;

  @ManyToOne(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.rpeEntidadAreaCientifs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: RpeEntidad;
}
