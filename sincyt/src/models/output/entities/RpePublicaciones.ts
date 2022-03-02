import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeInvestigacion } from "./RpeInvestigacion";

@Index("fk_RPE_PUBLICACIONES_RPE_INVESTIGACION1_idx", ["noInvestigacion"], {})
@Entity("rpe_publicaciones", { schema: "sincyt" })
export class RpePublicaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "no_publicacion" })
  noPublicacion: number;

  @Column("varchar", {
    name: "articulo_cientifico",
    nullable: true,
    length: 5000
  })
  articuloCientifico: string | null;

  @Column("varchar", { name: "libro", nullable: true, length: 500 })
  libro: string | null;

  @Column("int", { name: "anio_publicacion_libro", nullable: true })
  anioPublicacionLibro: number | null;

  @Column("varchar", { name: "revista", nullable: true, length: 500 })
  revista: string | null;

  @Column("int", { name: "anio_publicacion_revista", nullable: true })
  anioPublicacionRevista: number | null;

  @Column("int", { name: "numero_pagina", nullable: true })
  numeroPagina: number | null;

  @Column("varchar", {
    name: "lugar_investigacion",
    nullable: true,
    length: 250
  })
  lugarInvestigacion: string | null;

  @Column("int", { name: "no_investigacion", nullable: true })
  noInvestigacion: number | null;

  @Column("varchar", { name: "link", nullable: true, length: 500 })
  link: string | null;

  @ManyToOne(
    () => RpeInvestigacion,
    rpeInvestigacion => rpeInvestigacion.rpePublicaciones,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_investigacion", referencedColumnName: "noInvestigacion" }
  ])
  noInvestigacion2: RpeInvestigacion;
}
