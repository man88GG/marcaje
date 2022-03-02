import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DneDocumento } from "./DneDocumento";
import { DneEntidad } from "./DneEntidad";

@Index("fk_dne_entidad_bloque_documento_dne_entidad1_idx", ["noEntidad"], {})
@Index(
  "fk_dne_entidad_bloque_documento_dne_documento1_idx",
  ["noDocumento"],
  {}
)
@Entity("dne_entidad_bloque_documento", { schema: "sincyt" })
export class DneEntidadBloqueDocumento {
  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @Column("int", { name: "no_documento" })
  noDocumento: number;

  @ManyToOne(
    () => DneDocumento,
    dneDocumento => dneDocumento.dneEntidadBloqueDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_documento", referencedColumnName: "noDocumento" }])
  noDocumento2: DneDocumento;

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneEntidadBloqueDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;
}
