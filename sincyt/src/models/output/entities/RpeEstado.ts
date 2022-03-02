import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AsgpResultadosSolicitud } from "./AsgpResultadosSolicitud";
import { ComComision } from "./ComComision";
import { ComInformacionAcademica } from "./ComInformacionAcademica";
import { ComInformacionContactoMiembro } from "./ComInformacionContactoMiembro";
import { ComJuntaDirectiva } from "./ComJuntaDirectiva";
import { ComListaAsistencia } from "./ComListaAsistencia";
import { ComMiembroComisionCatalogo } from "./ComMiembroComisionCatalogo";
import { ComRepresentanteSenacyt } from "./ComRepresentanteSenacyt";
import { ComReunion } from "./ComReunion";
import { DneEntidadSectorPertenencia } from "./DneEntidadSectorPertenencia";
import { DneProyectoEstado } from "./DneProyectoEstado";
import { DneSolicitud } from "./DneSolicitud";
import { DneTipoDocumento } from "./DneTipoDocumento";
import { GrlServidor } from "./GrlServidor";
import { RpeTipoEstado } from "./RpeTipoEstado";
import { RpeEstadoPersona } from "./RpeEstadoPersona";
import { RpeInformacionLaboral } from "./RpeInformacionLaboral";
import { RpePropiedadIntelectual } from "./RpePropiedadIntelectual";
import { RpeProyectoEstado } from "./RpeProyectoEstado";
import { RpeSolicitudEstado } from "./RpeSolicitudEstado";

@Index("fk_RPE_ESTADO_RPE_TIPO_ESTADO_idx", ["noTipoEstado"], {})
@Entity("rpe_estado", { schema: "sincyt" })
export class RpeEstado {
  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("varchar", { name: "nombre_estado", length: 250 })
  nombreEstado: string;

  @OneToMany(
    () => AsgpResultadosSolicitud,
    asgpResultadosSolicitud => asgpResultadosSolicitud.rpeEstado
  )
  asgpResultadosSolicituds: AsgpResultadosSolicitud[];

  @OneToMany(
    () => ComComision,
    comComision => comComision.rpeEstado
  )
  comComisions: ComComision[];

  @OneToMany(
    () => ComInformacionAcademica,
    comInformacionAcademica => comInformacionAcademica.rpeEstado
  )
  comInformacionAcademicas: ComInformacionAcademica[];

  @OneToMany(
    () => ComInformacionContactoMiembro,
    comInformacionContactoMiembro => comInformacionContactoMiembro.rpeEstado
  )
  comInformacionContactoMiembros: ComInformacionContactoMiembro[];

  @OneToMany(
    () => ComJuntaDirectiva,
    comJuntaDirectiva => comJuntaDirectiva.rpeEstado
  )
  comJuntaDirectivas: ComJuntaDirectiva[];

  @OneToMany(
    () => ComListaAsistencia,
    comListaAsistencia => comListaAsistencia.rpeEstado
  )
  comListaAsistencias: ComListaAsistencia[];

  @OneToMany(
    () => ComMiembroComisionCatalogo,
    comMiembroComisionCatalogo => comMiembroComisionCatalogo.rpeEstado
  )
  comMiembroComisionCatalogos: ComMiembroComisionCatalogo[];

  @OneToMany(
    () => ComRepresentanteSenacyt,
    comRepresentanteSenacyt => comRepresentanteSenacyt.rpeEstado
  )
  comRepresentanteSenacyts: ComRepresentanteSenacyt[];

  @OneToMany(
    () => ComReunion,
    comReunion => comReunion.rpeEstado
  )
  comReunions: ComReunion[];

  @OneToMany(
    () => DneEntidadSectorPertenencia,
    dneEntidadSectorPertenencia => dneEntidadSectorPertenencia.rpeEstado
  )
  dneEntidadSectorPertenencias: DneEntidadSectorPertenencia[];

  @OneToMany(
    () => DneProyectoEstado,
    dneProyectoEstado => dneProyectoEstado.rpeEstado
  )
  dneProyectoEstados: DneProyectoEstado[];

  @OneToMany(
    () => DneSolicitud,
    dneSolicitud => dneSolicitud.estadoSolicitud2
  )
  dneSolicituds: DneSolicitud[];

  @OneToMany(
    () => DneTipoDocumento,
    dneTipoDocumento => dneTipoDocumento.rpeEstado
  )
  dneTipoDocumentos: DneTipoDocumento[];

  @OneToMany(
    () => GrlServidor,
    grlServidor => grlServidor.rpeEstado
  )
  grlServidors: GrlServidor[];

  @ManyToOne(
    () => RpeTipoEstado,
    rpeTipoEstado => rpeTipoEstado.rpeEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  noTipoEstado2: RpeTipoEstado;

  @OneToMany(
    () => RpeEstadoPersona,
    rpeEstadoPersona => rpeEstadoPersona.rpeEstado
  )
  rpeEstadoPersonas: RpeEstadoPersona[];

  @OneToMany(
    () => RpeInformacionLaboral,
    rpeInformacionLaboral => rpeInformacionLaboral.rpeEstado
  )
  rpeInformacionLaborals: RpeInformacionLaboral[];

  @OneToMany(
    () => RpePropiedadIntelectual,
    rpePropiedadIntelectual => rpePropiedadIntelectual.rpeEstado
  )
  rpePropiedadIntelectuals: RpePropiedadIntelectual[];

  @OneToMany(
    () => RpeProyectoEstado,
    rpeProyectoEstado => rpeProyectoEstado.rpeEstado
  )
  rpeProyectoEstados: RpeProyectoEstado[];

  @OneToMany(
    () => RpeSolicitudEstado,
    rpeSolicitudEstado => rpeSolicitudEstado.rpeEstado
  )
  rpeSolicitudEstados: RpeSolicitudEstado[];
}
