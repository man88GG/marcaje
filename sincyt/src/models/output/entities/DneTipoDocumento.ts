import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneDocumento } from "./DneDocumento";
import { RpeEstado } from "./RpeEstado";

@Index(
  "fk_dne_tipo_documento_rpe_estado1_idx",
  ["noEstadoDoc", "noTipoEstadoDoc"],
  {}
)
@Entity("dne_tipo_documento", { schema: "sincyt" })
export class DneTipoDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "no_tipo_documento" })
  noTipoDocumento: number;

  @Column("varchar", { name: "nombre_tipo", length: 200 })
  nombreTipo: string;

  @Column("varchar", { name: "comentario", nullable: true, length: 1000 })
  comentario: string | null;

  @Column("int", { name: "no_estado_doc", nullable: true })
  noEstadoDoc: number | null;

  @Column("int", { name: "no_tipo_estado_doc", nullable: true })
  noTipoEstadoDoc: number | null;

  @OneToMany(
    () => DneDocumento,
    dneDocumento => dneDocumento.noTipoDocumento2
  )
  dneDocumentos: DneDocumento[];

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.dneTipoDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado_doc", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado_doc", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
