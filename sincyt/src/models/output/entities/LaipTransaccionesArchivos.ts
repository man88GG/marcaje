import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { LaipTransaccionesArticulos } from "./LaipTransaccionesArticulos";

@Index(
  "idtransaccionestransacciones_archivos_idx",
  ["idTransaccionesArticulos"],
  {}
)
@Entity("laip_transacciones_archivos", { schema: "sincyt" })
export class LaipTransaccionesArchivos {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 400 })
  nombre: string;

  @Column("varchar", { name: "id_mongo", length: 400 })
  idMongo: string;

  @Column("int", { name: "id_transacciones_articulos" })
  idTransaccionesArticulos: number;

  @ManyToOne(
    () => LaipTransaccionesArticulos,
    laipTransaccionesArticulos =>
      laipTransaccionesArticulos.laipTransaccionesArchivos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_transacciones_articulos", referencedColumnName: "id" }
  ])
  idTransaccionesArticulos2: LaipTransaccionesArticulos;
}
