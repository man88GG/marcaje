import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaHistorialTemporalidad } from "./PoaHistorialTemporalidad";
import { PoaActividad } from "./PoaActividad";

@Index("fk_POA_TEMPORALIDAD_POA_ACTIVIDAD1_idx", ["actividad"], {})
@Entity("poa_temporalidad", { schema: "sincyt" })
export class PoaTemporalidad {
  @Column("int", { name: "actividad" })
  actividad: number;

  @Column("tinyint", { name: "estado", default: () => "'0'" })
  estado: number;

  @Column("date", { name: "fechainicio", nullable: true })
  fechainicio: string | null;

  @Column("date", { name: "fechafin", nullable: true })
  fechafin: string | null;

  @PrimaryGeneratedColumn({ type: "int", name: "temporalidad" })
  temporalidad: number;

  @Column("text", { name: "observacion", nullable: true })
  observacion: string | null;

  @OneToMany(
    () => PoaHistorialTemporalidad,
    poaHistorialTemporalidad => poaHistorialTemporalidad.temporalidad2
  )
  poaHistorialTemporalidads: PoaHistorialTemporalidad[];

  @ManyToOne(
    () => PoaActividad,
    poaActividad => poaActividad.poaTemporalidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "actividad", referencedColumnName: "actividad" }])
  actividad2: PoaActividad;
}
