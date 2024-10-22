import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Solicitud {
    @PrimaryGeneratedColumn()
    id_solicitud: number;

    @Column()
    id_prclinea: number;

    @Column()
    id_postulante: number;

    @Column()
    empresa_ruc: string;

    @Column()
    empresa_nombre: string;

    @Column()
    dt_prcinicio: Date;

    @Column()
    dt_prcfin: Date;

    @Column()
    desc_actividades: string;

    @Column()
    dt_creacion: Date;

    @Column()
    estado: string;

    @Column()
    id_usuariorev: number;

    @Column()
    observacion: string;
}