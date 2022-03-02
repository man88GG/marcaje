import { Column, Entity } from "typeorm";

@Entity("app_tipo_condicion", { schema: "sincyt" })
export class AppTipoCondicion {
  @Column("int", { primary: true, name: "id_tipo" })
  idTipo: number;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;
}
