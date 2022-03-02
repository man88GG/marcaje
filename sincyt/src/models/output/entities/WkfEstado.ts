import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WkfPerfilEstado } from "./WkfPerfilEstado";

@Entity("wkf_estado", { schema: "sincyt" })
export class WkfEstado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 50 })
  descripcion: string;

  @OneToMany(
    () => WkfPerfilEstado,
    wkfPerfilEstado => wkfPerfilEstado.idEstatusEnviar2
  )
  wkfPerfilEstados: WkfPerfilEstado[];

  @OneToMany(
    () => WkfPerfilEstado,
    wkfPerfilEstado => wkfPerfilEstado.idEstatusVer2
  )
  wkfPerfilEstados2: WkfPerfilEstado[];
}
