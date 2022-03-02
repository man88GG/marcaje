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
import { SgpTipoDocumento } from "./SgpTipoDocumento";

@Index("fk_asgp_doc_req_ruta_act_id_tipo_doc", ["idTipoDocumento"], {})
@Index("fk_asgp_doc_req_ruta_act_id_act", ["idActividad"], {})
@Index("fk_asgp_doc_req_ruta_act_id_req", ["idRequisito"], {})
@Index("fk_asgp_doc_req_ruta_act_id_ruta", ["idRuta"], {})
@Entity("asgp_doc_req_ruta_act", { schema: "sincyt" })
export class AsgpDocReqRutaAct {
  @PrimaryGeneratedColumn({ type: "int", name: "id_asociacion" })
  idAsociacion: number;

  @Column("int", { name: "id_tipo_documento", nullable: true })
  idTipoDocumento: number | null;

  @Column("int", { name: "id_actividad", nullable: true })
  idActividad: number | null;

  @Column("int", { name: "id_requisito", nullable: true })
  idRequisito: number | null;

  @Column("int", { name: "id_ruta", nullable: true })
  idRuta: number | null;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.asgpDocReqRutaActs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;

  @ManyToOne(
    () => AppRequisito,
    appRequisito => appRequisito.asgpDocReqRutaActs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_requisito", referencedColumnName: "idRequisito" }])
  idRequisito2: AppRequisito;

  @ManyToOne(
    () => AppRuta,
    appRuta => appRuta.asgpDocReqRutaActs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_ruta", referencedColumnName: "idRuta" }])
  idRuta2: AppRuta;

  @ManyToOne(
    () => SgpTipoDocumento,
    sgpTipoDocumento => sgpTipoDocumento.asgpDocReqRutaActs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_tipo_documento", referencedColumnName: "idTipoDocumento" }
  ])
  idTipoDocumento2: SgpTipoDocumento;
}
