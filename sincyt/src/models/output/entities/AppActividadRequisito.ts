import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AppActividad } from "./AppActividad";
import { AppRequisito } from "./AppRequisito";
import { AppActividadRequisitoRuta } from "./AppActividadRequisitoRuta";
import { RpeDocsRequisito } from "./RpeDocsRequisito";

@Index("id_requisito_idx", ["idRequisito"], {})
@Entity("app_actividad_requisito", { schema: "sincyt" })
export class AppActividadRequisito {
  @Column("int", { primary: true, name: "id_actividad" })
  idActividad: number;

  @Column("int", { primary: true, name: "id_requisito" })
  idRequisito: number;

  @Column("int", { name: "orden" })
  orden: number;

  @Column("int", { name: "id_ruta", nullable: true })
  idRuta: number | null;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appActividadRequisitos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;

  @ManyToOne(
    () => AppRequisito,
    appRequisito => appRequisito.appActividadRequisitos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_requisito", referencedColumnName: "idRequisito" }])
  idRequisito2: AppRequisito;

  @OneToMany(
    () => AppActividadRequisitoRuta,
    appActividadRequisitoRuta => appActividadRequisitoRuta.appActividadRequisito
  )
  appActividadRequisitoRutas: AppActividadRequisitoRuta[];

  @OneToMany(
    () => RpeDocsRequisito,
    rpeDocsRequisito => rpeDocsRequisito.appActividadRequisito
  )
  rpeDocsRequisitos: RpeDocsRequisito[];
}
