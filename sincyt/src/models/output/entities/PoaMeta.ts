import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import { PoaActividad } from "./PoaActividad";
import { PoaUnidadMedida } from "./PoaUnidadMedida";

@Index("fk_poa_meta_poa_unidad_medida1_idx", ["unidadMedida"], {})
@Entity("poa_meta", { schema: "sincyt" })
export class PoaMeta {
  @Column("varchar", { name: "comentario", nullable: true, length: 45 })
  comentario: string | null;

  @Column("int", { primary: true, name: "actividad" })
  actividad: number;

  @Column("varchar", { name: "unidad_medida", length: 10 })
  unidadMedida: string;

  @OneToOne(
    () => PoaActividad,
    poaActividad => poaActividad.poaMeta,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "actividad", referencedColumnName: "actividad" }])
  actividad2: PoaActividad;

  @ManyToOne(
    () => PoaUnidadMedida,
    poaUnidadMedida => poaUnidadMedida.poaMetas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "unidad_medida", referencedColumnName: "codigo" }])
  unidadMedida2: PoaUnidadMedida;
}
