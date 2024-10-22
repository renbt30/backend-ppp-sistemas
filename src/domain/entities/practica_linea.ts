import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PracticaLinea {
    @PrimaryGeneratedColumn()
    id_prclinea: number;

    @Column()
    nm_prclinea: string;
}