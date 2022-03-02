import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RpePersona } from "./RpePersona";

@Entity("rpe_registro_inv", { schema: "sincyt" })
export class RpeRegistroInv {
  @PrimaryGeneratedColumn({ type: "bigint", name: "no_registro_oficial" })
  noRegistroOficial: string;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @OneToOne(
    () => RpePersona,
    rpePersona => rpePersona.noRegistroOficial2
  )
  rpePersona: RpePersona;
}
