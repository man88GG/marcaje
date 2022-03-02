import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { RhplAreaTematica } from "./RhplAreaTematica";

@Entity("rhpl_area_proyecto", { schema: "sincyt" })
export class RhplAreaProyecto {
  @Column("int", { primary: true, name: "id_area" })
  idArea: number;

  @Column("int", { primary: true, name: "id_proyecto" })
  idProyecto: number;

  @ManyToOne(
    () => RhplAreaTematica,
    rhplAreaTematica => rhplAreaTematica.rhplAreaProyectos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_area", referencedColumnName: "idArea" }])
  idArea2: RhplAreaTematica;
}
