import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DneDocumento } from "./DneDocumento";

@Entity("dne_bloque", { schema: "sincyt" })
export class DneBloque {
  @PrimaryGeneratedColumn({ type: "int", name: "no_bloque" })
  noBloque: number;

  @Column("varchar", { name: "nombre", length: 250 })
  nombre: string;

  @OneToMany(
    () => DneDocumento,
    dneDocumento => dneDocumento.noBloque2
  )
  dneDocumentos: DneDocumento[];
}
