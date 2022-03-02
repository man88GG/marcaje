import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbEtapa } from "./CorbEtapa";
import { GtuPerfil } from "./GtuPerfil";
import { CorbRuta } from "./CorbRuta";
import { CorbProceso } from "./CorbProceso";
import { CorbTipoTarea } from "./CorbTipoTarea";
import { CorbCriterio } from "./CorbCriterio";

@Index("proceso_tarea_idx", ["idProceso"], {})
@Index("tipo_tarea_idx", ["idTipoTarea"], {})
@Entity("corb_tarea", { schema: "sincyt" })
export class CorbTarea {
  @PrimaryGeneratedColumn({ type: "int", name: "id_tarea" })
  idTarea: number;

  @Column("varchar", { name: "nombre", length: 150 })
  nombre: string;

  @Column("int", { name: "duracion", nullable: true })
  duracion: number | null;

  @Column("int", { name: "max_duracion", nullable: true })
  maxDuracion: number | null;

  @Column("int", { name: "costo", nullable: true })
  costo: number | null;

  @Column("int", { name: "ejecucion" })
  ejecucion: number;

  @Column("int", { name: "id_tipo_tarea" })
  idTipoTarea: number;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @OneToMany(
    () => CorbEtapa,
    corbEtapa => corbEtapa.idTarea2
  )
  corbEtapas: CorbEtapa[];

  @ManyToMany(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.corbTareas
  )
  gtuPerfils: GtuPerfil[];

  @OneToMany(
    () => CorbRuta,
    corbRuta => corbRuta.idTareaDestino2
  )
  corbRutas: CorbRuta[];

  @OneToMany(
    () => CorbRuta,
    corbRuta => corbRuta.idTareaOrigen2
  )
  corbRutas2: CorbRuta[];

  @ManyToOne(
    () => CorbProceso,
    corbProceso => corbProceso.corbTareas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: CorbProceso;

  @ManyToOne(
    () => CorbTipoTarea,
    corbTipoTarea => corbTipoTarea.corbTareas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_tipo_tarea", referencedColumnName: "idTipoTarea" }])
  idTipoTarea2: CorbTipoTarea;

  @ManyToMany(
    () => CorbCriterio,
    corbCriterio => corbCriterio.corbTareas
  )
  @JoinTable({
    name: "corb_tarea_criterio",
    joinColumns: [{ name: "id_tarea", referencedColumnName: "idTarea" }],
    inverseJoinColumns: [
      { name: "id_criterio", referencedColumnName: "idCriterio" }
    ],
    schema: "sincyt"
  })
  corbCriterios: CorbCriterio[];
}
