import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gdc_tipo_lista", { schema: "sincyt" })
export class GdcTipoLista {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 50 })
  descripcion: string;
}
