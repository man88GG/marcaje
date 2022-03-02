import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppActividad } from "./AppActividad";
import { AppRequisito } from "./AppRequisito";
import { AppRuta } from "./AppRuta";
import { AppTipoDocumento } from "./AppTipoDocumento";

@Index(
  "fk_rpe_documento_por_ruta_app_actividad1_idx",
  ["appActividadIdActividad"],
  {}
)
@Index(
  "fk_rpe_documento_por_ruta_app_requisito1_idx",
  ["appRequisitoIdRequisito"],
  {}
)
@Index("fk_rpe_documento_por_ruta_app_ruta1_idx", ["appRutaIdRuta"], {})
@Index(
  "fk_rpe_documento_por_ruta_rpe_tipo_documento1_idx",
  ["idTipoDocumento"],
  {}
)
@Entity("app_documento_por_ruta", { schema: "sincyt" })
export class AppDocumentoPorRuta {
  @PrimaryGeneratedColumn({ type: "int", name: "id_asociaicon" })
  idAsociaicon: number;

  @Column("int", { name: "app_actividad_id_actividad" })
  appActividadIdActividad: number;

  @Column("int", { name: "app_requisito_id_requisito" })
  appRequisitoIdRequisito: number;

  @Column("int", { name: "app_ruta_id_ruta" })
  appRutaIdRuta: number;

  @Column("int", { name: "id_tipo_documento" })
  idTipoDocumento: number;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appDocumentoPorRutas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "app_actividad_id_actividad", referencedColumnName: "idActividad" }
  ])
  appActividadIdActividad2: AppActividad;

  @ManyToOne(
    () => AppRequisito,
    appRequisito => appRequisito.appDocumentoPorRutas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "app_requisito_id_requisito", referencedColumnName: "idRequisito" }
  ])
  appRequisitoIdRequisito2: AppRequisito;

  @ManyToOne(
    () => AppRuta,
    appRuta => appRuta.appDocumentoPorRutas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "app_ruta_id_ruta", referencedColumnName: "idRuta" }])
  appRutaIdRuta2: AppRuta;

  @ManyToOne(
    () => AppTipoDocumento,
    appTipoDocumento => appTipoDocumento.appDocumentoPorRutas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_tipo_documento", referencedColumnName: "idTipoDocumento" }
  ])
  idTipoDocumento2: AppTipoDocumento;
}
