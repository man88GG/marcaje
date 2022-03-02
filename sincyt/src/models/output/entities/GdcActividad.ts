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
import { GdcSalidaNoConforme } from "./GdcSalidaNoConforme";
import { GdcListaValores } from "./GdcListaValores";
import { GdcMedioVerificacion } from "./GdcMedioVerificacion";

@Index("gdc_activaidadanio_idx", ["anioSalidaNoConforme"], {})
@Index(
  "gdc_actividad_seguimiento_idseguimiento_idx",
  ["idUsuarioSeguimiento", "idUsuarioActividad"],
  {}
)
@Index("gdc_activadesidusuarioactividad_idx", ["idUsuarioActividad"], {})
@Index("gdc_actividad_idtipo_estatus_idx", ["idTipoEstatus"], {})
@Index("gdc_actividad_idnumeroestatus_idx", ["idNumeroEstatus"], {})
@Index(
  "gdc_actividad_ibfk_1",
  ["idSalidaNoConforme", "anioSalidaNoConforme"],
  {}
)
@Entity("gdc_actividad", { schema: "sincyt" })
export class GdcActividad {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("date", { name: "fecha_cumplimiento" })
  fechaCumplimiento: string;

  @Column("date", { name: "fecha_seguimiento", nullable: true })
  fechaSeguimiento: string | null;

  @Column("int", { name: "id_accion_realizada", nullable: true })
  idAccionRealizada: number | null;

  @Column("int", { name: "id_accion_eficaz", nullable: true })
  idAccionEficaz: number | null;

  @Column("int", { name: "id_usuario_seguimiento", nullable: true })
  idUsuarioSeguimiento: number | null;

  @Column("int", { name: "id_usuario_actividad" })
  idUsuarioActividad: number;

  @Column("int", { name: "id_numero_estatus" })
  idNumeroEstatus: number;

  @Column("int", { name: "id_tipo_estatus" })
  idTipoEstatus: number;

  @Column("int", { name: "id_salida_no_conforme" })
  idSalidaNoConforme: number;

  @Column("year", { name: "anio_salida_no_conforme" })
  anioSalidaNoConforme: number;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gdcActividads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario_actividad", referencedColumnName: "id" }])
  idUsuarioActividad2: GtuUsuario;

  @ManyToOne(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.gdcActividads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_salida_no_conforme", referencedColumnName: "id" },
    { name: "anio_salida_no_conforme", referencedColumnName: "anio" }
  ])
  gdcSalidaNoConforme: GdcSalidaNoConforme;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gdcActividads2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario_seguimiento", referencedColumnName: "id" }])
  idUsuarioSeguimiento2: GtuUsuario;

  @ManyToOne(
    () => GdcListaValores,
    gdcListaValores => gdcListaValores.gdcActividads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_numero_estatus", referencedColumnName: "numero" }])
  idNumeroEstatus2: GdcListaValores;

  @ManyToOne(
    () => GdcListaValores,
    gdcListaValores => gdcListaValores.gdcActividads2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_tipo_estatus", referencedColumnName: "idTipoLista" }
  ])
  idTipoEstatus2: GdcListaValores;

  @OneToMany(
    () => GdcMedioVerificacion,
    gdcMedioVerificacion => gdcMedioVerificacion.idActividad2
  )
  gdcMedioVerificacions: GdcMedioVerificacion[];
}
