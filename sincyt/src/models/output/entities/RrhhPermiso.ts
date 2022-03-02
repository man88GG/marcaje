import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuUsuario } from "./GtuUsuario";
import { GtuDepartamento } from "./GtuDepartamento";
import { RrhhTipoPermiso } from "./RrhhTipoPermiso";
import { RrhhTransaccionPermiso } from "./RrhhTransaccionPermiso";

@Index("rrhh_permiso_ibfk_1", ["idUsuario"], {})
@Index("rrhh_permiso_ibfk_3", ["idUsuarioJefe"], {})
@Index("rrhh_permiso_ibfk_4_idx", ["idDepartamentoJefe"], {})
@Index("rrhh_permiso_ibfk_2_idx", ["idDepartamento"], {})
@Index("rrhh_permiso_ibfk_5_idx", ["idTipoPermiso"], {})
@Entity("rrhh_permiso", { schema: "sincyt" })
export class RrhhPermiso {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("time", { name: "hora_inicial" })
  horaInicial: string;

  @Column("time", { name: "hora_final" })
  horaFinal: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @Column("int", { name: "id_usuario" })
  idUsuario: number;

  @Column("int", { name: "id_departamento" })
  idDepartamento: number;

  @Column("int", { name: "id_usuario_jefe" })
  idUsuarioJefe: number;

  @Column("int", { name: "id_departamento_jefe" })
  idDepartamentoJefe: number;

  @Column("int", { name: "id_tipo_permiso" })
  idTipoPermiso: number;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.rrhhPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.rrhhPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_departamento", referencedColumnName: "id" }])
  idDepartamento2: GtuDepartamento;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.rrhhPermisos2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario_jefe", referencedColumnName: "id" }])
  idUsuarioJefe2: GtuUsuario;

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.rrhhPermisos2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_departamento_jefe", referencedColumnName: "id" }])
  idDepartamentoJefe2: GtuDepartamento;

  @ManyToOne(
    () => RrhhTipoPermiso,
    rrhhTipoPermiso => rrhhTipoPermiso.rrhhPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_tipo_permiso", referencedColumnName: "id" }])
  idTipoPermiso2: RrhhTipoPermiso;

  @OneToMany(
    () => RrhhTransaccionPermiso,
    rrhhTransaccionPermiso => rrhhTransaccionPermiso.idPermiso2
  )
  rrhhTransaccionPermisos: RrhhTransaccionPermiso[];
}
