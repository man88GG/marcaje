import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GmsAsignacion } from "./GmsAsignacion";
import { GtuEstado } from "./GtuEstado";
import { GmsRutaAtencion } from "./GmsRutaAtencion";

@Index("id_estado", ["idEstado"], {})
@Entity("gms_ruta", { schema: "sincyt" })
export class GmsRuta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @OneToMany(
    () => GmsAsignacion,
    gmsAsignacion => gmsAsignacion.idRuta2
  )
  gmsAsignacions: GmsAsignacion[];

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gmsRutas,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @OneToMany(
    () => GmsRutaAtencion,
    gmsRutaAtencion => gmsRutaAtencion.idRuta2
  )
  gmsRutaAtencions: GmsRutaAtencion[];
}
