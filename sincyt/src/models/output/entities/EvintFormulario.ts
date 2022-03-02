import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GrlEstado } from "./GrlEstado";
import { SgpLinea } from "./SgpLinea";
import { EvintSeccionFormulario } from "./EvintSeccionFormulario";

@Index(
  "fk_FORMULARIO_grl_estado1_idx",
  ["estadoFormulario", "tipoEstadoFormulario"],
  {}
)
@Index(
  "fk_evdif_formulario_grl_estado1_idx",
  ["tipoFormulario", "noTipoFormulario"],
  {}
)
@Index("fk_evdif_formulario_sgp_linea1_idx", ["idLinea"], {})
@Entity("evint_formulario", { schema: "sincyt" })
export class EvintFormulario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_formulario" })
  idFormulario: number;

  @Column("varchar", { name: "version", length: 45 })
  version: string;

  @Column("date", { name: "fecha_creacion" })
  fechaCreacion: string;

  @Column("date", { name: "fecha_vigencia" })
  fechaVigencia: string;

  @Column("varchar", { name: "descripcion", length: 500 })
  descripcion: string;

  @Column("int", { name: "estado_formulario" })
  estadoFormulario: number;

  @Column("int", { name: "tipo_estado_formulario" })
  tipoEstadoFormulario: number;

  @Column("int", { name: "tipo_formulario" })
  tipoFormulario: number;

  @Column("int", { name: "no_tipo_formulario" })
  noTipoFormulario: number;

  @Column("int", { name: "id_linea" })
  idLinea: number;

  @ManyToOne(
    () => GrlEstado,
    grlEstado => grlEstado.evintFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "estado_formulario", referencedColumnName: "noEstado" },
    { name: "tipo_estado_formulario", referencedColumnName: "noTipoEstado" }
  ])
  grlEstado: GrlEstado;

  @ManyToOne(
    () => GrlEstado,
    grlEstado => grlEstado.evintFormularios2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "tipo_formulario", referencedColumnName: "noEstado" },
    { name: "no_tipo_formulario", referencedColumnName: "noTipoEstado" }
  ])
  grlEstado2: GrlEstado;

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.evintFormularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_linea", referencedColumnName: "idLinea" }])
  idLinea2: SgpLinea;

  @OneToMany(
    () => EvintSeccionFormulario,
    evintSeccionFormulario => evintSeccionFormulario.idFormulario2
  )
  evintSeccionFormularios: EvintSeccionFormulario[];
}
