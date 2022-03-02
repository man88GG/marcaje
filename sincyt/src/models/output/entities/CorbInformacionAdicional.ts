import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbProceso } from "./CorbProceso";
import { CorbTipoInformacion } from "./CorbTipoInformacion";

@Index("proceso_tipo_fk_idx", ["idProceso"], {})
@Index("tipo_informacion_fk_idx", ["idTipoInformacion"], {})
@Entity("corb_informacion_adicional", { schema: "sincyt" })
export class CorbInformacionAdicional {
  @PrimaryGeneratedColumn({ type: "int", name: "id_informacion_adicional" })
  idInformacionAdicional: number;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @Column("int", { name: "id_tipo_informacion" })
  idTipoInformacion: number;

  @Column("varchar", { name: "clave", length: 100 })
  clave: string;

  @Column("varchar", { name: "valor", nullable: true, length: 100 })
  valor: string | null;

  @ManyToOne(
    () => CorbProceso,
    corbProceso => corbProceso.corbInformacionAdicionals,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: CorbProceso;

  @ManyToOne(
    () => CorbTipoInformacion,
    corbTipoInformacion => corbTipoInformacion.corbInformacionAdicionals,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_tipo_informacion", referencedColumnName: "idTipoInformacion" }
  ])
  idTipoInformacion2: CorbTipoInformacion;
}
