import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpePersona } from "./RpePersona";

@Index("fk_RPE_MERITO_RPE_PERSONA1_idx", ["noRegistroPersona"], {})
@Entity("rpe_merito", { schema: "sincyt" })
export class RpeMerito {
  @PrimaryGeneratedColumn({ type: "int", name: "no_merito" })
  noMerito: number;

  @Column("varchar", { name: "tipo_merito", nullable: true, length: 250 })
  tipoMerito: string | null;

  @Column("varchar", {
    name: "entidad_que_otorga",
    nullable: true,
    length: 500
  })
  entidadQueOtorga: string | null;

  @Column("varchar", { name: "motivo_entrega", nullable: true, length: 5000 })
  motivoEntrega: string | null;

  @Column("int", { name: "codigo_pais", nullable: true })
  codigoPais: number | null;

  @Column("int", { name: "anio", nullable: true })
  anio: number | null;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeMeritos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;
}
