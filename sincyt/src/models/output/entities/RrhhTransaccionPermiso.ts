import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RrhhEstatus } from "./RrhhEstatus";
import { RrhhPermiso } from "./RrhhPermiso";

@Index("rrhh_transacciones_permiso_rrhh_permisoid_idx", ["idPermiso"], {})
@Index("rrhh_transaccion_permiso_ibfk_2_idx", ["idEstatus"], {})
@Entity("rrhh_transaccion_permiso", { schema: "sincyt" })
export class RrhhTransaccionPermiso {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("int", { name: "id_permiso" })
  idPermiso: number;

  @Column("int", { name: "id_estatus" })
  idEstatus: number;

  @ManyToOne(
    () => RrhhEstatus,
    rrhhEstatus => rrhhEstatus.rrhhTransaccionPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus", referencedColumnName: "id" }])
  idEstatus2: RrhhEstatus;

  @ManyToOne(
    () => RrhhPermiso,
    rrhhPermiso => rrhhPermiso.rrhhTransaccionPermisos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_permiso", referencedColumnName: "id" }])
  idPermiso2: RrhhPermiso;
}
