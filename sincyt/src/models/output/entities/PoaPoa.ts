import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaActividad } from "./PoaActividad";
import { PoaPeriodo } from "./PoaPeriodo";

@Index("fk_poa_poa_poa_periodo1_idx", ["anio", "periodo"], {})
@Entity("poa_poa", { schema: "sincyt" })
export class PoaPoa {
  @PrimaryGeneratedColumn({ type: "int", name: "poa" })
  poa: number;

  @Column("text", { name: "mision", nullable: true })
  mision: string | null;

  @Column("text", { name: "vision", nullable: true })
  vision: string | null;

  @Column("text", { name: "base_legal", nullable: true })
  baseLegal: string | null;

  @Column("text", { name: "politica_calidad", nullable: true })
  politicaCalidad: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("int", { name: "anio" })
  anio: number;

  @Column("int", { name: "periodo" })
  periodo: number;

  @OneToMany(
    () => PoaActividad,
    poaActividad => poaActividad.poa2
  )
  poaActividads: PoaActividad[];

  @ManyToOne(
    () => PoaPeriodo,
    poaPeriodo => poaPeriodo.poaPoas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "anio", referencedColumnName: "anio" },
    { name: "periodo", referencedColumnName: "periodo" }
  ])
  poaPeriodo: PoaPeriodo;
}
