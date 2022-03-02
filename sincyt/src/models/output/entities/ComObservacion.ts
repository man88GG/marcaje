import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComComision } from "./ComComision";

@Index("fk_com_observacion_com_comision1_idx", ["comision"], {})
@Entity("com_observacion", { schema: "sincyt" })
export class ComObservacion {
  @Column("int", { primary: true, name: "comision" })
  comision: number;

  @PrimaryGeneratedColumn({ type: "int", name: "observacion" })
  observacion: number;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @ManyToOne(
    () => ComComision,
    comComision => comComision.comObservacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "comision", referencedColumnName: "comision" }])
  comision2: ComComision;
}
