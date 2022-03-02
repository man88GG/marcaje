import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeCategoria } from "./RpeCategoria";
import { RpePersona } from "./RpePersona";

@Index(
  "fk_RPE_PERSONA_has_RPE_CATEGORIA_RPE_CATEGORIA1_idx",
  ["noCategoria", "noTipoCategoria"],
  {}
)
@Index(
  "fk_RPE_PERSONA_has_RPE_CATEGORIA_RPE_PERSONA1_idx",
  ["noRegistroPersona"],
  {}
)
@Entity("rpe_persona_categoria", { schema: "sincyt" })
export class RpePersonaCategoria {
  @PrimaryGeneratedColumn({ type: "int", name: "no_persona_categoria" })
  noPersonaCategoria: number;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @Column("int", { name: "no_categoria" })
  noCategoria: number;

  @Column("int", { name: "no_tipo_categoria" })
  noTipoCategoria: number;

  @Column("date", { name: "fecha_asignacion" })
  fechaAsignacion: string;

  @Column("int", { name: "estado" })
  estado: number;

  @ManyToOne(
    () => RpeCategoria,
    rpeCategoria => rpeCategoria.rpePersonaCategorias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_categoria", referencedColumnName: "noCategoria" },
    { name: "no_tipo_categoria", referencedColumnName: "noTipoCategoria" }
  ])
  rpeCategoria: RpeCategoria;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpePersonaCategorias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;
}
