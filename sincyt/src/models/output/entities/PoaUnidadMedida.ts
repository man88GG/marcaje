import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { PoaMeta } from "./PoaMeta";
import { PoaGrupoMedida } from "./PoaGrupoMedida";

@Index("fk_poa_unidad_medida_poa_grupo_medida1_idx", ["grupo"], {})
@Entity("poa_unidad_medida", { schema: "sincyt" })
export class PoaUnidadMedida {
  @Column("varchar", { primary: true, name: "codigo", length: 10 })
  codigo: string;

  @Column("varchar", { name: "nombre", length: 45 })
  nombre: string;

  @Column("varchar", { name: "grupo", length: 10 })
  grupo: string;

  @OneToMany(
    () => PoaMeta,
    poaMeta => poaMeta.unidadMedida2
  )
  poaMetas: PoaMeta[];

  @ManyToOne(
    () => PoaGrupoMedida,
    poaGrupoMedida => poaGrupoMedida.poaUnidadMedidas,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "grupo", referencedColumnName: "codigo" }])
  grupo2: PoaGrupoMedida;
}
