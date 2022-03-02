import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpePersona } from "./RpePersona";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { RpeSolicitudEstado } from "./RpeSolicitudEstado";

@Index("fk_RPE_SOLICITUD_RPE_PERSONA1_idx", ["noRegistroPersona"], {})
@Index("fk_RPE_SOLICITUD_app_proceso_ejecucion1_idx", ["codProceso"], {})
@Index("fk_RPE_SOLICITUD_ENTIDAD_APP_PROCESO_EJECUCION", ["codProceso"], {})
@Entity("rpe_solicitud", { schema: "sincyt" })
export class RpeSolicitud {
  @PrimaryGeneratedColumn({ type: "int", name: "no_solicitud_investigador" })
  noSolicitudInvestigador: number;

  @Column("int", { name: "no_registro_persona", nullable: true })
  noRegistroPersona: number | null;

  @Column("int", { name: "cod_proceso", nullable: true })
  codProceso: number | null;

  @Column("varchar", { name: "token_seguridad", nullable: true, length: 250 })
  tokenSeguridad: string | null;

  @Column("date", { name: "fecha_creacion", nullable: true })
  fechaCreacion: string | null;

  @Column("time", { name: "hora_creacion", nullable: true })
  horaCreacion: string | null;

  @Column("varchar", { name: "no_documento", nullable: true, length: 250 })
  noDocumento: string | null;

  @Column("int", { name: "tipo_documento", nullable: true })
  tipoDocumento: number | null;

  @Column("varchar", {
    name: "correo_electronico",
    nullable: true,
    length: 500
  })
  correoElectronico: string | null;

  @Column("int", { name: "confirmacion_correo", default: () => "'0'" })
  confirmacionCorreo: number;

  @Column("int", { name: "faltan_documentos", default: () => "'0'" })
  faltanDocumentos: number;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.rpeSolicituds,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @OneToMany(
    () => RpeSolicitudEstado,
    rpeSolicitudEstado => rpeSolicitudEstado.noSolicitudInvestigador2
  )
  rpeSolicitudEstados: RpeSolicitudEstado[];
}
