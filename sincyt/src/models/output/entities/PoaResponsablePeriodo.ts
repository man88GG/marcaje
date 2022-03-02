import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GtuDepartamento } from "./GtuDepartamento";
import { PoaPeriodo } from "./PoaPeriodo";

@Index("fk_poa_colaborador_periodo_poa_periodo1_idx", ["anio", "periodo"], {})
@Index("fk_poa_colaborador_periodo_organizacion1", ["responsable"], {})
@Entity("poa_responsable_periodo", { schema: "sincyt" })
export class PoaResponsablePeriodo {
  @Column("int", { name: "responsable" })
  responsable: number;

  @Column("int", { name: "anio" })
  anio: number;

  @Column("int", { name: "periodo" })
  periodo: number;

  @Column("tinyint", { name: "estado", default: () => "'0'" })
  estado: number;

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.poaResponsablePeriodos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "responsable", referencedColumnName: "id" }])
  responsable2: GtuDepartamento;

  @ManyToOne(
    () => PoaPeriodo,
    poaPeriodo => poaPeriodo.poaResponsablePeriodos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "anio", referencedColumnName: "anio" },
    { name: "periodo", referencedColumnName: "periodo" }
  ])
  poaPeriodo: PoaPeriodo;
}
