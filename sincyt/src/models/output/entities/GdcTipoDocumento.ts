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
import { GtuIcono } from "./GtuIcono";

@Index("gdctipodocumentoidicono_idx", ["idIcono"], {})
@Entity("gdc_tipo_documento", { schema: "sincyt" })
export class GdcTipoDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 50 })
  nombre: string;

  @Column("varchar", { name: "iniciales", length: 45 })
  iniciales: string;

  @Column("int", { name: "id_icono" })
  idIcono: number;

  @OneToMany(
    () => GdcDocumento,
    gdcDocumento => gdcDocumento.idTipoDocumento2
  )
  gdcDocumentos: GdcDocumento[];

  @ManyToOne(
    () => GtuIcono,
    gtuIcono => gtuIcono.gdcTipoDocumentos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_icono", referencedColumnName: "id" }])
  idIcono2: GtuIcono;
}
