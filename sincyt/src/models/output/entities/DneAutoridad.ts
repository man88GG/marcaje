import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneEntidad } from "./DneEntidad";
import { DneTipoAutoridad } from "./DneTipoAutoridad";

@Index("fk_rpe_autoridad_rpe_tipo_autoridad_idx", ["noTipoAutoridad"], {})
@Index("fk_rpe_autoridad_rpe_entidad1_idx", ["noEntidad"], {})
@Entity("dne_autoridad", { schema: "sincyt" })
export class DneAutoridad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_autoridad" })
  noAutoridad: number;

  @Column("int", { name: "no_tipo_autoridad" })
  noTipoAutoridad: number;

  @Column("varchar", { name: "nombre", length: 500 })
  nombre: string;

  @Column("varchar", { name: "cargo", length: 500 })
  cargo: string;

  @Column("varchar", { name: "correo_electronico", length: 500 })
  correoElectronico: string;

  @Column("varchar", { name: "dpi", length: 250 })
  dpi: string;

  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @Column("varchar", { name: "titulo_academico", nullable: true, length: 250 })
  tituloAcademico: string | null;

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneAutoridads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;

  @ManyToOne(
    () => DneTipoAutoridad,
    dneTipoAutoridad => dneTipoAutoridad.dneAutoridads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_autoridad", referencedColumnName: "noTipoAutoridad" }
  ])
  noTipoAutoridad2: DneTipoAutoridad;
}
