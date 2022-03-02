import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuUsuario } from "./GtuUsuario";
import { GtuEstado } from "./GtuEstado";
import { GtuIcono } from "./GtuIcono";
import { GdiDocumentoInterno } from "./GdiDocumentoInterno";

@Index("id_usuario", ["idUsuario"], {})
@Index("id_estado", ["idEstado"], {})
@Index("gdi_categoria_ibfk_3_idx", ["idIcono"], {})
@Entity("gdi_categoria", { schema: "sincyt" })
export class GdiCategoria {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("int", { name: "tipo" })
  tipo: number;

  @Column("int", { name: "id_icono" })
  idIcono: number;

  @Column("int", { name: "id_usuario" })
  idUsuario: number;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gdiCategorias,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gdiCategorias,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @ManyToOne(
    () => GtuIcono,
    gtuIcono => gtuIcono.gdiCategorias,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_icono", referencedColumnName: "id" }])
  idIcono2: GtuIcono;

  @OneToMany(
    () => GdiDocumentoInterno,
    gdiDocumentoInterno => gdiDocumentoInterno.idCategoria2
  )
  gdiDocumentoInternos: GdiDocumentoInterno[];
}
