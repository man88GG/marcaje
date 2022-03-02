import { Column, Entity, Index, OneToMany } from "typeorm";
import { GdcActividad } from "./GdcActividad";
import { GdcSalidaNoConforme } from "./GdcSalidaNoConforme";

@Index("gdclistavaloresidtipolista_idx", ["idTipoLista"], {})
@Entity("gdc_lista_valores", { schema: "sincyt" })
export class GdcListaValores {
  @Column("int", { primary: true, name: "numero" })
  numero: number;

  @Column("int", { primary: true, name: "id_tipo_lista" })
  idTipoLista: number;

  @Column("varchar", { name: "descripcion", length: 50 })
  descripcion: string;

  @OneToMany(
    () => GdcActividad,
    gdcActividad => gdcActividad.idNumeroEstatus2
  )
  gdcActividads: GdcActividad[];

  @OneToMany(
    () => GdcActividad,
    gdcActividad => gdcActividad.idTipoEstatus2
  )
  gdcActividads2: GdcActividad[];

  @OneToMany(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.idNumeroCorrectiva2
  )
  gdcSalidaNoConformes: GdcSalidaNoConforme[];

  @OneToMany(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.idTipoCorrectiva2
  )
  gdcSalidaNoConformes2: GdcSalidaNoConforme[];

  @OneToMany(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.idNumeroEventoDeteccion2
  )
  gdcSalidaNoConformes3: GdcSalidaNoConforme[];

  @OneToMany(
    () => GdcSalidaNoConforme,
    gdcSalidaNoConforme => gdcSalidaNoConforme.idTipoEventoDeteccion2
  )
  gdcSalidaNoConformes4: GdcSalidaNoConforme[];
}
