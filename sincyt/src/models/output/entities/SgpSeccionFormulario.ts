import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { SgpDetalleFormulario } from "./SgpDetalleFormulario";
import { SgpFormulario } from "./SgpFormulario";
import { SgpTipoCampo } from "./SgpTipoCampo";

@Index("fk_seccion_formulario_formulario1_idx", ["idFormulario"], {})
@Index("fk_seccion_formulario_seccion_formulario1_idx", ["idSeccionPadre"], {})
@Entity("sgp_seccion_formulario", { schema: "sincyt" })
export class SgpSeccionFormulario {
  @Column("int", { primary: true, name: "id_seccion_formulario" })
  idSeccionFormulario: number;

  @Column("tinytext", { name: "numero_seccion" })
  numeroSeccion: string;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("int", { name: "id_formulario" })
  idFormulario: number;

  @Column("int", { name: "id_seccion_padre", nullable: true })
  idSeccionPadre: number | null;

  @OneToMany(
    () => SgpDetalleFormulario,
    sgpDetalleFormulario => sgpDetalleFormulario.idSeccionFormulario2
  )
  sgpDetalleFormularios: SgpDetalleFormulario[];

  @ManyToOne(
    () => SgpFormulario,
    sgpFormulario => sgpFormulario.sgpSeccionFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_formulario", referencedColumnName: "idFormulario" }])
  idFormulario2: SgpFormulario;

  @ManyToOne(
    () => SgpSeccionFormulario,
    sgpSeccionFormulario => sgpSeccionFormulario.sgpSeccionFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_seccion_padre", referencedColumnName: "idSeccionFormulario" }
  ])
  idSeccionPadre2: SgpSeccionFormulario;

  @OneToMany(
    () => SgpSeccionFormulario,
    sgpSeccionFormulario => sgpSeccionFormulario.idSeccionPadre2
  )
  sgpSeccionFormularios: SgpSeccionFormulario[];

  @OneToMany(
    () => SgpTipoCampo,
    sgpTipoCampo => sgpTipoCampo.idSeccionFormulario2
  )
  sgpTipoCampos: SgpTipoCampo[];
}
