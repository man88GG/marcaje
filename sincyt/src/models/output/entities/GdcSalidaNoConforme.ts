import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdcActividad } from "./GdcActividad";
import { GdcBitacoraSalidaNoConforme } from "./GdcBitacoraSalidaNoConforme";
import { GdcListaValores } from "./GdcListaValores";
import { GdcProceso } from "./GdcProceso";
import { GtuUsuario } from "./GtuUsuario";

@Index("id_numero_correctiva", ["idNumeroCorrectiva"], {})
@Index("id_tipo_correctiva", ["idTipoCorrectiva"], {})
@Index("id_proceso", ["idProceso"], {})
@Index("id_usuario", ["idUsuario"], {})
@Index("id_numero_evento_deteccion", ["idNumeroEventoDeteccion"], {})
@Index("id_tipo_evento_deteccion", ["idTipoEventoDeteccion"], {})
@Index(
  "gdc_salida_no_conforme_ibfk_7_idx",
  [
    "idNumeroEstatus",
    "idTipoEstatus",
    "idNumeroEventoDeteccion",
    "idTipoEventoDeteccion"
  ],
  {}
)
@Entity("gdc_salida_no_conforme", { schema: "sincyt" })
export class GdcSalidaNoConforme {
  @Column("year", { primary: true, name: "anio" })
  anio: number;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "fecha_accion" })
  fechaAccion: string;

  @Column("date", { name: "fecha_planificada" })
  fechaPlanificada: string;

  @Column("varchar", { name: "requisito_iso", nullable: true, length: 150 })
  requisitoIso: string | null;

  @Column("varchar", { name: "responsable_deteccion", length: 150 })
  responsableDeteccion: string;

  @Column("varchar", { name: "cargo_deteccion", nullable: true, length: 150 })
  cargoDeteccion: string | null;

  @Column("text", { name: "descripcion_problema", nullable: true })
  descripcionProblema: string | null;

  @Column("text", { name: "analisis_causa", nullable: true })
  analisisCausa: string | null;

  @Column("text", { name: "correctiva_automatica", nullable: true })
  correctivaAutomatica: string | null;

  @Column("text", { name: "accion_correctiva", nullable: true })
  accionCorrectiva: string | null;

  @Column("int", { name: "id_numero_correctiva" })
  idNumeroCorrectiva: number;

  @Column("int", { name: "id_tipo_correctiva" })
  idTipoCorrectiva: number;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @Column("int", { name: "id_usuario" })
  idUsuario: number;

  @Column("int", { name: "id_numero_evento_deteccion" })
  idNumeroEventoDeteccion: number;

  @Column("int", { name: "id_tipo_evento_deteccion" })
  idTipoEventoDeteccion: number;

  @Column("int", { name: "id_tipo_estatus" })
  idTipoEstatus: number;

  @Column("int", { name: "id_numero_estatus" })
  idNumeroEstatus: number;

  @OneToMany(
    () => GdcActividad,
    gdcActividad => gdcActividad.gdcSalidaNoConforme
  )
  gdcActividads: GdcActividad[];

  @OneToMany(
    () => GdcBitacoraSalidaNoConforme,
    gdcBitacoraSalidaNoConforme =>
      gdcBitacoraSalidaNoConforme.gdcSalidaNoConforme
  )
  gdcBitacoraSalidaNoConformes: GdcBitacoraSalidaNoConforme[];

  @ManyToOne(
    () => GdcListaValores,
    gdcListaValores => gdcListaValores.gdcSalidaNoConformes,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_numero_correctiva", referencedColumnName: "numero" }
  ])
  idNumeroCorrectiva2: GdcListaValores;

  @ManyToOne(
    () => GdcListaValores,
    gdcListaValores => gdcListaValores.gdcSalidaNoConformes2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_tipo_correctiva", referencedColumnName: "idTipoLista" }
  ])
  idTipoCorrectiva2: GdcListaValores;

  @ManyToOne(
    () => GdcProceso,
    gdcProceso => gdcProceso.gdcSalidaNoConformes,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "id" }])
  idProceso2: GdcProceso;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gdcSalidaNoConformes,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @ManyToOne(
    () => GdcListaValores,
    gdcListaValores => gdcListaValores.gdcSalidaNoConformes3,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_numero_evento_deteccion", referencedColumnName: "numero" }
  ])
  idNumeroEventoDeteccion2: GdcListaValores;

  @ManyToOne(
    () => GdcListaValores,
    gdcListaValores => gdcListaValores.gdcSalidaNoConformes4,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_tipo_evento_deteccion", referencedColumnName: "idTipoLista" }
  ])
  idTipoEventoDeteccion2: GdcListaValores;
}
