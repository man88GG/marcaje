import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneActividadTecnoTipo } from "./DneActividadTecnoTipo";
import { DneEntidadActividadCientificoTecno } from "./DneEntidadActividadCientificoTecno";
import { DneSubActividadCientificoTecno } from "./DneSubActividadCientificoTecno";

@Index(
  "fk_dne_actividad_cientifico_tecno_dne_actividad_tecno_tipo1_idx",
  ["noTipoActividad"],
  {}
)
@Entity("dne_actividad_cientifico_tecno", { schema: "sincyt" })
export class DneActividadCientificoTecno {
  @PrimaryGeneratedColumn({ type: "int", name: "no_actividad" })
  noActividad: number;

  @Column("varchar", { name: "nombre", length: 250 })
  nombre: string;

  @Column("int", { name: "no_tipo_actividad" })
  noTipoActividad: number;

  @ManyToOne(
    () => DneActividadTecnoTipo,
    dneActividadTecnoTipo => dneActividadTecnoTipo.dneActividadCientificoTecnos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_actividad", referencedColumnName: "noTipoActividad" }
  ])
  noTipoActividad2: DneActividadTecnoTipo;

  @OneToMany(
    () => DneEntidadActividadCientificoTecno,
    dneEntidadActividadCientificoTecno =>
      dneEntidadActividadCientificoTecno.noActividadCt2
  )
  dneEntidadActividadCientificoTecnos: DneEntidadActividadCientificoTecno[];

  @OneToMany(
    () => DneSubActividadCientificoTecno,
    dneSubActividadCientificoTecno =>
      dneSubActividadCientificoTecno.noActividadPadre2
  )
  dneSubActividadCientificoTecnos: DneSubActividadCientificoTecno[];
}
