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
import { RpeEstado } from "./RpeEstado";

@Index("fk_com_integrante_jd_rpe_estado1_idx", ["noEstado", "noTipoEstado"], {})
@Index("fk_com_integrante_jd_com_comision1_idx", ["comision"], {})
@Index("fk_com_integrante_jd_com_miembro1", ["miembroComision"], {})
@Entity("com_junta_directiva", { schema: "sincyt" })
export class ComJuntaDirectiva {
  @PrimaryGeneratedColumn({ type: "int", name: "junta_directiva" })
  juntaDirectiva: number;

  @Column("int", { name: "anio" })
  anio: number;

  @Column("tinyint", { name: "activo", default: () => "'0'" })
  activo: number;

  @Column("int", { name: "miembro_comision" })
  miembroComision: number;

  @Column("int", { name: "no_estado" })
  noEstado: number;

  @Column("int", { name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("text", { name: "foto_jd", nullable: true })
  fotoJd: string | null;

  @Column("int", { name: "comision" })
  comision: number;

  @ManyToOne(
    () => ComComision,
    comComision => comComision.comJuntaDirectivas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "comision", referencedColumnName: "comision" }])
  comision2: ComComision;

  @ManyToOne(
    () => ComMiembro,
    comMiembro => comMiembro.comJuntaDirectivas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "miembro_comision", referencedColumnName: "miembroComision" }
  ])
  miembroComision2: ComMiembro;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comJuntaDirectivas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
