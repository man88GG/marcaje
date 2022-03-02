import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";
import { EvintSeccionFormulario } from "./EvintSeccionFormulario";

@Index("FK_seccion_formulario_idx", ["idSeccionFormulario"], {})
@Index("FK_perfil_proyecto_idx", ["idPerfilProyecto"], {})
@Entity("evint_documento_anexo", { schema: "sincyt" })
export class EvintDocumentoAnexo {
  @PrimaryGeneratedColumn({ type: "int", name: "id_documento_anexo" })
  idDocumentoAnexo: number;

  @Column("text", { name: "nombre_documento" })
  nombreDocumento: string;

  @Column("text", { name: "id_mongo" })
  idMongo: string;

  @Column("text", { name: "evint_documento_anexo_nombre" })
  evintDocumentoAnexoNombre: string;

  @Column("int", { name: "id_seccion_formulario" })
  idSeccionFormulario: number;

  @Column("int", { name: "id_perfil_proyecto" })
  idPerfilProyecto: number;

  @Column("text", { name: "fecha_documento_anexo" })
  fechaDocumentoAnexo: string;

  @Column("text", { name: "descripcion_anexo" })
  descripcionAnexo: string;

  @ManyToOne(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.evintDocumentoAnexos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_perfil_proyecto", referencedColumnName: "idPerfilProyecto" }
  ])
  idPerfilProyecto2: SgpPerfilProyecto;

  @ManyToOne(
    () => EvintSeccionFormulario,
    evintSeccionFormulario => evintSeccionFormulario.evintDocumentoAnexos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_seccion_formulario", referencedColumnName: "idSeccion" }
  ])
  idSeccionFormulario2: EvintSeccionFormulario;
}
