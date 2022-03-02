import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeTipoAutoridad } from "./RpeTipoAutoridad";
import { RpeEntidad } from "./RpeEntidad";

@Index("fk_RPE_AUTORIDAD_RPE_TIPO_AUTORIDAD1_idx", ["noTipoAutoridad"], {})
@Index("fk_rpe_autoridad_no_entidad", ["noEntidad"], {})
@Entity("rpe_autoridad", { schema: "sincyt" })
export class RpeAutoridad {
  @PrimaryGeneratedColumn({ type: "int", name: "no_autoridad" })
  noAutoridad: number;

  @Column("int", { name: "no_tipo_autoridad" })
  noTipoAutoridad: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 500 })
  nombre: string | null;

  @Column("varchar", { name: "cargo", nullable: true, length: 500 })
  cargo: string | null;

  @Column("varchar", {
    name: "correo_electronico",
    nullable: true,
    length: 500
  })
  correoElectronico: string | null;

  @Column("varchar", { name: "dpi", nullable: true, length: 250 })
  dpi: string | null;

  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @ManyToOne(
    () => RpeTipoAutoridad,
    rpeTipoAutoridad => rpeTipoAutoridad.rpeAutoridads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_autoridad", referencedColumnName: "noTipoAutoridad" }
  ])
  noTipoAutoridad2: RpeTipoAutoridad;

  @ManyToOne(
    () => RpeEntidad,
    rpeEntidad => rpeEntidad.rpeAutoridads,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: RpeEntidad;
}
