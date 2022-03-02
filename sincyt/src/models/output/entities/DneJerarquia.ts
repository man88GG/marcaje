import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DneEntidad } from "./DneEntidad";

@Entity("dne_jerarquia", { schema: "sincyt" })
export class DneJerarquia {
  @PrimaryGeneratedColumn({ type: "int", name: "no_jerarquia" })
  noJerarquia: number;

  @Column("varchar", { name: "nombre_tipo", length: 45 })
  nombreTipo: string;

  @OneToMany(
    () => DneEntidad,
    dneEntidad => dneEntidad.noJerarquia2
  )
  dneEntidads: DneEntidad[];
}
