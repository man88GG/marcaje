import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DneProyecto } from "./DneProyecto";
import { RpeAreaCientifTecno } from "./RpeAreaCientifTecno";

@Index(
  "fk_dne_proyecto_area_cientif_dne_proyecto1_idx",
  ["dneProyectoNoProyecto"],
  {}
)
@Index(
  "fk_dne_proyecto_area_cientif_rp_area_cientif_tecno1_idx",
  ["rpAreaCientifTecnoNoArea", "rpAreaCientifTecnoNoTipoArea"],
  {}
)
@Entity("dne_proyecto_area_cientif", { schema: "sincyt" })
export class DneProyectoAreaCientif {
  @Column("int", { name: "dne_proyecto_no_proyecto" })
  dneProyectoNoProyecto: number;

  @Column("int", { name: "rp_area_cientif_tecno_no_area" })
  rpAreaCientifTecnoNoArea: number;

  @Column("int", { name: "rp_area_cientif_tecno_no_tipo_area" })
  rpAreaCientifTecnoNoTipoArea: number;

  @ManyToOne(
    () => DneProyecto,
    dneProyecto => dneProyecto.dneProyectoAreaCientifs,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "dne_proyecto_no_proyecto", referencedColumnName: "noProyecto" }
  ])
  dneProyectoNoProyecto2: DneProyecto;

  @ManyToOne(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.dneProyectoAreaCientifs,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "rp_area_cientif_tecno_no_area", referencedColumnName: "noArea" },
    {
      name: "rp_area_cientif_tecno_no_tipo_area",
      referencedColumnName: "noTipoArea"
    }
  ])
  rpeAreaCientifTecno: RpeAreaCientifTecno;
}
