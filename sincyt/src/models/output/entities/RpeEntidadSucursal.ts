import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RpeEntidad } from "./RpeEntidad";

@Index("fk_rpe_entidad_sucursal_no_entidad", ["noEntidad"], {})
@Entity("rpe_entidad_sucursal", { schema: "sincyt" })
export class RpeEntidadSucursal {
  @Column("int", { primary: true, name: "no_sucursal" })
  noSucursal: number;

  @Column("varchar", { name: "nombre_lugar", nullable: true, length: 500 })
  nombreLugar: string | null;

  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @ManyToOne(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.rpeEntidadSucursals,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: RpeEntidad;
}
