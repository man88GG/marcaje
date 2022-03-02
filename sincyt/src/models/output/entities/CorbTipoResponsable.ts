import { Column, Entity, OneToMany } from "typeorm";
import { CorbResponsable } from "./CorbResponsable";

@Entity("corb_tipo_responsable", { schema: "sincyt" })
export class CorbTipoResponsable {
  @Column("int", { primary: true, name: "id_tipo_responsable" })
  idTipoResponsable: number;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @OneToMany(
    () => CorbResponsable,
    corbResponsable => corbResponsable.tipoResponsable2
  )
  corbResponsables: CorbResponsable[];
}
