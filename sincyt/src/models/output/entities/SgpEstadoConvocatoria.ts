import { Column, Entity, OneToMany } from "typeorm";
import { SgpLineaConvocatoria } from "./SgpLineaConvocatoria";

@Entity("sgp_estado_convocatoria", { schema: "sincyt" })
export class SgpEstadoConvocatoria {
  @Column("int", { primary: true, name: "id_estado_convocatoria" })
  idEstadoConvocatoria: number;

  @Column("varchar", { name: "descpricpon", length: 45 })
  descpricpon: string;

  @OneToMany(
    () => SgpLineaConvocatoria,
    sgpLineaConvocatoria => sgpLineaConvocatoria.idEstadoConvocatoria2
  )
  sgpLineaConvocatorias: SgpLineaConvocatoria[];
}
