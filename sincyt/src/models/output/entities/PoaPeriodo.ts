import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaTipoPeriodo } from "./PoaTipoPeriodo";
import { PoaPoa } from "./PoaPoa";
import { PoaResponsablePeriodo } from "./PoaResponsablePeriodo";

@Index("fk_POA_PERIODO_POA_TIPO_PERIODO1_idx", ["periodo"], {})
@Index("periodo_key", ["periodoKey"], {})
@Entity("poa_periodo", { schema: "sincyt" })
export class PoaPeriodo {
  @Column("int", { primary: true, name: "anio" })
  anio: number;

  @Column("date", { name: "fechaInicio" })
  fechaInicio: string;

  @Column("date", { name: "fechaFin" })
  fechaFin: string;

  @Column("tinyint", { name: "activo", nullable: true, default: () => "'0'" })
  activo: number | null;

  @Column("int", { primary: true, name: "periodo" })
  periodo: number;

  @Column("tinyint", {
    name: "notificacion",
    nullable: true,
    default: () => "'0'"
  })
  notificacion: number | null;

  @PrimaryGeneratedColumn({ type: "int", name: "periodo_key" })
  periodoKey: number;

  @Column("int", { name: "visible", nullable: true, default: () => "'1'" })
  visible: number | null;

  @Column("decimal", { name: "costo", nullable: true, precision: 10, scale: 0 })
  costo: string | null;

  @ManyToOne(
    () => PoaTipoPeriodo,
    poaTipoPeriodo => poaTipoPeriodo.poaPeriodos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "periodo", referencedColumnName: "tipoPeriodo" }])
  periodo2: PoaTipoPeriodo;

  @OneToMany(
    () => PoaPoa,
    poaPoa => poaPoa.poaPeriodo
  )
  poaPoas: PoaPoa[];

  @OneToMany(
    () => PoaResponsablePeriodo,
    poaResponsablePeriodo => poaResponsablePeriodo.poaPeriodo
  )
  poaResponsablePeriodos: PoaResponsablePeriodo[];
}
