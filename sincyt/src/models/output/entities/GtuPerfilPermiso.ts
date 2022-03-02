import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GtuModulo } from "./GtuModulo";
import { GtuPerfil } from "./GtuPerfil";
import { GtuPermiso } from "./GtuPermiso";

@Index("idperfilperfil_permiso_idx", ["idPerfil"], {})
@Index("idpermiso_idx", ["idPermiso"], {})
@Index("idmodulo_idx", ["idModulo"], {})
@Entity("gtu_perfil_permiso", { schema: "sincyt" })
export class GtuPerfilPermiso {
  @Column("int", { primary: true, name: "id_perfil" })
  idPerfil: number;

  @Column("int", { primary: true, name: "id_modulo" })
  idModulo: number;

  @Column("int", { primary: true, name: "id_permiso" })
  idPermiso: number;

  @ManyToOne(
    () => GtuModulo,
    gtuModulo => gtuModulo.gtuPerfilPermisos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_modulo", referencedColumnName: "id" }])
  idModulo2: GtuModulo;

  @ManyToOne(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.gtuPerfilPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "id" }])
  idPerfil2: GtuPerfil;

  @ManyToOne(
    () => GtuPermiso,
    gtuPermiso => gtuPermiso.gtuPerfilPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_permiso", referencedColumnName: "id" }])
  idPermiso2: GtuPermiso;
}
