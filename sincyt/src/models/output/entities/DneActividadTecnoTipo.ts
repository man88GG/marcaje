import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DneActividadCientificoTecno } from "./DneActividadCientificoTecno";

@Entity("dne_actividad_tecno_tipo", { schema: "sincyt" })
export class DneActividadTecnoTipo {
  @PrimaryGeneratedColumn({ type: "int", name: "no_tipo_actividad" })
  noTipoActividad: number;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @OneToMany(
    () => DneActividadCientificoTecno,
    dneActividadCientificoTecno => dneActividadCientificoTecno.noTipoActividad2
  )
  dneActividadCientificoTecnos: DneActividadCientificoTecno[];
}
