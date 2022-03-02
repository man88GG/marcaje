import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GmsCategoria } from "./GmsCategoria";
import { GmsRuta } from "./GmsRuta";

@Index("idcategoria_idx_idx", ["idCategoria"], {})
@Index("idrutaatencion_idx_idx", ["idRuta"], {})
@Entity("gms_asignacion", { schema: "sincyt" })
export class GmsAsignacion {
  @Column("int", { name: "id_categoria" })
  idCategoria: number;

  @Column("int", { name: "id_ruta" })
  idRuta: number;

  @ManyToOne(
    () => GmsCategoria,
    gmsCategoria => gmsCategoria.gmsAsignacions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
  idCategoria2: GmsCategoria;

  @ManyToOne(
    () => GmsRuta,
    gmsRuta => gmsRuta.gmsAsignacions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_ruta", referencedColumnName: "id" }])
  idRuta2: GmsRuta;
}
