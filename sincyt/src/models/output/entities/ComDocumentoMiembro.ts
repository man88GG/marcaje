import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComMiembro } from "./ComMiembro";

@Index("fk_table1_com_miembro1", ["miembroComision"], {})
@Entity("com_documento_miembro", { schema: "sincyt" })
export class ComDocumentoMiembro {
  @Column("int", { name: "miembro_comision" })
  miembroComision: number;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("text", { name: "documento" })
  documento: string;

  @PrimaryGeneratedColumn({ type: "int", name: "documento_miembro" })
  documentoMiembro: number;

  @ManyToOne(
    () => ComMiembro,
    comMiembro => comMiembro.comDocumentoMiembros,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "miembro_comision", referencedColumnName: "miembroComision" }
  ])
  miembroComision2: ComMiembro;
}
