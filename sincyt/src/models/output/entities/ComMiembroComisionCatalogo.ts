import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComMiembroComision } from "./ComMiembroComision";
import { ComMiembro } from "./ComMiembro";
import { RpeEstado } from "./RpeEstado";

@Index(
  "fk_com_miembro_comision_catalogo_com_miembro_comision1_idx",
  ["miembroComision"],
  {}
)
@Index(
  "fk_com_miembro_comision_catalogo_rpe_estado1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Entity("com_miembro_comision_catalogo", { schema: "sincyt" })
export class ComMiembroComisionCatalogo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "miembro_comision" })
  miembroComision: number;

  @Column("int", { name: "no_estado" })
  noEstado: number;

  @Column("int", { name: "no_tipo_estado" })
  noTipoEstado: number;

  @OneToMany(
    () => ComMiembroComision,
    comMiembroComision => comMiembroComision.cargo2
  )
  comMiembroComisions: ComMiembroComision[];

  @OneToMany(
    () => ComMiembroComision,
    comMiembroComision => comMiembroComision.estado2
  )
  comMiembroComisions2: ComMiembroComision[];

  @ManyToOne(
    () => ComMiembro,
    comMiembro => comMiembro.comMiembroComisionCatalogos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "miembro_comision", referencedColumnName: "miembroComision" }
  ])
  miembroComision2: ComMiembro;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comMiembroComisionCatalogos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
