import { Column, Entity, OneToMany } from "typeorm";
import { CorbCriterio } from "./CorbCriterio";

@Entity("corb_funcion_criterio", { schema: "sincyt" })
export class CorbFuncionCriterio {
  @Column("int", { primary: true, name: "id_funcion_criterio" })
  idFuncionCriterio: number;

  @Column("varchar", { name: "descripcion", length: 50 })
  descripcion: string;

  @OneToMany(
    () => CorbCriterio,
    corbCriterio => corbCriterio.idFuncionCriterio2
  )
  corbCriterios: CorbCriterio[];
}
