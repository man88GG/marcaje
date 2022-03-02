import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComReunion } from "./ComReunion";

@Index("fk_com_agenda_com_reunion1_idx", ["reunion"], {})
@Entity("com_agenda", { schema: "sincyt" })
export class ComAgenda {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "reunion" })
  reunion: number;

  @Column("text", { name: "titulo" })
  titulo: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("text", { name: "conclusion", nullable: true })
  conclusion: string | null;

  @ManyToOne(
    () => ComReunion,
    comReunion => comReunion.comAgenda,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "reunion", referencedColumnName: "reunion" }])
  reunion2: ComReunion;
}
