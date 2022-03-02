import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdcDocumento } from "./GdcDocumento";
import { GtuEstado } from "./GtuEstado";
import { GtuUsuario } from "./GtuUsuario";
import { GdcSalidaNoConforme } from "./GdcSalidaNoConforme";

@Index("gdcprocesoidusuario_idx", ["idUsuario"], {})
@Index("gdc_procesoid_idx", ["padre"], {})
@Index("gdc_procesoidestado_idx", ["idEstado"], {})
@Entity("gdc_proceso", { schema: "sincyt" })
export class GdcProceso {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "padre", nullable: true })
  padre: number | null;

  @Column("varchar", { name: "nombre", length: 250 })
  nombre: string;

  @Column("varchar", { name: "iniciales", nullable: true, length: 45 })
  iniciales: string | null;

  @Column("int", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => GdcDocumento,
    gdcDocumento => gdcDocumento.idProceso2
  )
  gdcDocumentos: GdcDocumento[];

  @ManyToOne(
    () => GdcProceso,
    gdcProceso => gdcProceso.gdcProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "padre", referencedColumnName: "id" }])
  padre2: GdcProceso;

  @OneToMany(
    () => GdcProceso,
    gdcProceso => gdcProceso.padre2
  )
  gdcProcesos: GdcProceso[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gdcProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gdcProcesos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @OneToMany(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.idProceso2
  )
  gdcSalidaNoConformes: GdcSalidaNoConforme[];
}
