import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppDocumentoPorRuta } from "./AppDocumentoPorRuta";

@Entity("app_tipo_documento", { schema: "sincyt" })
export class AppTipoDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_tipo_documento" })
  idTipoDocumento: number;

  @Column("varchar", { name: "descripcion", length: 500 })
  descripcion: string;

  @Column("varchar", { name: "abreviacion", length: 100 })
  abreviacion: string;

  @Column("varchar", { name: "tipo_documento", length: 100 })
  tipoDocumento: string;

  @Column("varchar", { name: "extension_formato_digital", length: 45 })
  extensionFormatoDigital: string;

  @OneToMany(
    () => AppDocumentoPorRuta,
    appDocumentoPorRuta => appDocumentoPorRuta.idTipoDocumento2
  )
  appDocumentoPorRutas: AppDocumentoPorRuta[];
}
