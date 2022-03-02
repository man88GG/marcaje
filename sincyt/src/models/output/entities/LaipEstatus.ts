import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { LaipPerfilEstatus } from "./LaipPerfilEstatus";
import { LaipTransaccionesArticulos } from "./LaipTransaccionesArticulos";

@Index("idestadoestatus_idx", ["idEstado"], {})
@Entity("laip_estatus", { schema: "sincyt" })
export class LaipEstatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 50 })
  descripcion: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => LaipPerfilEstatus,
    laipPerfilEstatus => laipPerfilEstatus.idEstatusVer2
  )
  laipPerfilEstatuses: LaipPerfilEstatus[];

  @OneToMany(
    () => LaipPerfilEstatus,
    laipPerfilEstatus => laipPerfilEstatus.idEstatusEnviar2
  )
  laipPerfilEstatuses2: LaipPerfilEstatus[];

  @OneToMany(
    () => LaipTransaccionesArticulos,
    laipTransaccionesArticulos => laipTransaccionesArticulos.idEstatus2
  )
  laipTransaccionesArticulos: LaipTransaccionesArticulos[];
}
