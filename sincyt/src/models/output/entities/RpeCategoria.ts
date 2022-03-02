import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { RpeTipoCategoria } from "./RpeTipoCategoria";
import { RpePersonaCategoria } from "./RpePersonaCategoria";

@Index("fk_RPE_CATEGORIA_RPE_TIPO_CATEGORIA1_idx", ["noTipoCategoria"], {})
@Index(
  "fk_RPE_CATEGORIA_RPE_CATEGORIA1_idx",
  ["padreNoCategoria", "padreNoTipoCategoria"],
  {}
)
@Entity("rpe_categoria", { schema: "sincyt" })
export class RpeCategoria {
  @Column("int", { primary: true, name: "no_categoria" })
  noCategoria: number;

  @Column("int", { primary: true, name: "no_tipo_categoria" })
  noTipoCategoria: number;

  @Column("varchar", { name: "nombre_categoria", length: 500 })
  nombreCategoria: string;

  @Column("date", { name: "fecha_ingreso_actualizacion_sicti", nullable: true })
  fechaIngresoActualizacionSicti: string | null;

  @Column("int", { name: "padre_no_categoria", nullable: true })
  padreNoCategoria: number | null;

  @Column("int", { name: "padre_no_tipo_categoria", nullable: true })
  padreNoTipoCategoria: number | null;

  @Column("varchar", { name: "descripcion", nullable: true, length: 2000 })
  descripcion: string | null;

  @ManyToOne(
    () => RpeCategoria,
    rpeCategoria => rpeCategoria.rpeCategoria,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "padre_no_categoria", referencedColumnName: "noCategoria" },
    { name: "padre_no_tipo_categoria", referencedColumnName: "noTipoCategoria" }
  ])
  rpeCategoria: RpeCategoria;

  @OneToMany(
    () => RpeCategoria,
    rpeCategoria => rpeCategoria.rpeCategorias
  )
  rpeCategorias: RpeCategoria[];

  @ManyToOne(
    () => RpeTipoCategoria,
    rpeTipoCategoria => rpeTipoCategoria.rpeCategorias,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_categoria", referencedColumnName: "noTipoCategoria" }
  ])
  noTipoCategoria2: RpeTipoCategoria;

  @OneToMany(
    () => RpePersonaCategoria,
    rpePersonaCategoria => rpePersonaCategoria.rpeCategoria
  )
  rpePersonaCategorias: RpePersonaCategoria[];
}
