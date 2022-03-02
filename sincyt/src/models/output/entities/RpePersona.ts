import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeAcademico } from "./RpeAcademico";
import { RpeConocimientoIdioma } from "./RpeConocimientoIdioma";
import { RpeEstadoPersona } from "./RpeEstadoPersona";
import { RpeExperienciaProyecto } from "./RpeExperienciaProyecto";
import { RpeInformacionLaboral } from "./RpeInformacionLaboral";
import { RpeInvestigacion } from "./RpeInvestigacion";
import { RpeMerito } from "./RpeMerito";
import { RpeAreaCientifTecno } from "./RpeAreaCientifTecno";
import { GrlMunicipio } from "./GrlMunicipio";
import { GtuUsuario } from "./GtuUsuario";
import { RpeRegistroInv } from "./RpeRegistroInv";
import { GrlPais } from "./GrlPais";
import { RpePersonaAreaCientif } from "./RpePersonaAreaCientif";
import { RpeDocumento } from "./RpeDocumento";
import { RpePersonaCategoria } from "./RpePersonaCategoria";
import { RpePropiedadIntelectual } from "./RpePropiedadIntelectual";
import { RpeSolicitud } from "./RpeSolicitud";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";

@Index("cui_UNIQUE", ["cui"], { unique: true })
@Index("no_registro_oficial_UNIQUE", ["noRegistroOficial"], { unique: true })
@Index("no_pasaporte_UNIQUE", ["noPasaporte"], { unique: true })
@Index("codigo_municipio", ["codigoMunicipio", "codigoDepartamento"], {})
@Index("id_usuario", ["idUsuario"], {})
@Index("codigo_pais_extiende_pasaporte", ["codigoPaisExtiendePasaporte"], {})
@Index("codigo_pais_nacimiento", ["codigoPaisNacimiento"], {})
@Index("codigo_pais_nacionalidad", ["codigoPaisNacionalidad"], {})
@Index("codigo_pais_residencia", ["codigoPaisResidencia"], {})
@Index(
  "fk_RPE_PERSONA_RPE_AREA_CIENTIF_TECNO1_idx",
  ["noArea", "noTipoArea"],
  {}
)
@Entity("rpe_persona", { schema: "sincyt" })
export class RpePersona {
  @PrimaryGeneratedColumn({ type: "int", name: "no_registro_persona" })
  noRegistroPersona: number;

  @Column("bigint", { name: "cui", nullable: true, unique: true })
  cui: string | null;

  @Column("varchar", { name: "nombres", nullable: true, length: 1000 })
  nombres: string | null;

  @Column("varchar", { name: "apellidos", nullable: true, length: 1000 })
  apellidos: string | null;

  @Column("varchar", {
    name: "no_pasaporte",
    nullable: true,
    unique: true,
    length: 50
  })
  noPasaporte: string | null;

  @Column("int", { name: "codigo_pais_extiende_pasaporte", nullable: true })
  codigoPaisExtiendePasaporte: number | null;

  @Column("date", { name: "fecha_emision_pasaporte", nullable: true })
  fechaEmisionPasaporte: string | null;

  @Column("date", { name: "fecha_vencimiento_pasaporte", nullable: true })
  fechaVencimientoPasaporte: string | null;

  @Column("date", { name: "fecha_nacimiento", nullable: true })
  fechaNacimiento: string | null;

  @Column("int", { name: "codigo_pais_nacimiento", nullable: true })
  codigoPaisNacimiento: number | null;

  @Column("int", { name: "codigo_pais_nacionalidad", nullable: true })
  codigoPaisNacionalidad: number | null;

  @Column("int", { name: "codigo_pais_residencia", nullable: true })
  codigoPaisResidencia: number | null;

  @Column("int", { name: "codigo_municipio", nullable: true })
  codigoMunicipio: number | null;

  @Column("int", { name: "codigo_departamento", nullable: true })
  codigoDepartamento: number | null;

  @Column("varchar", {
    name: "ciudad_residencia",
    nullable: true,
    length: 1000
  })
  ciudadResidencia: string | null;

  @Column("varchar", {
    name: "estado_residencia",
    nullable: true,
    length: 1000
  })
  estadoResidencia: string | null;

  @Column("varchar", {
    name: "direccion_residencia",
    nullable: true,
    length: 1000
  })
  direccionResidencia: string | null;

  @Column("varchar", {
    name: "telefono_particular",
    nullable: true,
    length: 100
  })
  telefonoParticular: string | null;

  @Column("varchar", { name: "telefono_movil", nullable: true, length: 100 })
  telefonoMovil: string | null;

  @Column("varchar", {
    name: "correo_electronico",
    nullable: true,
    length: 500
  })
  correoElectronico: string | null;

  @Column("datetime", { name: "fecha_ingreso", nullable: true })
  fechaIngreso: Date | null;

