import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdcSalidaNoConforme } from "./GdcSalidaNoConforme";

@Index("gdcbiracorasalidanoconformidadanio_idx", ["anioSalidaNoConforme"], {})
@Index(
  "gdcbitacorasalidanoconformeidsalida",
  ["idSalidaNoConforme", "anioSalidaNoConforme"],
  {}
)
@Entity("gdc_bitacora_salida_no_conforme", { schema: "sincyt" })
export class GdcBitacoraSalidaNoConforme {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "accion", length: 25 })
  accion: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "tabla", nullable: true, length: 100 })
  tabla: string | null;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @Column("varchar", { name: "usuario", length: 150 })
  usuario: string;

  @Column("int", { name: "id_salida_no_conforme" })
  idSalidaNoConforme: number;

  @Column("year", { name: "anio_salida_no_conforme" })
  anioSalidaNoConforme: number;

  @Column("int", { name: "detalle", nullable: true })
  detalle: number | null;

  @ManyToOne(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.gdcBitacoraSalidaNoConformes,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_salida_no_conforme", referencedColumnName: "id" },
    { name: "anio_salida_no_conforme", referencedColumnName: "anio" }
  ])
  gdcSalidaNoConforme: GdcSalidaNoConforme;
}
