import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rpe_bitacora", { schema: "sincyt" })
export class RpeBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "transaccion" })
  transaccion: number;

  @Column("varchar", { name: "accion", nullable: true, length: 500 })
  accion: string | null;

  @Column("varchar", { name: "tabla", nullable: true, length: 500 })
  tabla: string | null;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;

  @Column("varchar", { name: "usuario", nullable: true, length: 500 })
  usuario: string | null;

  @Column("varchar", { name: "modulo", nullable: true, length: 500 })
  modulo: string | null;

  @Column("varchar", { name: "seccion", nullable: true, length: 500 })
  seccion: string | null;
}