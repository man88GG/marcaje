import { Column, Entity, OneToMany } from "typeorm";
import { RpeInvestigacion } from "./RpeInvestigacion";

@Entity("rpe_dimensional_tiempo", { schema: "sincyt" })
export class RpeDimensionalTiempo {
  @Column("int", { primary: true, name: "no_dimensional" })
  noDimensional: number;

  @Column("varchar", { name: "nombre", length: 45 })
  nombre: string;

  @OneToMany(
    () => RpeInvestigacion,
    rpeInvestigacion => rpeInvestigacion.noDimensional2
  )
  rpeInvestigacions: RpeInvestigacion[];
}
