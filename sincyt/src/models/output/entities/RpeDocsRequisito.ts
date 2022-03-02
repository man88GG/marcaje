import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeTipoDocumento } from "./RpeTipoDocumento";
import { AppActividadRequisito } from "./AppActividadRequisito";

@Index(
  "fk_RPE_DOCS_REQUISITO_RPE_TIPO_DOCUMENTO1_idx",
  ["noTipoDocumento", "noBloque"],
  {}
)
@Entity("rpe_docs_requisito", { schema: "sincyt" })
export class RpeDocsRequisito {
  @Column("int", { primary: true, name: "id_actividad" })
  idActividad: number;

  @Column("int", { primary: true, name: "id_requisito" })
  idRequisito: number;

  @Column("int", { primary: true, name: "no_tipo_documento" })
  noTipoDocumento: number;

  @Column("int", { primary: true, name: "no_bloque" })
  noBloque: number;

  @Column("int", { name: "obligatorio" })
  obligatorio: number;

  @ManyToOne(
    () => RpeTipoDocumento,
    rpeTipoDocumento => rpeTipoDocumento.rpeDocsRequisitos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_documento", referencedColumnName: "noTipoDocumento" },
    { name: "no_bloque", referencedColumnName: "noBloque" }
  ])
  rpeTipoDocumento: RpeTipoDocumento;

  @ManyToOne(
    () => AppActividadRequisito,
    appActividadRequisito => appActividadRequisito.rpeDocsRequisitos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_actividad", referencedColumnName: "idActividad" },
    { name: "id_requisito", referencedColumnName: "idRequisito" }
  ])
  appActividadRequisito: AppActividadRequisito;
}
