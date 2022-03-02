import { Column, Entity, OneToMany } from "typeorm";
import { RpeTipoDocumento } from "./RpeTipoDocumento";

@Entity("rpe_bloque", { schema: "sincyt" })
export class RpeBloque {
  @Column("int", { primary: true, name: "no_bloque" })
  noBloque: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 250 })
  nombre: string | null;

  @OneToMany(
    () => RpeTipoDocumento,
    rpeTipoDocumento => rpeTipoDocumento.noBloque2
  )
  rpeTipoDocumentos: RpeTipoDocumento[];
}
