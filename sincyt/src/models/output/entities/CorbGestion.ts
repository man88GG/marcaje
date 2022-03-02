import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorbEtapa } from "./CorbEtapa";
import { CorbEstadoGestion } from "./CorbEstadoGestion";
import { CorbProceso } from "./CorbProceso";
import { GtuUsuario } from "./GtuUsuario";

@Index("proceso_fk_idx", ["idProceso"], {})
@Index("estado_fk_idx", ["idEstadoGestion"], {})
@Index("usuario_fk_idx", ["idSolicitante"], {})
@Entity("corb_gestion", { schema: "sincyt" })
export class CorbGestion {
  @PrimaryGeneratedColumn({ type: "int", name: "id_gestion" })
  idGestion: number;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @Column("datetime", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("int", { name: "id_estado_gestion" })
  idEstadoGestion: number;

  @Column("int", { name: "id_solicitante" })
  idSolicitante: number;

  @OneToMany(
    () => CorbEtapa,
    corbEtapa => corbEtapa.idGestion2
  )
  corbEtapas: CorbEtapa[];

  @ManyToOne(
    () => CorbEstadoGestion,
    corbEstadoGestion => corbEstadoGestion.corbGestions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_estado_gestion", referencedColumnName: "idEstadoGestion" }
  ])
  idEstadoGestion2: CorbEstadoGestion;

  @ManyToOne(
    () => CorbProceso,
    corbProceso => corbProceso.corbGestions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: CorbProceso;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.corbGestions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_solicitante", referencedColumnName: "id" }])
  idSolicitante2: GtuUsuario;
}
