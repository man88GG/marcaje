import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppDetalleProceso } from "./AppDetalleProceso";
import { SgpTipoDocumento } from "./SgpTipoDocumento";

@Index("fk_asgp_app_documento_id_detalle_proceso_idx", ["idDetalleProceso"], {})
@Index("fk_asgp_app_documento_id_tipo_documento_idx", ["idTipoDocumento"], {})
@Entity("asgp_app_documento", { schema: "sincyt" })
export class AsgpAppDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "no_documento" })
  noDocumento: number;

  @Column("varchar", { name: "id_mongo", length: 250 })
  idMongo: string;

  @Column("datetime", {
    name: "fecha_carga",
    default: () => "CURRENT_TIMESTAMP"
  })
  fechaCarga: Date;

  @Column("int", { name: "id_detalle_proceso" })
  idDetalleProceso: number;

  @Column("int", { name: "id_tipo_documento" })
  idTipoDocumento: number;

  @ManyToOne(
    () => AppDetalleProceso,
    appDetalleProceso => appDetalleProceso.asgpAppDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_detalle_proceso", referencedColumnName: "idDetalleProceso" }
  ])
  idDetalleProceso2: AppDetalleProceso;

  @ManyToOne(
    () => SgpTipoDocumento,
    sgpTipoDocumento => sgpTipoDocumento.asgpAppDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_tipo_documento", referencedColumnName: "idTipoDocumento" }
  ])
  idTipoDocumento2: SgpTipoDocumento;
}
