import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaActividad } from "./PoaActividad";

@Index("poa_medio_verificacion_FK", ["actividad"], {})
@Entity("poa_medio_verificacion", { schema: "sincyt" })
export class PoaMedioVerificacion {
  @Column("int", { name: "actividad" })
  actividad: number;

  @PrimaryGeneratedColumn({ type: "int", name: "id_medio" })
  idMedio: number;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @ManyToOne(
    () => PoaActividad,
    poaActividad => poaActividad.poaMedioVerificacions,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "actividad", referencedColumnName: "actividad" }])
  actividad2: PoaActividad;
}
