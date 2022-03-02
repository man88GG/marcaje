import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { GtuEstado } from "./GtuEstado";
import { GtuIcono } from "./GtuIcono";
import { GtuPerfilPermiso } from "./GtuPerfilPermiso";

@Index("idcono_idx", ["idIcono"], {})
@Index("idestado_idx", ["idEstado"], {})
@Index("idpadremodulo_idx", ["padre"], {})
@Entity("gtu_modulo", { schema: "sincyt" })
export class GtuModulo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "padre", nullable: true })
  padre: number | null;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "url", nullable: true, length: 150 })
  url: string | null;

  @Column("varchar", { name: "siglas", nullable: true, length: 10 })
  siglas: string | null;

  @Column("int", { name: "id_icono" })
  idIcono: number;

  @Column("int", { name: "id_estado" })
  idEstado: number;

  @ManyToOne(
    () => GtuEstado,
    gtuEstado => gtuEstado.gtuModulos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  idEstado2: GtuEstado;

  @ManyToOne(
    () => GtuIcono,
    gtuIcono => gtuIcono.gtuModulos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_icono", referencedColumnName: "id" }])
  idIcono2: GtuIcono;

  @ManyToOne(
    () => GtuModulo,
    gtuModulo => gtuModulo.gtuModulos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "padre", referencedColumnName: "id" }])
  padre2: GtuModulo;

  @OneToMany(
    () => GtuModulo,
    gtuModulo => gtuModulo.padre2
  )
  gtuModulos: GtuModulo[];

  @OneToMany(
    () => GtuPerfilPermiso,
    gtuPerfilPermiso => gtuPerfilPermiso.idModulo2
  )
  gtuPerfilPermisos: GtuPerfilPermiso[];
}
