import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("laip_bitacora", { schema: "sincyt" })
export class LaipBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "accion", nullable: true, length: 45 })
  accion: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("varchar", { name: "tabla", nullable: true, length: 250 })
  tabla: string | null;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;

  @Column("varchar", { name: "usuario", nullable: true, length: 25 })
  usuario: string | null;

  @Column("int", { name: "id_transacciones_articulos", nullable: true })
  idTransaccionesArticulos: number | null;

  @Column("int", { name: "id_estatus", nullable: true })
  idEstatus: number | null;

  @Column("int", { name: "detalle", nullable: true, default: () => "'0'" })
  detalle: number | null;
}
