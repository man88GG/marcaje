import exp = require("constants");
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
  } from "typeorm";
  import { RrhhEvaluacion } from "./RrhhEvaluacion"
  @Entity("rrhh_Tipo_Evaluacion", { schema: "sincyt" })


  export class RrhhTipoEvaluacion {
    @Column("int", { primary: true, name: "id_tipo_evaluacion" })
    idTipoEvaluacion: number;

    @Column("varchar", { name: "descripcion_evaluacion", length: 250 })
    descripcionEvaluacion: string;

    @OneToMany(
        () => RrhhEvaluacion,
        rrhhEvaluacion => rrhhEvaluacion.rrhhTipoEvaluacion
      )
      rrhhEvaluacion: RrhhEvaluacion[];


  }