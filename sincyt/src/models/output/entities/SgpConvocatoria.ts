import { Column, Entity, OneToMany } from "typeorm";
import { SgpLineaConvocatoria } from "./SgpLineaConvocatoria";

@Entity("sgp_convocatoria", { schema: "sincyt" })
export class SgpConvocatoria {
  @Column("varchar", {
    primary: true,
    name: "numero_convocatoria",
    length: 100
  })
  numeroConvocatoria: string;

  @Column("varchar", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @Column("date", { name: "fecha_creacion" })
  fechaCreacion: string;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin" })
  fechaFin: string;

  @Column("mediumtext", { name: "usuario_creacion" })
  usuarioCreacion: string;

  @Column("varchar", { name: "year", length: 4 })
  year: string;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("tinyint", { name: "activo", nullable: true })
  activo: number | null;

  @Column("longtext", { name: "url_afiche", nullable: true })
  urlAfiche: string | null;

  @OneToMany(
    () => SgpLineaConvocatoria,
    sgpLineaConvocatoria => sgpLineaConvocatoria.numeroConvocatoria2
  )
  sgpLineaConvocatorias: SgpLineaConvocatoria[];
}
