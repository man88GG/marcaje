import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuDepartamento } from "./GtuDepartamento";
import { GtuPuesto } from "./GtuPuesto";

@Index("id_departamento", ["idDepartamento"], {})
@Index("id_puesto", ["idPuesto"], {})
@Entity("gtu_departamento_puesto", { schema: "sincyt" })
export class GtuDepartamentoPuesto {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_departamento" })
  idDepartamento: number;

  @Column("int", { name: "id_puesto" })
  idPuesto: number;

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.gtuDepartamentoPuestos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_departamento", referencedColumnName: "id" }])
  idDepartamento2: GtuDepartamento;

  @ManyToOne(
    () => GtuPuesto,
    gtuPuesto => gtuPuesto.gtuDepartamentoPuestos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_puesto", referencedColumnName: "id" }])
  idPuesto2: GtuPuesto;
}
