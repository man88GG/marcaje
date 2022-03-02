import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComComision } from "./ComComision";
import { ComMiembro } from "./ComMiembro";
import { ComMiembroComisionCatalogo } from "./ComMiembroComisionCatalogo";

@Index("fk_com_miembro_comision_com_miembro1_idx", ["miembroComision"], {})
@Index(
  "fk_com_miembro_comision_com_miembro_comision_catalogo1_idx",
  ["cargo"],
  {}
)
@Index(
  "fk_com_miembro_comision_com_miembro_comision_catalogo2_idx",
  ["estado"],
  {}
)
@Index("fk_com_miembro_comision_com_comision1", ["comision"], {})
@Entity("com_miembro_comision", { schema: "sincyt" })
export class ComMiembroComision {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "comision" })
  comision: number;

  @Column("int", { name: "miembro_comision" })
  miembroComision: number;

  @Column("text", { name: "formulario", nullable: true })
  formulario: string | null;

  @Column("int", { name: "anio" })
  anio: number;

  @Column("int", { name: "cargo" })
  cargo: number;

  @Column("int", { name: "estado" })
  estado: number;

  @Column("timestamp", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  fechaRegistro: Date | null;

  @Column("timestamp", { name: "fecha_baja", nullable: true })
  fechaBaja: Date | null;

  @ManyToOne(
    () => ComComision,
    comComision => comComision.comMiembroComisions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "comision", referencedColumnName: "comision" }])
  comision2: ComComision;

  @ManyToOne(
    () => ComMiembro,
    comMiembro => comMiembro.comMiembroComisions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "miembro_comision", referencedColumnName: "miembroComision" }
  ])
  miembroComision2: ComMiembro;

  @ManyToOne(
    () => ComMiembroComisionCatalogo,
    comMiembroComisionCatalogo =>
      comMiembroComisionCatalogo.comMiembroComisions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "cargo", referencedColumnName: "id" }])
  cargo2: ComMiembroComisionCatalogo;

  @ManyToOne(
    () => ComMiembroComisionCatalogo,
    comMiembroComisionCatalogo =>
      comMiembroComisionCatalogo.comMiembroComisions2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "estado", referencedColumnName: "id" }])
  estado2: ComMiembroComisionCatalogo;
}
