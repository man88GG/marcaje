import { Column, Entity, OneToMany } from "typeorm";
import { AppBitacora } from "./AppBitacora";

@Entity("app_estado_bitacora", { schema: "sincyt" })
export class AppEstadoBitacora {
  @Column("int", { primary: true, name: "id_estado_bitacora" })
  idEstadoBitacora: number;

  @Column("varchar", { name: "descripcion", nullable: true, length: 255 })
  descripcion: string | null;

  @Column("varchar", { name: "mensaje_publico", nullable: true, length: 255 })
  mensajePublico: string | null;

  @OneToMany(
    () => AppBitacora,
    appBitacora => appBitacora.estadoBitacora2
  )
  appBitacoras: AppBitacora[];
}
