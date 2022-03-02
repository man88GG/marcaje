import { Column, Entity, OneToMany } from "typeorm";
import { CorbTarea } from "./CorbTarea";

@Entity("corb_tipo_tarea", { schema: "sincyt" })
export class CorbTipoTarea {
  @Column("int", { primary: true, name: "id_tipo_tarea" })
  idTipoTarea: number;

  @Column("varchar", { name: "descripcion", length: 150 })
  descripcion: string;

  @OneToMany(
    () => CorbTarea,
    corbTarea => corbTarea.idTipoTarea2
  )
  corbTareas: CorbTarea[];
}
