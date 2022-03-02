import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppBitacora } from "./AppBitacora";
import { AppDetalleProceso } from "./AppDetalleProceso";
import { AppProceso } from "./AppProceso";
import { AsgpGestionComentarios } from "./AsgpGestionComentarios";
import { AsgpSolicitud } from "./AsgpSolicitud";
import { DneSolicitud } from "./DneSolicitud";
import { GmsMesaServicio } from "./GmsMesaServicio";
import { RpeSolicitud } from "./RpeSolicitud";
import { RpeSolicitudEntidad } from "./RpeSolicitudEntidad";

@Index("id_proceso_idx", ["idProceso"], {})
@Entity("app_proceso_ejecucion", { schema: "sincyt" })
export class AppProcesoEjecucion {
  @PrimaryGeneratedColumn({ type: "int", name: "cod_proceso" })
  codProceso: number;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @Column("varchar", {
    name: "id_desarrollo_especifico",
    nullable: true,
    length: 45
  })
  idDesarrolloEspecifico: string | null;

  @Column("datetime", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("int", { name: "estatus", nullable: true })
  estatus: number | null;

  @OneToMany(
    () => AppBitacora,
    appBitacora => appBitacora.codProceso2
  )
  appBitacoras: AppBitacora[];

  @OneToMany(
    () => AppDetalleProceso,
    appDetalleProceso => appDetalleProceso.codProceso2
  )
  appDetalleProcesos: AppDetalleProceso[];

  @ManyToOne(
    () => AppProceso,
    appProceso => appProceso.appProcesoEjecucions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: AppProceso;

  @OneToMany(
    () => AsgpGestionComentarios,
    asgpGestionComentarios => asgpGestionComentarios.codProceso2
  )
  asgpGestionComentarios: AsgpGestionComentarios[];

  @OneToMany(
    () => AsgpSolicitud,
    asgpSolicitud => asgpSolicitud.codProceso2
  )
  asgpSolicituds: AsgpSolicitud[];

  @OneToMany(
    () => DneSolicitud,
    dneSolicitud => dneSolicitud.codProceso2
  )
  dneSolicituds: DneSolicitud[];

  @OneToMany(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.codProceso2
  )
  gmsMesaServicios: GmsMesaServicio[];

  @OneToMany(
    () => RpeSolicitud,
    rpeSolicitud => rpeSolicitud.codProceso2
  )
  rpeSolicituds: RpeSolicitud[];

  @OneToMany(
    () => RpeSolicitudEntidad,
    rpeSolicitudEntidad => rpeSolicitudEntidad.codProceso2
  )
  rpeSolicitudEntidads: RpeSolicitudEntidad[];
}
