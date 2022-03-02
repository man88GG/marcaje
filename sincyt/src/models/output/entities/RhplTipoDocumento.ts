import { Column, Entity } from "typeorm";

@Entity("rhpl_tipoDocumento", { schema: "sincyt" })
export class RhplTipoDocumento {
  @Column("int", { primary: true, name: "id_tipo_doc" })
  idTipoDoc: number;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;
}
