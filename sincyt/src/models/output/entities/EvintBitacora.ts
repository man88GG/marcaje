import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";

@Index("id_perfil_idx", ["idPerfil"], {})
@Entity("evint_bitacora", { schema: "sincyt" })
export class EvintBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id_bitacora" })
  idBitacora: number;

  @Column("varchar", { name: "descripcion", length: 500 })
  descripcion: string;

  @Column("int", { name: "id_perfil" })
  idPerfil: number;

  @Column("date", { name: "fecha_accion" })
  fechaAccion: string;

  @ManyToOne(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.evintBitacoras,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "idPerfilProyecto" }])
  idPerfil2: SgpPerfilProyecto;
}
