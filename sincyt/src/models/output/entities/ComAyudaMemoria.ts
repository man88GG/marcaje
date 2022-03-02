import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComReunion } from "./ComReunion";

@Index("fk_com_ayuda_memoria_com_reunion1_idx", ["reunion"], {})
@Entity("com_ayuda_memoria", { schema: "sincyt" })
export class ComAyudaMemoria {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "reunion" })
  reunion: number;

  @Column("text", { name: "titulo" })
  titulo: string;

  @Column("tinyint", { name: "agenda_aprobada", default: () => "'0'" })
  agendaAprobada: number;

  @Column("text", { name: "desarrollo_agenda" })
  desarrolloAgenda: string;

  @Column("text", { name: "compromisos" })
  compromisos: string;

  @Column("text", { name: "acuerdos" })
  acuerdos: string;

  @Column("text", { name: "fecha_proxima" })
  fechaProxima: string;

  @Column("text", { name: "listado", nullable: true })
  listado: string | null;

  @ManyToOne(
    () => ComReunion,
    comReunion => comReunion.comAyudaMemorias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "reunion", referencedColumnName: "reunion" }])
  reunion2: ComReunion;
}
