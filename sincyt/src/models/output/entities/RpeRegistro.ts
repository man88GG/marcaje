import { Column, Entity } from "typeorm";

@Entity("rpe_registro", { schema: "sincyt" })
export class RpeRegistro {
  @Column("int", { primary: true, name: "no_registro_sicti" })
  noRegistroSicti: number;

  @Column("datetime", { name: "fecha_asignacion", nullable: true })
  fechaAsignacion: Date | null;
}
