import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbProceso } from "./CorbProceso";

@Index("nombre_UNIQUE", ["nombre"], { unique: true })
@Index("formula_UNIQUE", ["formula"], { unique: true })
@Index("id_proceso_UNIQUE", ["idProceso"], { unique: true })
@Entity("corb_indicador", { schema: "sincyt" })
export class CorbIndicador {
  @PrimaryGeneratedColumn({ type: "int", name: "id_indicador" })
  idIndicador: number;

  @Column("varchar", {
    name: "nombre",
    nullable: true,
    unique: true,
    length: 100
  })
  nombre: string | null;

  @Column("varchar", {
    name: "formula",
    nullable: true,
    unique: true,
    length: 255
  })
  formula: string | null;

  @Column("varchar", { name: "tipo_kpi", nullable: true, length: 255 })
  tipoKpi: string | null;

  @Column("int", { name: "id_proceso", nullable: true, unique: true })
  idProceso: number | null;

  @OneToOne(
    () => CorbProceso,
    corbProceso => corbProceso.corbIndicador,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: CorbProceso;
}
