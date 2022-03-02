import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GdcTipoDocumento } from "./GdcTipoDocumento";
import { GdiCategoria } from "./GdiCategoria";
import { GtuModulo } from "./GtuModulo";

@Entity("gtu_icono", { schema: "sincyt" })
export class GtuIcono {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @OneToMany(
    () => GdcTipoDocumento,
    gdcTipoDocumento => gdcTipoDocumento.idIcono2
  )
  gdcTipoDocumentos: GdcTipoDocumento[];

  @OneToMany(
    () => GdiCategoria,
    gdiCategoria => gdiCategoria.idIcono2
  )
  gdiCategorias: GdiCategoria[];

  @OneToMany(
    () => GtuModulo,
    gtuModulo => gtuModulo.idIcono2
  )
  gtuModulos: GtuModulo[];
}
