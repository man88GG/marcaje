import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { DneEntidadAreaCientif } from "./DneEntidadAreaCientif";
import { DneProyectoAreaCientif } from "./DneProyectoAreaCientif";
import { RpeTipoAreaCientifTecno } from "./RpeTipoAreaCientifTecno";
import { RpeEntidadAreaCientif } from "./RpeEntidadAreaCientif";
import { RpePersona } from "./RpePersona";
import { RpePersonaAreaCientif } from "./RpePersonaAreaCientif";

@Index(
  "fk_RPE_AREA_CIENTIFICA_TECNOLOGICA_RPE_TIPO_AREA_CIENTIFICO_idx",
  ["noTipoArea"],
  {}
)
@Index(
  "fk_RPE_AREA_CIENTIF_TECNO_RPE_AREA_CIENTIF_TECNO1_idx",
  ["padreNoArea", "padreNoTipoArea"],
  {}
)
@Entity("rpe_area_cientif_tecno", { schema: "sincyt" })
export class RpeAreaCientifTecno {
  @Column("int", { primary: true, name: "no_area" })
  noArea: number;

  @Column("int", { primary: true, name: "no_tipo_area" })
  noTipoArea: number;

  @Column("varchar", { name: "nombre_area", length: 500 })
  nombreArea: string;

  @Column("int", { name: "padre_no_area", nullable: true })
  padreNoArea: number | null;

  @Column("int", { name: "padre_no_tipo_area", nullable: true })
  padreNoTipoArea: number | null;

  @OneToMany(
    () => DneEntidadAreaCientif,
    dneEntidadAreaCientif => dneEntidadAreaCientif.rpeAreaCientifTecno
  )
  dneEntidadAreaCientifs: DneEntidadAreaCientif[];

  @OneToMany(
    () => DneProyectoAreaCientif,
    dneProyectoAreaCientif => dneProyectoAreaCientif.rpeAreaCientifTecno
  )
  dneProyectoAreaCientifs: DneProyectoAreaCientif[];

  @ManyToOne(
    () => RpeTipoAreaCientifTecno,
    rpeTipoAreaCientifTecno => rpeTipoAreaCientifTecno.rpeAreaCientifTecnos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_tipo_area", referencedColumnName: "noTipoArea" }])
  noTipoArea2: RpeTipoAreaCientifTecno;

  @ManyToOne(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.rpeAreaCientifTecno,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "padre_no_area", referencedColumnName: "noArea" },
    { name: "padre_no_tipo_area", referencedColumnName: "noTipoArea" }
  ])
  rpeAreaCientifTecno: RpeAreaCientifTecno;

  @OneToMany(
    () => RpeAreaCientifTecno,
    rpeAreaCientifTecno => rpeAreaCientifTecno.rpeAreaCientifTecnos
  )
  rpeAreaCientifTecnos: RpeAreaCientifTecno[];

  @OneToMany(
    () => RpeEntidadAreaCientif,
    rpeEntidadAreaCientif => rpeEntidadAreaCientif.rpeAreaCientifTecno
  )
  rpeEntidadAreaCientifs: RpeEntidadAreaCientif[];

  @OneToMany(
    () => RpePersona,
    rpePersona => rpePersona.rpeAreaCientifTecno
  )
  rpePersonas: RpePersona[];

  @OneToMany(
    () => RpePersonaAreaCientif,
    rpePersonaAreaCientif => rpePersonaAreaCientif.rpeAreaCientifTecno
  )
  rpePersonaAreaCientifs: RpePersonaAreaCientif[];
}
