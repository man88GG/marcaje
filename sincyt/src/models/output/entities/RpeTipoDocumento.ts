import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { DneSolicitud } from "./DneSolicitud";
import { RpeDocsRequisito } from "./RpeDocsRequisito";
import { RpeDocumento } from "./RpeDocumento";
import { RpeBloque } from "./RpeBloque";

@Index("fk_RPE_TIPO_DOCUMENTO_RPE_BLOQUE1_idx", ["noBloque"], {})
@Entity("rpe_tipo_documento", { schema: "sincyt" })
export class RpeTipoDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "no_tipo_documento" })
  noTipoDocumento: number;

  @Column("int", { primary: true, name: "no_bloque" })
  noBloque: number;

  @Column("varchar", { name: "nombre_tipo_documento", length: 500 })
  nombreTipoDocumento: string;

  @Column("varchar", { name: "comentario", nullable: true, length: 2000 })
  comentario: string | null;

  @OneToMany(
    () => DneSolicitud,
    dneSolicitud => dneSolicitud.idTipoDocumento2
  )
  dneSolicituds: DneSolicitud[];

  @OneToMany(
    () => RpeDocsRequisito,
    rpeDocsRequisito => rpeDocsRequisito.rpeTipoDocumento
  )
  rpeDocsRequisitos: RpeDocsRequisito[];

  @OneToMany(
    () => RpeDocumento,
    rpeDocumento => rpeDocumento.rpeTipoDocumento
  )
  rpeDocumentos: RpeDocumento[];

  @ManyToOne(
    () => RpeBloque,
    rpeBloque => rpeBloque.rpeTipoDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "no_bloque", referencedColumnName: "noBloque" }])
  noBloque2: RpeBloque;
}
