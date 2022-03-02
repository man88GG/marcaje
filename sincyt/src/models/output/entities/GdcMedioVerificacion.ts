import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdcActividad } from "./GdcActividad";

@Index("id_actividad", ["idActividad"], {})
@Index(
  "gdc_medio_verificacionaniosalidanoconforme_idx",
  ["anioSalidaNoConforme", "idSalidaNoConforme"],
  {}
)
@Entity("gdc_medio_verificacion", { schema: "sincyt" })
export class GdcMedioVerificacion {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "comentario" })
  comentario: string;

  @Column("varchar", { name: "id_mongo", nullable: true, length: 250 })
  idMongo: string | null;

  @Column("int", { name: "id_actividad" })
  idActividad: number;

  @Column("int", { name: "id_salida_no_conforme" })
  idSalidaNoConforme: number;

  @Column("year", { name: "anio_salida_no_conforme" })
  anioSalidaNoConforme: number;

  @ManyToOne(
    () => GdcActividad,
    gdcActividad => gdcActividad.gdcMedioVerificacions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "id" }])
  idActividad2: GdcActividad;
}
