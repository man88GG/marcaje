import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { SgpPerfilProyecto } from "./SgpPerfilProyecto";
import { SgpRequisitoLinea } from "./SgpRequisitoLinea";

@Index("fk_perfil_requisito_perfil_proyecto1_idx", ["idPerfilProyecto"], {})
@Index("fk_perfil_requisito_requisito_linea1_idx", ["idRequisitoLinea"], {})
@Entity("sgp_perfil_requisito", { schema: "sincyt" })
export class SgpPerfilRequisito {
  @PrimaryGeneratedColumn({ type: "int", name: "id_perfil_requisito" })
  idPerfilRequisito: number;

  @Column("date", { name: "fecha_creacion" })
  fechaCreacion: string;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", { name: "id_documento_mongo", length: 45 })
  idDocumentoMongo: string;

  @Column("int", { name: "id_perfil_proyecto" })
  idPerfilProyecto: number;

  @Column("int", { name: "id_requisito_linea" })
  idRequisitoLinea: number;

  @ManyToOne(
    () => SgpPerfilProyecto,
    sgpPerfilProyecto => sgpPerfilProyecto.sgpPerfilRequisitos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_perfil_proyecto", referencedColumnName: "idPerfilProyecto" }
  ])
  idPerfilProyecto2: SgpPerfilProyecto;

  @ManyToOne(
    () => SgpRequisitoLinea,
    sgpRequisitoLinea => sgpRequisitoLinea.sgpPerfilRequisitos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_requisito_linea", referencedColumnName: "idRequisitoLinea" }
  ])
  idRequisitoLinea2: SgpRequisitoLinea;
}
