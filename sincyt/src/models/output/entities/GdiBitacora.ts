import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gdi_bitacora", { schema: "sincyt" })
export class GdiBitacora {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "accion", length: 45 })
  accion: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "tabla", length: 250 })
  tabla: string;

  @Column("datetime", { name: "fecha" })
  fecha: Date;

  @Column("varchar", { name: "usuario", length: 25 })
  usuario: string;

  @Column("int", { name: "id_documento_interno" })
  idDocumentoInterno: number;

  @Column("int", { name: "id_estatus" })
  idEstatus: number;
}
