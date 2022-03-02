import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeInvestigacion } from "./RpeInvestigacion";
import { RpeTipoInvestigador } from "./RpeTipoInvestigador";

@Index("fk_RPE_INVESTIGADORES_RPE_INVESTIGACION1_idx", ["noInvestigacion"], {})
@Index(
  "fk_RPE_INVESTIGADOR_RPE_TIPO_INVESTIGADOR1_idx",
  ["noTipoInvestigador"],
  {}
)
@Entity("rpe_investigador", { schema: "sincyt" })
export class RpeInvestigador {
  @PrimaryGeneratedColumn({ type: "int", name: "no_investigador" })
  noInvestigador: number;

  @Column("varchar", { name: "nombres", length: 500 })
  nombres: string;

  @Column("varchar", { name: "apellidos", length: 500 })
  apellidos: string;

  @Column("varchar", { name: "participacion", nullable: true, length: 5000 })
  participacion: string | null;

  @Column("int", { name: "no_investigacion" })
  noInvestigacion: number;

  @Column("int", { name: "no_tipo_investigador" })
  noTipoInvestigador: number;

  @ManyToOne(
    () => RpeInvestigacion,
    rpeInvestigacion => rpeInvestigacion.rpeInvestigadors,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_investigacion", referencedColumnName: "noInvestigacion" }
  ])
  noInvestigacion2: RpeInvestigacion;

  @ManyToOne(
    () => RpeTipoInvestigador,
    rpeTipoInvestigador => rpeTipoInvestigador.rpeInvestigadors,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_investigador", referencedColumnName: "noTipoInvestigador" }
  ])
  noTipoInvestigador2: RpeTipoInvestigador;
}
