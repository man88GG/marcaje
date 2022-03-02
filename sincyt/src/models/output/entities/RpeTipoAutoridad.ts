import { Column, Entity, OneToMany } from "typeorm";
import { RpeAutoridad } from "./RpeAutoridad";
import { RpeSolicitudEntidad } from "./RpeSolicitudEntidad";

@Entity("rpe_tipo_autoridad", { schema: "sincyt" })
export class RpeTipoAutoridad {
  @Column("int", { primary: true, name: "no_tipo_autoridad" })
  noTipoAutoridad: number;

  @Column("varchar", { name: "nombre_tipo", nullable: true, length: 45 })
  nombreTipo: string | null;

  @OneToMany(
    () => RpeAutoridad,
    rpeAutoridad => rpeAutoridad.noTipoAutoridad2
  )
  rpeAutoridads: RpeAutoridad[];

  @OneToMany(
    () => RpeSolicitudEntidad,
    rpeSolicitudEntidad => rpeSolicitudEntidad.noTipoAutoridad2
  )
  rpeSolicitudEntidads: RpeSolicitudEntidad[];
}
