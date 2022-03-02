import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsArchivos } from "./GmsArchivos";
import { GmsBitacora } from "./GmsBitacora";
import { GmsCategoria } from "./GmsCategoria";
import { AppProcesoEjecucion } from "./AppProcesoEjecucion";
import { GtuDepartamento } from "./GtuDepartamento";
import { GtuUsuario } from "./GtuUsuario";
import { GmsEstatus } from "./GmsEstatus";

@Index("gms_mesa_servicio_ibfk_3_idx", ["codProceso"], {})
@Index("gms_mesa_servicio_ibfk_2_idx", ["idCategoria"], {})
@Index("gms_mesa_servicio_ibfk_1", ["idPrioridad"], {})
@Index("gms_mesa_servicio_ibfk_5_idx", ["idDepartamento"], {})
@Index("gms_mesa_servicio_ibfk_6_idx", ["idUsuarioAsignado"], {})
@Index("gms_mesa_servicio_ibfk_6_idx2", ["idUsuario"], {})
@Index("gms_mesa_servicio_ibfk_8_idx", ["idEstatus"], {})
@Entity("gms_mesa_servicio", { schema: "sincyt" })
export class GmsMesaServicio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "ticket" })
  ticket: number;

  @Column("text", { name: "asunto" })
  asunto: string;

  @Column("int", { name: "id_prioridad", default: () => "'5'" })
  idPrioridad: number;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @Column("int", { name: "id_categoria" })
  idCategoria: number;

  @Column("int", { name: "cod_proceso" })
  codProceso: number;

  @Column("int", { name: "id_usuario" })
  idUsuario: number;

  @Column("int", { name: "id_departamento" })
  idDepartamento: number;

  @Column("int", { name: "id_usuario_asignado" })
  idUsuarioAsignado: number;

  @Column("int", { name: "id_estatus", default: () => "'1'" })
  idEstatus: number;

  @OneToMany(
    () => GmsArchivos,
    gmsArchivos => gmsArchivos.idMesaServicio2
  )
  gmsArchivos: GmsArchivos[];

  @OneToMany(
    () => GmsBitacora,
    gmsBitacora => gmsBitacora.idMesaServicio2
  )
  gmsBitacoras: GmsBitacora[];

  @ManyToOne(
    () => GmsCategoria,
    gmsCategoria => gmsCategoria.gmsMesaServicios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
  idCategoria2: GmsCategoria;

  @ManyToOne(
    () => AppProcesoEjecucion,
    appProcesoEjecucion => appProcesoEjecucion.gmsMesaServicios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cod_proceso", referencedColumnName: "codProceso" }])
  codProceso2: AppProcesoEjecucion;

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.gmsMesaServicios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_departamento", referencedColumnName: "id" }])
  idDepartamento2: GtuDepartamento;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gmsMesaServicios,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: GtuUsuario;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.gmsMesaServicios2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_usuario_asignado", referencedColumnName: "id" }])
  idUsuarioAsignado2: GtuUsuario;

  @ManyToOne(
    () => GmsEstatus,
    gmsEstatus => gmsEstatus.gmsMesaServicios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estatus", referencedColumnName: "id" }])
  idEstatus2: GmsEstatus;
}