  @Column("datetime", { name: "fecha_ultima_modificacion", nullable: true })
  fechaUltimaModificacion: Date | null;

  @Column("int", { name: "no_area", nullable: true })
  noArea: number | null;

  @Column("int", { name: "no_tipo_area", nullable: true })
  noTipoArea: number | null;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("bigint", {
    name: "no_registro_oficial",
    nullable: true,
    unique: true
  })
  noRegistroOficial: string | null;

  @Column("varchar", {
    name: "descripcion_otra_especialidad",
    nullable: true,
    length: 500
  })
  descripcionOtraEspecialidad: string | null;

  @Column("longtext", { name: "razon_solicitud", nullable: true })
  razonSolicitud: string | null;

  @OneToMany(
    () => RpeAcademico,
    rpeAcademico => rpeAcademico.noRegistroPersona2
  )
  rpeAcademicos: RpeAcademico[];

  @OneToMany(
    () => RpeConocimientoIdioma,
    rpeConocimientoIdioma => rpeConocimientoIdioma.noRegistroPersona2
  )
  rpeConocimientoIdiomas: RpeConocimientoIdioma[];

  @OneToMany(
    () => RpeEstadoPersona,
    rpeEstadoPersona => rpeEstadoPersona.noRegistroPersona2
  )
  rpeEstadoPersonas: RpeEstadoPersona[];

  @OneToMany(
    () => RpeExperienciaProyecto,
    rpeExperienciaProyecto => rpeExperienciaProyecto.noRegistroPersona2
  )
  rpeExperienciaProyectos: RpeExperienciaProyecto[];

  @OneToMany(
    () => RpeInformacionLaboral,
    rpeInformacionLaboral => rpeInformacionLaboral.noRegistroPersona2
  )
  rpeInformacionLaborals: RpeInformacionLaboral[];

  @OneToMany(
    () => RpeInvestigacion,
    rpeInvestigacion => rpeInvestigacion.noRegistroPersona2
  )
  rpeInvestigacions: RpeInvestigacion[];

  @OneToMany(
    () => RpeMerito,
    rpeMerito => rpeMerito.noRegistroPersona2
  )
  rpeMeritos: RpeMerito[];

  @ManyToOne(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.rpePersonas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_area", referencedColumnName: "noArea" },
    { name: "no_tipo_area", referencedColumnName: "noTipoArea" }
  ])
  rpeAreaCientifTecno: RpeAreaCientifTecno;

  @ManyToOne(
    () => GrlMunicipio,
    grlMunicipio => grlMunicipio.rpePersonas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "codigo_municipio", referencedColumnName: "id" },
    { name: "codigo_departamento", referencedColumnName: "idDepto" }
  ])
  grlMunicipio: GrlMunicipio;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.rpePersonas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @OneToOne(
    () => RpeRegistroInv,
    rpeRegistroInv => rpeRegistroInv.rpePersona,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "no_registro_oficial", referencedColumnName: "noRegistroOficial" }
  ])
  noRegistroOficial2: RpeRegistroInv;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpePersonas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "codigo_pais_extiende_pasaporte", referencedColumnName: "id" }
  ])
  codigoPaisExtiendePasaporte2: GrlPais;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpePersonas2,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "codigo_pais_nacimiento", referencedColumnName: "id" }])
  codigoPaisNacimiento2: GrlPais;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpePersonas3,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "codigo_pais_nacionalidad", referencedColumnName: "id" }
  ])
  codigoPaisNacionalidad2: GrlPais;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpePersonas4,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "codigo_pais_residencia", referencedColumnName: "id" }])
  codigoPaisResidencia2: GrlPais;

  @OneToMany(
    () => RpePersonaAreaCientif,
    rpePersonaAreaCientif => rpePersonaAreaCientif.noRegistroPersona2
  )
  rpePersonaAreaCientifs: RpePersonaAreaCientif[];

  @ManyToMany(
    () => RpeDocumento,
    rpeDocumento => rpeDocumento.rpePersonas
  )
  rpeDocumentos: RpeDocumento[];

  @OneToMany(
    () => RpePersonaCategoria,
    rpePersonaCategoria => rpePersonaCategoria.noRegistroPersona2
  )
  rpePersonaCategorias: RpePersonaCategoria[];

  @OneToMany(
    () => RpePropiedadIntelectual,
    rpePropiedadIntelectual => rpePropiedadIntelectual.noRegistroPersona2
  )
  rpePropiedadIntelectuals: RpePropiedadIntelectual[];

  @OneToMany(
    () => RpeSolicitud,
    rpeSolicitud => rpeSolicitud.noRegistroPersona2
  )
  rpeSolicituds: RpeSolicitud[];

  @OneToMany(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.noRegistroPersona2
  )
  sgpPerfilProyectos: SgpPerfilProyecto[];
}
