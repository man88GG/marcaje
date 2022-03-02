import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComComision } from "./ComComision";

@Index("fk_com_linea_prioritaria_com_comision_idx", ["comision"], {})
@Entity("com_linea_prioritaria", { schema: "sincyt" })
export class ComLineaPrioritaria {
  @Column("int", { name: "comision" })
  comision: number;

  @PrimaryGeneratedColumn({ type: "int", name: "linea" })
  linea: number;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @ManyToOne(
    () => ComComision,
    comComision => comComision.comLineaPrioritarias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "comision", referencedColumnName: "comision" }])
  comision2: ComComision;
}
