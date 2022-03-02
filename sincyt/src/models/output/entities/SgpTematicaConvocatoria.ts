import { Column, Entity } from "typeorm";

@Entity("sgp_tematica_convocatoria", { schema: "sincyt" })
export class SgpTematicaConvocatoria {
  @Column("longtext", { name: "tematica" })
  tematica: string;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "numero_convocatoria", length: 100 })
  numeroConvocatoria: string;
}
