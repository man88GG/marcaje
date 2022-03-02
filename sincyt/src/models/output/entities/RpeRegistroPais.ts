import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpePropiedadIntelectual } from "./RpePropiedadIntelectual";
import { GrlPais } from "./GrlPais";

@Index("codigo_pais", ["codigoPais"], {})
@Index(
  "fk_RPE_REGISTRO_PAIS_RPE_PROPIEDAD_INTELECTUAL1_idx",
  ["noPropiedadIntelectual"],
  {}
)
@Entity("rpe_registro_pais", { schema: "sincyt" })
export class RpeRegistroPais {
  @PrimaryGeneratedColumn({ type: "int", name: "id_registro_pais" })
  idRegistroPais: number;

  @Column("int", { name: "codigo_pais" })
  codigoPais: number;

  @Column("int", { name: "no_propiedad_intelectual" })
  noPropiedadIntelectual: number;

  @Column("varchar", { name: "no_registro", length: 250 })
  noRegistro: string;

  @ManyToOne(
    () => RpePropiedadIntelectual,
    rpePropiedadIntelectual => rpePropiedadIntelectual.rpeRegistroPais,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "no_propiedad_intelectual",
      referencedColumnName: "noPropiedadIntelectual"
    }
  ])
  noPropiedadIntelectual2: RpePropiedadIntelectual;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpeRegistroPais,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "codigo_pais", referencedColumnName: "id" }])
  codigoPais2: GrlPais;
}
