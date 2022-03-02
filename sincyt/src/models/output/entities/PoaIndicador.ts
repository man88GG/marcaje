import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaActividad } from "./PoaActividad";

@Index("poa_indicador_FK", ["actividad"], {})
@Entity("poa_indicador", { schema: "sincyt" })
export class PoaIndicador {
  @Column("int", { name: "actividad" })
  actividad: number;

  @PrimaryGeneratedColumn({ type: "int", name: "id_indicador" })
  idIndicador: number;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @ManyToOne(
    () => PoaActividad,
    poaActividad => poaActividad.poaIndicadors,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "actividad", referencedColumnName: "actividad" }])
  actividad2: PoaActividad;
}
