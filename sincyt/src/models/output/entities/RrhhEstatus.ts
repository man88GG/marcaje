import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RrhhTransaccionPermiso } from "./RrhhTransaccionPermiso";

@Entity("rrhh_estatus", { schema: "sincyt" })
export class RrhhEstatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @OneToMany(
    () => RrhhTransaccionPermiso,
    rrhhTransaccionPermiso => rrhhTransaccionPermiso.idEstatus2
  )
  rrhhTransaccionPermisos: RrhhTransaccionPermiso[];
}
