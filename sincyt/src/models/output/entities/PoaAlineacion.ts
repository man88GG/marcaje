import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { PoaActividad } from "./PoaActividad";

@Index("fk_POA_ALINEACION_POA_ALINEACION1_idx", ["alineacionPadre"], {})
@Entity("poa_alineacion", { schema: "sincyt" })
export class PoaAlineacion {
  @PrimaryGeneratedColumn({ type: "int", name: "alineacion" })
  alineacion: number;

  @Column("varchar", { name: "descripcion", length: 500 })
  descripcion: string;

  @Column("int", { name: "alineacion_padre", nullable: true })
  alineacionPadre: number | null;

  @Column("int", { name: "alineacion_key" })
  alineacionKey: number;

  @ManyToOne(
    () => PoaAlineacion,
    poaAlineacion => poaAlineacion.poaAlineacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "alineacion_padre", referencedColumnName: "alineacion" }
  ])
  alineacionPadre2: PoaAlineacion;

  @OneToMany(
    () => PoaAlineacion,
    poaAlineacion => poaAlineacion.alineacionPadre2
  )
  poaAlineacions: PoaAlineacion[];

  @ManyToMany(
    () => PoaActividad,
    poaActividad => poaActividad.poaAlineacions
  )
  poaActividads: PoaActividad[];
}
