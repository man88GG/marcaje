import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GmsCategoria } from "./GmsCategoria";
import { GtuTipoUsuario } from "./GtuTipoUsuario";

@Index("id_tipo_usuario", ["idTipoUsuario"], {})
@Index("gms_categoria_tipo_usuario_ibfk_1_idx", ["idCategoria"], {})
@Entity("gms_categoria_tipo_usuario", { schema: "sincyt" })
export class GmsCategoriaTipoUsuario {
  @Column("int", { name: "id_categoria" })
  idCategoria: number;

  @Column("int", { name: "id_tipo_usuario" })
  idTipoUsuario: number;

  @ManyToOne(
    () => GmsCategoria,
    gmsCategoria => gmsCategoria.gmsCategoriaTipoUsuarios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
  idCategoria2: GmsCategoria;

  @ManyToOne(
    () => GtuTipoUsuario,
    gtuTipoUsuario => gtuTipoUsuario.gmsCategoriaTipoUsuarios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_tipo_usuario", referencedColumnName: "id" }])
  idTipoUsuario2: GtuTipoUsuario;
}
