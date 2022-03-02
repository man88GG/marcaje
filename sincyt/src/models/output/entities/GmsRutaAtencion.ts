import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsRuta } from "./GmsRuta";
import { GtuUsuario } from "./GtuUsuario";
import { GtuEstado } from "./GtuEstado";

@Index("id_padre", ["idPadre"], {})
@Index("gms_ruta_atencion_ibfk_4", ["idEstado"], {})
@Index("gms_ruta_atencion_ibfk_2", ["idRuta"], {})
@Index("gms_ruta_atencion_ibfk_3", ["idUsuario"], {})
@Entity("gms_ruta_atencion", { schema: "sincyt" })
export class GmsRutaAtencion {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_padre", nullable: true })
  idPadre: number | null;

  @Column("int", { name: "prioridad", nullable: true })
  prioridad: number | null;

  @Column("int", { name: "id_ruta" })
  idRuta: number;

  @Column("int", { name: "id_usuario", nullable: true, default: () => "'1'" })
  idUsuario: number | null;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @ManyToOne(
    () => GmsRutaAtencion,
    gmsRutaAtencion => gmsRutaAtencion.gmsRutaAtencions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_padre", referencedColumnName: "id" }])
  idPadre2: GmsRutaAtencion;

  @OneToMany(
    () => GmsRutaAtencion,
    gmsRutaAtencion => gmsRutaAtencion.idPadre2
  )
  gmsRutaAtencions: GmsRutaAtencion[];

  @ManyToOne(
    () => GmsRuta,
    gmsRuta => gmsRuta.gmsRutaAtencions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_ruta", referencedColumnName: "id" }])
  idRuta2: GmsRuta;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gmsRutaAtencions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gmsRutaAtencions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;
}
