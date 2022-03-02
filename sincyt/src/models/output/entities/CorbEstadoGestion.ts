import { Column, Entity, OneToMany } from "typeorm";
import { CorbGestion } from "./CorbGestion";

@Entity("corb_estado_gestion", { schema: "sincyt" })
export class CorbEstadoGestion {
  @Column("int", { primary: true, name: "id_estado_gestion" })
  idEstadoGestion: number;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @OneToMany(
    () => CorbGestion,
    corbGestion => corbGestion.idEstadoGestion2
  )
  corbGestions: CorbGestion[];
}
