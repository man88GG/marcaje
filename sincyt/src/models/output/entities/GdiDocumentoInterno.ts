import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdiCategoria } from "./GdiCategoria";
import { GdiEstatus } from "./GdiEstatus";

@Index("id_categoria", ["idCategoria"], {})
@Index("id_estatus", ["idEstatus"], {})
@Entity("gdi_documento_interno", { schema: "sincyt" })
export class GdiDocumentoInterno {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "asunto" })
  asunto: string;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("varchar", { name: "id_mongo", length: 350 })
  idMongo: string;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("int", { name: "id_documento_interno_compartido", nullable: true })
  idDocumentoInternoCompartido: number | null;

  @Column("int", { name: "id_categoria" })
  idCategoria: number;

  @Column("int", { name: "id_estatus" })
  idEstatus: number;

  @ManyToOne(
    () => GdiCategoria,
    gdiCategoria => gdiCategoria.gdiDocumentoInternos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
  idCategoria2: GdiCategoria;

  @ManyToOne(
    () => GdiEstatus,
    gdiEstatus => gdiEstatus.gdiDocumentoInternos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus", referencedColumnName: "id" }])
  idEstatus2: GdiEstatus;
}
