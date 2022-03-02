import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { SgpConvocatoria } from "./SgpConvocatoria";
import { SgpEstadoConvocatoria } from "./SgpEstadoConvocatoria";
import { SgpLinea } from "./SgpLinea";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";

@Index("fk_linea_convocatoria_linea1_idx", ["idLinea"], {})
@Index("fk_linea_convocatoria_convocatoria1_idx", ["numeroConvocatoria"], {})
@Index(
  "fk_linea_convocatoria_estado_convocatoria1_idx",
  ["idEstadoConvocatoria"],
  {}
)
@Entity("sgp_linea_convocatoria", { schema: "sincyt" })
export class SgpLineaConvocatoria {
  @Column("int", { primary: true, name: "id_linea" })
  idLinea: number;

  @Column("varchar", {
    primary: true,
    name: "numero_convocatoria",
    length: 100
  })
  numeroConvocatoria: string;

  @Column("int", { name: "id_estado_convocatoria" })
  idEstadoConvocatoria: number;

  @ManyToOne(
    () => SgpConvocatoria,
    sgpConvocatoria => sgpConvocatoria.sgpLineaConvocatorias,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "numero_convocatoria", referencedColumnName: "numeroConvocatoria" }
  ])
  numeroConvocatoria2: SgpConvocatoria;

  @ManyToOne(
    () => SgpEstadoConvocatoria,
    sgpEstadoConvocatoria => sgpEstadoConvocatoria.sgpLineaConvocatorias,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "id_estado_convocatoria",
      referencedColumnName: "idEstadoConvocatoria"
    }
  ])
  idEstadoConvocatoria2: SgpEstadoConvocatoria;

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.sgpLineaConvocatorias,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_linea", referencedColumnName: "idLinea" }])
  idLinea2: SgpLinea;

  @OneToMany(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.sgpLineaConvocatoria
  )
  sgpPerfilProyectos: SgpPerfilProyecto[];
}
