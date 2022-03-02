import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mes", { schema: "sincyt" })
export class Mes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 15 })
  nombre: string;
}
