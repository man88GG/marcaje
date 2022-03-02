import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneBloque } from "./DneBloque";
import { DneTipoDocumento } from "./DneTipoDocumento";
import { DneDocumentoProyecto } from "./DneDocumentoProyecto";
import { DneEntidadBloqueDocumento } from "./DneEntidadBloqueDocumento";

@Index("fk_dne_documento_dne_tipo_documento1_idx", ["noTipoDocumento"], {})
@Index("fk_dne_documento_dne_bloque1_idx", ["noBloque"], {})
@Entity("dne_documento", { schema: "sincyt" })
export class DneDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "no_documento" })
  noDocumento: number;

  @Column("varchar", { name: "id_mongo", length: 2000 })
  idMongo: string;

  @Column("timestamp", { name: "fecha", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column("int", { name: "no_tipo_documento" })
  noTipoDocumento: number;

  @Column("int", { name: "no_bloque" })
  noBloque: number;

  @ManyToOne(
    () => DneBloque,
    dneBloque => dneBloque.dneDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_bloque", referencedColumnName: "noBloque" }])
  noBloque2: DneBloque;

  @ManyToOne(
    () => DneTipoDocumento,
    dneTipoDocumento => dneTipoDocumento.dneDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_documento", referencedColumnName: "noTipoDocumento" }
  ])
  noTipoDocumento2: DneTipoDocumento;

  @OneToMany(
    () => DneDocumentoProyecto,
    dneDocumentoProyecto => dneDocumentoProyecto.dneDocumentoNoDocumento2
  )
  dneDocumentoProyectos: DneDocumentoProyecto[];

  @OneToMany(
    () => DneEntidadBloqueDocumento,
    dneEntidadBloqueDocumento => dneEntidadBloqueDocumento.noDocumento2
  )
  dneEntidadBloqueDocumentos: DneEntidadBloqueDocumento[];
}
