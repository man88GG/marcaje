import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AppActividad } from "./AppActividad";
import { SgpTipoDocumento } from "./SgpTipoDocumento";

@Index("fk_asgp_permiso_documento_act_id_act", ["idActividad"], {})
@Index("fk_asgp_permiso_documento_act_id_tipo_doc", ["idTipoDocumento"], {})
@Entity("asgp_permiso_documento_actividad", { schema: "sincyt" })
export class AsgpPermisoDocumentoActividad {
  @Column("int", { name: "id_actividad" })
  idActividad: number;

  @Column("int", { name: "id_tipo_documento" })
  idTipoDocumento: number;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.asgpPermisoDocumentoActividads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;

  @ManyToOne(
    () => SgpTipoDocumento,
    sgpTipoDocumento => sgpTipoDocumento.asgpPermisoDocumentoActividads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_tipo_documento", referencedColumnName: "idTipoDocumento" }
  ])
  idTipoDocumento2: SgpTipoDocumento;
}
