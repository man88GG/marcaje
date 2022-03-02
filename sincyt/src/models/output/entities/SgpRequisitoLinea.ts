import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { SgpPerfilRequisito } from "./SgpPerfilRequisito";
import { SgpLinea } from "./SgpLinea";
import { SgpTipoDocumento } from "./SgpTipoDocumento";

@Index("fk_requisito_linea_tipo_documento1_idx", ["idTipoDocumento"], {})
@Index("fk_requisito_linea_linea1_idx", ["idLinea"], {})
@Entity("sgp_requisito_linea", { schema: "sincyt" })
export class SgpRequisitoLinea {
  @Column("int", { primary: true, name: "id_requisito_linea" })
  idRequisitoLinea: number;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("tinyint", { name: "obligatorio" })
  obligatorio: number;

  @Column("int", { name: "id_tipo_documento" })
  idTipoDocumento: number;

  @Column("int", { name: "id_linea" })
  idLinea: number;

  @OneToMany(
    () => SgpPerfilRequisito,
    sgpPerfilRequisito => sgpPerfilRequisito.idRequisitoLinea2
  )
  sgpPerfilRequisitos: SgpPerfilRequisito[];

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.sgpRequisitoLineas,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_linea", referencedColumnName: "idLinea" }])
  idLinea2: SgpLinea;

  @ManyToOne(
    () => SgpTipoDocumento,
    sgpTipoDocumento => sgpTipoDocumento.sgpRequisitoLineas,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_tipo_documento", referencedColumnName: "idTipoDocumento" }
  ])
  idTipoDocumento2: SgpTipoDocumento;
}
