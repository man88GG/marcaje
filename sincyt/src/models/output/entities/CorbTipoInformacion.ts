import { Column, Entity, OneToMany } from "typeorm";
import { CorbInformacionAdicional } from "./CorbInformacionAdicional";

@Entity("corb_tipo_informacion", { schema: "sincyt" })
export class CorbTipoInformacion {
  @Column("int", { primary: true, name: "id_tipo_informacion" })
  idTipoInformacion: number;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @OneToMany(
    () => CorbInformacionAdicional,
    corbInformacionAdicional => corbInformacionAdicional.idTipoInformacion2
  )
  corbInformacionAdicionals: CorbInformacionAdicional[];
}
