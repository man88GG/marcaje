import { Column, Entity } from "typeorm";

@Entity("rhpl_documento_metadato", { schema: "sincyt" })
export class RhplDocumentoMetadato {
  @Column("int", { primary: true, name: "id_tipo_doc" })
  idTipoDoc: number;

  @Column("varchar", { primary: true, name: "clave", length: 255 })
  clave: string;

  @Column("varchar", { name: "clave_publica", length: 255 })
  clavePublica: string;
}
