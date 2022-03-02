import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpePersona } from "./RpePersona";

@Index(
  "fk_RPE_EXPERIENCIA_PROYECTO_RPE_PERSONA1_idx",
  ["noRegistroPersona"],
  {}
)
@Entity("rpe_experiencia_proyecto", { schema: "sincyt" })
export class RpeExperienciaProyecto {
  @PrimaryGeneratedColumn({ type: "int", name: "no_experiencia_proyecto" })
  noExperienciaProyecto: number;

  @Column("varchar", { name: "nombre_proyecto", nullable: true, length: 1000 })
  nombreProyecto: string | null;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin" })
  fechaFin: string;

  @Column("varchar", { name: "objetivo", nullable: true, length: 5000 })
  objetivo: string | null;

  @Column("double", { name: "monto_financiado_q", precision: 22 })
  montoFinanciadoQ: number;

  @Column("varchar", { name: "impacto", nullable: true, length: 5000 })
  impacto: string | null;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeExperienciaProyectos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;
}
