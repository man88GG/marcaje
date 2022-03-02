import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbEstadoEtapa } from "./CorbEstadoEtapa";
import { CorbGestion } from "./CorbGestion";
import { CorbTarea } from "./CorbTarea";
import { GtuUsuario } from "./GtuUsuario";
import { CorbEvidencia } from "./CorbEvidencia";

@Index("gestion_fk_idx", ["idGestion"], {})
@Index("tarea_fk_idx", ["idTarea"], {})
@Index("estado_etapa_fk_idx", ["idEstadoEtapa"], {})
@Index("usuario_fk_idx", ["idUsuario"], {})
@Entity("corb_etapa", { schema: "sincyt" })
export class CorbEtapa {
  @PrimaryGeneratedColumn({ type: "int", name: "id_etapa" })
  idEtapa: number;

  @Column("int", { name: "id_gestion" })
  idGestion: number;

  @Column("int", { name: "id_tarea" })
  idTarea: number;

  @Column("int", { name: "id_estado_etapa" })
  idEstadoEtapa: number;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("datetime", { name: "fecha_asignacion" })
  fechaAsignacion: Date;

  @Column("datetime", { name: "fecha_ejecucion", nullable: true })
  fechaEjecucion: Date | null;

  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @ManyToOne(
    () => CorbEstadoEtapa,
    corbEstadoEtapa => corbEstadoEtapa.corbEtapas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_estado_etapa", referencedColumnName: "idEstadoEtapa" }
  ])
  idEstadoEtapa2: CorbEstadoEtapa;

  @ManyToOne(
    () => CorbGestion,
    corbGestion => corbGestion.corbEtapas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_gestion", referencedColumnName: "idGestion" }])
  idGestion2: CorbGestion;

  @ManyToOne(
    () => CorbTarea,
    corbTarea => corbTarea.corbEtapas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_tarea", referencedColumnName: "idTarea" }])
  idTarea2: CorbTarea;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.corbEtapas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @OneToMany(
    () => CorbEvidencia,
    corbEvidencia => corbEvidencia.idEtapa2
  )
  corbEvidencias: CorbEvidencia[];
}
