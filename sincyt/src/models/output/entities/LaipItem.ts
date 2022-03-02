import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { LaipAsignacion } from "./LaipAsignacion";
import { GtuEstado } from "./GtuEstado";
import { LaipPeriocidad } from "./LaipPeriocidad";

@Index("ididitem_idx", ["idPadre"], {})
@Index("idestadoitem_idx", ["idEstado"], {})
@Entity("laip_item", { schema: "sincyt" })
export class LaipItem {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_padre", nullable: true })
  idPadre: number | null;

  @Column("text", { name: "nombre" })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("int", { name: "posicion", nullable: true })
  posicion: number | null;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => LaipAsignacion,
    laipAsignacion => laipAsignacion.idItem2
  )
  laipAsignacions: LaipAsignacion[];

  @ManyToOne(
    () => LaipItem,
    laipItem => laipItem.laipItems,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_padre", referencedColumnName: "id" }])
  idPadre2: LaipItem;

  @OneToMany(
    () => LaipItem,
    laipItem => laipItem.idPadre2
  )
  laipItems: LaipItem[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.laipItems,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @OneToMany(
    () => LaipPeriocidad,
    laipPeriocidad => laipPeriocidad.idItem2
  )
  laipPeriocidads: LaipPeriocidad[];
}
