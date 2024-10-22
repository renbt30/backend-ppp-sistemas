import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PracticaEstado {
    @PrimaryGeneratedColumn()
    id_prcestado: number;

    @Column()
    nm_prcestado: string;
}