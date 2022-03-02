import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneActividadEmpresarial } from "./DneActividadEmpresarial";

@Index("idx_dne_tipo_empresa_entidad_no_tipo_empresa", ["noTipoEmpresa"], {
  unique: true
})
@Entity("dne_tipo_empresa_entidad", { schema: "sincyt" })
export class DneTipoEmpresaEntidad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_tipo_empresa" })
  noTipoEmpresa: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "descripción", length: 100 })
  descripciN: string;

  @OneToMany(
    () => DneActividadEmpresarial,
    dneActividadEmpresarial =>
      dneActividadEmpresarial.dneTipoEmpresaEntidadNoTipoEmpresa2
  )
  dneActividadEmpresarials: DneActividadEmpresarial[];
}
