import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CorbProceso } from "./CorbProceso";
import { GtuPerfil } from "./GtuPerfil";
import { CorbTipoResponsable } from "./CorbTipoResponsable";

@Index("responsable_idx", ["tipoResponsable"], {})
@Index("proceso_idx", ["idProceso"], {})
@Index("id_proceso_resp_idx", ["idProceso"], {})
@Entity("corb_responsable", { schema: "sincyt" })
export class CorbResponsable {
  @Column("int", { primary: true, name: "id_perfil" })
  idPerfil: number;

  @Column("int", { primary: true, name: "id_proceso" })
  idProceso: number;

  @Column("int", { name: "tipo_responsable" })
  tipoResponsable: number;

  @ManyToOne(
    () => CorbProceso,
    corbProceso => corbProceso.corbResponsables,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_proceso", referencedColumnName: "idProceso" }])
  idProceso2: CorbProceso;

  @ManyToOne(
    () => GtuPerfil,
    gtuPerfil => gtuPerfil.corbResponsables,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "id" }])
  idPerfil2: GtuPerfil;

  @ManyToOne(
    () => CorbTipoResponsable,
    corbTipoResponsable => corbTipoResponsable.corbResponsables,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "tipo_responsable", referencedColumnName: "idTipoResponsable" }
  ])
  tipoResponsable2: CorbTipoResponsable;
}
