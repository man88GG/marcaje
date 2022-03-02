import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GtuPerfilPermiso } from "./GtuPerfilPermiso";

@Entity("gtu_permiso", { schema: "sincyt" })
export class GtuPermiso {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 45 })
  nombre: string;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @OneToMany(
    () => GtuPerfilPermiso,
    gtuPerfilPermiso => gtuPerfilPermiso.idPermiso2
  )
  gtuPerfilPermisos: GtuPerfilPermiso[];
}
