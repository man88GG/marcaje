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
  @Entity("rrhh_Nivel", { schema: "sincyt" })


  export class RrhhNivel {
    @Column("int", { primary: true, name: "id_nivel" })
    noEstado: number;

    @Column("varchar", { name: "descripcion_nivel", length: 250 })
    nombreEstado: string;

    @OneToMany(
        () => RrhhEvaluacion,
        rrhh_Evaluacion => rrhh_Evaluacion.rrhhNivel
      )
      rrhhEvaluacion: RrhhEvaluacion[];


  }