import { Column, Entity, OneToMany } from "typeorm";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";

@Entity("sgp_estado_perfil_proyecto", { schema: "sincyt" })
export class SgpEstadoPerfilProyecto {
  @Column("int", { primary: true, name: "id_estado_perfil_proyecto" })
  idEstadoPerfilProyecto: number;

  @Column("varchar", { name: "descripcion_estado", length: 45 })
  descripcionEstado: string;

  @OneToMany(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.idEstadoPerfilProyecto2
  )
  sgpPerfilProyectos: SgpPerfilProyecto[];
}
