import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DneEntidad } from "./DneEntidad";
import { DneSectorEntidad } from "./DneSectorEntidad";
import { DneTipoEmpresaEntidad } from "./DneTipoEmpresaEntidad";

@Index(
  "fk_dne_actividad_empresarial_dne_sector_entidad1_idx",
  ["dneSectorEntidadNoSector"],
  {}
)
@Index(
  "fk_dne_actividad_empresarial_dne_tipo_empresa_entidad1_idx",
  ["dneTipoEmpresaEntidadNoTipoEmpresa"],
  {}
)
@Index("fk_dne_actividad_empresarial_dne_entidad1_idx", ["noEntidad"], {})
@Entity("dne_actividad_empresarial", { schema: "sincyt" })
export class DneActividadEmpresarial {
  @Column("int", { name: "dne_sector_entidad_no_sector" })
  dneSectorEntidadNoSector: number;

  @Column("int", { name: "dne_tipo_empresa_entidad_no_tipo_empresa" })
  dneTipoEmpresaEntidadNoTipoEmpresa: number;

  @Column("int", { name: "exportacion" })
  exportacion: number;

  @Column("varchar", { name: "descripcion_export", length: 250 })
  descripcionExport: string;

  @Column("int", { name: "outsourcing" })
  outsourcing: number;

  @Column("varchar", { name: "descripcion_outsourcing", length: 250 })
  descripcionOutsourcing: string;

  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneActividadEmpresarials,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;

  @ManyToOne(
    () => DneSectorEntidad,
    dneSectorEntidad => dneSectorEntidad.dneActividadEmpresarials,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "dne_sector_entidad_no_sector", referencedColumnName: "noSector" }
  ])
  dneSectorEntidadNoSector2: DneSectorEntidad;

  @ManyToOne(
    () => DneTipoEmpresaEntidad,
    dneTipoEmpresaEntidad => dneTipoEmpresaEntidad.dneActividadEmpresarials,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "dne_tipo_empresa_entidad_no_tipo_empresa",
      referencedColumnName: "noTipoEmpresa"
    }
  ])
  dneTipoEmpresaEntidadNoTipoEmpresa2: DneTipoEmpresaEntidad;
}
