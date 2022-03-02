import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DneAutoridad } from "./DneAutoridad";

@Entity("dne_tipo_autoridad", { schema: "sincyt" })
export class DneTipoAutoridad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_tipo_autoridad" })
  noTipoAutoridad: number;

  @Column("varchar", { name: "nombre_tipo", length: 45 })
  nombreTipo: string;

  @OneToMany(
    () => DneAutoridad,
    dneAutoridad => dneAutoridad.noTipoAutoridad2
  )
  dneAutoridads: DneAutoridad[];
}
