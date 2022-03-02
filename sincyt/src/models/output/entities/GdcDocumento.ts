import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GdcArchivo } from "./GdcArchivo";
import { GdcProceso } from "./GdcProceso";
import { GdcTipoDocumento } from "./GdcTipoDocumento";

@Index("gdc_documentoidproceso_idx", ["idProceso"], {})
@Index("gdc_documentoidtipodocumento_idx", ["idTipoDocumento"], {})
@Entity("gdc_documento", { schema: "sincyt" })
export class GdcDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_tipo_documento" })
  idTipoDocumento: number;

  @Column("int", { name: "id_proceso" })
  idProceso: number;

  @OneToMany(
    () => GdcArchivo,
    gdcArchivo => gdcArchivo.idDocumento2
  )
  gdcArchivos: GdcArchivo[];

  @ManyToOne(
    () => GdcProceso,
    gdcProceso => gdcProceso.gdcDocumentos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "id" }])
  idProceso2: GdcProceso;

  @ManyToOne(
    () => GdcTipoDocumento,
    gdcTipoDocumento => gdcTipoDocumento.gdcDocumentos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_tipo_documento", referencedColumnName: "id" }])
  idTipoDocumento2: GdcTipoDocumento;
}
