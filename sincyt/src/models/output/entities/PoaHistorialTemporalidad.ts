import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaTemporalidad } from "./PoaTemporalidad";

@Index("fk_historial_poa_temporalidad1_idx", ["temporalidad"], {})
@Entity("poa_historial_temporalidad", { schema: "sincyt" })
export class PoaHistorialTemporalidad {
  @Column("int", { name: "temporalidad" })
  temporalidad: number;

  @Column("timestamp", { name: "fecha", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column("text", { name: "observacion", nullable: true })
  observacion: string | null;

  @Column("int", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @PrimaryGeneratedColumn({ type: "int", name: "historial_temporalidad" })
  historialTemporalidad: number;

  @ManyToOne(
    () => PoaTemporalidad,
    poaTemporalidad => poaTemporalidad.poaHistorialTemporalidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "temporalidad", referencedColumnName: "temporalidad" }])
  temporalidad2: PoaTemporalidad;
}
