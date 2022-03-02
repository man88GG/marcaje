import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpePersona } from "./RpePersona";

@Index("fk_RPE_CONOCIMIENTO_IDIOMA_RPE_PERSONA1_idx", ["noRegistroPersona"], {})
@Entity("rpe_conocimiento_idioma", { schema: "sincyt" })
export class RpeConocimientoIdioma {
  @PrimaryGeneratedColumn({ type: "int", name: "no_conocimiento_idioma" })
  noConocimientoIdioma: number;

  @Column("varchar", { name: "idioma", length: 250 })
  idioma: string;

  @Column("double", { name: "lectura", nullable: true, precision: 22 })
  lectura: number | null;

  @Column("double", { name: "escritura", nullable: true, precision: 22 })
  escritura: number | null;

  @Column("double", { name: "comprension", nullable: true, precision: 22 })
  comprension: number | null;

  @Column("double", { name: "fluidez_verbal", nullable: true, precision: 22 })
  fluidezVerbal: number | null;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @Column("int", { name: "es_nativo" })
  esNativo: number;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeConocimientoIdiomas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;
}
