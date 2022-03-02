import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeTipoDocumento } from "./RpeTipoDocumento";
import { RpePersona } from "./RpePersona";

@Index(
  "fk_RPE_DOCUMENTO_RPE_TIPO_DOCUMENTO1_idx",
  ["noTipoDocumento", "noBloque"],
  {}
)
@Entity("rpe_documento", { schema: "sincyt" })
export class RpeDocumento {
  @PrimaryGeneratedColumn({ type: "int", name: "no_documento" })
  noDocumento: number;

  @Column("varchar", { name: "id_mongo", length: 2000 })
  idMongo: string;

  @Column("datetime", { name: "fecha_carga", nullable: true })
  fechaCarga: Date | null;

  @Column("int", { primary: true, name: "no_tipo_documento" })
  noTipoDocumento: number;

  @Column("int", { primary: true, name: "no_bloque" })
  noBloque: number;

  @Column("varchar", { name: "no_registro", nullable: true, length: 2000 })
  noRegistro: string | null;

  @ManyToOne(
    () => RpeTipoDocumento,
    rpeTipoDocumento => rpeTipoDocumento.rpeDocumentos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_tipo_documento", referencedColumnName: "noTipoDocumento" },
    { name: "no_bloque", referencedColumnName: "noBloque" }
  ])
  rpeTipoDocumento: RpeTipoDocumento;

  @ManyToMany(
    () => RpePersona,
    rpePersona => rpePersona.rpeDocumentos
  )
  @JoinTable({
    name: "rpe_persona_bloque_documento",
    joinColumns: [
      { name: "no_documento", referencedColumnName: "noDocumento" }
    ],
    inverseJoinColumns: [
      { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
    ],
    schema: "sincyt"
  })
  rpePersonas: RpePersona[];
}
