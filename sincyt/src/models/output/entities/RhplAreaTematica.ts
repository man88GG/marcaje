import { Column, Entity, OneToMany } from "typeorm";
import { RhplAreaProyecto } from "./RhplAreaProyecto";

@Entity("rhpl_area_tematica", { schema: "sincyt" })
export class RhplAreaTematica {
  @Column("int", { primary: true, name: "id_area" })
  idArea: number;

  @Column("varchar", { name: "descripcion", length: 255 })
  descripcion: string;

  @OneToMany(
    () => RhplAreaProyecto,
    rhplAreaProyecto => rhplAreaProyecto.idArea2
  )
  rhplAreaProyectos: RhplAreaProyecto[];
}
