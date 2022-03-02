import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeDimensionalTiempo } from "./RpeDimensionalTiempo";
import { RpePersona } from "./RpePersona";
import { RpeTipoInvestigador } from "./RpeTipoInvestigador";
import { GrlMunicipio } from "./GrlMunicipio";
import { RpeInvestigador } from "./RpeInvestigador";
import { RpePublicaciones } from "./RpePublicaciones";

@Index("codigo_municipio", ["codigoMunicipio", "codigoDepartamento"], {})
@Index("fk_RPE_INVESTIGACION_RPE_PERSONA1_idx", ["noRegistroPersona"], {})
@Index(
  "fk_RPE_INVESTIGACION_RPE_DIMENSIONAL_TIEMPO1_idx",
  ["noDimensional"],
  {}
)
@Index(
  "fk_RPE_INVESTIGACION_RPE_TIPO_INVESTIGADOR1_idx",
  ["noTipoInvestigador"],
  {}
)
@Entity("rpe_investigacion", { schema: "sincyt" })
export class RpeInvestigacion {
  @PrimaryGeneratedColumn({ type: "int", name: "no_investigacion" })
  noInvestigacion: number;

  @Column("varchar", {
    name: "titulo_investigacion",
    nullable: true,
    length: 1000
  })
  tituloInvestigacion: string | null;

  @Column("varchar", { name: "financiado_por", nullable: true, length: 250 })
  financiadoPor: string | null;

  @Column("int", { name: "codigo_pais" })
  codigoPais: number;

  @Column("int", { name: "codigo_municipio", nullable: true })
  codigoMunicipio: number | null;

  @Column("int", { name: "codigo_departamento", nullable: true })
  codigoDepartamento: number | null;

  @Column("int", { name: "duracion_proyecto" })
  duracionProyecto: number;

  @Column("varchar", {
    name: "entidades_participantes",
    nullable: true,
    length: 5000
  })
  entidadesParticipantes: string | null;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @Column("int", { name: "no_dimensional" })
  noDimensional: number;

  @Column("int", { name: "no_tipo_investigador" })
  noTipoInvestigador: number;

  @Column("varchar", { name: "estado", nullable: true, length: 500 })
  estado: string | null;

  @Column("varchar", { name: "ciudad", nullable: true, length: 500 })
  ciudad: string | null;

  @ManyToOne(
    () => RpeDimensionalTiempo,
    rpeDimensionalTiempo => rpeDimensionalTiempo.rpeInvestigacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_dimensional", referencedColumnName: "noDimensional" }
  ])
  noDimensional2: RpeDimensionalTiempo;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeInvestigacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;

  @ManyToOne(
    () => RpeTipoInvestigador,
    rpeTipoInvestigador => rpeTipoInvestigador.rpeInvestigacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_investigador", referencedColumnName: "noTipoInvestigador" }
  ])
  noTipoInvestigador2: RpeTipoInvestigador;

  @ManyToOne(
    () => GrlMunicipio,
    grlMunicipio => grlMunicipio.rpeInvestigacions,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "codigo_municipio", referencedColumnName: "id" },
    { name: "codigo_departamento", referencedColumnName: "idDepto" }
  ])
  grlMunicipio: GrlMunicipio;

  @OneToMany(
    () => RpeInvestigador,
    rpeInvestigador => rpeInvestigador.noInvestigacion2
  )
  rpeInvestigadors: RpeInvestigador[];

  @OneToMany(
    () => RpePublicaciones,
    rpePublicaciones => rpePublicaciones.noInvestigacion2
  )
  rpePublicaciones: RpePublicaciones[];
}
