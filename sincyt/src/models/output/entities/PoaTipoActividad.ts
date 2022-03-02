import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("poa_tipo_actividad", { schema: "sincyt" })
export class PoaTipoActividad {
  @PrimaryGeneratedColumn({ type: "int", name: "tipo_actividad" })
  tipoActividad: number;

  @Column("varchar", { name: "nombre", length: 45 })
  nombre: string;
}
