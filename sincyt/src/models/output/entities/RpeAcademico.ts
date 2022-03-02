import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpePersona } from "./RpePersona";
import { RpeTipoAcademico } from "./RpeTipoAcademico";
import { GrlPais } from "./GrlPais";

@Index("codigo_pais", ["codigoPais"], {})
@Index("fk_RPE_ACADEMICO_RPE_TIPO_ACADEMICO1_idx", ["noTipoAcademico"], {})
@Index("fk_RPE_ACADEMICO_RPE_PERSONA1_idx", ["noRegistroPersona"], {})
@Entity("rpe_academico", { schema: "sincyt" })
export class RpeAcademico {
  @PrimaryGeneratedColumn({ type: "int", name: "no_academico" })
  noAcademico: number;

  @Column("varchar", { name: "carrera_titulo", length: 3000 })
  carreraTitulo: string;

  @Column("varchar", { name: "establecimiento_universidad", length: 1000 })
  establecimientoUniversidad: string;

  @Column("varchar", {
    name: "unidad_acad_facultad",
    nullable: true,
    length: 2000
  })
  unidadAcadFacultad: string | null;

  @Column("int", { name: "anio_graduacion", nullable: true })
  anioGraduacion: number | null;

  @Column("int", { name: "semestre_anio_cursa", nullable: true })
  semestreAnioCursa: number | null;

  @Column("int", { name: "tiene_pensum_cerrado", nullable: true })
  tienePensumCerrado: number | null;

  @Column("int", { name: "es_estudiante", nullable: true })
  esEstudiante: number | null;

  @Column("int", { name: "no_colegiado", nullable: true })
  noColegiado: number | null;

  @Column("int", { name: "codigo_pais", nullable: true })
  codigoPais: number | null;

  @Column("int", { name: "no_tipo_academico" })
  noTipoAcademico: number;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpeAcademicos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;

  @ManyToOne(
    () => RpeTipoAcademico,
    rpeTipoAcademico => rpeTipoAcademico.rpeAcademicos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_academico", referencedColumnName: "noTipoAcademico" }
  ])
  noTipoAcademico2: RpeTipoAcademico;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpeAcademicos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "codigo_pais", referencedColumnName: "id" }])
  codigoPais2: GrlPais;
}
