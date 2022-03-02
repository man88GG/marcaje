import { Column, Entity } from "typeorm";

@Entity("log_notificacion", { schema: "sincyt" })
export class LogNotificacion {
  @Column("varchar", {
    name: "id_usuario_gerencial",
    nullable: true,
    length: 100
  })
  idUsuarioGerencial: string | null;

  @Column("varchar", { name: "correo_destino", nullable: true, length: 500 })
  correoDestino: string | null;

  @Column("varchar", { name: "estado_anterior", nullable: true, length: 500 })
  estadoAnterior: string | null;

  @Column("varchar", { name: "estado_actual", nullable: true, length: 500 })
  estadoActual: string | null;

  @Column("varchar", { name: "cui_solicitante", nullable: true, length: 500 })
  cuiSolicitante: string | null;
}
