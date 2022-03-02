import { Column, Entity, OneToMany } from "typeorm";
import { AsgpAsignaUsuarioSolicitud } from "./AsgpAsignaUsuarioSolicitud";

@Entity("asgp_tipo_usuario_asignacion", { schema: "sincyt" })
export class AsgpTipoUsuarioAsignacion {
  @Column("int", { primary: true, name: "id_tipo_usuario_asignacion" })
  idTipoUsuarioAsignacion: number;

  @Column("varchar", {
    name: "nombre_tipo_usuario_asignacion",
    nullable: true,
    length: 250
  })
  nombreTipoUsuarioAsignacion: string | null;

  @OneToMany(
    () => AsgpAsignaUsuarioSolicitud,
    asgpAsignaUsuarioSolicitud =>
      asgpAsignaUsuarioSolicitud.idTipoUsuarioAsignacion2
  )
  asgpAsignaUsuarioSolicituds: AsgpAsignaUsuarioSolicitud[];
}
