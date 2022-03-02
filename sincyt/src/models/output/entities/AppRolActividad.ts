import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GtuPerfil } from "./GtuPerfil";
import { AppActividad } from "./AppActividad";

@Index("id_actividad_r_idx", ["idActividad"], {})
@Index("id_rol_r_idx", ["idRol"], {})
@Entity("app_rol_actividad", { schema: "sincyt" })
export class AppRolActividad {
  @Column("int", { name: "id_actividad" })
  idActividad: number;

  @Column("int", { name: "id_rol" })
  idRol: number;

  @ManyToOne(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.appRolActividads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_rol", referencedColumnName: "id" }])
  idRol2: GtuPerfil;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.appRolActividads,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;
}
