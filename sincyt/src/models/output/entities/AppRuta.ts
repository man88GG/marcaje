import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AppActividadRequisitoRuta } from "./AppActividadRequisitoRuta";
import { AppCondicionOpcion } from "./AppCondicionOpcion";
import { AppDocumentoPorRuta } from "./AppDocumentoPorRuta";
import { AppActividad } from "./AppActividad";
import { AsgpDocReqRutaAct } from "./AsgpDocReqRutaAct";

@Index("id_actividad_origen_idx", ["idActividadOrigen"], {})
@Index("id_actividad_destino_idx", ["idActividadDestino"], {})
@Entity("app_ruta", { schema: "sincyt" })
export class AppRuta {
  @Column("int", { primary: true, name: "id_ruta" })
  idRuta: number;

  @Column("int", { name: "id_actividad_origen" })
  idActividadOrigen: number;

  @Column("int", { name: "id_actividad_destino" })
  idActividadDestino: number;

  @Column("int", { name: "id_tipo", nullable: true })
  idTipo: number | null;

  @Column("varchar", { name: "valor_condicion", nullable: true, length: 255 })
  valorCondicion: string | null;

  @OneToMany(
    () => AppActividadRequisitoRuta,
    appActividadRequisitoRuta => appActividadRequisitoRuta.idRuta2
  )
  appActividadRequisitoRutas: AppActividadRequisitoRuta[];

  @OneToMany(
    () => AppCondicionOpcion,
    appCondicionOpcion => appCondicionOpcion.idRuta2
  )
  appCondicionOpcions: AppCondicionOpcion[];

  @OneToMany(
    () => AppDocumentoPorRuta,
    appDocumentoPorRuta => appDocumentoPorRuta.appRutaIdRuta2
  )
  appDocumentoPorRutas: AppDocumentoPorRuta[];

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appRutas,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_actividad_destino", referencedColumnName: "idActividad" }
  ])
  idActividadDestino2: AppActividad;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appRutas2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_actividad_origen", referencedColumnName: "idActividad" }
  ])
  idActividadOrigen2: AppActividad;

  @OneToMany(
    () => AsgpDocReqRutaAct,
    asgpDocReqRutaAct => asgpDocReqRutaAct.idRuta2
  )
  asgpDocReqRutaActs: AsgpDocReqRutaAct[];
}
