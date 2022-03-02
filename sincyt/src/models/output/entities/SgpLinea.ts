import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AsgpNotifActivUsuario } from "./AsgpNotifActivUsuario";
import { EvintFormulario } from "./EvintFormulario";
import { RhplCatalogo } from "./RhplCatalogo";
import { SgpConvocatoriaDocumento } from "./SgpConvocatoriaDocumento";
import { SgpFormulario } from "./SgpFormulario";
import { SgpTipoLinea } from "./SgpTipoLinea";
import { SgpLineaConvocatoria } from "./SgpLineaConvocatoria";
import { SgpRequisitoLinea } from "./SgpRequisitoLinea";

@Index("fk_linea_tipo_linea_idx", ["tipoLinea"], {})
@Index("fk_linea_linea1_idx", ["idLineaPadre"], {})
@Entity("sgp_linea", { schema: "sincyt" })
export class SgpLinea {
  @Column("int", { primary: true, name: "id_linea" })
  idLinea: number;

  @Column("varchar", { name: "acronimo", length: 45 })
  acronimo: string;

  @Column("varchar", { name: "nombre", nullable: true, length: 250 })
  nombre: string | null;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("decimal", { name: "monto_maximo", precision: 8, scale: 2 })
  montoMaximo: string;

  @Column("int", { name: "duracion_maxima", nullable: true })
  duracionMaxima: number | null;

  @Column("int", { name: "tipo_linea" })
  tipoLinea: number;

  @Column("int", { name: "id_linea_padre", nullable: true })
  idLineaPadre: number | null;

  @OneToMany(
    () => AsgpNotifActivUsuario,
    asgpNotifActivUsuario => asgpNotifActivUsuario.idLinea2
  )
  asgpNotifActivUsuarios: AsgpNotifActivUsuario[];

  @OneToMany(
    () => EvintFormulario,
    evintFormulario => evintFormulario.idLinea2
  )
  evintFormularios: EvintFormulario[];

  @OneToMany(
    () => RhplCatalogo,
    rhplCatalogo => rhplCatalogo.idLinea2
  )
  rhplCatalogos: RhplCatalogo[];

  @OneToMany(
    () => SgpConvocatoriaDocumento,
    sgpConvocatoriaDocumento => sgpConvocatoriaDocumento.idLinea2
  )
  sgpConvocatoriaDocumentos: SgpConvocatoriaDocumento[];

  @OneToMany(
    () => SgpFormulario,
    sgpFormulario => sgpFormulario.idLinea2
  )
  sgpFormularios: SgpFormulario[];

  @ManyToOne(
    () => SgpLinea,
    sgpLinea => sgpLinea.sgpLineas,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_linea_padre", referencedColumnName: "idLinea" }])
  idLineaPadre2: SgpLinea;

  @OneToMany(
    () => SgpLinea,
    sgpLinea => sgpLinea.idLineaPadre2
  )
  sgpLineas: SgpLinea[];

  @ManyToOne(
    () => SgpTipoLinea,
    sgpTipoLinea => sgpTipoLinea.sgpLineas,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "tipo_linea", referencedColumnName: "idTipoLinea" }])
  tipoLinea2: SgpTipoLinea;

  @OneToMany(
    () => SgpLineaConvocatoria,
    sgpLineaConvocatoria => sgpLineaConvocatoria.idLinea2
  )
  sgpLineaConvocatorias: SgpLineaConvocatoria[];

  @OneToMany(
    () => SgpRequisitoLinea,
    sgpRequisitoLinea => sgpRequisitoLinea.idLinea2
  )
  sgpRequisitoLineas: SgpRequisitoLinea[];
}
