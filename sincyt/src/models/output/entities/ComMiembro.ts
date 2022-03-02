import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ComDocumentoMiembro } from "./ComDocumentoMiembro";
import { ComInformacionAcademica } from "./ComInformacionAcademica";
import { ComInformacionContactoMiembro } from "./ComInformacionContactoMiembro";
import { ComJuntaDirectiva } from "./ComJuntaDirectiva";
import { ComListaAsistencia } from "./ComListaAsistencia";
import { GrlPais } from "./GrlPais";
import { ComMiembroComision } from "./ComMiembroComision";
import { ComMiembroComisionCatalogo } from "./ComMiembroComisionCatalogo";

@Index("fk_com_miembro_grl_pais1_idx", ["nacionalidad"], {})
@Index("fk_com_miembro_rpe_entidad1_idx", ["noEntidad"], {})
@Entity("com_miembro", { schema: "sincyt" })
export class ComMiembro {
  @PrimaryGeneratedColumn({ type: "int", name: "miembro_comision" })
  miembroComision: number;

  @Column("int", { name: "rni", nullable: true })
  rni: number | null;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "apellido", length: 100 })
  apellido: string;

  @Column("varchar", { name: "apellido_casada", nullable: true, length: 100 })
  apellidoCasada: string | null;

  @Column("date", { name: "fecha_nacimiento" })
  fechaNacimiento: string;

  @Column("varchar", { name: "cui", length: 45 })
  cui: string;

  @Column("varchar", { name: "pasaporte", nullable: true, length: 45 })
  pasaporte: string | null;

  @Column("int", { name: "pais_pasaporte", nullable: true })
  paisPasaporte: number | null;

  @Column("int", { name: "nacionalidad" })
  nacionalidad: number;

  @Column("int", { name: "no_entidad", nullable: true })
  noEntidad: number | null;

  @Column("timestamp", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("int", { name: "activo", nullable: true })
  activo: number | null;

  @OneToMany(
    () => ComDocumentoMiembro,
    comDocumentoMiembro => comDocumentoMiembro.miembroComision2
  )
  comDocumentoMiembros: ComDocumentoMiembro[];

  @OneToMany(
    () => ComInformacionAcademica,
    comInformacionAcademica => comInformacionAcademica.miembroComision2
  )
  comInformacionAcademicas: ComInformacionAcademica[];

  @OneToMany(
    () => ComInformacionContactoMiembro,
    comInformacionContactoMiembro =>
      comInformacionContactoMiembro.miembroComision2
  )
  comInformacionContactoMiembros: ComInformacionContactoMiembro[];

  @OneToMany(
    () => ComJuntaDirectiva,
    comJuntaDirectiva => comJuntaDirectiva.miembroComision2
  )
  comJuntaDirectivas: ComJuntaDirectiva[];

  @OneToMany(
    () => ComListaAsistencia,
    comListaAsistencia => comListaAsistencia.miembroComision2
  )
  comListaAsistencias: ComListaAsistencia[];

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.comMiembros,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "nacionalidad", referencedColumnName: "id" }])
  nacionalidad2: GrlPais;

  @OneToMany(
    () => ComMiembroComision,
    comMiembroComision => comMiembroComision.miembroComision2
  )
  comMiembroComisions: ComMiembroComision[];

  @OneToMany(
    () => ComMiembroComisionCatalogo,
    comMiembroComisionCatalogo => comMiembroComisionCatalogo.miembroComision2
  )
  comMiembroComisionCatalogos: ComMiembroComisionCatalogo[];
}
