import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gdc_bitacora", { schema: "sincyt" })
export class GdcBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "accion", length: 25 })
  accion: string;

  @Column("varchar", { name: "descripcion", length: 300 })
  descripcion: string;

  @Column("varchar", { name: "tabla", length: 150 })
  tabla: string;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @Column("varchar", { name: "usuario", length: 15 })
  usuario: string;
}
