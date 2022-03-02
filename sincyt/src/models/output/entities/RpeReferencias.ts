import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeInformacionLaboral } from "./RpeInformacionLaboral";

@Index(
  "fk_RPE_REFERENCIAS_RPE_INFORMACION_LABORAL1_idx",
  ["noInformacionLaboral"],
  {}
)
@Entity("rpe_referencias", { schema: "sincyt" })
export class RpeReferencias {
  @PrimaryGeneratedColumn({ type: "int", name: "no_referencia" })
  noReferencia: number;

  @Column("varchar", { name: "nombres", length: 500 })
  nombres: string;

  @Column("varchar", { name: "apellidos", length: 500 })
  apellidos: string;

  @Column("varchar", { name: "telefono", length: 100 })
  telefono: string;

  @Column("varchar", { name: "correo", nullable: true, length: 500 })
  correo: string | null;

  @Column("varchar", { name: "puesto_cargo", length: 250 })
  puestoCargo: string;

  @Column("int", { name: "no_informacion_laboral" })
  noInformacionLaboral: number;

  @ManyToOne(
    () => RpeInformacionLaboral,
    rpeInformacionLaboral => rpeInformacionLaboral.rpeReferencias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "no_informacion_laboral",
      referencedColumnName: "noInformacionLaboral"
    }
  ])
  noInformacionLaboral2: RpeInformacionLaboral;
}
