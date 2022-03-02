import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RpeAcademico } from "./RpeAcademico";

@Entity("rpe_tipo_academico", { schema: "sincyt" })
export class RpeTipoAcademico {
  @PrimaryGeneratedColumn({ type: "int", name: "no_tipo_academico" })
  noTipoAcademico: number;

  @Column("varchar", {
    name: "nombre_tipo_academico",
    nullable: true,
    length: 500
  })
  nombreTipoAcademico: string | null;

  @OneToMany(
    () => RpeAcademico,
    rpeAcademico => rpeAcademico.noTipoAcademico2
  )
  rpeAcademicos: RpeAcademico[];
}
