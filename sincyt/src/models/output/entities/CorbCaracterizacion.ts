import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbProceso } from "./CorbProceso";

@Index("proceso_caracterizacion_idx", ["idProceso"], {})
@Entity("corb_caracterizacion", { schema: "sincyt" })
export class CorbCaracterizacion {
  @PrimaryGeneratedColumn({ type: "int", name: "id_caracterizacion" })
  idCaracterizacion: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "alcance", length: 1000 })
  alcance: string;

  @Column("varchar", { name: "objetivo", length: 1000 })
  objetivo: string;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @ManyToOne(
    () => CorbProceso,
    corbProceso => corbProceso.corbCaracterizacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: CorbProceso;
}
