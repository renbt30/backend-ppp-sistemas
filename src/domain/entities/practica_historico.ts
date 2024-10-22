import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PracticaHistorico {
    @PrimaryColumn()
    id_practica: number;

    @PrimaryColumn()
    id_usuariomov: number;

    @PrimaryColumn()
    id_prcestado: number;

    @Column()
    dt_mov: Date;

    @Column()
    observacion: string;
}