import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComComision } from "./ComComision";

@Index("fk_com_documento_com_comision1_idx", ["comision"], {})
@Entity("com_documento", { schema: "sincyt" })
export class ComDocumento {
  @Column("int", { primary: true, name: "comision" })
  comision: number;

  @PrimaryGeneratedColumn({ type: "int", name: "documento" })
  documento: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("text", { name: "identificador" })
  identificador: string;

  @ManyToOne(
    () => ComComision,
    comComision => comComision.comDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "comision", referencedColumnName: "comision" }])
  comision2: ComComision;
}
