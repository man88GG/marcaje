import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneEntidadActividadCientificoTecno } from "./DneEntidadActividadCientificoTecno";
import { DneActividadCientificoTecno } from "./DneActividadCientificoTecno";

@Index(
  "fk_dne_sub_actividad_cientifico_tecno_dne_actividad_cientif_idx",
  ["noActividadPadre"],
  {}
)
@Entity("dne_sub_actividad_cientifico_tecno", { schema: "sincyt" })
export class DneSubActividadCientificoTecno {
  @PrimaryGeneratedColumn({ type: "int", name: "no_actividad" })
  noActividad: number;

  @Column("varchar", { name: "nombre", length: 250 })
  nombre: string;

  @Column("int", { name: "no_actividad_padre" })
  noActividadPadre: number;

  @OneToMany(
    () => DneEntidadActividadCientificoTecno,
    dneEntidadActividadCientificoTecno =>
      dneEntidadActividadCientificoTecno.noSubActividadCt2
  )
  dneEntidadActividadCientificoTecnos: DneEntidadActividadCientificoTecno[];

  @ManyToOne(
    () => DneActividadCientificoTecno,
    dneActividadCientificoTecno =>
      dneActividadCientificoTecno.dneSubActividadCientificoTecnos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_actividad_padre", referencedColumnName: "noActividad" }
  ])
  noActividadPadre2: DneActividadCientificoTecno;
}
