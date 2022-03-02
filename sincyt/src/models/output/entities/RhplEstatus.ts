import { Column, Entity, OneToMany } from "typeorm";
import { RhplCatalogo } from "./RhplCatalogo";

@Entity("rhpl_estatus", { schema: "sincyt" })
export class RhplEstatus {
  @Column("int", { primary: true, name: "id_estatus" })
  idEstatus: number;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;

  @OneToMany(
    () => RhplCatalogo,
    rhplCatalogo => rhplCatalogo.idEstatus2
  )
  rhplCatalogos: RhplCatalogo[];
}
