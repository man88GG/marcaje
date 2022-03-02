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
import { RpePersona } from "./RpePersona";
import { RpeReferencias } from "./RpeReferencias";

@Index(
  "fk_RPE_INFORMACION_LABORAL_RPE_ESTADO1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Index("fk_RPE_INFORMACION_LABORAL_RPE_PERSONA1_idx", ["noRegistroPersona"], {})
@Entity("rpe_informacion_laboral", { schema: "sincyt" })
export class RpeInformacionLaboral {
  @PrimaryGeneratedColumn({ type: "int", name: "no_informacion_laboral" })
  noInformacionLaboral: number;

  @Column("varchar", { name: "nombre_entidad", length: 1000 })
  nombreEntidad: string;

  @Column("int", { name: "es_trabajo_actual" })
  esTrabajoActual: number;

  @Column("int", { name: "no_estado" })
  noEstado: number;

  @Column("int", { name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("varchar", { name: "direccion", length: 1000 })
  direccion: string;

  @Column("varchar", { name: "telefono", length: 100 })
  telefono: string;

  @Column("varchar", { name: "paginaweb", length: 1000 })
  paginaweb: string;

  @Column("varchar", {
    name: "unidad_departamento_division",
    nullable: true,
    length: 500
  })
  unidadDepartamentoDivision: string | null;

  @Column("varchar", { name: "cargo_puesto", length: 500 })
  cargoPuesto: string;

  @Column("varchar", { name: "email", nullable: true, length: 500 })
  email: string | null;

  @Column("varchar", {
    name: "actividades_principales_realiza",
    nullable: true,
    length: 1000
  })
  actividadesPrincipalesRealiza: string | null;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.rpeInformacionLaborals,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeInformacionLaborals,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;

  @OneToMany(
    () => RpeReferencias,
    rpeReferencias => rpeReferencias.noInformacionLaboral2
  )
  rpeReferencias: RpeReferencias[];
}
