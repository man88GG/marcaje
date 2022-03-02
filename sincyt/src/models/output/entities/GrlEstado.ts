import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { EvintFormulario } from "./EvintFormulario";
import { GrlTipoEstado } from "./GrlTipoEstado";

@Index("fk_grl_estado_grl_tipo_estado_idx", ["noTipoEstado"], {})
@Entity("grl_estado", { schema: "sincyt" })
export class GrlEstado {
  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("varchar", { name: "nombre_estado", length: 500 })
  nombreEstado: string;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @OneToMany(
    () => EvintFormulario,
    evintFormulario => evintFormulario.grlEstado
  )
  evintFormularios: EvintFormulario[];

  @OneToMany(
    () => EvintFormulario,
    evintFormulario => evintFormulario.grlEstado2
  )
  evintFormularios2: EvintFormulario[];

  @ManyToOne(
    () => GrlTipoEstado,
    grlTipoEstado => grlTipoEstado.grlEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  noTipoEstado2: GrlTipoEstado;
}
