import { Column, Entity } from "typeorm";

@Entity("rhpl_fonacyt_findecyt_traslado", { schema: "sincyt" })
export class RhplFonacytFindecytTraslado {
  @Column("int", { primary: true, name: "id_proyecto_fonacyt" })
  idProyectoFonacyt: number;

  @Column("int", { primary: true, name: "id_proyecto_findecyt" })
  idProyectoFindecyt: number;
}
