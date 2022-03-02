import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComComision } from "./ComComision";
import { GtuUsuario } from "./GtuUsuario";
import { RpeEstado } from "./RpeEstado";

@Index("fk_com_enlace_senacyt_com_comision1_idx", ["comision"], {})
@Index("fk_com_representante_senacyt_gtu_usuario1_idx", ["reprecentante"], {})
@Index(
  "fk_com_representante_senacyt_rpe_estado1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Entity("com_representante_senacyt", { schema: "sincyt" })
export class ComRepresentanteSenacyt {
  @Column("int", { name: "comision" })
  comision: number;

  @Column("int", { name: "anio" })
  anio: number;

  @Column("int", { name: "reprecentante" })
  reprecentante: number;

  @Column("int", { name: "no_estado" })
  noEstado: number;

  @Column("int", { name: "no_tipo_estado" })
  noTipoEstado: number;

  @PrimaryGeneratedColumn({ type: "int", name: "representante_senacyt" })
  representanteSenacyt: number;

  @ManyToOne(
    () => ComComision,
    comComision => comComision.comRepresentanteSenacyts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "comision", referencedColumnName: "comision" }])
  comision2: ComComision;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.comRepresentanteSenacyts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "reprecentante", referencedColumnName: "id" }])
  reprecentante2: GtuUsuario;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comRepresentanteSenacyts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
