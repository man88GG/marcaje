import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { WkfEstado } from "./WkfEstado";
import { GtuPerfil } from "./GtuPerfil";

@Index("idperfilperfilestatus_idx", ["idPerfil"], {})
@Index("idestatusverperfilestatus_idx", ["idEstatusVer"], {})
@Index("idestatusenviaperfilestatus_idx", ["idEstatusEnviar"], {})
@Entity("wkf_perfil_estado", { schema: "sincyt" })
export class WkfPerfilEstado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_perfil" })
  idPerfil: number;

  @Column("int", { name: "id_estatus_ver" })
  idEstatusVer: number;

  @Column("int", { name: "id_estatus_enviar" })
  idEstatusEnviar: number;

  @ManyToOne(
    () => WkfEstado,
    wkfEstado => wkfEstado.wkfPerfilEstados,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_estatus_enviar", referencedColumnName: "id" }])
  idEstatusEnviar2: WkfEstado;

  @ManyToOne(
    () => WkfEstado,
    wkfEstado => wkfEstado.wkfPerfilEstados2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_estatus_ver", referencedColumnName: "id" }])
  idEstatusVer2: WkfEstado;

  @ManyToOne(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.wkfPerfilEstados,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "id" }])
  idPerfil2: GtuPerfil;
}
