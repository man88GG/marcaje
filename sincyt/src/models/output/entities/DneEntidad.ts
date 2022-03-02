import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneActividadEmpresarial } from "./DneActividadEmpresarial";
import { DneAutoridad } from "./DneAutoridad";
import { DneJerarquia } from "./DneJerarquia";
import { GrlDepartamento } from "./GrlDepartamento";
import { GrlMunicipio } from "./GrlMunicipio";
import { GrlPais } from "./GrlPais";
import { DneEntidadActividadCientificoTecno } from "./DneEntidadActividadCientificoTecno";
import { DneEntidadAreaCientif } from "./DneEntidadAreaCientif";
import { DneEntidadBloqueDocumento } from "./DneEntidadBloqueDocumento";
import { DneEntidadSectorPertenencia } from "./DneEntidadSectorPertenencia";
import { DneProyecto } from "./DneProyecto";
import { DneSolicitud } from "./DneSolicitud";

@Index("fk_rpe_entidad_grl_pais1_idx", ["codPais"], {})
@Index("fk_rpe_entidad_grl_municipio1_idx", ["codMunicipio"], {})
@Index("fk_rpe_entidad_grl_departamento1_idx", ["codDepartamento"], {})
@Index("fk_dne_entidad_dne_entidad1_idx", ["noEntidadPadre"], {})
@Index("fk_dne_entidad_dne_jerarquia1_idx", ["noJerarquia"], {})
@Entity("dne_entidad", { schema: "sincyt" })
export class DneEntidad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_entidad" })
  noEntidad: number;

  @Column("int", { name: "no_entidad_padre", nullable: true })
  noEntidadPadre: number | null;

  @Column("int", { name: "no_jerarquia" })
  noJerarquia: number;

  @Column("varchar", { name: "codigo_real", nullable: true, length: 100 })
  codigoReal: string | null;

  @Column("varchar", {
    name: "denomiacion_razon_social",
    nullable: true,
    length: 500
  })
  denomiacionRazonSocial: string | null;

  @Column("varchar", { name: "siglas_acronimo", nullable: true, length: 50 })
  siglasAcronimo: string | null;

  @Column("varchar", { name: "nit", nullable: true, length: 50 })
  nit: string | null;

  @Column("varchar", {
    name: "actividad_principal",
    nullable: true,
    length: 1000
  })
  actividadPrincipal: string | null;

  @Column("date", { name: "fecha_constitucion", nullable: true })
  fechaConstitucion: string | null;

  @Column("varchar", { name: "direccion", nullable: true, length: 500 })
  direccion: string | null;

  @Column("varchar", { name: "codigo_postal", nullable: true, length: 50 })
  codigoPostal: string | null;

  @Column("int", { name: "cod_pais", nullable: true })
  codPais: number | null;

  @Column("int", { name: "cod_municipio", nullable: true })
  codMunicipio: number | null;

  @Column("int", { name: "cod_departamento", nullable: true })
  codDepartamento: number | null;

  @Column("varchar", { name: "telefonos", nullable: true, length: 500 })
  telefonos: string | null;

  @Column("varchar", { name: "portal_web", nullable: true, length: 500 })
  portalWeb: string | null;

  @Column("varchar", {
    name: "correo_electronico",
    nullable: true,
    length: 500
  })
  correoElectronico: string | null;

  @OneToMany(
    () => DneActividadEmpresarial,
    dneActividadEmpresarial => dneActividadEmpresarial.noEntidad2
  )
  dneActividadEmpresarials: DneActividadEmpresarial[];

  @OneToMany(
    () => DneAutoridad,
    dneAutoridad => dneAutoridad.noEntidad2
  )
  dneAutoridads: DneAutoridad[];

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneEntidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad_padre", referencedColumnName: "noEntidad" }])
  noEntidadPadre2: DneEntidad;

  @OneToMany(
    () => DneEntidad,
    dneEntidad => dneEntidad.noEntidadPadre2
  )
  dneEntidads: DneEntidad[];

  @ManyToOne(
    () => DneJerarquia,
    dneJerarquia => dneJerarquia.dneEntidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_jerarquia", referencedColumnName: "noJerarquia" }])
  noJerarquia2: DneJerarquia;

  @ManyToOne(
    () => GrlDepartamento,
    grlDepartamento => grlDepartamento.dneEntidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "cod_departamento", referencedColumnName: "id" }])
  codDepartamento2: GrlDepartamento;

  @ManyToOne(
    () => GrlMunicipio,
    grlMunicipio => grlMunicipio.dneEntidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "cod_municipio", referencedColumnName: "id" }])
  codMunicipio2: GrlMunicipio;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.dneEntidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "cod_pais", referencedColumnName: "id" }])
  codPais2: GrlPais;

  @OneToMany(
    () => DneEntidadActividadCientificoTecno,
    dneEntidadActividadCientificoTecno =>
      dneEntidadActividadCientificoTecno.noEntidad2
  )
  dneEntidadActividadCientificoTecnos: DneEntidadActividadCientificoTecno[];

  @OneToMany(
    () => DneEntidadAreaCientif,
    dneEntidadAreaCientif => dneEntidadAreaCientif.noEntidad2
  )
  dneEntidadAreaCientifs: DneEntidadAreaCientif[];

  @OneToMany(
    () => DneEntidadBloqueDocumento,
    dneEntidadBloqueDocumento => dneEntidadBloqueDocumento.noEntidad2
  )
  dneEntidadBloqueDocumentos: DneEntidadBloqueDocumento[];

  @OneToMany(
    () => DneEntidadSectorPertenencia,
    dneEntidadSectorPertenencia => dneEntidadSectorPertenencia.noEntidad2
  )
  dneEntidadSectorPertenencias: DneEntidadSectorPertenencia[];

  @OneToMany(
    () => DneProyecto,
    dneProyecto => dneProyecto.noEntidad2
  )
  dneProyectos: DneProyecto[];

  @OneToMany(
    () => DneSolicitud,
    dneSolicitud => dneSolicitud.noEntidad2
  )
  dneSolicituds: DneSolicitud[];
}
