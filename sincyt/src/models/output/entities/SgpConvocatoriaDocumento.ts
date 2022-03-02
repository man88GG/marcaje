import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { SgpLinea } from "./SgpLinea";
import { SgpTipoDocumento } from "./SgpTipoDocumento";

@Index(
  "sgp_convocatoria_documento_sgp_tipo_documento_FK",
  ["idTipoDocumento"],
  {}
)
@Index("sgp_convocatoria_documento_sgp_linea_FK", ["idLinea"], {})
@Entity("sgp_convocatoria_documento", { schema: "sincyt" })
export class SgpConvocatoriaDocumento {
  @Column("longtext", { name: "id_mongo" })
  idMongo: string;

  @Column("int", { name: "id_tipo_documento" })
  idTipoDocumento: number;

  @Column("varchar", { name: "numero_convocatoria", length: 100 })
  numeroConvocatoria: string;

  @Column("date", { name: "fecha_carga", nullable: true })
  fechaCarga: string | null;

  @Column("int", { name: "id_linea" })
  idLinea: number;

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.sgpConvocatoriaDocumentos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_linea", referencedColumnName: "idLinea" }])
  idLinea2: SgpLinea;

  @ManyToOne(
    () => SgpTipoDocumento,
    sgpTipoDocumento => sgpTipoDocumento.sgpConvocatoriaDocumentos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_tipo_documento", referencedColumnName: "idTipoDocumento" }
  ])
  idTipoDocumento2: SgpTipoDocumento;
}
