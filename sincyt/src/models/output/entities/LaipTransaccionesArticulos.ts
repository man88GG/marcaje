import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { LaipTransaccionesArchivos } from "./LaipTransaccionesArchivos";
import { LaipAsignacion } from "./LaipAsignacion";
import { LaipEstatus } from "./LaipEstatus";

@Index("iditemtranscciones_articulos_idx", ["idAsignacion"], {})
@Index("idestatustransacciones_articulos_idx", ["idEstatus"], {})
@Entity("laip_transacciones_articulos", { schema: "sincyt" })
export class LaipTransaccionesArticulos {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "mes" })
  mes: number;

  @Column("year", { name: "anio" })
  anio: number;

  @Column("int", { name: "id_asignacion" })
  idAsignacion: number;

  @Column("int", { name: "id_estatus" })
  idEstatus: number;

  @OneToMany(
    () => LaipTransaccionesArchivos,
    laipTransaccionesArchivos =>
      laipTransaccionesArchivos.idTransaccionesArticulos2
  )
  laipTransaccionesArchivos: LaipTransaccionesArchivos[];

  @ManyToOne(
    () => LaipAsignacion,
    laipAsignacion => laipAsignacion.laipTransaccionesArticulos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_asignacion", referencedColumnName: "id" }])
  idAsignacion2: LaipAsignacion;

  @ManyToOne(
    () => LaipEstatus,
    laipEstatus => laipEstatus.laipTransaccionesArticulos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus", referencedColumnName: "id" }])
  idEstatus2: LaipEstatus;
}
