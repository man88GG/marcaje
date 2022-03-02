import { Column, Entity, OneToMany } from "typeorm";
import { SgpLinea } from "./SgpLinea";

@Entity("sgp_tipo_linea", { schema: "sincyt" })
export class SgpTipoLinea {
  @Column("int", { primary: true, name: "id_tipo_linea" })
  idTipoLinea: number;

  @Column("mediumtext", { name: "descripcion" })
  descripcion: string;

  @OneToMany(
    () => SgpLinea,
    sgpLinea => sgpLinea.tipoLinea2
  )
  sgpLineas: SgpLinea[];
}
