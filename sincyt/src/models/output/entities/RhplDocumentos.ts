import { Column, Entity } from "typeorm";

@Entity("rhpl_documentos", { schema: "sincyt" })
export class RhplDocumentos {
  @Column("varchar", { name: "no_contrato", length: 255 })
  noContrato: string;

  @Column("varchar", { name: "id_documento_mongo", length: 45 })
  idDocumentoMongo: string;

  @Column("int", { name: "id_tipo_documento", nullable: true })
  idTipoDocumento: number | null;

  @Column("varchar", { name: "referencia", nullable: true, length: 255 })
  referencia: string | null;

  @Column("varchar", { name: "fecha", nullable: true, length: 255 })
  fecha: string | null;

  @Column("varchar", { name: "dueño", nullable: true, length: 255 })
  dueO: string | null;
}
