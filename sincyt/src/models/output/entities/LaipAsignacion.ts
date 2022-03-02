import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuDepartamento } from "./GtuDepartamento";
import { GtuEstado } from "./GtuEstado";
import { LaipItem } from "./LaipItem";
import { GtuUsuario } from "./GtuUsuario";
import { LaipTransaccionesArticulos } from "./LaipTransaccionesArticulos";

@Index("idpersonacargoasignacion_idx", ["idPersonaCargo"], {})
@Index("idpersonaresponsableasignacion_idx", ["idPersonaResponsable"], {})
@Index("iditemasignacion_idx", ["idItem"], {})
@Index("idestadoasignacion_idx", ["idEstado"], {})
@Index("iddepartamentoasignacion_idx", ["idDepartamento"], {})
@Entity("laip_asignacion", { schema: "sincyt" })
export class LaipAsignacion {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_persona_cargo" })
  idPersonaCargo: number;

  @Column("int", { name: "id_persona_responsable" })
  idPersonaResponsable: number;

  @Column("int", { name: "id_item" })
  idItem: number;

  @Column("int", { name: "id_departamento" })
  idDepartamento: number;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @ManyToOne(
    () => GtuDepartamento,
    gtuDepartamento => gtuDepartamento.laipAsignacions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_departamento", referencedColumnName: "id" }])
  idDepartamento2: GtuDepartamento;

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.laipAsignacions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @ManyToOne(
    () => LaipItem,
    laipItem => laipItem.laipAsignacions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_item", referencedColumnName: "id" }])
  idItem2: LaipItem;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.laipAsignacions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_persona_cargo", referencedColumnName: "id" }])
  idPersonaCargo2: GtuUsuario;

  @ManyToOne(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.laipAsignacions2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_persona_responsable", referencedColumnName: "id" }])
  idPersonaResponsable2: GtuUsuario;

  @OneToMany(
    () => LaipTransaccionesArticulos,
    laipTransaccionesArticulos => laipTransaccionesArticulos.idAsignacion2
  )
  laipTransaccionesArticulos: LaipTransaccionesArticulos[];
}
