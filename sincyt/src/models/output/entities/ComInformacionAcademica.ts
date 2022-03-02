import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ComMiembro } from "./ComMiembro";
import { RpeEstado } from "./RpeEstado";

@Index("fk_com_informacion_academica_com_miembro1_idx", ["miembroComision"], {})
@Index(
  "fk_com_informacion_academica_rpe_estado1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Entity("com_informacion_academica", { schema: "sincyt" })
export class ComInformacionAcademica {
  @Column("int", { primary: true, name: "miembro_comision" })
  miembroComision: number;

  @Column("text", { name: "descripcion_carrera", nullable: true })
  descripcionCarrera: string | null;

  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @ManyToOne(
    () => ComMiembro,
    comMiembro => comMiembro.comInformacionAcademicas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "miembro_comision", referencedColumnName: "miembroComision" }
  ])
  miembroComision2: ComMiembro;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comInformacionAcademicas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
