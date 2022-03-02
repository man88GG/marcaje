import { Column, Entity, OneToMany } from "typeorm";
import { RpeCategoria } from "./RpeCategoria";

@Entity("rpe_tipo_categoria", { schema: "sincyt" })
export class RpeTipoCategoria {
  @Column("int", { primary: true, name: "no_tipo_categoria" })
  noTipoCategoria: number;

  @Column("varchar", { name: "nombre_tipo", length: 500 })
  nombreTipo: string;

  @OneToMany(
    () => RpeCategoria,
    rpeCategoria => rpeCategoria.noTipoCategoria2
  )
  rpeCategorias: RpeCategoria[];
}
