import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuEstado } from "./GtuEstado";

@Index("id_estado", ["idEstado"], {})
@Entity("gms_prioridad", { schema: "sincyt" })
export class GmsPrioridad {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 200 })
  descripcion: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gmsPrioridads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;
}
