import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppRolActividad } from "./AppRolActividad";
import { CorbCriterio } from "./CorbCriterio";
import { CorbProceso } from "./CorbProceso";
import { CorbTarea } from "./CorbTarea";
import { CorbResponsable } from "./CorbResponsable";
import { GtuPerfilPermiso } from "./GtuPerfilPermiso";
import { GtuUsuario } from "./GtuUsuario";
import { LaipPerfilEstatus } from "./LaipPerfilEstatus";
import { WkfPerfilEstado } from "./WkfPerfilEstado";

@Entity("gtu_perfil", { schema: "sincyt" })
export class GtuPerfil {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 150 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 150 })
  descripcion: string | null;

  @Column("int", { name: "tipo_perfil", nullable: true, default: () => "'0'" })
  tipoPerfil: number | null;

  @Column("int", {
    name: "perfil_defecto",
    nullable: true,
    default: () => "'1'"
  })
  perfilDefecto: number | null;

  @OneToMany(
    () => AppRolActividad,
    appRolActividad => appRolActividad.idRol2
  )
  appRolActividads: AppRolActividad[];

  @ManyToMany(
    () => CorbCriterio,
    corbCriterio => corbCriterio.gtuPerfils
  )
  @JoinTable({
    name: "corb_perfil_evidencia",
    joinColumns: [{ name: "id_perfil", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "id_criterio", referencedColumnName: "idCriterio" }
    ],
    schema: "sincyt"
  })
  corbCriterios: CorbCriterio[];

  @ManyToMany(
    () => CorbProceso,
    corbProceso => corbProceso.gtuPerfils
  )
  @JoinTable({
    name: "corb_perfil_proceso",
    joinColumns: [{ name: "id_perfil", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "id_proceso", referencedColumnName: "idProceso" }
    ],
    schema: "sincyt"
  })
  corbProcesos: CorbProceso[];

  @ManyToMany(
    () => CorbTarea,
    corbTarea => corbTarea.gtuPerfils
  )
  @JoinTable({
    name: "corb_perfil_tarea",
    joinColumns: [{ name: "id_perfil", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "id_tarea", referencedColumnName: "idTarea" }],
    schema: "sincyt"
  })
  corbTareas: CorbTarea[];

  @OneToMany(
    () => CorbResponsable,
    corbResponsable => corbResponsable.idPerfil2
  )
  corbResponsables: CorbResponsable[];

  @OneToMany(
    () => GtuPerfilPermiso,
    gtuPerfilPermiso => gtuPerfilPermiso.idPerfil2
  )
  gtuPerfilPermisos: GtuPerfilPermiso[];

  @ManyToMany(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gtuPerfils
  )
  @JoinTable({
    name: "gtu_usuario_perfil",
    joinColumns: [{ name: "id_perfil", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "id_usuario", referencedColumnName: "id" }],
    schema: "sincyt"
  })
  gtuUsuarios: GtuUsuario[];

  @OneToMany(
    () => LaipPerfilEstatus,
    laipPerfilEstatus => laipPerfilEstatus.idPerfil2
  )
  laipPerfilEstatuses: LaipPerfilEstatus[];

  @OneToMany(
    () => WkfPerfilEstado,
    wkfPerfilEstado => wkfPerfilEstado.idPerfil2
  )
  wkfPerfilEstados: WkfPerfilEstado[];
}
