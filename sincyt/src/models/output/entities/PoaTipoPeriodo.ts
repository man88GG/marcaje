import { Column, Entity, OneToMany } from "typeorm";
import { PoaPeriodo } from "./PoaPeriodo";

@Entity("poa_tipo_periodo", { schema: "sincyt" })
export class PoaTipoPeriodo {
  @Column("int", { primary: true, name: "tipo_periodo" })
  tipoPeriodo: number;

  @Column("varchar", { name: "descripcion", nullable: true, length: 45 })
  descripcion: string | null;

  @OneToMany(
    () => PoaPeriodo,
    poaPeriodo => poaPeriodo.periodo2
  )
  poaPeriodos: PoaPeriodo[];
}
