import { Column, Entity, OneToMany } from "typeorm";
import { CorbEtapa } from "./CorbEtapa";

@Entity("corb_estado_etapa", { schema: "sincyt" })
export class CorbEstadoEtapa {
  @Column("int", { primary: true, name: "id_estado_etapa" })
  idEstadoEtapa: number;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @OneToMany(
    () => CorbEtapa,
    corbEtapa => corbEtapa.idEstadoEtapa2
  )
  corbEtapas: CorbEtapa[];
}
