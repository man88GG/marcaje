import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaActividad } from "./PoaActividad";

@Index("fk_poa_actividad_renglon_poa_actividad_idx", ["actividad"], {})
@Entity("poa_actividad_renglon", { schema: "sincyt" })
export class PoaActividadRenglon {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "renglon", length: 45 })
  renglon: string;

  @Column("varchar", { name: "monto", length: 45 })
  monto: string;

  @Column("int", { name: "actividad" })
  actividad: number;

  @ManyToOne(
    () => PoaActividad,
    poaActividad => poaActividad.poaActividadRenglons,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "actividad", referencedColumnName: "actividad" }])
  actividad2: PoaActividad;
}
