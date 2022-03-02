import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeEstado } from "./RpeEstado";

@Index("fk_grl_servidor_rpe_estado1_idx", ["noEstado", "noTipoEstado"], {})
@Entity("grl_servidor", { schema: "sincyt" })
export class GrlServidor {
  @Column("int", { primary: true, name: "id_servidor" })
  idServidor: number;

  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @Column("text", { name: "ip", nullable: true })
  ip: string | null;

  @Column("text", { name: "usuario", nullable: true })
  usuario: string | null;

  @Column("text", { name: "password", nullable: true })
  password: string | null;

  @Column("text", { name: "dominio", nullable: true })
  dominio: string | null;

  @Column("text", { name: "url", nullable: true })
  url: string | null;

  @Column("text", { name: "base_datos", nullable: true })
  baseDatos: string | null;

  @Column("text", { name: "puerto", nullable: true })
  puerto: string | null;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.grlServidors,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
