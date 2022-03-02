import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GmsCategoriaTipoUsuario } from "./GmsCategoriaTipoUsuario";
import { GtuUsuario } from "./GtuUsuario";

@Entity("gtu_tipo_usuario", { schema: "sincyt" })
export class GtuTipoUsuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @OneToMany(
    () => GmsCategoriaTipoUsuario,
    gmsCategoriaTipoUsuario => gmsCategoriaTipoUsuario.idTipoUsuario2
  )
  gmsCategoriaTipoUsuarios: GmsCategoriaTipoUsuario[];

  @OneToMany(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.idTipoUsuario2
  )
  gtuUsuarios: GtuUsuario[];
}
