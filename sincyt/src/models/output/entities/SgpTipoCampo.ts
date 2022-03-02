import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { SgpSeccionFormulario } from "./SgpSeccionFormulario";

@Index("id_seccion_formulario_idx", ["idSeccionFormulario"], {})
@Entity("sgp_tipo_campo", { schema: "sincyt" })
export class SgpTipoCampo {
  @Column("int", { primary: true, name: "id_tipo_campo" })
  idTipoCampo: number;

  @Column("varchar", { name: "descripcion_tipo", length: 45 })
  descripcionTipo: string;

  @Column("varchar", { name: "tipo", length: 45 })
  tipo: string;

  @Column("tinyint", { name: "es_matriz_metadata" })
  esMatrizMetadata: number;

  @Column("tinyint", { name: "es_monetario" })
  esMonetario: number;

  @Column("varchar", { name: "tabla_relacion", nullable: true, length: 45 })
  tablaRelacion: string | null;

  @Column("int", { name: "id_seccion_formulario", nullable: true })
  idSeccionFormulario: number | null;

  @ManyToOne(
    () => SgpSeccionFormulario,
    sgpSeccionFormulario => sgpSeccionFormulario.sgpTipoCampos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "id_seccion_formulario",
      referencedColumnName: "idSeccionFormulario"
    }
  ])
  idSeccionFormulario2: SgpSeccionFormulario;
}
