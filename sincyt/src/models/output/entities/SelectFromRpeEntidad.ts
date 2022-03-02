import { Column, Entity } from "typeorm";

@Entity("select * From rpe_entidad", { schema: "sincyt" })
export class SelectFromRpeEntidad {
  @Column("int", { name: "no_entidad" })
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
}
