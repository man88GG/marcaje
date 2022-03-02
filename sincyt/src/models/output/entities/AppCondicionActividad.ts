import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AppCondicionOpcion } from "./AppCondicionOpcion";
import { AppActividad } from "./AppActividad";

@Index("id_actividad_con_idx", ["idActividad"], {})
@Index("id_condicion_act_idx", ["sqlQuery"], {})
@Index("fk_app_condicion_actividad_id_condicion", ["idCondicion"], {})
@Entity("app_condicion_actividad", { schema: "sincyt" })
export class AppCondicionActividad {
  @Column("int", { primary: true, name: "id_condicion_actividad" })
  idCondicionActividad: number;

  @Column("int", { name: "id_actividad", nullable: true })
  idActividad: number | null;

  @Column("varchar", { name: "sqlQuery", nullable: true, length: 500 })
  sqlQuery: string | null;

  @Column("int", { name: "id_condicion", nullable: true })
  idCondicion: number | null;

  @ManyToOne(
    () => AppCondicionOpcion,
    appCondicionOpcion => appCondicionOpcion.appCondicionActividads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_condicion", referencedColumnName: "idCondicion" }])
  idCondicion2: AppCondicionOpcion;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appCondicionActividads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;
}
