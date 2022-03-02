import { Column, Entity, OneToMany } from "typeorm";
import { AsgpAppDocumento } from "./AsgpAppDocumento";
import { AsgpDocReqRutaAct } from "./AsgpDocReqRutaAct";
import { AsgpPermisoDocumentoActividad } from "./AsgpPermisoDocumentoActividad";
import { SgpConvocatoriaDocumento } from "./SgpConvocatoriaDocumento";
import { SgpRequisitoLinea } from "./SgpRequisitoLinea";

@Entity("sgp_tipo_documento", { schema: "sincyt" })
export class SgpTipoDocumento {
  @Column("int", { primary: true, name: "id_tipo_documento" })
  idTipoDocumento: number;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "abreviatura", length: 15 })
  abreviatura: string;

  @Column("varchar", { name: "tipo_documento", length: 45 })
  tipoDocumento: string;

  @OneToMany(
    () => AsgpAppDocumento,
    asgpAppDocumento => asgpAppDocumento.idTipoDocumento2
  )
  asgpAppDocumentos: AsgpAppDocumento[];

  @OneToMany(
    () => AsgpDocReqRutaAct,
    asgpDocReqRutaAct => asgpDocReqRutaAct.idTipoDocumento2
  )
  asgpDocReqRutaActs: AsgpDocReqRutaAct[];

  @OneToMany(
    () => AsgpPermisoDocumentoActividad,
    asgpPermisoDocumentoActividad =>
      asgpPermisoDocumentoActividad.idTipoDocumento2
  )
  asgpPermisoDocumentoActividads: AsgpPermisoDocumentoActividad[];

  @OneToMany(
    () => SgpConvocatoriaDocumento,
    sgpConvocatoriaDocumento => sgpConvocatoriaDocumento.idTipoDocumento2
  )
  sgpConvocatoriaDocumentos: SgpConvocatoriaDocumento[];

  @OneToMany(
    () => SgpRequisitoLinea,
    sgpRequisitoLinea => sgpRequisitoLinea.idTipoDocumento2
  )
  sgpRequisitoLineas: SgpRequisitoLinea[];
}
