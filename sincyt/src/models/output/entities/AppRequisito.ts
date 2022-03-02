import { Column, Entity, OneToMany } from "typeorm";
import { AppActividadRequisito } from "./AppActividadRequisito";
import { AppBitacora } from "./AppBitacora";
import { AppDetalleProceso } from "./AppDetalleProceso";
import { AppDocumentoPorRuta } from "./AppDocumentoPorRuta";
import { AsgpDocReqRutaAct } from "./AsgpDocReqRutaAct";

@Entity("app_requisito", { schema: "sincyt" })
export class AppRequisito {
  @Column("int", { primary: true, name: "id_requisito" })
  idRequisito: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 250 })
  nombre: string | null;

  @Column("varchar", { name: "descripcion", nullable: true, length: 250 })
  descripcion: string | null;

  @Column("int", { name: "estado" })
  estado: number;

  @OneToMany(
    () => AppActividadRequisito,
    appActividadRequisito => appActividadRequisito.idRequisito2
  )
  appActividadRequisitos: AppActividadRequisito[];

  @OneToMany(
    () => AppBitacora,
    appBitacora => appBitacora.idRequisito2
  )
  appBitacoras: AppBitacora[];

  @OneToMany(
    () => AppDetalleProceso,
    appDetalleProceso => appDetalleProceso.idRequisito2
  )
  appDetalleProcesos: AppDetalleProceso[];

  @OneToMany(
    () => AppDocumentoPorRuta,
    appDocumentoPorRuta => appDocumentoPorRuta.appRequisitoIdRequisito2
  )
  appDocumentoPorRutas: AppDocumentoPorRuta[];

  @OneToMany(
    () => AsgpDocReqRutaAct,
    asgpDocReqRutaAct => asgpDocReqRutaAct.idRequisito2
  )
  asgpDocReqRutaActs: AsgpDocReqRutaAct[];
}
