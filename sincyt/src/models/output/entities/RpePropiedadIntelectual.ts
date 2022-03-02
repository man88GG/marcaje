import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { RpeEstado } from "./RpeEstado";
import { RpePersona } from "./RpePersona";
import { GrlMunicipio } from "./GrlMunicipio";
import { GrlPais } from "./GrlPais";
import { RpeRegistroPais } from "./RpeRegistroPais";

@Index("codigo_municipio", ["codigoMunicipio", "codigoDepartamento"], {})
@Index("codigo_pais", ["codigoPais"], {})
@Index(
  "fk_RPE_PROPIEDAD_INTELECTUAL_RPE_PERSONA1_idx",
  ["noRegistroPersona"],
  {}
)
@Index(
  "fk_RPE_PROPIEDAD_INTELECTUAL_RPE_ESTADO1_idx",
  ["noEstado", "noTipoEstado"],
  {}
)
@Entity("rpe_propiedad_intelectual", { schema: "sincyt" })
export class RpePropiedadIntelectual {
  @PrimaryGeneratedColumn({ type: "int", name: "no_propiedad_intelectual" })
  noPropiedadIntelectual: number;

  @Column("varchar", { name: "nombre_propiedad", length: 500 })
  nombrePropiedad: string;

  @Column("date", { name: "fecha_solicitud", nullable: true })
  fechaSolicitud: string | null;

  @Column("varchar", { name: "numero_solicitud", nullable: true, length: 250 })
  numeroSolicitud: string | null;

  @Column("date", { name: "fecha_registro", nullable: true })
  fechaRegistro: string | null;

  @Column("varchar", { name: "numero_registro", nullable: true, length: 250 })
  numeroRegistro: string | null;

  @Column("int", { name: "codigo_pais", nullable: true })
  codigoPais: number | null;

  @Column("int", { name: "codigo_municipio", nullable: true })
  codigoMunicipio: number | null;

  @Column("int", { name: "codigo_departamento", nullable: true })
  codigoDepartamento: number | null;

  @Column("varchar", { name: "ciudad", nullable: true, length: 500 })
  ciudad: string | null;

  @Column("varchar", { name: "provincia", nullable: true, length: 500 })
  provincia: string | null;

  @Column("varchar", { name: "estatus_legal", nullable: true, length: 500 })
  estatusLegal: string | null;

  @Column("int", { name: "no_registro_persona" })
  noRegistroPersona: number;

  @Column("int", { primary: true, name: "no_estado" })
  noEstado: number;

  @Column("int", { primary: true, name: "no_tipo_estado" })
  noTipoEstado: number;

  @ManyToOne(
    () => RpeEstado,
    rpeEstado => rpeEstado.rpePropiedadIntelectuals,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_estado", referencedColumnName: "noEstado" },
    { name: "no_tipo_estado", referencedColumnName: "noTipoEstado" }
  ])
  rpeEstado: RpeEstado;

  @ManyToOne(
    () => RpePersona,
    rpePersona => rpePersona.rpePropiedadIntelectuals,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "no_registro_persona", referencedColumnName: "noRegistroPersona" }
  ])
  noRegistroPersona2: RpePersona;

  @ManyToOne(
    () => GrlMunicipio,
    grlMunicipio => grlMunicipio.rpePropiedadIntelectuals,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "codigo_municipio", referencedColumnName: "id" },
    { name: "codigo_departamento", referencedColumnName: "idDepto" }
  ])
  grlMunicipio: GrlMunicipio;

  @ManyToOne(
    () => GrlPais,
    grlPais => grlPais.rpePropiedadIntelectuals,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "codigo_pais", referencedColumnName: "id" }])
  codigoPais2: GrlPais;

  @OneToMany(
    () => RpeRegistroPais,
    rpeRegistroPais => rpeRegistroPais.noPropiedadIntelectual2
  )
  rpeRegistroPais: RpeRegistroPais[];
}
