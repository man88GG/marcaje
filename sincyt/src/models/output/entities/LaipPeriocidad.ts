import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { LaipItem } from "./LaipItem";

@Index("iditemperiocidad_idx", ["idItem"], {})
@Entity("laip_periocidad", { schema: "sincyt" })
export class LaipPeriocidad {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "mes" })
  mes: number;

  @Column("int", { name: "id_item" })
  idItem: number;

  @ManyToOne(
    () => LaipItem,
    laipItem => laipItem.laipPeriocidads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_item", referencedColumnName: "id" }])
  idItem2: LaipItem;
}
