import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rrhh_dia_festivo", { schema: "sincyt" })
export class RrhhDiaFestivo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("varchar", { name: "descripcion", length: 150 })
  descripcion: string;
}
