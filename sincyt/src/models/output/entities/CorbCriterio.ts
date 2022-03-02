import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbFuncionCriterio } from "./CorbFuncionCriterio";
import { CorbTipoCriterio } from "./CorbTipoCriterio";
import { CorbEvidencia } from "./CorbEvidencia";
import { GtuPerfil } from "./GtuPerfil";
import { CorbRegla } from "./CorbRegla";
import { CorbTarea } from "./CorbTarea";

@Index("funcion_requisito_idx", ["idFuncionCriterio"], {})
@Index("tipo_requisito_idx", ["idTipoCriterio"], {})
@Entity("corb_criterio", { schema: "sincyt" })
export class CorbCriterio {
  @PrimaryGeneratedColumn({ type: "int", name: "id_criterio" })
  idCriterio: number;

  @Column("varchar", { name: "nombre", length: 150 })
  nombre: string;

  @Column("int", { name: "id_tipo_criterio" })
  idTipoCriterio: number;

  @Column("int", { name: "id_funcion_criterio" })
  idFuncionCriterio: number;

  @ManyToOne(
    () => CorbFuncionCriterio,
    corbFuncionCriterio => corbFuncionCriterio.corbCriterios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_funcion_criterio", referencedColumnName: "idFuncionCriterio" }
  ])
  idFuncionCriterio2: CorbFuncionCriterio;

  @ManyToOne(
    () => CorbTipoCriterio,
    corbTipoCriterio => corbTipoCriterio.corbCriterios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_tipo_criterio", referencedColumnName: "idTipoCriterio" }
  ])
  idTipoCriterio2: CorbTipoCriterio;

  @OneToMany(
    () => CorbEvidencia,
    corbEvidencia => corbEvidencia.idCriterio2
  )
  corbEvidencias: CorbEvidencia[];

  @ManyToMany(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.corbCriterios
  )
  gtuPerfils: GtuPerfil[];

  @OneToMany(
    () => CorbRegla,
    corbRegla => corbRegla.idCriterio2
  )
  corbReglas: CorbRegla[];

  @ManyToMany(
    () => CorbTarea,
    corbTarea => corbTarea.corbCriterios
  )
  corbTareas: CorbTarea[];
}
