import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DneActividadEmpresarial } from "./DneActividadEmpresarial";

@Entity("dne_sector_entidad", { schema: "sincyt" })
export class DneSectorEntidad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_sector" })
  noSector: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @OneToMany(
    () => DneActividadEmpresarial,
    dneActividadEmpresarial => dneActividadEmpresarial.dneSectorEntidadNoSector2
  )
  dneActividadEmpresarials: DneActividadEmpresarial[];
}
