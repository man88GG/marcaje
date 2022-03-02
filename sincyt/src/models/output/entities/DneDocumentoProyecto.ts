import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DneDocumento } from "./DneDocumento";
import { DneProyecto } from "./DneProyecto";

@Index(
  "fk_dne_documento_proyecto_dne_proyecto1_idx",
  ["dneProyectoNoProyecto"],
  {}
)
@Index(
  "fk_dne_documento_proyecto_dne_documento1_idx",
  ["dneDocumentoNoDocumento"],
  {}
)
@Entity("dne_documento_proyecto", { schema: "sincyt" })
export class DneDocumentoProyecto {
  @Column("int", { name: "dne_proyecto_no_proyecto" })
  dneProyectoNoProyecto: number;

  @Column("int", { name: "dne_documento_no_documento" })
  dneDocumentoNoDocumento: number;

  @ManyToOne(
    () => DneDocumento,
    dneDocumento => dneDocumento.dneDocumentoProyectos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "dne_documento_no_documento", referencedColumnName: "noDocumento" }
  ])
  dneDocumentoNoDocumento2: DneDocumento;

  @ManyToOne(
    () => DneProyecto,
    dneProyecto => dneProyecto.dneDocumentoProyectos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "dne_proyecto_no_proyecto", referencedColumnName: "noProyecto" }
  ])
  dneProyectoNoProyecto2: DneProyecto;
}
