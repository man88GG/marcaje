import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuDepartamentoPuesto } from "./GtuDepartamentoPuesto";
import { GtuEstado } from "./GtuEstado";

@Index("padre", ["padre"], {})
@Index("id_estado", ["idEstado"], {})
@Entity("gtu_puesto", { schema: "sincyt" })
export class GtuPuesto {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "padre", nullable: true })
  padre: number | null;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("int", { name: "notificar", default: () => "'2'" })
  notificar: number;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => GtuDepartamentoPuesto,
    gtuDepartamentoPuesto => gtuDepartamentoPuesto.idPuesto2
  )
  gtuDepartamentoPuestos: GtuDepartamentoPuesto[];

  @ManyToOne(
    () => GtuPuesto,
    gtuPuesto => gtuPuesto.gtuPuestos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "padre", referencedColumnName: "id" }])
  padre2: GtuPuesto;

  @OneToMany(
    () => GtuPuesto,
    gtuPuesto => gtuPuesto.padre2
  )
  gtuPuestos: GtuPuesto[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gtuPuestos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;
}
