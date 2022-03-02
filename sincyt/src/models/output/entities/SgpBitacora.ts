import { Column, Entity } from "typeorm";

@Entity("sgp_bitacora", { schema: "sincyt" })
export class SgpBitacora {
  @Column("int", { name: "transaccion", default: () => "'0'" })
  transaccion: number;

  @Column("varchar", { name: "accion", length: 45 })
  accion: string;

  @Column("varchar", { name: "tabla", length: 45 })
  tabla: string;

  @Column("timestamp", { name: "fecha", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column("varchar", { name: "host", length: 45 })
  host: string;

  @Column("varchar", { name: "dispositivo", length: 45 })
  dispositivo: string;

  @Column("varchar", { name: "usuario", length: 45 })
  usuario: string;

  @Column("varchar", { name: "campos", length: 400 })
  campos: string;

  @Column("text", { name: "valor_campos", nullable: true })
  valorCampos: string | null;
}
