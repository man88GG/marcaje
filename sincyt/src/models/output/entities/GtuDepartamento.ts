import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsMesaServicio } from "./GmsMesaServicio";
import { GtuDepartamentoPuesto } from "./GtuDepartamentoPuesto";
import { LaipAsignacion } from "./LaipAsignacion";
import { PoaActividad } from "./PoaActividad";
import { PoaResponsablePeriodo } from "./PoaResponsablePeriodo";
import { RrhhPermiso } from "./RrhhPermiso";

@Index("idpadre_idx", ["padre"], {})
@Entity("gtu_departamento", { schema: "sincyt" })
export class GtuDepartamento {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "padre", nullable: true })
  padre: number | null;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => GmsMesaServicio,
    gmsMesaServicio => gmsMesaServicio.idDepartamento2
  )
  gmsMesaServicios: GmsMesaServicio[];

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.gtuDepartamentos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "padre", referencedColumnName: "id" }])
  padre2: GtuDepartamento;

  @OneToMany(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.padre2
  )
  gtuDepartamentos: GtuDepartamento[];

  @OneToMany(
    () => GtuDepartamentoPuesto,
    gtuDepartamentoPuesto => gtuDepartamentoPuesto.idDepartamento2
  )
  gtuDepartamentoPuestos: GtuDepartamentoPuesto[];

  @OneToMany(
    () => LaipAsignacion,
    laipAsignacion => laipAsignacion.idDepartamento2
  )
  laipAsignacions: LaipAsignacion[];

  @OneToMany(
    () => PoaActividad,
    poaActividad => poaActividad.responsable2
  )
  poaActividads: PoaActividad[];

  @ManyToMany(
    () => PoaActividad,
    poaActividad => poaActividad.gtuDepartamentos
  )
  @JoinTable({
    name: "poa_colaborador_actividad",
    joinColumns: [{ name: "colaborador", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "actividad", referencedColumnName: "actividad" }
    ],
    schema: "sincyt"
  })
  poaActividads2: PoaActividad[];

  @OneToMany(
    () => PoaResponsablePeriodo,
    poaResponsablePeriodo => poaResponsablePeriodo.responsable2
  )
  poaResponsablePeriodos: PoaResponsablePeriodo[];

  @OneToMany(
    () => RrhhPermiso,
    rrhhPermiso => rrhhPermiso.idDepartamento2
  )
  rrhhPermisos: RrhhPermiso[];

  @OneToMany(
    () => RrhhPermiso,
    rrhhPermiso => rrhhPermiso.idDepartamentoJefe2
  )
  rrhhPermisos2: RrhhPermiso[];
}
