import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComAgenda } from "./ComAgenda";
import { ComAyudaMemoria } from "./ComAyudaMemoria";
import { ComListaAsistencia } from "./ComListaAsistencia";
import { ComComision } from "./ComComision";
import { RpeEstado } from "./RpeEstado";

@Index("fk_com_reunion_com_comision1_idx", ["comision"], {})
@Index("fk_com_reunion_rpe_estado1_idx", ["tipo", "noTipo"], {})
@Entity("com_reunion", { schema: "sincyt" })
export class ComReunion {
  @PrimaryGeneratedColumn({ type: "int", name: "reunion" })
  reunion: number;

  @Column("int", { name: "comision" })
  comision: number;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("text", { name: "lugar", nullable: true })
  lugar: string | null;

  @Column("text", { name: "hora" })
  hora: string;

  @Column("int", { name: "persona_convoca" })
  personaConvoca: number;

  @Column("text", { name: "documento_adjunto", nullable: true })
  documentoAdjunto: string | null;

  @Column("int", { name: "tipo" })
  tipo: number;

  @Column("int", { name: "no_tipo" })
  noTipo: number;

  @Column("int", { name: "estado", default: () => "'0'" })
  estado: number;

  @Column("text", { name: "ayuda_memoria_comision", nullable: true })
  ayudaMemoriaComision: string | null;

  @Column("text", { name: "ayuda_memoria_enlace", nullable: true })
  ayudaMemoriaEnlace: string | null;

  @Column("text", { name: "lista_escaneada", nullable: true })
  listaEscaneada: string | null;

  @Column("text", { name: "documento_adjunto1", nullable: true })
  documentoAdjunto1: string | null;

  @Column("text", { name: "documento_adjunto2", nullable: true })
  documentoAdjunto2: string | null;

  @OneToMany(
    () => ComAgenda,
    comAgenda => comAgenda.reunion2
  )
  comAgenda: ComAgenda[];

  @OneToMany(
    () => ComAyudaMemoria,
    comAyudaMemoria => comAyudaMemoria.reunion2
  )
  comAyudaMemorias: ComAyudaMemoria[];

  @OneToMany(
    () => ComListaAsistencia,
    comListaAsistencia => comListaAsistencia.reunion2
  )
  comListaAsistencias: ComListaAsistencia[];

  @ManyToOne(
    () => ComComision,
    comComision => comComision.comReunions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "comision", referencedColumnName: "comision" }])
  comision2: ComComision;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.comReunions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "tipo", referencedColumnName: "noEstado" },
    { name: "no_tipo", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;
}
