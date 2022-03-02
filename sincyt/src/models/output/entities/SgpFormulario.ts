import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { SgpLinea } from "./SgpLinea";
import { SgpSeccionFormulario } from "./SgpSeccionFormulario";

@Index("fk_formulario_linea1_idx", ["idLinea"], {})
@Entity("sgp_formulario", { schema: "sincyt" })
export class SgpFormulario {
  @Column("int", { primary: true, name: "id_formulario" })
  idFormulario: number;

  @Column("decimal", { name: "version", precision: 8, scale: 2 })
  version: string;

  @Column("date", { name: "fecha_creacion" })
  fechaCreacion: string;

  @Column("date", { name: "fecha_fin_vigencia", nullable: true })
  fechaFinVigencia: string | null;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("tinyint", { name: "estado" })
  estado: number;

  @Column("int", { name: "id_linea" })
  idLinea: number;

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.sgpFormularios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_linea", referencedColumnName: "idLinea" }])
  idLinea2: SgpLinea;

  @OneToMany(
    () => SgpSeccionFormulario,
    sgpSeccionFormulario => sgpSeccionFormulario.idFormulario2
  )
  sgpSeccionFormularios: SgpSeccionFormulario[];
}
