import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeAreaCientifTecno } from "./RpeAreaCientifTecno";
import { RpePersona } from "./RpePersona";

@Index(
  "fk_RPE_PERSONA_has_RPE_AREA_CIENTIF_TECNO_RPE_AREA_CIENTIF_TE1",
  ["noArea", "noTipoArea"],
  {}
)
@Index(
  "fk_RPE_PERSONA_has_RPE_AREA_CIENTIF_TECNO_RPE_AREA_CIENTIF__idx",
  ["noRegistroPersona", "noArea", "noTipoArea"],
  {}
)
@Entity("rpe_persona_area_cientif", { schema: "sincyt" })
export class RpePersonaAreaCientif {
  @PrimaryGeneratedColumn({ type: "int", name: "no_registro_persona_area" })
  noRegistroPersonaArea: number;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @Column("int", { name: "no_area" })
  noArea: number;

  @Column("int", { name: "no_tipo_area" })
  noTipoArea: number;

  @Column("varchar", { name: "otra", nullable: true, length: 1000 })
  otra: string | null;

  @ManyToOne(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.rpePersonaAreaCientifs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "no_area", referencedColumnName: "noArea" },
    { name: "no_tipo_area", referencedColumnName: "noTipoArea" }
  ])
  rpeAreaCientifTecno: RpeAreaCientifTecno;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpePersonaAreaCientifs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;
}
