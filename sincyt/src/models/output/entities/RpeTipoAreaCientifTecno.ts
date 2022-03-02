import { Column, Entity, OneToMany } from "typeorm";
import { RpeAreaCientifTecno } from "./RpeAreaCientifTecno";

@Entity("rpe_tipo_area_cientif_tecno", { schema: "sincyt" })
export class RpeTipoAreaCientifTecno {
  @Column("int", { primary: true, name: "no_tipo_area" })
  noTipoArea: number;

  @Column("varchar", { name: "nombre_tipo_area", length: 500 })
  nombreTipoArea: string;

  @OneToMany(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.noTipoArea2
  )
  rpeAreaCientifTecnos: RpeAreaCientifTecno[];
}
