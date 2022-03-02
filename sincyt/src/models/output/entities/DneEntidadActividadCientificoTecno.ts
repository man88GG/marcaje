import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DneActividadCientificoTecno } from "./DneActividadCientificoTecno";
import { DneEntidad } from "./DneEntidad";
import { DneSubActividadCientificoTecno } from "./DneSubActividadCientificoTecno";

@Index(
  "fk_dne_entidad_actividad_cientifico_tecno_dne_sub_actividad_idx",
  ["noSubActividadCt"],
  {}
)
@Index(
  "fk_dne_entidad_actividad_cientifico_tecno_dne_actividad_cie_idx",
  ["noActividadCt"],
  {}
)
@Index(
  "fk_dne_entidad_actividad_cientifico_tecno_dne_entidad1_idx",
  ["noEntidad"],
  {}
)
@Entity("dne_entidad_actividad_cientifico_tecno", { schema: "sincyt" })
export class DneEntidadActividadCientificoTecno {
  @Column("int", { name: "no_sub_actividad_ct", nullable: true })
  noSubActividadCt: number | null;

  @Column("int", { name: "no_actividad_ct" })
  noActividadCt: number;

  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @ManyToOne(
    () => DneActividadCientificoTecno,
    dneActividadCientificoTecno =>
      dneActividadCientificoTecno.dneEntidadActividadCientificoTecnos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_actividad_ct", referencedColumnName: "noActividad" }
  ])
  noActividadCt2: DneActividadCientificoTecno;

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneEntidadActividadCientificoTecnos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;

  @ManyToOne(
    () => DneSubActividadCientificoTecno,
    dneSubActividadCientificoTecno =>
      dneSubActividadCientificoTecno.dneEntidadActividadCientificoTecnos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_sub_actividad_ct", referencedColumnName: "noActividad" }
  ])
  noSubActividadCt2: DneSubActividadCientificoTecno;
}
