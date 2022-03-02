import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeAutoridad } from "./RpeAutoridad";
import { RpeJerarquia } from "./RpeJerarquia";
import { GrlPais } from "./GrlPais";
import { GrlMunicipio } from "./GrlMunicipio";
import { RpeEntidadAreaCientif } from "./RpeEntidadAreaCientif";
import { RpeEntidadSucursal } from "./RpeEntidadSucursal";
import { RpeProyecto } from "./RpeProyecto";
import { RpeSolicitudEntidad } from "./RpeSolicitudEntidad";

@Index("codigo_municipio", ["codigoMunicipio", "codigoDepartamento"], {})
@Index("fk_RPE_ENTIDAD_RPE_JERARQUIA1_idx", ["noJerarquia"], {})
@Index("fk_rpe_entidad_no_entidad_padre", ["noEntidadPadre"], {})
@Index("fk_rpe_entidad_grl_pais_id", ["codPais"], {})
@Entity("rpe_entidad", { schema: "sincyt" })
export class RpeEntidad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_entidad" })
  noEntidad: number;

  @Column("int", { name: "no_entidad_padre", nullable: true })
  noEntidadPadre: number | null;

  @Column("int", { name: "no_jerarquia" })
  noJerarquia: number;

  @Column("varchar", { name: "codigo_real", nullable: true, length: 100 })
  codigoReal: string | null;

  @Column("varchar", {
    name: "denominacion_razon_social",
    nullable: true,
    length: 500
  })
  denominacionRazonSocial: string | null;

  @Column("varchar", { name: "siglas_acronimo", nullable: true, length: 500 })
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

  @Column("int", { name: "codigo_municipio", nullable: true })
  codigoMunicipio: number | null;

  @Column("int", { name: "codigo_departamento", nullable: true })
  codigoDepartamento: number | null;

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
    () => RpeAutoridad,
    rpeAutoridad => rpeAutoridad.noEntidad2
  )
  rpeAutoridads: RpeAutoridad[];

  @ManyToOne(
    () => RpeJerarquia,
    rpeJerarquia => rpeJerarquia.rpeEntidads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_jerarquia", referencedColumnName: "noJerarquia" }])
  noJerarquia2: RpeJerarquia;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpeEntidads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "cod_pais", referencedColumnName: "id" }])
  codPais2: GrlPais;

  @ManyToOne(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.rpeEntidads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "no_entidad_padre", referencedColumnName: "noEntidad" }])
  noEntidadPadre2: RpeEntidad;

  @OneToMany(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.noEntidadPadre2
  )
  rpeEntidads: RpeEntidad[];

  @ManyToOne(
    () => GrlMunicipio,
    grlMunicipio => grlMunicipio.rpeEntidads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "codigo_municipio", referencedColumnName: "id" },
    { name: "codigo_departamento", referencedColumnName: "idDepto" }
  ])
  grlMunicipio: GrlMunicipio;

  @OneToMany(
    () => RpeEntidadAreaCientif,
    rpeEntidadAreaCientif => rpeEntidadAreaCientif.noEntidad2
  )
  rpeEntidadAreaCientifs: RpeEntidadAreaCientif[];

  @OneToMany(
    () => RpeEntidadSucursal,
    rpeEntidadSucursal => rpeEntidadSucursal.noEntidad2
  )
  rpeEntidadSucursals: RpeEntidadSucursal[];

  @OneToMany(
    () => RpeProyecto,
    rpeProyecto => rpeProyecto.noEntidad2
  )
  rpeProyectos: RpeProyecto[];

  @OneToMany(
    () => RpeSolicitudEntidad,
    rpeSolicitudEntidad => rpeSolicitudEntidad.noEntidad2
  )
  rpeSolicitudEntidads: RpeSolicitudEntidad[];
}
