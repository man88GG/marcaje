import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gtu_bitacora", { schema: "sincyt" })
export class GtuBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "accion", nullable: true, length: 45 })
  accion: string | null;

  @Column("varchar", { name: "descripcion", nullable: true, length: 350 })
  descripcion: string | null;

  @Column("varchar", { name: "tabla", nullable: true, length: 100 })
  tabla: string | null;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;

  @Column("varchar", { name: "usuario", nullable: true, length: 25 })
  usuario: string | null;
}
