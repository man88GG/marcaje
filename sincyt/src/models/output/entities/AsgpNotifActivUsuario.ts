import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AppActividad } from "./AppActividad";
import { SgpLinea } from "./SgpLinea";
import { GtuUsuario } from "./GtuUsuario";

@Index("fk_id_usuario_notif", ["idUsuario"], {})
@Index("fk_id_linea_notif", ["idLinea"], {})
@Entity("asgp_notif_activ_usuario", { schema: "sincyt" })
export class AsgpNotifActivUsuario {
  @Column("int", { primary: true, name: "id_actividad" })
  idActividad: number;

  @Column("int", { primary: true, name: "id_usuario" })
  idUsuario: number;

  @Column("int", { primary: true, name: "id_linea" })
  idLinea: number;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.asgpNotifActivUsuarios,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.asgpNotifActivUsuarios,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_linea", referencedColumnName: "idLinea" }])
  idLinea2: SgpLinea;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.asgpNotifActivUsuarios,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;
}
