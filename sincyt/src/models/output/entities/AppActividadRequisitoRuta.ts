import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AppActividadRequisito } from "./AppActividadRequisito";
import { AppRuta } from "./AppRuta";

@Index("fk_app_actividad_req_ruta_act_req", ["idActividad", "idRequisito"], {})
@Index("fk_app_actividad_req_ruta_ruta", ["idRuta"], {})
@Entity("app_actividad_requisito_ruta", { schema: "sincyt" })
export class AppActividadRequisitoRuta {
  @Column("int", { name: "id_actividad", nullable: true })
  idActividad: number | null;

  @Column("int", { name: "id_requisito", nullable: true })
  idRequisito: number | null;

  @Column("int", { name: "id_ruta", nullable: true })
  idRuta: number | null;

  @ManyToOne(
    () => AppActividadRequisito,
    appActividadRequisito => appActividadRequisito.appActividadRequisitoRutas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_actividad", referencedColumnName: "idActividad" },
    { name: "id_requisito", referencedColumnName: "idRequisito" }
  ])
  appActividadRequisito: AppActividadRequisito;

  @ManyToOne(
    () => AppRuta,
    appRuta => appRuta.appActividadRequisitoRutas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_ruta", referencedColumnName: "idRuta" }])
  idRuta2: AppRuta;
}
