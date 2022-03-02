import { Column, Entity, Index } from "typeorm";

@Index("id_renglon_UNIQUE", ["idRenglon"], { unique: true })
@Entity("fin_renglon", { schema: "sincyt" })
export class FinRenglon {
  @Column("int", { primary: true, name: "id_renglon" })
  idRenglon: number;

  @Column("text", { name: "descripcion" })
  descripcion: string;
}
