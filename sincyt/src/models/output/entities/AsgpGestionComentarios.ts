import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { AppActividad } from "./AppActividad";

@Index("fk_asgp_gestion_comentarios_cod_proceso", ["codProceso"], {})
@Index("fk_asgp_gestion_comentarios_id_actividad", ["idActividad"], {})
@Entity("asgp_gestion_comentarios", { schema: "sincyt" })
export class AsgpGestionComentarios {
  @PrimaryGeneratedColumn({ type: "int", name: "no_comentario" })
  noComentario: number;

  @Column("int", { name: "cod_proceso", nullable: true })
  codProceso: number | null;

  @Column("int", { name: "id_actividad", nullable: true })
  idActividad: number | null;

  @Column("varchar", { name: "comentario", nullable: true, length: 1000 })
  comentario: string | null;

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.asgpGestionComentarios,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @ManyToOne(
    () => AppActividad,
    appActividad => appActividad.asgpGestionComentarios,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad2: AppActividad;
}
