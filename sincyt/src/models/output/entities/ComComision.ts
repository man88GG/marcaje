import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeEstado } from "./RpeEstado";
import { ComDocumento } from "./ComDocumento";
import { ComJuntaDirectiva } from "./ComJuntaDirectiva";
import { ComLineaPrioritaria } from "./ComLineaPrioritaria";
import { ComMiembroComision } from "./ComMiembroComision";
import { ComObservacion } from "./ComObservacion";
import { ComRepresentanteSenacyt } from "./ComRepresentanteSenacyt";
import { ComReunion } from "./ComReunion";

@Index("siglas_UNIQUE", ["siglas"], { unique: true })
@Index(
  "fk_com_comision_rpe_estado1_idx",
  ["noEstadoTipoComision", "noTipoEstadoTipoComision"],
  {}
)
@Entity("com_comision", { schema: "sincyt" })
export class ComComision {
  @PrimaryGeneratedColumn({ type: "int", name: "comision" })
  comision: number;

  @Column("varchar", { name: "nombre", length: 500 })
  nombre: string;

  @Column("varchar", { name: "siglas", unique: true, length: 45 })
  siglas: string;

  @Column("text", { name: "logo", nullable: true })
  logo: string | null;

  @Column("text", { name: "mision", nullable: true })
  mision: string | null;

  @Column("text", { name: "vision", nullable: true })
  vision: string | null;

  @Column("text", { name: "foto_comision", nullable: true })
  fotoComision: string | null;

  @Column("text", { name: "plan_trabajo", nullable: true })
  planTrabajo: string | null;

  @Column("int", { primary: true, name: "no_estado_tipo_comision" })
  noEstadoTipoComision: number;

  @Column("int", { primary: true, name: "no_tipo_estado_tipo_comision" })
  noTipoEstadoTipoComision: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("timestamp", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comComisions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado_tipo_comision", referencedColumnName: "noEstado" },
    {
      name: "no_tipo_estado_tipo_comision",
      referencedColumnName: "noTipoEstado"
    }
  ])
  rpeEstado: RpeEstado;

  @OneToMany(
    () => ComDocumento,
    comDocumento => comDocumento.comision2
  )
  comDocumentos: ComDocumento[];

  @OneToMany(
    () => ComJuntaDirectiva,
    comJuntaDirectiva => comJuntaDirectiva.comision2
  )
  comJuntaDirectivas: ComJuntaDirectiva[];

  @OneToMany(
    () => ComLineaPrioritaria,
    comLineaPrioritaria => comLineaPrioritaria.comision2
  )
  comLineaPrioritarias: ComLineaPrioritaria[];

  @OneToMany(
    () => ComMiembroComision,
    comMiembroComision => comMiembroComision.comision2
  )
  comMiembroComisions: ComMiembroComision[];

  @OneToMany(
    () => ComObservacion,
    comObservacion => comObservacion.comision2
  )
  comObservacions: ComObservacion[];

  @OneToMany(
    () => ComRepresentanteSenacyt,
    comRepresentanteSenacyt => comRepresentanteSenacyt.comision2
  )
  comRepresentanteSenacyts: ComRepresentanteSenacyt[];

  @OneToMany(
    () => ComReunion,
    comReunion => comReunion.comision2
  )
  comReunions: ComReunion[];
}
