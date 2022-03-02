import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { RpeTipoAutoridad } from "./RpeTipoAutoridad";
import { RpeEntidad } from "./RpeEntidad";

@Index("fk_app_proceso_ejecucion_entidad", ["codProceso"], {})
@Index("fk_solicitud_autoridad", ["noTipoAutoridad"], {})
@Index("fk_RPE_SOLICITUD_ENTIDAD_RPE_ENTIDAD_idx", ["noEntidad"], {})
@Entity("rpe_solicitud_entidad", { schema: "sincyt" })
export class RpeSolicitudEntidad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_solicitud_entidad" })
  noSolicitudEntidad: number;

  @Column("int", { name: "no_entidad", nullable: true })
  noEntidad: number | null;

  @Column("int", { name: "cod_proceso" })
  codProceso: number;

  @Column("varchar", { name: "token_seguridad", nullable: true, length: 250 })
  tokenSeguridad: string | null;

  @Column("date", { name: "fecha_creacion" })
  fechaCreacion: string;

  @Column("time", { name: "hora_creacion" })
  horaCreacion: string;

  @Column("int", {
    name: "confirmacion_correo",
    nullable: true,
    default: () => "'0'"
  })
  confirmacionCorreo: number | null;

  @Column("text", { name: "nombre_entidad" })
  nombreEntidad: string;

  @Column("text", { name: "direccion_entidad" })
  direccionEntidad: string;

  @Column("text", { name: "nombres_responsable" })
  nombresResponsable: string;

  @Column("text", { name: "correo_responsable" })
  correoResponsable: string;

  @Column("text", { name: "celular_responsable" })
  celularResponsable: string;

  @Column("text", { name: "telefono_institucional", nullable: true })
  telefonoInstitucional: string | null;

  @Column("int", { name: "no_tipo_autoridad" })
  noTipoAutoridad: number;

  @Column("text", { name: "cargo" })
  cargo: string;

  @Column("text", { name: "cui" })
  cui: string;

  @Column("longtext", { name: "notas_adicionales" })
  notasAdicionales: string;

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.rpeSolicitudEntidads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @ManyToOne(
    () => RpeTipoAutoridad,
    rpeTipoAutoridad => rpeTipoAutoridad.rpeSolicitudEntidads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "no_tipo_autoridad", referencedColumnName: "noTipoAutoridad" }
  ])
  noTipoAutoridad2: RpeTipoAutoridad;

  @ManyToOne(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.rpeSolicitudEntidads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: RpeEntidad;
}
