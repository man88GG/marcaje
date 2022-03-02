import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComMiembro } from "./ComMiembro";
import { DneEntidad } from "./DneEntidad";
import { GrlDepartamento } from "./GrlDepartamento";
import { RpeAcademico } from "./RpeAcademico";
import { RpeEntidad } from "./RpeEntidad";
import { RpePersona } from "./RpePersona";
import { RpePropiedadIntelectual } from "./RpePropiedadIntelectual";
import { RpeRegistroPais } from "./RpeRegistroPais";

@Entity("grl_pais", { schema: "sincyt" })
export class GrlPais {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @Column("tinyint", { name: "estatus", nullable: true, default: () => "'1'" })
  estatus: number | null;

  @Column("varchar", {
    name: "bandera",
    nullable: true,
    length: 50,
    default: () => "'xxx.gif'"
  })
  bandera: string | null;

  @Column("varchar", { name: "nacionalidad", nullable: true, length: 250 })
  nacionalidad: string | null;

  @OneToMany(
    () => ComMiembro,
    comMiembro => comMiembro.nacionalidad2
  )
  comMiembros: ComMiembro[];

  @OneToMany(
    () => DneEntidad,
    dneEntidad => dneEntidad.codPais2
  )
  dneEntidads: DneEntidad[];

  @OneToMany(
    () => GrlDepartamento,
    grlDepartamento => grlDepartamento.idPais2
  )
  grlDepartamentos: GrlDepartamento[];

  @OneToMany(
    () => RpeAcademico,
    rpeAcademico => rpeAcademico.codigoPais2
  )
  rpeAcademicos: RpeAcademico[];

  @OneToMany(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.codPais2
  )
  rpeEntidads: RpeEntidad[];

  @OneToMany(
    () => RpePersona,
    rpePersona => rpePersona.codigoPaisExtiendePasaporte2
  )
  rpePersonas: RpePersona[];

  @OneToMany(
    () => RpePersona,
    rpePersona => rpePersona.codigoPaisNacimiento2
  )
  rpePersonas2: RpePersona[];

  @OneToMany(
    () => RpePersona,
    rpePersona => rpePersona.codigoPaisNacionalidad2
  )
  rpePersonas3: RpePersona[];

  @OneToMany(
    () => RpePersona,
    rpePersona => rpePersona.codigoPaisResidencia2
  )
  rpePersonas4: RpePersona[];

  @OneToMany(
    () => RpePropiedadIntelectual,
    rpePropiedadIntelectual => rpePropiedadIntelectual.codigoPais2
  )
  rpePropiedadIntelectuals: RpePropiedadIntelectual[];

  @OneToMany(
    () => RpeRegistroPais,
    rpeRegistroPais => rpeRegistroPais.codigoPais2
  )
  rpeRegistroPais: RpeRegistroPais[];
}
