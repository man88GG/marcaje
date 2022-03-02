import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { LaipEstatus } from "./LaipEstatus";
import { GtuPerfil } from "./GtuPerfil";

@Index("idperfilperfilestatus_idx", ["idPerfil"], {})
@Index("idestatusverperfilestatus_idx", ["idEstatusVer"], {})
@Index("idestatusenviaperfilestatus_idx", ["idEstatusEnviar"], {})
@Entity("laip_perfil_estatus", { schema: "sincyt" })
export class LaipPerfilEstatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_perfil" })
  idPerfil: number;

  @Column("int", { name: "id_estatus_ver" })
  idEstatusVer: number;

  @Column("int", { name: "id_estatus_enviar" })
  idEstatusEnviar: number;

  @ManyToOne(
    () => LaipEstatus,
    laipEstatus => laipEstatus.laipPerfilEstatuses,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus_ver", referencedColumnName: "id" }])
  idEstatusVer2: LaipEstatus;

  @ManyToOne(
    () => LaipEstatus,
    laipEstatus => laipEstatus.laipPerfilEstatuses2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus_enviar", referencedColumnName: "id" }])
  idEstatusEnviar2: LaipEstatus;

  @ManyToOne(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.laipPerfilEstatuses,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "id" }])
  idPerfil2: GtuPerfil;
}
