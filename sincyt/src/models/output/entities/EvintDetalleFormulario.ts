import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { EvintSeccionFormulario } from "./EvintSeccionFormulario";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";

@Index(
  "fk_evdif_detalle_formulario_evdif_seccion_formulario1_idx",
  ["idSeccionFormulario"],
  {}
)
@Index(
  "fk_evdif_detalle_formulario_sgp_perfil_proyecto1_idx",
  ["idPerfilProyecto"],
  {}
)
@Entity("evint_detalle_formulario", { schema: "sincyt" })
export class EvintDetalleFormulario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_detalle_formulario" })
  idDetalleFormulario: number;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("longtext", { name: "valor", nullable: true })
  valor: string | null;

  @Column("int", { name: "id_seccion_formulario" })
  idSeccionFormulario: number;

  @Column("int", { name: "id_perfil_proyecto" })
  idPerfilProyecto: number;

  @Column("longtext", { name: "nombre_componente_contenedor", nullable: true })
  nombreComponenteContenedor: string | null;

  @Column("int", { name: "tipo_componente", nullable: true })
  tipoComponente: number | null;

  @ManyToOne(
    () => EvintSeccionFormulario,
    evintSeccionFormulario => evintSeccionFormulario.evintDetalleFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_seccion_formulario", referencedColumnName: "idSeccion" }
  ])
  idSeccionFormulario2: EvintSeccionFormulario;

  @ManyToOne(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.evintDetalleFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_perfil_proyecto", referencedColumnName: "idPerfilProyecto" }
  ])
  idPerfilProyecto2: SgpPerfilProyecto;
}
