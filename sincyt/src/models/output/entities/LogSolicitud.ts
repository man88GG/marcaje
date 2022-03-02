import { Column, Entity } from "typeorm";

@Entity("log_solicitud", { schema: "sincyt" })
export class LogSolicitud {
  @Column("varchar", { name: "cui_solicitante", nullable: true, length: 500 })
  cuiSolicitante: string | null;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("int", { name: "no_solicitud", nullable: true })
  noSolicitud: number | null;
}
