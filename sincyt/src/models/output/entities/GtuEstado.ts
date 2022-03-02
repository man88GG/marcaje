import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GdcArchivo } from "./GdcArchivo";
import { GdcProceso } from "./GdcProceso";
import { GdiCategoria } from "./GdiCategoria";
import { GdiEstatus } from "./GdiEstatus";
import { GmsCategoria } from "./GmsCategoria";
import { GmsEstatus } from "./GmsEstatus";
import { GmsPrioridad } from "./GmsPrioridad";
import { GmsRuta } from "./GmsRuta";
import { GmsRutaAtencion } from "./GmsRutaAtencion";
import { GtuModulo } from "./GtuModulo";
import { GtuPuesto } from "./GtuPuesto";
import { GtuUsuario } from "./GtuUsuario";
import { LaipAsignacion } from "./LaipAsignacion";
import { LaipItem } from "./LaipItem";
import { RrhhTipoPermiso } from "./RrhhTipoPermiso";

@Entity("gtu_estado", { schema: "sincyt" })
export class GtuEstado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 45 })
  nombre: string;

  @OneToMany(
    () => GdcArchivo,
    gdcArchivo => gdcArchivo.idEstado2
  )
  gdcArchivos: GdcArchivo[];

  @OneToMany(
    () => GdcProceso,
    gdcProceso => gdcProceso.idEstado2
  )
  gdcProcesos: GdcProceso[];

  @OneToMany(
    () => GdiCategoria,
    gdiCategoria => gdiCategoria.idEstado2
  )
  gdiCategorias: GdiCategoria[];

  @OneToMany(
    () => GdiEstatus,
    gdiEstatus => gdiEstatus.idEstado2
  )
  gdiEstatuses: GdiEstatus[];

  @OneToMany(
    () => GmsCategoria,
    gmsCategoria => gmsCategoria.idEstado2
  )
  gmsCategorias: GmsCategoria[];

  @OneToMany(
    () => GmsEstatus,
    gmsEstatus => gmsEstatus.idEstado2
  )
  gmsEstatuses: GmsEstatus[];

  @OneToMany(
    () => GmsPrioridad,
    gmsPrioridad => gmsPrioridad.idEstado2
  )
  gmsPrioridads: GmsPrioridad[];

  @OneToMany(
    () => GmsRuta,
    gmsRuta => gmsRuta.idEstado2
  )
  gmsRutas: GmsRuta[];

  @OneToMany(
    () => GmsRutaAtencion,
    gmsRutaAtencion => gmsRutaAtencion.idEstado2
  )
  gmsRutaAtencions: GmsRutaAtencion[];

  @OneToMany(
    () => GtuModulo,
    gtuModulo => gtuModulo.idEstado2
  )
  gtuModulos: GtuModulo[];

  @OneToMany(
    () => GtuPuesto,
    gtuPuesto => gtuPuesto.idEstado2
  )
  gtuPuestos: GtuPuesto[];

  @OneToMany(
    () => GtuUsuario,
    gtuUsuario => gtuUsuario.idEstado2
  )
  gtuUsuarios: GtuUsuario[];

  @OneToMany(
    () => LaipAsignacion,
    laipAsignacion => laipAsignacion.idEstado2
  )
  laipAsignacions: LaipAsignacion[];

  @OneToMany(
    () => LaipItem,
    laipItem => laipItem.idEstado2
  )
  laipItems: LaipItem[];

  @OneToMany(
    () => RrhhTipoPermiso,
    rrhhTipoPermiso => rrhhTipoPermiso.idEstado2
  )
  rrhhTipoPermisos: RrhhTipoPermiso[];
}
