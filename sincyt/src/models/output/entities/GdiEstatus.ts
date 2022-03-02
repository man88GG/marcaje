import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdiDocumentoInterno } from "./GdiDocumentoInterno";
import { GtuEstado } from "./GtuEstado";

@Index("id_estado", ["idEstado"], {})
@Entity("gdi_estatus", { schema: "sincyt" })
export class GdiEstatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 200 })
  descripcion: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => GdiDocumentoInterno,
    gdiDocumentoInterno => gdiDocumentoInterno.idEstatus2
  )
  gdiDocumentoInternos: GdiDocumentoInterno[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gdiEstatuses,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;
}
