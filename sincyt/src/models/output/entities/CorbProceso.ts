import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbCaracterizacion } from "./CorbCaracterizacion";
import { CorbGestion } from "./CorbGestion";
import { CorbIndicador } from "./CorbIndicador";
import { CorbInformacionAdicional } from "./CorbInformacionAdicional";
import { GtuPerfil } from "./GtuPerfil";
import { CorbEstadoProceso } from "./CorbEstadoProceso";
import { CorbTipoProceso } from "./CorbTipoProceso";
import { CorbResponsable } from "./CorbResponsable";
import { CorbTarea } from "./CorbTarea";

@Index("estado_idx", ["idEstado"], {})
@Index("padre_idx", ["idProcesoPadre"], {})
@Index("tipo_proceso_fk_idx", ["idTipoProceso"], {})
@Entity("corb_proceso", { schema: "sincyt" })
export class CorbProceso {
  @PrimaryGeneratedColumn({ type: "int", name: "id_proceso" })
  idProceso: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @Column("varchar", { name: "version", length: 25 })
  version: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @Column("int", { name: "id_proceso_padre", nullable: true })
  idProcesoPadre: number | null;

  @Column("int", { name: "id_tipo_proceso" })
  idTipoProceso: number;

  @OneToMany(
    () => CorbCaracterizacion,
    corbCaracterizacion => corbCaracterizacion.idProceso2
  )
  corbCaracterizacions: CorbCaracterizacion[];

  @OneToMany(
    () => CorbGestion,
    corbGestion => corbGestion.idProceso2
  )
  corbGestions: CorbGestion[];

  @OneToOne(
    () => CorbIndicador,
    corbIndicador => corbIndicador.idProceso2
  )
  corbIndicador: CorbIndicador;

  @OneToMany(
    () => CorbInformacionAdicional,
    corbInformacionAdicional => corbInformacionAdicional.idProceso2
  )
  corbInformacionAdicionals: CorbInformacionAdicional[];

  @ManyToMany(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.corbProcesos
  )
  gtuPerfils: GtuPerfil[];

  @ManyToOne(
    () => CorbEstadoProceso,
    corbEstadoProceso => corbEstadoProceso.corbProcesos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "idEstado" }])
  idEstado2: CorbEstadoProceso;

  @ManyToOne(
    () => CorbProceso,
    corbProceso => corbProceso.corbProcesos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_proceso_padre", referencedColumnName: "idProceso" }])
  idProcesoPadre2: CorbProceso;

  @OneToMany(
    () => CorbProceso,
    corbProceso => corbProceso.idProcesoPadre2
  )
  corbProcesos: CorbProceso[];

  @ManyToOne(
    () => CorbTipoProceso,
    corbTipoProceso => corbTipoProceso.corbProcesos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_tipo_proceso", referencedColumnName: "idTipoProceso" }
  ])
  idTipoProceso2: CorbTipoProceso;

  @OneToMany(
    () => CorbResponsable,
    corbResponsable => corbResponsable.idProceso2
  )
  corbResponsables: CorbResponsable[];

  @OneToMany(
    () => CorbTarea,
    corbTarea => corbTarea.idProceso2
  )
  corbTareas: CorbTarea[];
}
