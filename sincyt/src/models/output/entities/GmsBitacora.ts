import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsMesaServicio } from "./GmsMesaServicio";
import { GmsEstatus } from "./GmsEstatus";

@Index("id_mesa_servicio", ["idMesaServicio"], {})
@Index("id_estatus", ["idEstatus"], {})
@Entity("gms_bitacora", { schema: "sincyt" })
export class GmsBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "accion", length: 45 })
  accion: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "tabla", length: 250 })
  tabla: string;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @Column("varchar", { name: "usuario", length: 25 })
  usuario: string;

  @Column("int", { name: "id_mesa_servicio" })
  idMesaServicio: number;

  @Column("int", { name: "id_estatus" })
  idEstatus: number;

  @Column("int", { name: "detalle", nullable: true, default: () => "'0'" })
  detalle: number | null;

  @ManyToOne(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.gmsBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_mesa_servicio", referencedColumnName: "id" }])
  idMesaServicio2: GmsMesaServicio;

  @ManyToOne(
    () => GmsEstatus,
    gmsEstatus => gmsEstatus.gmsBitacoras,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus", referencedColumnName: "id" }])
  idEstatus2: GmsEstatus;
}
