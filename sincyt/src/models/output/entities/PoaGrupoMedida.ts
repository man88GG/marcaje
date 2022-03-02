import { Column, Entity, OneToMany } from "typeorm";
import { PoaUnidadMedida } from "./PoaUnidadMedida";

@Entity("poa_grupo_medida", { schema: "sincyt" })
export class PoaGrupoMedida {
  @Column("varchar", { primary: true, name: "codigo", length: 10 })
  codigo: string;

  @Column("varchar", { name: "nombre", length: 45 })
  nombre: string;

  @OneToMany(
    () => PoaUnidadMedida,
    poaUnidadMedida => poaUnidadMedida.grupo2
  )
  poaUnidadMedidas: PoaUnidadMedida[];
}
