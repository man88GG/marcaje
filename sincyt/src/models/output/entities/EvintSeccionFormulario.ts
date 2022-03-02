import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { EvintDetalleFormulario } from "./EvintDetalleFormulario";
import { EvintDocumentoAnexo } from "./EvintDocumentoAnexo";
import { EvintFormulario } from "./EvintFormulario";

@Index(
  "fk_evdif_seccion_formulario_evdif_formulario1_idx",
  ["idFormulario"],
  {}
)
@Index(
  "fk_evdif_seccion_formulario_evdif_seccion_formulario1_idx",
  ["idSeccionPadre"],
  {}
)
@Entity("evint_seccion_formulario", { schema: "sincyt" })
export class EvintSeccionFormulario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_seccion" })
  idSeccion: number;

  @Column("tinytext", { name: "numero_seccion" })
  numeroSeccion: string;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("int", { name: "id_formulario" })
  idFormulario: number;

  @Column("int", { name: "id_seccion_padre", nullable: true })
  idSeccionPadre: number | null;

  @OneToMany(
    () => EvintDetalleFormulario,
    evintDetalleFormulario => evintDetalleFormulario.idSeccionFormulario2
  )
  evintDetalleFormularios: EvintDetalleFormulario[];

  @OneToMany(
    () => EvintDocumentoAnexo,
    evintDocumentoAnexo => evintDocumentoAnexo.idSeccionFormulario2
  )
  evintDocumentoAnexos: EvintDocumentoAnexo[];

  @ManyToOne(
    () => EvintFormulario,
    evintFormulario => evintFormulario.evintSeccionFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_formulario", referencedColumnName: "idFormulario" }])
  idFormulario2: EvintFormulario;

  @ManyToOne(
    () => EvintSeccionFormulario,
    evintSeccionFormulario => evintSeccionFormulario.evintSeccionFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_seccion_padre", referencedColumnName: "idSeccion" }])
  idSeccionPadre2: EvintSeccionFormulario;

  @OneToMany(
    () => EvintSeccionFormulario,
    evintSeccionFormulario => evintSeccionFormulario.idSeccionPadre2
  )
  evintSeccionFormularios: EvintSeccionFormulario[];
}
