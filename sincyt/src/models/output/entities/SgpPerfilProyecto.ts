import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { AsgpSolicitud } from "./AsgpSolicitud";
import { EvintBitacora } from "./EvintBitacora";
import { EvintDetalleFormulario } from "./EvintDetalleFormulario";
import { EvintDocumentoAnexo } from "./EvintDocumentoAnexo";
import { SgpDetalleFormulario } from "./SgpDetalleFormulario";
import { SgpEstadoPerfilProyecto } from "./SgpEstadoPerfilProyecto";
import { SgpLineaConvocatoria } from "./SgpLineaConvocatoria";
import { RpePersona } from "./RpePersona";
import { SgpPerfilRequisito } from "./SgpPerfilRequisito";

@Index(
  "fk_perfil_proyecto_estado_perfil_proyecto1_idx",
  ["idEstadoPerfilProyecto"],
  {}
)
@Index("fk_sgp_perfil_proyecto_no_reg_persona", ["noRegistroPersona"], {})
@Index("fk_sgp_linea_convocatoria_idx", ["idLinea", "numeroConvocatoria"], {})
@Entity("sgp_perfil_proyecto", { schema: "sincyt" })
export class SgpPerfilProyecto {
  @Column("int", { primary: true, name: "id_perfil_proyecto" })
  idPerfilProyecto: number;

  @Column("date", { name: "fecha_creacion" })
  fechaCreacion: string;

  @Column("int", { name: "id_estado_perfil_proyecto" })
  idEstadoPerfilProyecto: number;

  @Column("int", { name: "no_registro_persona", nullable: true })
  noRegistroPersona: number | null;

  @Column("int", { name: "id_linea" })
  idLinea: number;

  @Column("varchar", { name: "numero_convocatoria", length: 100 })
  numeroConvocatoria: string;

  @OneToMany(
    () => AsgpSolicitud,
    asgpSolicitud => asgpSolicitud.idPerfilProyecto2
  )
  asgpSolicituds: AsgpSolicitud[];

  @OneToMany(
    () => EvintBitacora,
    evintBitacora => evintBitacora.idPerfil2
  )
  evintBitacoras: EvintBitacora[];

  @OneToMany(
    () => EvintDetalleFormulario,
    evintDetalleFormulario => evintDetalleFormulario.idPerfilProyecto2
  )
  evintDetalleFormularios: EvintDetalleFormulario[];

  @OneToMany(
    () => EvintDocumentoAnexo,
    evintDocumentoAnexo => evintDocumentoAnexo.idPerfilProyecto2
  )
  evintDocumentoAnexos: EvintDocumentoAnexo[];

  @OneToMany(
    () => SgpDetalleFormulario,
    sgpDetalleFormulario => sgpDetalleFormulario.idPerfilProyecto2
  )
  sgpDetalleFormularios: SgpDetalleFormulario[];

  @ManyToOne(
    () => SgpEstadoPerfilProyecto,
    sgpEstadoPerfilProyecto => sgpEstadoPerfilProyecto.sgpPerfilProyectos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "id_estado_perfil_proyecto",
      referencedColumnName: "idEstadoPerfilProyecto"
    }
  ])
  idEstadoPerfilProyecto2: SgpEstadoPerfilProyecto;

  @ManyToOne(
    () => SgpLineaConvocatoria,
    sgpLineaConvocatoria => sgpLineaConvocatoria.sgpPerfilProyectos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_linea", referencedColumnName: "idLinea" },
    { name: "numero_convocatoria", referencedColumnName: "numeroConvocatoria" }
  ])
  sgpLineaConvocatoria: SgpLineaConvocatoria;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.sgpPerfilProyectos,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;

  @OneToMany(
    () => SgpPerfilRequisito,
    sgpPerfilRequisito => sgpPerfilRequisito.idPerfilProyecto2
  )
  sgpPerfilRequisitos: SgpPerfilRequisito[];
}
