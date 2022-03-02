import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdcDocumento } from "./GdcDocumento";
import { GtuEstado } from "./GtuEstado";

@Index("gdc_archivoiddocumento_idx", ["idDocumento"], {})
@Index("gdc_archivoidestado_idx", ["idEstado"], {})
@Entity("gdc_archivo", { schema: "sincyt" })
export class GdcArchivo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo_documento", length: 2000 })
  tituloDocumento: string;

  @Column("varchar", { name: "nombre_documento", length: 45 })
  nombreDocumento: string;

  @Column("varchar", { name: "ubicacion", nullable: true, length: 150 })
  ubicacion: string | null;

  @Column("varchar", { name: "vigencia", nullable: true, length: 45 })
  vigencia: string | null;

  @Column("int", { name: "version", nullable: true })
  version: number | null;

  @Column("date", { name: "fecha_aprobacion" })
  fechaAprobacion: string;

  @Column("varchar", { name: "id_mongo", length: 250 })
  idMongo: string;

  @Column("int", { name: "id_documento" })
  idDocumento: number;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @ManyToOne(
    () => GdcDocumento,
    gdcDocumento => gdcDocumento.gdcArchivos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_documento", referencedColumnName: "id" }])
  idDocumento2: GdcDocumento;

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gdcArchivos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;
}
