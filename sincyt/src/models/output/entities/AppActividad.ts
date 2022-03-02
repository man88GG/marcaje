import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AppProceso } from "./AppProceso";
import { AppActividadRequisito } from "./AppActividadRequisito";
import { AppBitacora } from "./AppBitacora";
import { AppCondicionActividad } from "./AppCondicionActividad";
import { AppDetalleProceso } from "./AppDetalleProceso";
import { AppDocumentoPorRuta } from "./AppDocumentoPorRuta";
import { AppRolActividad } from "./AppRolActividad";
import { AppRuta } from "./AppRuta";
import { AsgpDocReqRutaAct } from "./AsgpDocReqRutaAct";
import { AsgpGestionComentarios } from "./AsgpGestionComentarios";
import { AsgpNotifActivUsuario } from "./AsgpNotifActivUsuario";
import { AsgpPermisoDocumentoActividad } from "./AsgpPermisoDocumentoActividad";
import { AsgpSolicitud } from "./AsgpSolicitud";

@Index("id_proceso_actividad_idx", ["idProceso"], {})
@Entity("app_actividad", { schema: "sincyt" })
export class AppActividad {
  @Column("int", { primary: true, name: "id_actividad" })
  idActividad: number;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @Column("varchar", { name: "descripcion", length: 250 })
  descripcion: string;

  @Column("int", { name: "estatus" })
  estatus: number;

  @Column("varchar", { name: "url", nullable: true, length: 500 })
  url: string | null;

  @Column("varchar", { name: "condicion", nullable: true, length: 2 })
  condicion: string | null;

  @Column("int", { name: "tipo", nullable: true })
  tipo: number | null;

  @ManyToOne(
    () => AppProceso,
    appProceso => appProceso.appActividads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: AppProceso;

  @OneToMany(
    () => AppActividadRequisito,
    appActividadRequisito => appActividadRequisito.idActividad2
  )
  appActividadRequisitos: AppActividadRequisito[];

  @OneToMany(
    () => AppBitacora,
    appBitacora => appBitacora.idActividad2
  )
  appBitacoras: AppBitacora[];

  @OneToMany(
    () => AppCondicionActividad,
    appCondicionActividad => appCondicionActividad.idActividad2
  )
  appCondicionActividads: AppCondicionActividad[];

  @OneToMany(
    () => AppDetalleProceso,
    appDetalleProceso => appDetalleProceso.idActividad2
  )
  appDetalleProcesos: AppDetalleProceso[];

  @OneToMany(
    () => AppDocumentoPorRuta,
    appDocumentoPorRuta => appDocumentoPorRuta.appActividadIdActividad2
  )
  appDocumentoPorRutas: AppDocumentoPorRuta[];

  @OneToMany(
    () => AppRolActividad,
    appRolActividad => appRolActividad.idActividad2
  )
  appRolActividads: AppRolActividad[];

  @OneToMany(
    () => AppRuta,
    appRuta => appRuta.idActividadDestino2
  )
  appRutas: AppRuta[];

  @OneToMany(
    () => AppRuta,
    appRuta => appRuta.idActividadOrigen2
  )
  appRutas2: AppRuta[];

  @OneToMany(
    () => AsgpDocReqRutaAct,
    asgpDocReqRutaAct => asgpDocReqRutaAct.idActividad2
  )
  asgpDocReqRutaActs: AsgpDocReqRutaAct[];

  @OneToMany(
    () => AsgpGestionComentarios,
    asgpGestionComentarios => asgpGestionComentarios.idActividad2
  )
  asgpGestionComentarios: AsgpGestionComentarios[];

  @OneToMany(
    () => AsgpNotifActivUsuario,
    asgpNotifActivUsuario => asgpNotifActivUsuario.idActividad2
  )
  asgpNotifActivUsuarios: AsgpNotifActivUsuario[];

  @OneToMany(
    () => AsgpPermisoDocumentoActividad,
    asgpPermisoDocumentoActividad => asgpPermisoDocumentoActividad.idActividad2
  )
  asgpPermisoDocumentoActividads: AsgpPermisoDocumentoActividad[];

  @OneToMany(
    () => AsgpSolicitud,
    asgpSolicitud => asgpSolicitud.nuevoEstadoTemporal2
  )
  asgpSolicituds: AsgpSolicitud[];
}
