import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuDepartamento } from "./GtuDepartamento";
import { PoaPoa } from "./PoaPoa";
import { PoaActividadRenglon } from "./PoaActividadRenglon";
import { PoaAlineacion } from "./PoaAlineacion";
import { PoaIndicador } from "./PoaIndicador";
import { PoaMedioVerificacion } from "./PoaMedioVerificacion";
import { PoaMeta } from "./PoaMeta";
import { PoaTemporalidad } from "./PoaTemporalidad";

@Index("fk_POA_ACTIVIDAD_ORGANIZACION1_idx", ["responsable"], {})
@Index("fk_POA_ACTIVIDAD_POA_DETALLE_POA1_idx", ["poa"], {})
@Entity("poa_actividad", { schema: "sincyt" })
export class PoaActividad {
  @PrimaryGeneratedColumn({ type: "int", name: "actividad" })
  actividad: number;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("int", { name: "responsable" })
  responsable: number;

  @Column("int", { name: "poa" })
  poa: number;

  @Column("decimal", {
    name: "costo_unitario",
    nullable: true,
    precision: 10,
    scale: 0
  })
  costoUnitario: string | null;

  @Column("tinyint", {
    name: "multianual",
    nullable: true,
    default: () => "'0'"
  })
  multianual: number | null;

  @Column("int", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @Column("tinyint", { name: "estado", nullable: true, default: () => "'1'" })
  estado: number | null;

  @Column("int", { name: "tipo_actividad" })
  tipoActividad: number;

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.poaActividads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "responsable", referencedColumnName: "id" }])
  responsable2: GtuDepartamento;

  @ManyToOne(
    () => PoaPoa,
    poaPoa => poaPoa.poaActividads,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "poa", referencedColumnName: "poa" }])
  poa2: PoaPoa;

  @OneToMany(
    () => PoaActividadRenglon,
    poaActividadRenglon => poaActividadRenglon.actividad2
  )
  poaActividadRenglons: PoaActividadRenglon[];

  @ManyToMany(
    () => PoaAlineacion,
    poaAlineacion => poaAlineacion.poaActividads
  )
  @JoinTable({
    name: "poa_alineacion_actividad",
    joinColumns: [{ name: "actividad", referencedColumnName: "actividad" }],
    inverseJoinColumns: [
      { name: "alineacion", referencedColumnName: "alineacion" }
    ],
    schema: "sincyt"
  })
  poaAlineacions: PoaAlineacion[];

  @ManyToMany(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.poaActividads2
  )
  gtuDepartamentos: GtuDepartamento[];

  @OneToMany(
    () => PoaIndicador,
    poaIndicador => poaIndicador.actividad2
  )
  poaIndicadors: PoaIndicador[];

  @OneToMany(
    () => PoaMedioVerificacion,
    poaMedioVerificacion => poaMedioVerificacion.actividad2
  )
  poaMedioVerificacions: PoaMedioVerificacion[];

  @OneToOne(
    () => PoaMeta,
    poaMeta => poaMeta.actividad2
  )
  poaMeta: PoaMeta;

  @OneToMany(
    () => PoaTemporalidad,
    poaTemporalidad => poaTemporalidad.actividad2
  )
  poaTemporalidads: PoaTemporalidad[];
}
