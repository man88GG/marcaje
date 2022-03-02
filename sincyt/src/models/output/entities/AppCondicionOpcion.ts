import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AppCondicionActividad } from "./AppCondicionActividad";
import { AppRuta } from "./AppRuta";

@Index("id_ruta_idx", ["idRuta"], {})
@Entity("app_condicion_opcion", { schema: "sincyt" })
export class AppCondicionOpcion {
  @Column("int", { primary: true, name: "id_condicion" })
  idCondicion: number;

  @Column("int", { name: "id_ruta" })
  idRuta: number;

  @Column("varchar", { name: "descripcion", nullable: true, length: 255 })
  descripcion: string | null;

  @OneToMany(
    () => AppCondicionActividad,
    appCondicionActividad => appCondicionActividad.idCondicion2
  )
  appCondicionActividads: AppCondicionActividad[];

  @ManyToOne(
    () => AppRuta,
    appRuta => appRuta.appCondicionOpcions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_ruta", referencedColumnName: "idRuta" }])
  idRuta2: AppRuta;
}
