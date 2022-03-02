import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { RpeEntidad } from "./RpeEntidad";
import { RpeProyectoEstado } from "./RpeProyectoEstado";
import { RpePublicacionesEntidades } from "./RpePublicacionesEntidades";

@Index("fk_rpe_proyecto_no_entidad", ["noEntidad"], {})
@Entity("rpe_proyecto", { schema: "sincyt" })
export class RpeProyecto {
  @Column("int", { primary: true, name: "no_proyecto" })
  noProyecto: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @Column("double", { name: "monto_solicitado", nullable: true, precision: 22 })
  montoSolicitado: number | null;

  @Column("double", { name: "monto_aprobado", nullable: true, precision: 22 })
  montoAprobado: number | null;

  @Column("double", { name: "monto_ejecutado", nullable: true, precision: 22 })
  montoEjecutado: number | null;

  @Column("varchar", {
    name: "entidades_participantes",
    nullable: true,
    length: 1000
  })
  entidadesParticipantes: string | null;

  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @ManyToOne(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.rpeProyectos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: RpeEntidad;

  @OneToMany(
    () => RpeProyectoEstado,
    rpeProyectoEstado => rpeProyectoEstado.rpeProyectoNoProyecto2
  )
  rpeProyectoEstados: RpeProyectoEstado[];

  @OneToMany(
    () => RpePublicacionesEntidades,
    rpePublicacionesEntidades => rpePublicacionesEntidades.noProyecto2
  )
  rpePublicacionesEntidades: RpePublicacionesEntidades[];
}
