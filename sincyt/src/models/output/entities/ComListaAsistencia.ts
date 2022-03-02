import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComMiembro } from "./ComMiembro";
import { ComReunion } from "./ComReunion";
import { RpeEstado } from "./RpeEstado";

@Index("fk_com_lista_asistencia_com_miembro1_idx", ["miembroComision"], {})
@Index("fk_com_lista_asistencia_com_reunion1_idx", ["reunion"], {})
@Index(
  "fk_com_lista_asistencia_rpe_estado1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Entity("com_lista_asistencia", { schema: "sincyt" })
export class ComListaAsistencia {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "miembro_comision" })
  miembroComision: number;

  @Column("int", { name: "reunion" })
  reunion: number;

  @Column("text", { name: "observacion", nullable: true })
  observacion: string | null;

  @Column("int", { name: "no_estado" })
  noEstado: number;

  @Column("int", { name: "no_tipo_estado" })
  noTipoEstado: number;

  @ManyToOne(
    () => ComMiembro,
    comMiembro => comMiembro.comListaAsistencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "miembro_comision", referencedColumnName: "miembroComision" }
  ])
  miembroComision2: ComMiembro;

  @ManyToOne(
    () => ComReunion,
    comReunion => comReunion.comListaAsistencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "reunion", referencedColumnName: "reunion" }])
  reunion2: ComReunion;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comListaAsistencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
