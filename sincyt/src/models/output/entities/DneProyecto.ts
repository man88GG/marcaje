import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneDocumentoProyecto } from "./DneDocumentoProyecto";
import { DneEntidad } from "./DneEntidad";
import { DneProyectoAreaCientif } from "./DneProyectoAreaCientif";
import { DneProyectoEstado } from "./DneProyectoEstado";

@Index("fk_rpe_proyecto_rpe_entidad1_idx", ["noEntidad"], {})
@Entity("dne_proyecto", { schema: "sincyt" })
export class DneProyecto {
  @PrimaryGeneratedColumn({ type: "int", name: "no_proyecto" })
  noProyecto: number;

  @Column("varchar", { name: "nombre", length: 400 })
  nombre: string;

  @Column("varchar", { name: "monto_solicitado", length: 200 })
  montoSolicitado: string;

  @Column("varchar", { name: "monto_aprobado", length: 200 })
  montoAprobado: string;

  @Column("varchar", { name: "monto_ejecutado", length: 200 })
  montoEjecutado: string;

  @Column("varchar", {
    name: "entidades_participantes_proyecto",
    nullable: true,
    length: 1000
  })
  entidadesParticipantesProyecto: string | null;

  @Column("int", { name: "no_entidad" })
  noEntidad: number;

  @Column("int", { name: "duracion del proyecto" })
  duracionDelProyecto: number;

  @Column("varchar", {
    name: "entidades_participantes",
    nullable: true,
    length: 250
  })
  entidadesParticipantes: string | null;

  @Column("varchar", {
    name: "publicaciones_derivadas",
    nullable: true,
    length: 250
  })
  publicacionesDerivadas: string | null;

  @Column("varchar", {
    name: "resultados_proyecto",
    nullable: true,
    length: 250
  })
  resultadosProyecto: string | null;

  @Column("varchar", {
    name: "articulo_cientifico",
    nullable: true,
    length: 250
  })
  articuloCientifico: string | null;

  @Column("varchar", { name: "libro_isbn", nullable: true, length: 100 })
  libroIsbn: string | null;

  @Column("int", { name: "libro_anio_publicacion", nullable: true })
  libroAnioPublicacion: number | null;

  @Column("varchar", { name: "revista_issn", nullable: true, length: 100 })
  revistaIssn: string | null;

  @Column("int", { name: "revista_anio_publicacion", nullable: true })
  revistaAnioPublicacion: number | null;

  @Column("varchar", {
    name: "revista_numero_pagina",
    nullable: true,
    length: 100
  })
  revistaNumeroPagina: string | null;

  @Column("varchar", { name: "lugar_desarrollo", length: 250 })
  lugarDesarrollo: string;

  @OneToMany(
    () => DneDocumentoProyecto,
    dneDocumentoProyecto => dneDocumentoProyecto.dneProyectoNoProyecto2
  )
  dneDocumentoProyectos: DneDocumentoProyecto[];

  @ManyToOne(
    () => DneEntidad,
    dneEntidad => dneEntidad.dneProyectos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_entidad", referencedColumnName: "noEntidad" }])
  noEntidad2: DneEntidad;

  @OneToMany(
    () => DneProyectoAreaCientif,
    dneProyectoAreaCientif => dneProyectoAreaCientif.dneProyectoNoProyecto2
  )
  dneProyectoAreaCientifs: DneProyectoAreaCientif[];

  @OneToMany(
    () => DneProyectoEstado,
    dneProyectoEstado => dneProyectoEstado.noProyecto2
  )
  dneProyectoEstados: DneProyectoEstado[];
}
