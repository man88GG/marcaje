import { Column, Entity, OneToMany } from "typeorm";
import { RpeEntidad } from "./RpeEntidad";

@Entity("rpe_jerarquia", { schema: "sincyt" })
export class RpeJerarquia {
  @Column("int", { primary: true, name: "no_jerarquia" })
  noJerarquia: number;

  @Column("varchar", { name: "nombre_jerarquia", nullable: true, length: 100 })
  nombreJerarquia: string | null;

  @OneToMany(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.noJerarquia2
  )
  rpeEntidads: RpeEntidad[];
}
