import { Column, Entity, OneToMany } from "typeorm";
import { CorbCriterio } from "./CorbCriterio";

@Entity("corb_tipo_criterio", { schema: "sincyt" })
export class CorbTipoCriterio {
  @Column("int", { primary: true, name: "id_tipo_criterio" })
  idTipoCriterio: number;

  @Column("varchar", { name: "descripcion", length: 50 })
  descripcion: string;

  @OneToMany(
    () => CorbCriterio,
    corbCriterio => corbCriterio.idTipoCriterio2
  )
  corbCriterios: CorbCriterio[];
}
