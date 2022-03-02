import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { RrhhPermiso } from "./RrhhPermiso";
import { GtuEstado } from "./GtuEstado";

@Index("id_estado", ["idEstado"], {})
@Entity("rrhh_tipo_permiso", { schema: "sincyt" })
export class RrhhTipoPermiso {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 150 })
  descripcion: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => RrhhPermiso,
    rrhhPermiso => rrhhPermiso.idTipoPermiso2
  )
  rrhhPermisos: RrhhPermiso[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.rrhhTipoPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;
}
