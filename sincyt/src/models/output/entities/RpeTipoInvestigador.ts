import { Column, Entity, OneToMany } from "typeorm";
import { RpeInvestigacion } from "./RpeInvestigacion";
import { RpeInvestigador } from "./RpeInvestigador";

@Entity("rpe_tipo_investigador", { schema: "sincyt" })
export class RpeTipoInvestigador {
  @Column("int", { primary: true, name: "no_tipo_investigador" })
  noTipoInvestigador: number;

  @Column("varchar", { name: "nombre_tipo", nullable: true, length: 250 })
  nombreTipo: string | null;

  @OneToMany(
    () => RpeInvestigacion,
    rpeInvestigacion => rpeInvestigacion.noTipoInvestigador2
  )
  rpeInvestigacions: RpeInvestigacion[];

  @OneToMany(
    () => RpeInvestigador,
    rpeInvestigador => rpeInvestigador.noTipoInvestigador2
  )
  rpeInvestigadors: RpeInvestigador[];
}
