import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Practica {
    @PrimaryGeneratedColumn()
    id_practica: number;

    @Column()
    id_prclinea: number;

    @Column()
    id_solicitud: number;

    @Column()
    id_prcestado: number;

    @Column()
    id_superv: number;

    @Column()
    horas_validadas: number;

    @Column()
    nota: number;

    @Column()
    id_usuariomov: number;

    @Column()
    dt_mov: Date;
}