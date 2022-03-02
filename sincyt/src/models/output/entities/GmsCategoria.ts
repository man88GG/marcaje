import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsAsignacion } from "./GmsAsignacion";
import { GtuEstado } from "./GtuEstado";
import { GmsCategoriaTipoUsuario } from "./GmsCategoriaTipoUsuario";
import { GmsMesaServicio } from "./GmsMesaServicio";

@Index("id_estado", ["idEstado"], {})
@Index("gms_categoria_ibfk_1", ["idPadre"], {})
@Entity("gms_categoria", { schema: "sincyt" })
export class GmsCategoria {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_padre", nullable: true })
  idPadre: number | null;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => GmsAsignacion,
    gmsAsignacion => gmsAsignacion.idCategoria2
  )
  gmsAsignacions: GmsAsignacion[];

  @ManyToOne(
    () => GmsCategoria,
    gmsCategoria => gmsCategoria.gmsCategorias,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_padre", referencedColumnName: "id" }])
  idPadre2: GmsCategoria;

  @OneToMany(
    () => GmsCategoria,
    gmsCategoria => gmsCategoria.idPadre2
  )
  gmsCategorias: GmsCategoria[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gmsCategorias,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @OneToMany(
    () => GmsCategoriaTipoUsuario,
    gmsCategoriaTipoUsuario => gmsCategoriaTipoUsuario.idCategoria2
  )
  gmsCategoriaTipoUsuarios: GmsCategoriaTipoUsuario[];

  @OneToMany(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.idCategoria2
  )
  gmsMesaServicios: GmsMesaServicio[];
}
