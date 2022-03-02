import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbRegla } from "./CorbRegla";
import { CorbTarea } from "./CorbTarea";

@Index("tarea_origen_idx", ["idTareaOrigen"], {})
@Index("tarea_destino_idx", ["idTareaDestino"], {})
@Entity("corb_ruta", { schema: "sincyt" })
export class CorbRuta {
  @PrimaryGeneratedColumn({ type: "int", name: "id_ruta" })
  idRuta: number;

  @Column("int", { name: "id_tarea_origen" })
  idTareaOrigen: number;

  @Column("int", { name: "id_tarea_destino" })
  idTareaDestino: number;

  @Column("int", { name: "prioridad" })
  prioridad: number;

  @OneToMany(
    () => CorbRegla,
    corbRegla => corbRegla.idRuta2
  )
  corbReglas: CorbRegla[];

  @ManyToOne(
    () => CorbTarea,
    corbTarea => corbTarea.corbRutas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_tarea_destino", referencedColumnName: "idTarea" }])
  idTareaDestino2: CorbTarea;

  @ManyToOne(
    () => CorbTarea,
    corbTarea => corbTarea.corbRutas2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_tarea_origen", referencedColumnName: "idTarea" }])
  idTareaOrigen2: CorbTarea;
}
