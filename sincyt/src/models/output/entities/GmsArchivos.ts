import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsMesaServicio } from "./GmsMesaServicio";

@Index("id_mesa_servicio", ["idMesaServicio"], {})
@Entity("gms_archivos", { schema: "sincyt" })
export class GmsArchivos {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "nombre" })
  nombre: string;

  @Column("varchar", { name: "id_mongo", length: 400 })
  idMongo: string;

  @Column("int", { name: "id_mesa_servicio" })
  idMesaServicio: number;

  @ManyToOne(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.gmsArchivos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_mesa_servicio", referencedColumnName: "id" }])
  idMesaServicio2: GmsMesaServicio;
}
