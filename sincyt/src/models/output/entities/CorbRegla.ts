import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbCriterio } from "./CorbCriterio";
import { CorbRuta } from "./CorbRuta";

@Index("regla_requisito_idx", ["idCriterio"], {})
@Index("regla_ruta_idx", ["idRuta"], {})
@Entity("corb_regla", { schema: "sincyt" })
export class CorbRegla {
  @PrimaryGeneratedColumn({ type: "int", name: "id_regla" })
  idRegla: number;

  @Column("int", { name: "id_criterio" })
  idCriterio: number;

  @Column("int", { name: "id_ruta" })
  idRuta: number;

  @Column("varchar", { name: "operador", length: 2 })
  operador: string;

  @Column("varchar", { name: "valor", length: 100 })
  valor: string;

  @ManyToOne(
    () => CorbCriterio,
    corbCriterio => corbCriterio.corbReglas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_criterio", referencedColumnName: "idCriterio" }])
  idCriterio2: CorbCriterio;

  @ManyToOne(
    () => CorbRuta,
    corbRuta => corbRuta.corbReglas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_ruta", referencedColumnName: "idRuta" }])
  idRuta2: CorbRuta;
}
