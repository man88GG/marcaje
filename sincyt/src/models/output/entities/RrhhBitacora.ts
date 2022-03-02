import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rrhh_bitacora", { schema: "sincyt" })
export class RrhhBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "accion", length: 50 })
  accion: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "tabla", length: 150 })
  tabla: string;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @Column("varchar", { name: "usuario", length: 25 })
  usuario: string;
}
