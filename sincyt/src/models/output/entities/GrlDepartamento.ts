import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { DneEntidad } from "./DneEntidad";
import { GrlPais } from "./GrlPais";
import { GrlMunicipio } from "./GrlMunicipio";

@Index("id_pais", ["idPais"], {})
@Entity("grl_departamento", { schema: "sincyt" })
export class GrlDepartamento {
  @Column("int", { primary: true, name: "id", default: () => "'0'" })
  id: number;

  @Column("int", { name: "id_pais", default: () => "'0'" })
  idPais: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 150 })
  nombre: string | null;

  @Column("varchar", { name: "orden_cedula", nullable: true, length: 5 })
  ordenCedula: string | null;

  @OneToMany(
    () => DneEntidad,
    dneEntidad => dneEntidad.codDepartamento2
  )
  dneEntidads: DneEntidad[];

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.grlDepartamentos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_pais", referencedColumnName: "id" }])
  idPais2: GrlPais;

  @OneToMany(
    () => GrlMunicipio,
    grlMunicipio => grlMunicipio.idDepto2
  )
  grlMunicipios: GrlMunicipio[];
}
