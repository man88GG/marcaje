import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsBitacora } from "./GmsBitacora";
import { GtuEstado } from "./GtuEstado";
import { GmsMesaServicio } from "./GmsMesaServicio";

@Index("id_estado", ["idEstado"], {})
@Entity("gms_estatus", { schema: "sincyt" })
export class GmsEstatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 200 })
  descripcion: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => GmsBitacora,
    gmsBitacora => gmsBitacora.idEstatus2
  )
  gmsBitacoras: GmsBitacora[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gmsEstatuses,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @OneToMany(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.idEstatus2
  )
  gmsMesaServicios: GmsMesaServicio[];
}
