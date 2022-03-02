import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RhplEstatus } from "./RhplEstatus";
import { SgpLinea } from "./SgpLinea";

@Index("linea_idx", ["idLinea"], {})
@Index("estatus_idx", ["idEstatus", "idEstatusInforme"], {})
@Entity("rhpl_catalogo", { schema: "sincyt" })
export class RhplCatalogo {
  @PrimaryGeneratedColumn({ type: "int", name: "id_proyecto" })
  idProyecto: number;

  @Column("varchar", { name: "fondo", length: 45 })
  fondo: string;

  @Column("int", { name: "id_linea" })
  idLinea: number;

  @Column("int", { name: "año" })
  aO: number;

  @Column("varchar", { name: "convocatoria", nullable: true, length: 255 })
  convocatoria: string | null;

  @Column("int", { name: "año_convocatoria", nullable: true })
  aOConvocatoria: number | null;

  @Column("varchar", {
    name: "codigo_convocatoria",
    nullable: true,
    length: 255
  })
  codigoConvocatoria: string | null;

  @Column("varchar", {
    name: "acuerdo_aprobacion_comision",
    nullable: true,
    length: 255
  })
  acuerdoAprobacionComision: string | null;

  @Column("varchar", {
    name: "acuerdo_aprobacion_consejo",
    nullable: true,
    length: 255
  })
  acuerdoAprobacionConsejo: string | null;

  @Column("varchar", { name: "no_contrato", nullable: true, length: 255 })
  noContrato: string | null;

  @Column("varchar", {
    name: "no_proyecto_ingreso",
    nullable: true,
    length: 255
  })
  noProyectoIngreso: string | null;

  @Column("longtext", { name: "nombre_proyecto", nullable: true })
  nombreProyecto: string | null;

  @Column("longtext", { name: "resumen", nullable: true })
  resumen: string | null;

  @Column("varchar", {
    name: "nombre_investigador",
    nullable: true,
    length: 255
  })
  nombreInvestigador: string | null;

  @Column("bigint", { name: "no_registro_oficial", nullable: true })
  noRegistroOficial: string | null;

  @Column("longtext", { name: "unidad_ejecutora", nullable: true })
  unidadEjecutora: string | null;

  @Column("varchar", { name: "dne", nullable: true, length: 45 })
  dne: string | null;

  @Column("text", { name: "direccion_registrada", nullable: true })
  direccionRegistrada: string | null;

  @Column("int", { name: "id_estatus", nullable: true })
  idEstatus: number | null;

  @Column("decimal", {
    name: "monto_aprobado",
    nullable: true,
    precision: 10,
    scale: 2
  })
  montoAprobado: string | null;

  @Column("decimal", {
    name: "monto_ejecutado",
    nullable: true,
    precision: 10,
    scale: 2
  })
  montoEjecutado: string | null;

  @Column("decimal", {
    name: "disponibilidad",
    nullable: true,
    precision: 10,
    scale: 2
  })
  disponibilidad: string | null;

  @Column("varchar", {
    name: "id_estatus_informe",
    nullable: true,
    length: 255
  })
  idEstatusInforme: string | null;

  @Column("date", { name: "fecha_inicio", nullable: true })
  fechaInicio: string | null;

  @Column("date", { name: "fecha_final_financiero", nullable: true })
  fechaFinalFinanciero: string | null;

  @ManyToOne(
    () => RhplEstatus,
    rhplEstatus => rhplEstatus.rhplCatalogos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus", referencedColumnName: "idEstatus" }])
  idEstatus2: RhplEstatus;

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.rhplCatalogos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_linea", referencedColumnName: "idLinea" }])
  idLinea2: SgpLinea;
}
