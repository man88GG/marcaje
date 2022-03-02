import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
  } from "typeorm";

  import { RrhhNivel } from "./RrhhNivel";
  import { RrhhTipoEvaluacion } from "./RrhhTipoEvaluacion";
 /*  import { RrhhEvaluador } from "./RrhhEvaluador";
  import { RrhhEvaluacionPersona } from "./RrhhEvaluacionPersona";
  import { RrhhProcesoEvaluacion } from "./RrhhProcesoEvaluacion"; */


  @Index(
    "fk_RRHH_EVALUACION_RRHH_NIVEL_idx",
    ["id_nivel"],
    {}
  )
  @Index(
    "fk_RRHH_EVALUACION_RRHH_TIPO_EVALUACION_idx",
    ["id_tipo_evaluacion"],
    {}
  )

  /* @Index(
    "fk_RRHH_EVALUACION_GTU_USUARIO_RRHH_idx",
    ["id_usuario_crea"],
    {}
  )*/

@Entity("rrhh_Evaluacion", { schema: "sincyt" })

export class RrhhEvaluacion {

  @PrimaryGeneratedColumn({ type: "int", name: "id_evaluacion" })
  idEvaluacion: number;

  @Column("datetime", { name: "fecha_inicio", nullable: false })
  fechaInicio: Date | null;


  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("int", { name: "estado_evaluacion"})
  estadoEvaluacion: number;

  /* @OneToMany(
    () => RrhhEvaluador,
    rrhh_Evaluador => rrhh_Evaluador.rrhhEvaluacion
  )
  rrhhEvaluador: RrhhEvaluador[];

  @OneToMany(
    () => RrhhEvaluacionPersona,
    rrhhEvaluacionPersona => rrhhEvaluacionPersona.rrhhEvaluacion
  )
  rrhhEvaluacionPersona: RrhhEvaluacionPersona[];

  @OneToMany(
      ()=> RrhhProcesoEvaluacion,
      rrhhProcesoEvaluacion => rrhhProcesoEvaluacion.rrhhEvaluacion
  )
  rrhhProcesoEvluacion: RrhhProcesoEvaluacion[]; */

  @ManyToOne(
    () => RrhhNivel,
    rrhhNivel=> rrhhNivel.rrhhEvaluacion,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_nivel", referencedColumnName: "idNivel" },
  ])
  rrhhNivel : RrhhNivel;

  @ManyToOne(
     ()=> RrhhTipoEvaluacion,
     rrhhTipoEvaluacion => rrhhTipoEvaluacion.rrhhEvaluacion,
     { onDelete: "RESTRICT", onUpdate: "RESTRICT"}
  )

  @JoinColumn([
    { name: "id_tipo_evaluacion" , referencedColumnName: "idTipoEvaluacion"}
  ])
  rrhhTipoEvaluacion: RrhhTipoEvaluacion;
}