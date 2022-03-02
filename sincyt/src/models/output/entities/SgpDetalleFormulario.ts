import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";
import { SgpSeccionFormulario } from "./SgpSeccionFormulario";

@Index(
  "fk_detalle_formulario_educacti_seccion_formulario1_idx",
  ["idSeccionFormulario"],
  {}
)
@Index(
  "fk_detalle_formulario_educacti_perfil_proyecto1_idx",
  ["idPerfilProyecto"],
  {}
)
@Entity("sgp_detalle_formulario", { schema: "sincyt" })
export class SgpDetalleFormulario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_detalle" })
  idDetalle: number;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "descripcion_abv", length: 45 })
  descripcionAbv: string;

  @Column("longtext", { name: "valor" })
  valor: string;

  @Column("int", { name: "id_seccion_formulario" })
  idSeccionFormulario: number;

  @Column("int", { name: "id_perfil_proyecto" })
  idPerfilProyecto: number;

  @ManyToOne(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.sgpDetalleFormularios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_perfil_proyecto", referencedColumnName: "idPerfilProyecto" }
  ])
  idPerfilProyecto2: SgpPerfilProyecto;

  @ManyToOne(
    () => SgpSeccionFormulario,
    sgpSeccionFormulario => sgpSeccionFormulario.sgpDetalleFormularios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "id_seccion_formulario",
      referencedColumnName: "idSeccionFormulario"
    }
  ])
  idSeccionFormulario2: SgpSeccionFormulario;
}
