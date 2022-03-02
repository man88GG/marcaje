import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ComMiembro } from "./ComMiembro";
import { RpeEstado } from "./RpeEstado";

@Index(
  "fk_com_informacion_contacto_miembro_com_miembro1_idx",
  ["miembroComision"],
  {}
)
@Entity("com_informacion_contacto_miembro", { schema: "sincyt" })
export class ComInformacionContactoMiembro {
  @Column("int", { primary: true, name: "miembro_comision" })
  miembroComision: number;

  @Column("text", { name: "informacion", nullable: true })
  informacion: string | null;

  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @ManyToOne(
    () => ComMiembro,
    comMiembro => comMiembro.comInformacionContactoMiembros,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "miembro_comision", referencedColumnName: "miembroComision" }
  ])
  miembroComision2: ComMiembro;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comInformacionContactoMiembros,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
