import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppDetalleProceso } from "./AppDetalleProceso";
import { AsgpAsignaUsuarioSolicitud } from "./AsgpAsignaUsuarioSolicitud";
import { AsgpNotifActivUsuario } from "./AsgpNotifActivUsuario";
import { ComRepresentanteSenacyt } from "./ComRepresentanteSenacyt";
import { CorbEtapa } from "./CorbEtapa";
import { CorbGestion } from "./CorbGestion";
import { GdcActividad } from "./GdcActividad";
import { GdcProceso } from "./GdcProceso";
import { GdcSalidaNoConforme } from "./GdcSalidaNoConforme";
import { GdiCategoria } from "./GdiCategoria";
import { GmsMesaServicio } from "./GmsMesaServicio";
import { GmsRutaAtencion } from "./GmsRutaAtencion";
import { GtuEstado } from "./GtuEstado";
import { GtuTipoUsuario } from "./GtuTipoUsuario";
import { GtuPerfil } from "./GtuPerfil";
import { LaipAsignacion } from "./LaipAsignacion";
import { RpePersona } from "./RpePersona";
import { RrhhPermiso } from "./RrhhPermiso";

@Index("usuario_UNIQUE", ["usuario"], { unique: true })
@Index("idestado_idx", ["idEstado"], {})
@Index("iddepartamentousuario_idx", ["idDepartamentoPuesto"], {})
@Index("idtipousuariousuario_idx", ["idTipoUsuario"], {})
@Entity("gtu_usuario", { schema: "sincyt" })
export class GtuUsuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "usuario", unique: true, length: 150 })
  usuario: string;

  @Column("varchar", { name: "contrasenia", length: 200 })
  contrasenia: string;

  @Column("varchar", { name: "nombre_completo", length: 75 })
  nombreCompleto: string;

  @Column("varchar", { name: "correo_electronico", length: 45 })
  correoElectronico: string;

  @Column("varchar", { name: "numero_celular", nullable: true, length: 45 })
  numeroCelular: string | null;

  @Column("varchar", { name: "numero_extension", nullable: true, length: 45 })
  numeroExtension: string | null;

  @Column("varchar", { name: "token", nullable: true, length: 250 })
  token: string | null;

  @Column("varchar", { name: "id_fotografia", nullable: true, length: 250 })
  idFotografia: string | null;

  @Column("int", { name: "id_estado", default: () => "'1'" })
  idEstado: number;

  @Column("int", { name: "id_departamento_puesto" })
  idDepartamentoPuesto: number;

  @Column("int", { name: "id_tipo_usuario" })
  idTipoUsuario: number;

  @OneToMany(
    () => AppDetalleProceso,
    appDetalleProceso => appDetalleProceso.idUsuario2
  )
  appDetalleProcesos: AppDetalleProceso[];

  @OneToMany(
    () => AsgpAsignaUsuarioSolicitud,
    asgpAsignaUsuarioSolicitud => asgpAsignaUsuarioSolicitud.idUsuario2
  )
  asgpAsignaUsuarioSolicituds: AsgpAsignaUsuarioSolicitud[];

  @OneToMany(
    () => AsgpNotifActivUsuario,
    asgpNotifActivUsuario => asgpNotifActivUsuario.idUsuario2
  )
  asgpNotifActivUsuarios: AsgpNotifActivUsuario[];

  @OneToMany(
    () => ComRepresentanteSenacyt,
    comRepresentanteSenacyt => comRepresentanteSenacyt.reprecentante2
  )
  comRepresentanteSenacyts: ComRepresentanteSenacyt[];

  @OneToMany(
    () => CorbEtapa,
    corbEtapa => corbEtapa.idUsuario2
  )
  corbEtapas: CorbEtapa[];

  @OneToMany(
    () => CorbGestion,
    corbGestion => corbGestion.idSolicitante2
  )
  corbGestions: CorbGestion[];

  @OneToMany(
    () => GdcActividad,
    gdcActividad => gdcActividad.idUsuarioActividad2
  )
  gdcActividads: GdcActividad[];

  @OneToMany(
    () => GdcActividad,
    gdcActividad => gdcActividad.idUsuarioSeguimiento2
  )
  gdcActividads2: GdcActividad[];

  @OneToMany(
    () => GdcProceso,
    gdcProceso => gdcProceso.idUsuario2
  )
  gdcProcesos: GdcProceso[];

  @OneToMany(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.idUsuario2
  )
  gdcSalidaNoConformes: GdcSalidaNoConforme[];

  @OneToMany(
    () => GdiCategoria,
    gdiCategoria => gdiCategoria.idUsuario2
  )
  gdiCategorias: GdiCategoria[];

  @OneToMany(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.idUsuario2
  )
  gmsMesaServicios: GmsMesaServicio[];

  @OneToMany(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.idUsuarioAsignado2
  )
  gmsMesaServicios2: GmsMesaServicio[];

  @OneToMany(
    () => GmsRutaAtencion,
    gmsRutaAtencion => gmsRutaAtencion.idUsuario2
  )
  gmsRutaAtencions: GmsRutaAtencion[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gtuUsuarios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @ManyToOne(
    () => GtuTipoUsuario,
    gtuTipoUsuario => gtuTipoUsuario.gtuUsuarios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_tipo_usuario", referencedColumnName: "id" }])
  idTipoUsuario2: GtuTipoUsuario;

  @ManyToMany(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.gtuUsuarios
  )
  gtuPerfils: GtuPerfil[];

  @OneToMany(
    () => LaipAsignacion,
    laipAsignacion => laipAsignacion.idPersonaCargo2
  )
  laipAsignacions: LaipAsignacion[];

  @OneToMany(
    () => LaipAsignacion,
    laipAsignacion => laipAsignacion.idPersonaResponsable2
  )
  laipAsignacions2: LaipAsignacion[];

  @OneToMany(
    () => RpePersona,
    rpePersona => rpePersona.idUsuario2
  )
  rpePersonas: RpePersona[];

  @OneToMany(
    () => RrhhPermiso,
    rrhhPermiso => rrhhPermiso.idUsuario2
  )
  rrhhPermisos: RrhhPermiso[];

  @OneToMany(
    () => RrhhPermiso,
    rrhhPermiso => rrhhPermiso.idUsuarioJefe2
  )
  rrhhPermisos2: RrhhPermiso[];
}
