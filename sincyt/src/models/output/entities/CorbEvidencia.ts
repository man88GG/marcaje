import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbEtapa } from "./CorbEtapa";
import { CorbCriterio } from "./CorbCriterio";

@Index("id_etapa_evidencia_fk_idx", ["idEtapa"], {})
@Index("id_requisito_evidencia_fk_idx", ["idCriterio"], {})
@Entity("corb_evidencia", { schema: "sincyt" })
export class CorbEvidencia {
  @PrimaryGeneratedColumn({ type: "int", name: "id_evidencia" })
  idEvidencia: number;

  @Column("int", { name: "id_criterio" })
  idCriterio: number;

  @Column("int", { name: "id_etapa" })
  idEtapa: number;

  @Column("varchar", { name: "valor", length: 255 })
  valor: string;

  @ManyToOne(
    () => CorbEtapa,
    corbEtapa => corbEtapa.corbEvidencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_etapa", referencedColumnName: "idEtapa" }])
  idEtapa2: CorbEtapa;

  @ManyToOne(
    () => CorbCriterio,
    corbCriterio => corbCriterio.corbEvidencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_criterio", referencedColumnName: "idCriterio" }])
  idCriterio2: CorbCriterio;
}
