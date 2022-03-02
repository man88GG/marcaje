import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { DneEntidad } from "./DneEntidad";
import { GrlDepartamento } from "./GrlDepartamento";
import { RpeEntidad } from "./RpeEntidad";
import { RpeInvestigacion } from "./RpeInvestigacion";
import { RpePersona } from "./RpePersona";
import { RpePropiedadIntelectual } from "./RpePropiedadIntelectual";

@Index("id_depto", ["idDepto"], {})
@Entity("grl_municipio", { schema: "sincyt" })
export class GrlMunicipio {
  @Column("int", { primary: true, name: "id", default: () => "'0'" })
  id: number;

  @Column("int", { primary: true, name: "id_depto", default: () => "'0'" })
  idDepto: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 150 })
  nombre: string | null;

  @OneToMany(
    () => DneEntidad,
    dneEntidad => dneEntidad.codMunicipio2
  )
  dneEntidads: DneEntidad[];

  @ManyToOne(
    () => GrlDepartamento,
    grlDepartamento => grlDepartamento.grlMunicipios,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_depto", referencedColumnName: "id" }])
  idDepto2: GrlDepartamento;

  @OneToMany(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.grlMunicipio
  )
  rpeEntidads: RpeEntidad[];

  @OneToMany(
    () => RpeInvestigacion,
    rpeInvestigacion => rpeInvestigacion.grlMunicipio
  )
  rpeInvestigacions: RpeInvestigacion[];

  @OneToMany(
    () => RpePersona,
    rpePersona => rpePersona.grlMunicipio
  )
  rpePersonas: RpePersona[];

  @OneToMany(
    () => RpePropiedadIntelectual,
    rpePropiedadIntelectual => rpePropiedadIntelectual.grlMunicipio
  )
  rpePropiedadIntelectuals: RpePropiedadIntelectual[];
}
